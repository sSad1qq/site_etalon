"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import VKVideoPlayer from './VKVideoPlayer'

interface VKVideo {
  oid: string
  id: string
}

interface Testimonial {
  id: number
  name: string
  role: string
  subject: string
  scores: string
  quote: string
  avatar: string
  vkVideo: VKVideo | null
}

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<{ oid: string; id: string } | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(new Set())
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const openVideo = (oid: string, id: string) => setActiveVideo({ oid, id })
  const closeVideo = () => setActiveVideo(null)
  
  const toggleExpand = (testimonialId: number) => {
    setExpandedTestimonials(prev => {
      const newSet = new Set(prev)
      if (newSet.has(testimonialId)) {
        newSet.delete(testimonialId)
      } else {
        newSet.add(testimonialId)
      }
      return newSet
    })
  }
  
  const MAX_LENGTH = 200 // Максимальная длина сокращенного текста

  const testimonials: Testimonial[] = [
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

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('left')
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
    setTimeout(() => {
      setIsTransitioning(false)
      setDirection(null)
    }, 800)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('right')
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
    setTimeout(() => {
      setIsTransitioning(false)
      setDirection(null)
    }, 800)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setDirection(index > currentIndex ? 'right' : 'left')
    setCurrentIndex(index)
    setTimeout(() => {
      setIsTransitioning(false)
      setDirection(null)
    }, 800)
  }

  const getVisibleIndices = () => {
    const indices = []
    // Показываем: предыдущее, текущее, следующее
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i
      if (index < 0) {
        index = testimonials.length + index
      } else if (index >= testimonials.length) {
        index = index - testimonials.length
      }
      indices.push({ index, position: i + 1 }) // position: 0 = left, 1 = center, 2 = right
    }
    return indices
  }

  // Отслеживание скролла на мобильной версии
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const updateIndex = () => {
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2
      
      // Находим все карточки
      const cards = container.querySelectorAll('[data-card-index]')
      let closestIndex = 0
      let closestDistance = Infinity
      
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(cardCenter - containerCenter)
        
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = parseInt(card.getAttribute('data-card-index') || '0')
        }
      })
      
      setMobileScrollIndex(closestIndex)
    }

    // Обработчик скролла с throttling
    let rafId: number | null = null
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateIndex()
          rafId = null
        })
      }
    }

    // Обработчик изменения размера окна
    const onResize = () => {
      updateIndex()
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    // Используем scrollend если доступно, иначе fallback на scroll
    if ('onscrollend' in container) {
      container.addEventListener('scrollend', updateIndex, { passive: true })
    }
    window.addEventListener('resize', onResize)
    
    // Инициализация
    updateIndex()
    const timeoutId = setTimeout(updateIndex, 200)

    return () => {
      container.removeEventListener('scroll', onScroll)
      if ('onscrollend' in container) {
        container.removeEventListener('scrollend', updateIndex)
      }
      window.removeEventListener('resize', onResize)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      clearTimeout(timeoutId)
    }
  }, [testimonials.length])

  return (
    <section className="section-padding bg-gradient-to-b from-yellow-50 to-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mb-4 md:mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Отзывы выпускников
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Читайте реальные отзывы наших учеников и их родителей
          </p>
        </div>

        {/* Карусель */}
        <div className="relative">
          {/* Кнопка влево - десктоп */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-yellow-200/50 group"
            aria-label="Предыдущий отзыв"
          >
            <svg 
              className="w-6 h-6 text-yellow-600 group-hover:text-yellow-700 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Кнопка вправо - десктоп */}
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-yellow-200/50 group"
            aria-label="Следующий отзыв"
          >
            <svg 
              className="w-6 h-6 text-yellow-600 group-hover:text-yellow-700 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Мобильная версия - горизонтальный скролл */}
          <div className="md:hidden relative">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide" 
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`mobile-${index}`}
                    data-card-index={index}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                  >
                    <div
                      className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[400px]"
                      onClick={() => {
                        if (testimonial.vkVideo) {
                          openVideo(testimonial.vkVideo.oid, testimonial.vkVideo.id)
                        }
                      }}
                      role={testimonial.vkVideo ? "button" : undefined}
                    >
                      {/* Видео-превью секция */}
                      {testimonial.vkVideo && (
                        <div className="relative aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 transition-all duration-500 rounded-t-3xl flex-shrink-0">
                          <div className="absolute inset-0 bg-black bg-opacity-20 transition-all duration-300 rounded-t-3xl"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                <span className="text-2xl">▶️</span>
                              </div>
                              <p className="text-base font-bold mb-1">Видео-отзыв</p>
                              <p className="text-xs opacity-90">Нажмите для просмотра</p>
                            </div>
                          </div>
                          {testimonial.scores && (
                            <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                              {testimonial.scores.split('•')[0].trim()}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Контент секция */}
                      <div className="flex flex-col p-4 flex-grow">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-gray-900">{testimonial.name}</h3>
                            <p className="text-yellow-600 font-bold text-xs">{testimonial.role}</p>
                          </div>
                        </div>

                        {testimonial.scores && !testimonial.vkVideo && (
                          <div className="bg-yellow-50 rounded-xl p-2.5 mb-3">
                            <p className="text-xs font-bold text-gray-900">{testimonial.scores}</p>
                          </div>
                        )}

                        <div className="text-xs text-gray-600 font-semibold mb-3">
                          {testimonial.subject}
                        </div>

                        <div className="mb-3 flex-grow">
                          <blockquote className="text-sm text-gray-700 leading-relaxed">
                            {(() => {
                              const isExpanded = expandedTestimonials.has(testimonial.id)
                              const isLong = testimonial.quote.length > MAX_LENGTH
                              
                              if (!isLong || isExpanded) {
                                return testimonial.quote
                              }
                              
                              const truncated = testimonial.quote.substring(0, MAX_LENGTH)
                              const lastSpace = truncated.lastIndexOf(' ')
                              const cutPoint = lastSpace > 0 ? lastSpace : MAX_LENGTH
                              
                              return (
                                <>
                                  {testimonial.quote.substring(0, cutPoint)}
                                  <span className="text-yellow-600">...</span>
                                </>
                              )
                            })()}
                          </blockquote>
                          
                          {testimonial.quote.length > MAX_LENGTH && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleExpand(testimonial.id)
                              }}
                              className="mt-2 text-yellow-600 hover:text-yellow-700 font-bold text-xs flex items-center space-x-1 transition-colors"
                            >
                              <span>
                                {expandedTestimonials.has(testimonial.id) ? 'Свернуть' : 'Развернуть'}
                              </span>
                              <span className={`transform transition-transform duration-300 ${expandedTestimonials.has(testimonial.id) ? 'rotate-180' : ''}`}>
                                ▼
                              </span>
                            </button>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex text-yellow-500 text-base">{'★'.repeat(5)}</div>
                          <div className="text-xs text-gray-500 font-semibold">
                            {new Date().getFullYear()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Индикаторы-точки внизу */}
            <div className="flex justify-center gap-2 mt-4 px-4">
              {testimonials.map((_, index) => (
                <div
                  key={`indicator-${index}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === mobileScrollIndex 
                      ? 'bg-yellow-500 w-6 scale-110' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Десктопная версия - Cover Flow стиль */}
          <div 
            className="hidden md:flex items-center justify-center relative overflow-visible"
            style={{
              perspective: '1200px',
              perspectiveOrigin: 'center center',
              minHeight: '600px',
              padding: '0 200px'
            }}
          >
            {getVisibleIndices().map(({ index, position }) => {
              const testimonial = testimonials[index]
              const isCenter = position === 1
              const isLeft = position === 0
              const isRight = position === 2
              
              // iPod Cover Flow стиль - 3D трансформации
              const getCoverFlowStyle = () => {
                if (isCenter) {
                  // Центральная карточка - крупная, прямая, впереди
                  return {
                    transform: 'translate(-50%, -50%) rotateY(0deg) translateZ(0px) scale(1)',
                    zIndex: 10,
                    opacity: 1,
                    width: 'auto',
                    maxWidth: '500px'
                  }
                } else if (isLeft) {
                  // Левая карточка - повернута влево, меньше, дальше
                  return {
                    transform: 'translate(-50%, -50%) rotateY(50deg) translateX(-280px) translateZ(-250px) scale(0.6)',
                    zIndex: 1,
                    opacity: 0.5,
                    width: 'auto',
                    maxWidth: '300px'
                  }
                } else if (isRight) {
                  // Правая карточка - повернута вправо, меньше, дальше
                  return {
                    transform: 'translate(-50%, -50%) rotateY(-50deg) translateX(280px) translateZ(-250px) scale(0.6)',
                    zIndex: 1,
                    opacity: 0.5,
                    width: 'auto',
                    maxWidth: '300px'
                  }
                }
                return {}
              }
              
              const coverFlowStyle = getCoverFlowStyle()
              
              return (
                <div
                  key={`${index}-${currentIndex}-${position}`}
                  onClick={() => !isCenter && goToSlide(index)}
                  className={`
                    absolute transition-all ease-in-out
                    ${isCenter ? 'cursor-default' : 'cursor-pointer'}
                    ${!isCenter ? 'hover:opacity-80' : ''}
                  `}
                  style={{
                    ...coverFlowStyle,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'center center'
                  }}
                >
                  <div
                    className={`bg-white rounded-[2rem] shadow-2xl overflow-hidden glow-effect group flex flex-col ${testimonial.vkVideo ? 'cursor-pointer' : ''}`}
                    style={{
                      maxWidth: isCenter ? '500px' : '300px',
                      width: 'fit-content'
                    }}
                    onClick={(e) => {
                      if (isCenter && testimonial.vkVideo) {
                        e.stopPropagation()
                        openVideo(testimonial.vkVideo.oid, testimonial.vkVideo.id)
                      }
                    }}
                    role={isCenter && testimonial.vkVideo ? "button" : undefined}
                  >
                    {/* Видео-превью секция */}
                    {testimonial.vkVideo && (
                      <div className="relative aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 transition-all duration-500 rounded-t-[2rem]">
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
                    <div className={`p-8 flex flex-col h-full ${isCenter ? 'min-h-[500px]' : 'min-h-[400px]'}`}>
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

                      <div className="flex-grow mb-4">
                        <blockquote className="text-gray-700 leading-relaxed">
                          {(() => {
                            const isExpanded = expandedTestimonials.has(testimonial.id)
                            const isLong = testimonial.quote.length > MAX_LENGTH
                            
                            if (!isLong || isExpanded) {
                              return testimonial.quote
                            }
                            
                            // Обрезаем текст до последнего пробела перед MAX_LENGTH
                            const truncated = testimonial.quote.substring(0, MAX_LENGTH)
                            const lastSpace = truncated.lastIndexOf(' ')
                            const cutPoint = lastSpace > 0 ? lastSpace : MAX_LENGTH
                            
                            return (
                              <>
                                {testimonial.quote.substring(0, cutPoint)}
                                <span className="text-yellow-600">...</span>
                              </>
                            )
                          })()}
                        </blockquote>
                        
                        {testimonial.quote.length > MAX_LENGTH && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleExpand(testimonial.id)
                            }}
                            className="mt-3 text-yellow-600 hover:text-yellow-700 font-bold text-sm flex items-center space-x-1 group transition-colors"
                          >
                            <span>
                              {expandedTestimonials.has(testimonial.id) ? 'Свернуть' : 'Развернуть'}
                            </span>
                            <span className={`transform transition-transform duration-300 ${expandedTestimonials.has(testimonial.id) ? 'rotate-180' : ''}`}>
                              ▼
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex text-yellow-500 text-lg">{'★'.repeat(5)}</div>
                        <div className="text-sm text-gray-500 font-semibold">
                          {new Date().getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Индикатор центральной карточки */}
                  {isCenter && (
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-yellow-600">
                        {index + 1} / {testimonials.length}
                      </span>
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Индикаторы внизу - только для десктопа */}
          <div className="hidden md:flex justify-center gap-2 mt-16 flex-wrap">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? 'bg-yellow-500 w-8 scale-110' 
                    : 'bg-gray-300 hover:bg-yellow-300 active:scale-90'
                  }
                `}
                aria-label={`Перейти к отзыву ${index + 1}`}
              />
            ))}
          </div>
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

        {/* Блок ВКонтакте и Яндекс */}
        <div className="mt-16 md:mt-28 text-center px-4">
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-3xl md:rounded-[2rem] shadow-xl p-6 md:p-8 max-w-3xl mx-auto hover-lift">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4">
              Больше отзывов в нашей группе ВКонтакте и на Яндексе
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6">
              Присоединяйтесь к нашему сообществу, читайте отзывы учеников и родителей, следите за новостями и акциями центра
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="https://vk.com/repetitor_penza_etalon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base"
              >
                <img src="/vk.png" alt="ВКонтакте" className="w-5 h-5 md:w-6 md:h-6 brightness-0 invert" />
                <span>ВКонтакте</span>
              </a>
              <a
                href="https://yandex.ru/profile/154840463548"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base"
              >
                <img src="/yandex.png" alt="Яндекс" className="w-5 h-5 md:w-6 md:h-6 brightness-0 invert" />
                <span>Яндекс</span>
              </a>
            </div>
          </div>
        </div>


        {/* CTA с анимацией */}
        <div className="text-center mt-12 md:mt-20 px-4">
          <div className="bg-gradient-to-r from-yellow-50 to-white rounded-3xl md:rounded-[2rem] shadow-2xl p-6 md:p-12 max-w-5xl mx-auto relative overflow-hidden animate-zoom-in hover-lift">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4 md:mb-6">
              Станьте следующим успешным выпускником!
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Присоединяйтесь к тысячам учеников, которые уже достигли своих целей с нами
            </p>
            <div className="flex justify-center">
              <Link
                href="/contacts"
                className="btn-primary btn-magic text-sm sm:text-base md:text-lg px-8 md:px-12 py-3 md:py-4 flex items-center justify-center space-x-2 md:space-x-3"
              >
                <span>Записаться</span>
                <span className="group-hover:animate-wiggle">🎯</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}