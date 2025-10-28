"use client"

import { useEffect, useRef, useState } from 'react'
import ContactForm from './ContactForm'

export default function TestSignupCTA() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const firstInputRef = useRef<HTMLInputElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open) {
      // переносим фокус на первое поле формы
      setTimeout(() => firstInputRef.current?.focus(), 50)

      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
        if (e.key === 'Tab' && modalRef.current) {
          // базовый focus-trap: если tab уводит фокус за модал — оставляем в модале
          const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, a, input, textarea, select')
          if (focusable.length === 0) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus()
          } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus()
          }
        }
      }

      document.addEventListener('keydown', onKey)
      return () => document.removeEventListener('keydown', onKey)
    } else {
      // вернуть фокус триггеру
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <a
          href="/contacts"
          className="btn-primary btn-magic text-lg px-12 py-4 inline-flex items-center justify-center"
        >
          <span className="flex items-center space-x-3">
            <span>Перейти в Контакты</span>
            <span>📝</span>
          </span>
        </a>

        <a href="tel:+7" className="btn-secondary hover-glow text-lg px-12 py-4 inline-flex items-center justify-center">
          <span className="flex items-center space-x-3">
            <span>Позвонить нам</span>
            <span>📞</span>
          </span>
        </a>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

          <div ref={modalRef} className="relative max-w-2xl w-full bg-white rounded-[2rem] shadow-xl p-6 z-10 hover:shadow-2xl transition-all duration-300">
            <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 hover:scale-110 transition-all duration-200" onClick={() => setOpen(false)} aria-label="Закрыть">✕</button>

            <h3 className="text-xl font-bold mb-3">Бесплатная консультация и тестирование</h3>
            <p className="text-sm text-gray-600 mb-4">Заполните форму — мы свяжемся и назначим удобное время.</p>

            <ContactForm onSuccess={() => setOpen(false)} ref={firstInputRef} />
          </div>
        </div>
      )}
    </div>
  )
}
