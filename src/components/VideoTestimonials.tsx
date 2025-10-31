"use client"

import { useState } from 'react'
import Link from 'next/link'
import VKVideoPlayer from './VKVideoPlayer'

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<{ oid: string; id: string } | null>(null)
  const openVideo = (oid: string, id: string) => setActiveVideo({ oid, id })
  const closeVideo = () => setActiveVideo(null)

  const testimonials = [
    {
      id: 1,
      name: "Юлия Дятлова",
      role: "Мама выпускника",
      subject: "Информатика, Математика, Русский язык",
      scores: "Информатика: 93 • Математика: 76 • Русский язык: 78",
      quote: 'Здравствуйте! Хочу выразить благодарность центру подготовки к ЕГЭ и ОГЭ "Эталон". Наш результат ЕГЭ по информатике 93 балла. Огромное спасибо нашему репетитору Мышенкову Никите за его вклад в подготовку моего сына, за его знания, которые он ему передал, за его умение, ко всем найти свой подход, объединить всех в команду. Нам с вами было легко, интересно и результативно сотрудничать!!! Также огромное спасибо всему преподовательскому составу центра "Эталон", а именно Вере Валерьевне (математика профильная 76 баллов), Вере Николаевне (русский язык 78 баллов), это настоящие профессионалы своего дела!!! Всегда вас рекомендую знакомым!!! Вы лучшие👍👍👍',
      avatar: "ЮД",
      vkVideo: null
    },
    {
      id: 2,
      name: "Никита Назаров",
      role: "Выпускник",
      subject: "Подготовка к ЕГЭ",
      scores: "",
      quote: 'Центр Эталон оставил только положительные эмоции, индивидуальный подход к каждому ученику дает понимание, что цель преподавателя в первую очередь научить, а не заработать. Учителя общаются с учениками на равных, что создает комфортную атмосферу для обучения...',
      avatar: "НН",
      vkVideo: null
    },
    {
      id: 3,
      name: "Кирилл Венедиктов",
      role: "Выпускник",
      subject: "Математика, Информатика, Физика",
      scores: "Результаты: 80-90 баллов",
      quote: 'Огромное спасибо центру подготовки к экзаменам «Эталон», а именно гениальному преподавателю по математике и информатике Никите Мышенкову и мудрому преподавателю по физике Михаилу Нагаеву. Они вложили в меня все свои усилия и знания, с которыми невозможно было набрать меньше 80 баллов, а то и 90. Советую всем присоединяться к данному коллективу, готовиться с ними к ЕГЭ и ОГЭ и успешно сдать все свои экзамены!',
      avatar: "КВ",
      vkVideo: null
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
            Читайте реальные отзывы наших учеников и их родителей
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center items-stretch">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-[2rem] shadow-2xl overflow-hidden hover-lift glow-effect group animate-zoom-in card-container flex flex-col ${testimonial.vkVideo ? 'cursor-pointer' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => testimonial.vkVideo && openVideo(testimonial.vkVideo.oid, testimonial.vkVideo.id)}
              role={testimonial.vkVideo ? "button" : undefined}
            >
              {/* Видео-превью секция */}
              {testimonial.vkVideo && (
                <div className="relative aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 group-hover:scale-105 transition-all duration-500 rounded-t-[2rem]">
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 rounded-t-[2rem]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow shadow-lg">
                        <span className="text-3xl group-hover:animate-wiggle">▶️</span>
                      </div>
                      <p className="text-lg font-bold mb-2">Видео-отзыв</p>
                      <p className="text-sm opacity-90">Нажмите для просмотра</p>
                    </div>
                  </div>
                  {testimonial.scores && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {testimonial.scores.split('•')[0].trim()}
                    </div>
                  )}
                </div>
              )}

              {/* Контент секция */}
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-black text-xl group-hover:animate-wiggle flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{testimonial.name}</h3>
                    <p className="text-yellow-600 font-bold text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {testimonial.scores && !testimonial.vkVideo && (
                  <div className="bg-yellow-50 rounded-xl p-3 mb-4">
                    <p className="text-sm font-bold text-gray-900">{testimonial.scores}</p>
                  </div>
                )}

                <div className="text-sm text-gray-600 font-semibold mb-4">
                  {testimonial.subject}
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-6 flex-grow line-clamp-6">
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex text-yellow-500 text-lg">{'★'.repeat(5)}</div>
                  <div className="text-sm text-gray-500 font-semibold">
                    {new Date().getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal для видео */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4" onClick={closeVideo}>
            <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                <VKVideoPlayer oid={activeVideo.oid} id={activeVideo.id} autoplay={true} />
                <div className="p-6 flex justify-between items-center">
                  <p className="text-gray-700 font-semibold">Видео-отзыв</p>
                  <button 
                    onClick={closeVideo} 
                    className="btn-secondary px-6 py-2 text-sm hover-glow"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Блок ВКонтакте */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-[2rem] shadow-xl p-8 max-w-3xl mx-auto hover-lift">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                📱
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4">
              Больше отзывов в нашей группе ВКонтакте
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Присоединяйтесь к нашему сообществу, читайте отзывы учеников и родителей, следите за новостями и акциями центра
            </p>
            <a
              href="https://vk.com/repetitor_penza_etalon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.63c-.21.45-.81.85-1.74.85-.88 0-1.75-.25-2.5-.88-.88-.74-1.66-1.81-2.42-2.81-.26-.35-.51-.68-.77-.95-.6.9-1.26 1.74-1.95 2.42-.88.86-1.81 1.29-2.65 1.22-.63-.05-1.12-.42-1.37-1.05-.42-1.05.07-2.46 1.39-3.98.42-.49.88-.95 1.35-1.35-.77-.39-1.46-.95-1.95-1.63-.42-.58-.63-1.22-.56-1.81.07-.53.35-.95.81-1.22.95-.56 2.39-.18 3.91 1.08.53.44 1.05.95 1.53 1.53.49-.58 1.01-1.08 1.53-1.53 1.53-1.26 2.96-1.64 3.91-1.08.46.28.74.7.81 1.22.07.6-.14 1.23-.56 1.81-.49.68-1.19 1.23-1.95 1.63.46.39.93.86 1.35 1.35 1.32 1.53 1.81 2.93 1.39 3.98z"/>
              </svg>
              <span>Перейти в группу ВКонтакте</span>
            </a>
          </div>
        </div>

        {/* Дополнительная статистика */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center justify-items-center">
          {[
            { number: "4.9", label: "средний рейтинг", icon: "⭐", color: "text-yellow-600" },
            { number: "98%", label: "рекомендуют нас", icon: "👍", color: "text-yellow-600" },
            { number: "1000+", label: "отзывов", icon: "💬", color: "text-yellow-600" },
            { number: "95%", label: "поступают в вузы", icon: "🎓", color: "text-yellow-600" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-xl hover-lift animate-zoom-in card-container glow-effect"
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
          <div className="bg-gradient-to-r from-yellow-50 to-white rounded-[2rem] shadow-2xl p-12 max-w-5xl mx-auto relative overflow-hidden animate-zoom-in hover-lift">
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

              <Link
                href="/contacts"
                className="btn-secondary hover-glow text-lg px-12 py-4 group"
              >
                <span className="flex items-center space-x-3">
                  <span>Связаться с нами</span>
                  <span className="group-hover:animate-wiggle">💬</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}