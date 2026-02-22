"use client"

import React, { useState, forwardRef } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  phone: string
}

type ContactFormProps = {
  onSuccess?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContactFormInner = ({ onSuccess }: ContactFormProps, ref: React.Ref<HTMLInputElement>) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [phoneValue, setPhoneValue] = useState('')

  // Функция для форматирования номера телефона
  const formatPhoneInput = (value: string) => {
    // Убираем все нецифровые символы
    const numbers = value.replace(/\D/g, '')
    
    // Ограничиваем до 10 цифр
    const limitedNumbers = numbers.slice(0, 10)
    
    // Форматируем: 9XX XXX XX XX
    if (limitedNumbers.length <= 3) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 6) {
      return `${limitedNumbers.slice(0, 3)} ${limitedNumbers.slice(3)}`
    } else if (limitedNumbers.length <= 8) {
      return `${limitedNumbers.slice(0, 3)} ${limitedNumbers.slice(3, 6)} ${limitedNumbers.slice(6)}`
    } else {
      return `${limitedNumbers.slice(0, 3)} ${limitedNumbers.slice(3, 6)} ${limitedNumbers.slice(6, 8)} ${limitedNumbers.slice(8)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value)
    setPhoneValue(formatted)
  }

  const onSubmit = async (data: FormData) => {
    try {
      // Очищаем номер телефона от форматирования для отправки
      const cleanPhone = data.phone.replace(/\D/g, '')
      
      // Отправляем в Telegram
      const telegramRes = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: cleanPhone,
        })
      })

      if (!telegramRes.ok) {
        const body = await telegramRes.json().catch(() => ({}))
        console.error('[ContactForm] Telegram send failed', {
          status: telegramRes.status,
          body,
        })
        throw new Error('Ошибка отправки в Telegram')
      }

      // Также сохраняем в локальную базу данных (опционально)
      try {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            phone: cleanPhone // Отправляем очищенный номер и в БД
          })
        })
      } catch (err) {
        console.error('[ContactForm] Lead save failed', err)
      }

      setIsSuccess(true)
      reset()
      setPhoneValue('') // Сбрасываем значение телефона
      // даём пользователю увидеть уведомление и даём возможность модальному окну закрыться
      setTimeout(() => setIsSuccess(false), 3000)
      // уведомляем внешний компонент (например, модал) через callback
      if (onSuccess) setTimeout(() => onSuccess(), 800)
    } catch (err) {
      console.error('[ContactForm] Submit error', err)
      setIsError(true)
      setTimeout(() => setIsError(false), 4000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-5 md:hover:shadow-2xl transition-all duration-500">
      <h2 className="text-xl sm:text-2xl md:text-lg lg:text-xl font-bold mb-4 sm:mb-6 md:mb-4 text-center">Запишись на бесплатную консультацию</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        {/* Имя */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Имя</label>
          <input
            {...register('name', { 
              required: 'Пожалуйста, введите ваше имя',
              minLength: {
                value: 2,
                message: 'Имя должно содержать минимум 2 символа'
              },
              pattern: {
                value: /^[а-яёА-ЯЁa-zA-Z\s-]+$/,
                message: 'Имя может содержать только буквы, пробелы и дефисы'
              }
            })}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-yellow-500 focus:shadow-lg transition-all duration-300`}
            placeholder="Ваше имя"
            aria-label="Имя"
          />
          {errors.name && (
            <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Телефон */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Телефон</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-xs sm:text-sm">+7</span>
            </div>
            <input
              {...register('phone', {
                required: 'Пожалуйста, введите ваш телефон',
                validate: {
                  format: (value) => {
                    // Убираем все нецифровые символы для проверки
                    const cleanValue = value.replace(/\D/g, '')
                    // Проверяем, что номер начинается с 9, 8 или 4 и содержит 10 цифр
                    if (cleanValue.length !== 10) {
                      return 'Номер должен содержать 10 цифр'
                    }
                    if (!/^[489]/.test(cleanValue)) {
                      return 'Номер должен начинаться с 9, 8 или 4'
                    }
                    return true
                  }
                }
              })}
              value={phoneValue}
              onChange={handlePhoneChange}
              className={`w-full pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border text-sm sm:text-base ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:border-yellow-500 focus:shadow-lg transition-all duration-300`}
              placeholder="9XX XXX XX XX"
              maxLength={15}
            />
          </div>
          <p className="mt-1 text-xs text-gray-600">
            Введите номер без +7, начиная с 9 (например: 912 345 67 89)
          </p>
          {errors.phone && (
            <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>


        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-yellow-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-base relative overflow-hidden transition-all duration-300 ${
            isSubmitting ? 'opacity-70' : 'md:hover:bg-yellow-600 md:hover:scale-105 md:hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Отправка...
            </span>
          ) : (
            'Отправить'
          )}
        </button>
      </form>

      {/* Уведомление об успешной отправке */}
      {isSuccess && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto bg-green-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg animate-slide-up text-sm sm:text-base">
          Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      {/* Уведомление об ошибке */}
      {isError && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto bg-red-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg animate-slide-up text-sm sm:text-base">
          Ошибка отправки. Попробуйте позже.
        </div>
      )}

      <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm text-center">
        Нажимая на кнопку, вы даёте согласие на обработку персональных данных
      </p>
    </div>
  )
}

const ContactForm = forwardRef(ContactFormInner)
ContactForm.displayName = 'ContactForm'

export default ContactForm