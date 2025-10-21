"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function VideoTestimonials() {
  const [activeUrl, setActiveUrl] = useState<string | null>(null)
  const openVideo = (url: string) => setActiveUrl(url)
  const closeVideo = () => setActiveUrl(null)
  const testimonials = [
    {
      id: 1,
      name: "Анна Смирнова",
      subject: "Математика",
      score: 98,
      university: "МГУ",
      videoId: "dQw4w9WgXcQ",
  quote: '«Благодаря центру „Эталон“ я поступила в МГУ! Преподаватели объясняют очень понятно.»',
      avatar: "AS"
    },
    {
      id: 2,
      name: "Дмитрий Козлов",
      subject: "Физика",
      score: 96,
      university: "МФТИ",
      videoId: "dQw4w9WgXcQ",
  quote: '«Отличная подготовка! Мини-группы позволяют получить максимум внимания.»',
      avatar: "ДК"
    },
    {
      id: 3,
      name: "Елена Петрова",
      subject: "Русский язык",
      score: 100,
      university: "ВШЭ",
      videoId: "dQw4w9WgXcQ",
  quote: '«100 баллов по русскому языку! Спасибо за качественную подготовку.»',
      avatar: "ЕП"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-yellow-50 to-white relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-20 left-20 text-7xl opacity-10 animate-float">🎥</div>
      <div className="absolute bottom-20 right-20 text-6xl opacity-10 animate-float-slow">⭐</div>
      <div className="absolute top-1/2 right-10 text-5xl opacity-10 animate-float">🎓</div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Отзывы выпускников
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Послушайте истории успеха наших учеников и их родителей
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center items-start">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              role="button"
              onClick={() => openVideo(`https://rutube.ru/video/${testimonial.videoId}`)}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden hover-lift glow-effect group animate-zoom-in card-container cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Видео секция */}
              <div className="relative aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 group-hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                      <span className="text-3xl group-hover:animate-wiggle">▶️</span>
                    </div>
                    <p className="text-lg font-bold mb-2">Видео-отзыв</p>
                    <p className="text-sm opacity-90">Нажмите для просмотра</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                  {testimonial.score} баллов
                </div>
              </div>

              {/* Контент секция */}
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-black text-xl group-hover:animate-wiggle">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{testimonial.name}</h3>
                    <p className="text-yellow-600 font-bold">{testimonial.subject}</p>
                    <p className="text-sm text-gray-600 font-semibold">{testimonial.university}</p>
                  </div>
                </div>

                <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-500 text-lg">{'★'.repeat(5)}</div>
                  <div className="text-sm text-gray-500 font-semibold">
                    Выпускник {new Date().getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal для видео */}
        {activeUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={closeVideo}>
            <div className="w-full max-w-4xl mx-auto p-4" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="aspect-video">
                  <iframe src={activeUrl} title="Видео отзыв" className="w-full h-full" allowFullScreen />
                </div>
                <div className="p-4 text-right">
                  <button onClick={closeVideo} className="btn-secondary px-4 py-2">Закрыть</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Дополнительная статистика */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center justify-items-center">
          {[
            { number: "4.9", label: "средний рейтинг", icon: "⭐", color: "text-yellow-600" },
            { number: "98%", label: "рекомендуют нас", icon: "👍", color: "text-yellow-600" },
            { number: "1000+", label: "отзывов", icon: "💬", color: "text-yellow-600" },
            { number: "95%", label: "поступают в вузы", icon: "🎓", color: "text-yellow-600" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl hover-lift animate-zoom-in card-container"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-4 animate-bounce-in">{stat.icon}</div>
              <div className={`text-4xl font-black ${stat.color} mb-3 animate-pulse-glow`}>
                {stat.number}
              </div>
              <div className="text-gray-700 font-bold text-lg">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA с анимацией */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-yellow-50 to-white rounded-3xl shadow-2xl p-12 max-w-5xl mx-auto relative overflow-hidden animate-zoom-in">
            <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Станьте следующим успешным выпускником!
            </h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Присоединяйтесь к тысячам учеников, которые уже достигли своих целей с нами
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contacts"
                className="btn-primary btn-magic text-lg px-12 py-4 flex items-center justify-center space-x-3"
              >
                <span>Записаться на пробное занятие</span>
                <span className="group-hover:animate-wiggle">🎯</span>
              </Link>

              <button className="btn-secondary hover-glow text-lg px-12 py-4 group">
                <span className="flex items-center space-x-3">
                  <span>Посмотреть все отзывы</span>
                  <span className="group-hover:animate-wiggle">📺</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}