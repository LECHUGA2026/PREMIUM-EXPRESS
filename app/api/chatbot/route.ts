import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, locale } = await request.json()

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Empty message' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      console.error('Grok API key not configured')
      return NextResponse.json(
        {
          success: true,
          response:
            locale === 'es'
              ? 'El asistente aún no está configurado. Por favor, contacta a soporte.'
              : 'The assistant is not configured yet. Please contact support.',
        },
        { status: 200 }
      )
    }

    const url = 'https://openrouter.ai/api/v1/chat/completions'

    const systemInstruction =
      locale === 'es'
        ? 'Eres un asistente útil de Premium Express, una empresa de logística y transporte terrestre basada en Estados Unidos. Responde de forma concisa y profesional en español.'
        : 'You are a helpful assistant for Premium Express, a logistics and land transportation company based in the United States. Respond concisely and professionally in English.'

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', // ✅ modelo correcto
        messages: [
          {
            role: 'system',
            content: systemInstruction,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const text = await response.text()

    let data: any = null
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = null
    }

    if (!response.ok || !data || data.error) {
      console.error('Grok API error:', data?.error || text)
      return NextResponse.json(
        {
          success: true,
          response:
            locale === 'es'
              ? 'Lo siento, hubo un problema con el asistente. Inténtalo de nuevo más tarde.'
              : 'Sorry, there was a problem with the assistant. Please try again later.',
        },
        { status: 200 }
      )
    }

    const botResponse =
      data.choices?.[0]?.message?.content ||
      (locale === 'es'
        ? 'No entendí tu pregunta.'
        : 'I did not understand your question.')

    return NextResponse.json(
      {
        success: true,
        response: botResponse.trim(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Chatbot API error:', error)

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}