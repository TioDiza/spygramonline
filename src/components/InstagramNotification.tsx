'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InstagramNotificationProps {
  senderName?: string
  message?: string
  avatar?: string
  time?: string
  hiddenWords?: string[]
  onClose?: () => void
  autoShow?: boolean
  duration?: number
}

export function InstagramNotification({
  senderName = 'amigo_instagram',
  message = 'Oi! Como você está? Queria te mostrar algo interessante...',
  avatar,
  time = 'agora',
  hiddenWords = [],
  onClose,
  autoShow = true,
  duration = 5000,
}: InstagramNotificationProps) {
  const [isVisible, setIsVisible] = useState(autoShow)
  const [isEditing, setIsEditing] = useState(false)
  const [editableMessage, setEditableMessage] = useState(message)
  const [editableHiddenWords, setEditableHiddenWords] = useState<string[]>(hiddenWords)
  const [editableSenderName, setEditableSenderName] = useState(senderName)

  useEffect(() => {
    if (autoShow) {
      setIsVisible(true)
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, duration)
        return () => clearTimeout(timer)
      }
    }
  }, [autoShow, duration, onClose])

  const hideWords = (text: string, wordsToHide: string[]) => {
    if (wordsToHide.length === 0) return text
    
    let result = text
    wordsToHide.forEach((word) => {
      const regex = new RegExp(word, 'gi')
      result = result.replace(regex, '█'.repeat(word.length))
    })
    return result
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-4 right-4 z-50 max-w-sm w-full"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Header do Instagram */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-white text-sm font-semibold">Instagram</span>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Conteúdo da Notificação */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                  {avatar ? (
                    <img src={avatar} alt={editableSenderName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {editableSenderName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Mensagem */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableSenderName}
                          onChange={(e) => setEditableSenderName(e.target.value)}
                          className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm w-32"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        editableSenderName
                      )}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{time}</span>
                  </div>
                  
                  <div className="text-sm text-slate-700 dark:text-slate-300">
                    {isEditing ? (
                      <textarea
                        value={editableMessage}
                        onChange={(e) => setEditableMessage(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm resize-none"
                        rows={3}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <p className="break-words">
                        {hideWords(editableMessage, editableHiddenWords)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Controles de Edição */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {isEditing ? 'Salvar' : 'Editar Mensagem'}
                  </button>
                </div>

                {isEditing && (
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-slate-600 dark:text-slate-400 mb-1 block">
                        Palavras para ocultar (separadas por vírgula):
                      </label>
                      <input
                        type="text"
                        value={editableHiddenWords.join(', ')}
                        onChange={(e) =>
                          setEditableHiddenWords(
                            e.target.value.split(',').map((w) => w.trim()).filter(Boolean)
                          )
                        }
                        placeholder="exemplo, palavra, teste"
                        className="w-full bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      As palavras serão substituídas por █ no texto
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Barra de ação */}
            <div className="px-4 pb-4">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
                Abrir no Instagram
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}