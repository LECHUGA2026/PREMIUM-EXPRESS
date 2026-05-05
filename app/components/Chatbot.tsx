"use client"


import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { translations, defaultLocale } from '@/lib/i18n'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [locale, setLocale] = useState(defaultLocale)
  const [t, setT] = useState(translations[defaultLocale])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('locale')
    const currentLocale = (saved === 'en' ? 'en' : 'es') as 'es' | 'en'
    if (currentLocale !== locale) {
      setLocale(currentLocale)
    }
    setT(translations[currentLocale] || translations[defaultLocale])
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          locale,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch (error) {
      console.error('Chatbot error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: t?.chatbot?.error || 'Error sending message',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-brand-burgundy hover:bg-brand-burgundy-dark text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group"
          aria-label={t?.chatbot?.title || 'AI Assistant'}
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-24px)] rounded-lg shadow-2xl flex flex-col max-h-[600px] animate-fade-up border border-brand-burgundy/20"
          style={{ backgroundColor: '#7a0d18' }}
        >
          {/* Header */}
          <div className="text-white p-4 rounded-t-lg flex justify-between items-center"
            style={{ backgroundColor: '#4c070f' }}
          >
            <div>
              <h3 className="font-bold">{t?.chatbot?.title || 'AI Assistant'}</h3>
              <p className="text-xs text-white/70">Powered by OpenRouter</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label={t?.chatbot?.close || 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ backgroundColor: '#7a0d18' }}
          >
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-center text-white/70 text-sm">
                <p>{locale === 'es' ? '¿En qué puedo ayudarte?' : 'How can I help you?'}</p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-brand-burgundy-dark text-white rounded-br-none border border-brand-burgundy'
                      : 'bg-white text-gray-800 rounded-bl-none border border-white/30'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-brand-burgundy px-4 py-2 rounded-lg rounded-bl-none border border-white/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-brand-burgundy rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-brand-burgundy rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-brand-burgundy rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/20 p-3 rounded-b-lg"
            style={{ backgroundColor: '#7a0d18' }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t?.chatbot?.placeholder || 'Ask me anything...'}
                className="flex-1 px-3 py-2 border border-white/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-gray-800 placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-[#4c070f] text-white p-2 rounded-lg transition-colors disabled:opacity-50 border border-[#4c070f] hover:bg-[#7a0d18]"
                aria-label={t?.chatbot?.send || 'Send'}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
