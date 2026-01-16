"use client"

import { useState, useRef, useEffect } from 'react'

interface VKClip {
  id: number
  oid: string
  videoId: string
}

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<{ oid: string; id: string } | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  const openVideo = (oid: string, id: string) => setActiveVideo({ oid, id })
  const closeVideo = () => setActiveVideo(null)

  // ИНСТРУКЦИЯ: Как добавить ВК-клип
  // 1. Скопируйте ссылку на клип, например: https://vk.com/clip-227920545_456239017
  // 2. oid = "-227920545" (с минусом для групп), videoId = "456239017"
  // 3. Добавьте объект: { id: N, oid: "-227920545", videoId: "456239017" }
  
  const clips: VKClip[] = [
    { id: 1, oid: "-168285680", videoId: "456239191" },
    { id: 2, oid: "-168285680", videoId: "456239185" },
    { id: 3, oid: "-168285680", videoId: "456239182" },
    { id: 4, oid: "-168285680", videoId: "456239180" },
    { id: 5, oid: "-168285680", videoId: "456239175" },
    { id: 6, oid: "-168285680", videoId: "456239169" },
    { id: 7, oid: "-168285680", videoId: "456239167" },
    { id: 8, oid: "-168285680", videoId: "456239164" },
    { id: 9, oid: "-168285680", videoId: "456239158" },
  ]

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? clips.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => 
      prevIndex === clips.length - 1 ? 0 : prevIndex + 1
    )
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const getVisibleIndices = () => {
    const indices = []
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i
      if (index < 0) index = clips.length + index
      else if (index >= clips.length) index = index - clips.length
      indices.push({ index, position: i + 1 })
    }
    return indices
  }

  // Создаём утроенный массив для бесконечного скролла
  const infiniteClips = [...clips, ...clips, ...clips]

  // Отслеживание скролла на мобильной версии с бесконечной прокруткой
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Устанавливаем начальную позицию на средний набор
    const setInitialPosition = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length > 0) {
        const firstMiddleCard = cards[clips.length] as HTMLElement
        if (firstMiddleCard) {
          const containerWidth = container.offsetWidth
          const cardWidth = firstMiddleCard.offsetWidth
          const scrollPos = firstMiddleCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2)
          container.scrollLeft = scrollPos
        }
      }
    }

    const updateIndex = () => {
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2
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
      // Нормализуем индекс для отображения в индикаторах
      setMobileScrollIndex(closestIndex % clips.length)
    }

    // Логика бесконечного скролла
    const handleInfiniteScroll = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length === 0) return

      const firstMiddleCard = cards[clips.length] as HTMLElement
      const lastMiddleCard = cards[clips.length * 2 - 1] as HTMLElement
      
      if (!firstMiddleCard || !lastMiddleCard) return

      const containerWidth = container.offsetWidth
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      
      // Если прокрутили слишком далеко вправо - прыгаем к началу среднего набора
      if (scrollLeft + containerWidth >= scrollWidth - 50) {
        const cardWidth = firstMiddleCard.offsetWidth
        const newScrollPos = firstMiddleCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2)
        container.scrollLeft = newScrollPos
      }
      // Если прокрутили слишком далеко влево - прыгаем к концу среднего набора
      else if (scrollLeft <= 50) {
        const cardWidth = lastMiddleCard.offsetWidth
        const newScrollPos = lastMiddleCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2)
        container.scrollLeft = newScrollPos
      }
    }

    let rafId: number | null = null
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateIndex()
          handleInfiniteScroll()
          rafId = null
        })
      }
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    if ('onscrollend' in container) {
      container.addEventListener('scrollend', updateIndex, { passive: true })
    }
    window.addEventListener('resize', updateIndex)
    
    // Инициализация
    setInitialPosition()
    const timeoutId = setTimeout(() => {
      setInitialPosition()
      updateIndex()
    }, 100)

    return () => {
      container.removeEventListener('scroll', onScroll)
      if ('onscrollend' in container) {
        container.removeEventListener('scrollend', updateIndex)
      }
      window.removeEventListener('resize', updateIndex)
      if (rafId !== null) cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
    }
  }, [clips.length])

  return (
    <section className="section-padding lg:py-6 bg-gradient-to-b from-white via-amber-100 to-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-8 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 md:mb-4 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Видео-отзывы
            </span>
          </h2>
        </div>

        {/* Карусель */}
        <div className="relative">
          {/* Кнопка влево - десктоп */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-yellow-200/50 group"
            aria-label="Предыдущий клип"
          >
            <svg className="w-6 h-6 text-yellow-600 group-hover:text-yellow-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Кнопка вправо - десктоп */}
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-yellow-200/50 group"
            aria-label="Следующий клип"
          >
            <svg className="w-6 h-6 text-yellow-600 group-hover:text-yellow-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Мобильная версия - горизонтальный скролл */}
          <div className="md:hidden relative">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide" 
              style={{ 
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x pan-y',
                overscrollBehaviorX: 'contain'
              }}
            >
              <div className="flex gap-4 justify-start" style={{ width: 'max-content' }}>
                {infiniteClips.map((clip, index) => (
                  <div
                    key={`clip-${index}`}
                    data-card-index={index}
                    onClick={() => openVideo(clip.oid, clip.videoId)}
                    className="flex-shrink-0 snap-center cursor-pointer group"
                  >
                    <div 
                      className="relative rounded-3xl overflow-hidden bg-black shadow-xl transition-all duration-300 active:scale-95"
                      style={{ width: '220px', height: '390px' }}
                    >
                      {/* VK Video превью */}
                      <iframe
                        src={`https://vk.com/video_ext.php?oid=${clip.oid}&id=${clip.videoId}&hd=2`}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        allow="encrypted-media; fullscreen; picture-in-picture;"
                        frameBorder="0"
                        title="VK Video Preview"
                      />
                      {/* Оверлей с кнопкой play */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110">
                          <svg className="w-7 h-7 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Индикаторы-точки */}
            <div className="flex justify-center gap-2 mt-4 px-4">
              {clips.map((_, index) => (
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
              minHeight: '420px',
              padding: '0 150px'
            }}
          >
            {getVisibleIndices().map(({ index, position }) => {
              const clip = clips[index]
              const isCenter = position === 1
              const isLeft = position === 0
              const isRight = position === 2
              
              const getCoverFlowStyle = () => {
                if (isCenter) {
                  return {
                    transform: 'translate(-50%, -50%) rotateY(0deg) translateZ(0px) scale(1)',
                    zIndex: 10,
                    opacity: 1,
                  }
                } else if (isLeft) {
                  return {
                    transform: 'translate(-50%, -50%) rotateY(45deg) translateX(-200px) translateZ(-200px) scale(0.7)',
                    zIndex: 1,
                    opacity: 0.6,
                  }
                } else if (isRight) {
                  return {
                    transform: 'translate(-50%, -50%) rotateY(-45deg) translateX(200px) translateZ(-200px) scale(0.7)',
                    zIndex: 1,
                    opacity: 0.6,
                  }
                }
                return {}
              }
              
              return (
                <div
                    key={`${index}-${currentIndex}-${position}`}
                    onClick={() => isCenter ? openVideo(clip.oid, clip.videoId) : goToSlide(index)}
                    className="absolute transition-all ease-in-out cursor-pointer"
                    style={{
                      ...getCoverFlowStyle(),
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      left: '50%',
                      top: '50%',
                      transformOrigin: 'center center'
                    }}
                  >
                  <div 
                    className="relative rounded-2xl overflow-hidden bg-black shadow-2xl group"
                    style={{ width: isCenter ? '210px' : '170px', height: isCenter ? '380px' : '300px' }}
                  >
                    {/* VK Video превью */}
                    <iframe
                      src={`https://vk.com/video_ext.php?oid=${clip.oid}&id=${clip.videoId}&hd=2`}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      allow="encrypted-media; fullscreen; picture-in-picture;"
                      frameBorder="0"
                      title="VK Video Preview"
                    />
                    {/* Оверлей с кнопкой play */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div 
                        className="bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110"
                        style={{ width: isCenter ? '60px' : '48px', height: isCenter ? '60px' : '48px' }}
                      >
                        <svg className={`${isCenter ? 'w-7 h-7' : 'w-5 h-5'} text-gray-900 ml-1`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {isCenter && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-yellow-600">
                        {index + 1} / {clips.length}
                      </span>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Индикаторы внизу - десктоп */}
          <div className="hidden md:flex justify-center gap-2 mt-10 flex-wrap">
            {clips.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-500 w-8 scale-110' 
                    : 'bg-gray-300 hover:bg-yellow-300 active:scale-90'
                }`}
                aria-label={`Перейти к клипу ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Modal для видео */}
        {activeVideo && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4" 
            onClick={closeVideo}
          >
            {/* Кнопка закрытия в углу экрана */}
            <button 
              onClick={closeVideo}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors group"
            >
              <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Контейнер видео */}
            <div 
              className="relative w-full max-w-sm sm:max-w-md mx-auto" 
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '90vh' }}
            >
              <div 
                className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black"
                style={{ aspectRatio: '9/16' }}
              >
                <iframe
                  src={`https://vk.com/video_ext.php?oid=${activeVideo.oid}&id=${activeVideo.id}&hd=2&autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  title="VK Video"
                />
              </div>
            </div>
          </div>
        )}

        {/* Блок ВКонтакте и Яндекс */}
        <div className="mt-12 md:mt-10 text-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-5 max-w-3xl mx-auto hover-lift">
            <h3 className="text-xl sm:text-2xl md:text-xl lg:text-2xl font-black text-gray-900 mb-3 md:mb-3">
              Больше отзывов в нашей группе ВКонтакте
            </h3>
            <p className="text-sm sm:text-base md:text-sm text-gray-700 mb-4 md:mb-4">
              Смотрите все видео-отзывы в разделе клипов нашей группы
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="https://vk.com/repetitor_penza_etalon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base"
              >
                <img src="/vk.png" alt="ВКонтакте" className="w-5 h-5 md:w-6 md:h-6 brightness-0 invert" />
                <span>Смотреть все клипы</span>
              </a>
              <a
                href="https://yandex.ru/profile/154840463548"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-base"
              >
                <img src="/yandex.png" alt="Яндекс" className="w-5 h-5 md:w-6 md:h-6 brightness-0 invert" />
                <span>Отзывы на Яндексе</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}