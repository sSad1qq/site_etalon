"use client"

import React, { useState, forwardRef } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  phone: string
  email: string
  subject: string
  message: string
  grade: string
  preferredTime: string
}

type ContactFormProps = {
  onSuccess?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContactFormInner = ({ onSuccess }: ContactFormProps, ref: React.Ref<HTMLInputElement>) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>()
  const [isSuccess, setIsSuccess] = useState(false)
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
          ...data,
          phone: cleanPhone, // Отправляем очищенный номер
          adminChatId: process.env.NEXT_PUBLIC_TELEGRAM_ADMIN_CHAT_ID,
          botToken: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN,
        })
      })

      if (!telegramRes.ok) {
        const telegramError = await telegramRes.json()
        console.error('Telegram error:', telegramError)
        throw new Error('Ошибка отправки в Telegram')
      }

      // Также сохраняем в локальную базу данных (опционально)
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '/api/lead'
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            phone: cleanPhone // Отправляем очищенный номер и в БД
          })
        })
      } catch (dbError) {
        console.warn('Ошибка сохранения в БД:', dbError)
        // Не блокируем успешную отправку в Telegram
      }

      setIsSuccess(true)
      reset()
      setPhoneValue('') // Сбрасываем значение телефона
      // даём пользователю увидеть уведомление и даём возможность модальному окну закрыться
      setTimeout(() => setIsSuccess(false), 3000)
      // уведомляем внешний компонент (например, модал) через callback
      if (onSuccess) setTimeout(() => onSuccess(), 800)
    } catch (error) {
      console.error('Ошибка при отправке формы:', error)
      alert('Ошибка отправки. Попробуйте позже.')
    }
  }

  const subjects = [
    'Математика',
    'Русский язык',
    'Физика',
    'Химия',
    'Информатика',
    'Английский язык',
    'История',
    'Обществознание',
  ]

  const grades = ['9 класс', '10 класс', '11 класс']
  const times = ['Утро', 'День', 'Вечер', 'Не важно']

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-lg p-8 hover:shadow-2xl transition-all duration-500">
      <h2 className="text-2xl font-bold mb-6 text-center">Запишись на бесплатную консультацию</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Имя */}
        <div>
          <label className="block text-sm font-medium mb-2">Имя</label>
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
            className={`w-full px-4 py-3 rounded-2xl border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-yellow-500 focus:shadow-lg transition-all duration-300`}
            placeholder="Ваше имя"
            aria-label="Имя"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Телефон */}
        <div>
          <label className="block text-sm font-medium mb-2">Телефон</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm">+7</span>
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
              className={`w-full pl-8 pr-4 py-3 rounded-2xl border ${
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
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            {...register('email', {
              required: 'Пожалуйста, введите ваш email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Пожалуйста, введите корректный email'
              }
            })}
            className={`w-full px-4 py-3 rounded-2xl border ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-yellow-500 focus:shadow-lg transition-all duration-300`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Предмет */}
        <div>
          <label className="block text-sm font-medium mb-2">Предмет</label>
          <select
            {...register('subject', { required: 'Пожалуйста, выберите предмет' })}
            className={`w-full px-4 py-3 rounded-2xl border ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-yellow-500 focus:shadow-lg transition-all duration-300`}
          >
            <option value="">Выберите предмет</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Класс */}
        <div>
          <label className="block text-sm font-medium mb-2">Класс</label>
          <select
            {...register('grade', { required: 'Пожалуйста, выберите класс' })}
            className={`w-full px-4 py-3 rounded-2xl border ${
              errors.grade ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:border-yellow-500 focus:shadow-lg transition-all duration-300`}
          >
            <option value="">Выберите класс</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          {errors.grade && (
            <p className="mt-1 text-sm text-red-500">{errors.grade.message}</p>
          )}
        </div>

        {/* Удобное время */}
        <div>
          <label className="block text-sm font-medium mb-2">Удобное время для занятий</label>
          <select
            {...register('preferredTime')}
            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:border-yellow-500 focus:shadow-lg transition-all duration-300"
          >
            <option value="">Выберите удобное время</option>
            {times.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        {/* Сообщение */}
        <div>
          <label className="block text-sm font-medium mb-2">Сообщение (необязательно)</label>
          <textarea
            {...register('message')}
            className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:border-yellow-500 focus:shadow-lg transition-all duration-300"
            rows={4}
            placeholder="Ваше сообщение..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-yellow-500 text-white py-4 rounded-2xl font-medium relative overflow-hidden transition-all duration-300 ${
            isSubmitting ? 'opacity-70' : 'hover:bg-yellow-600 hover:scale-105 hover:shadow-xl'
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
            'Записаться на консультацию'
          )}
        </button>
      </form>

      {/* Уведомление об успешной отправке */}
      {isSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg animate-slide-up">
          Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      <p className="mt-4 text-gray-600 text-sm text-center">
        Нажимая на кнопку, вы даёте согласие на обработку персональных данных
      </p>
    </div>
  )
}

const ContactForm = forwardRef(ContactFormInner)
ContactForm.displayName = 'ContactForm'

export default ContactForm