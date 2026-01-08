'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function AboutPage() {
  const [photoScrollIndex, setPhotoScrollIndex] = useState(0)
  const photoScrollContainerRef = useRef<HTMLDivElement>(null)

  // Фотографии для бесконечного скролла
  const photos = [
    { src: "/dosug_1.jpeg", alt: "Команда центра на мероприятии", caption: "Совместные праздники и мероприятия" },
    { src: "/dosug_2.jpeg", alt: "Преподаватели с учениками", caption: "Неформальное общение с учениками" },
    { src: "/dosug_3.jpeg", alt: "Командная работа", caption: "Работа в команде и взаимоподдержка" },
    { src: "/dosug_4.jpeg", alt: "Творческие моменты", caption: "Творческие проекты и инициативы" },
    { src: "/dosug_5.jpeg", alt: "Дружеское общение", caption: "Дружеское общение вне занятий" },
    { src: "/dosug_6.jpeg", alt: "Совместные достижения", caption: "Празднование успехов и достижений" }
  ]
  const infinitePhotos = [...photos, ...photos, ...photos]

  // Отслеживание скролла фотографий на мобильной версии с бесконечной прокруткой
  useEffect(() => {
    const container = photoScrollContainerRef.current
    if (!container) return

    const setInitialPosition = () => {
      const cards = container.querySelectorAll('[data-photo-index]')
      if (cards.length > 0) {
        const firstMiddleCard = cards[photos.length] as HTMLElement
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
      
      const cards = container.querySelectorAll('[data-photo-index]')
      let closestIndex = 0
      let closestDistance = Infinity
      
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(cardCenter - containerCenter)
        
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = parseInt(card.getAttribute('data-photo-index') || '0')
        }
      })
      
      setPhotoScrollIndex(closestIndex % photos.length)
    }

    const handleInfiniteScroll = () => {
      const cards = container.querySelectorAll('[data-photo-index]')
      if (cards.length === 0) return

      const firstMiddleCard = cards[photos.length] as HTMLElement
      const lastMiddleCard = cards[photos.length * 2 - 1] as HTMLElement
      
      if (!firstMiddleCard || !lastMiddleCard) return

      const containerWidth = container.offsetWidth
      const scrollLeft = container.scrollLeft
      const scrollWidth = container.scrollWidth
      
      if (scrollLeft + containerWidth >= scrollWidth - 50) {
        const cardWidth = firstMiddleCard.offsetWidth
        const newScrollPos = firstMiddleCard.offsetLeft - (containerWidth / 2) + (cardWidth / 2)
        container.scrollLeft = newScrollPos
      }
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

    const onResize = () => {
      updateIndex()
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    if ('onscrollend' in container) {
      container.addEventListener('scrollend', updateIndex, { passive: true })
    }
    window.addEventListener('resize', onResize)
    
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
      window.removeEventListener('resize', onResize)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      clearTimeout(timeoutId)
    }
  }, [])

  return (
  <div className="min-h-screen bg-gradient-to-b from-white via-amber-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-12 md:pb-16">
        {/* Дружелюбная атмосфера */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Дружелюбная атмосфера
            </span>
          </h1>
          <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Мы не просто учим — мы дружим, поддерживаем и вдохновляем каждого ученика.
            </p>
          </div>
          
          {/* Мобильная версия - горизонтальный скролл */}
          <div className="md:hidden relative">
            <div 
              ref={photoScrollContainerRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide" 
              style={{ 
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-x pan-y',
                overscrollBehaviorX: 'contain'
              }}
            >
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {infinitePhotos.map((photo, index) => (
                  <div
                    key={`mobile-${index}`}
                    data-photo-index={index}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                  >
                    <div className="card-lying rounded-2xl sm:rounded-3xl p-3 sm:p-4 group animate-zoom-in overflow-hidden bg-white h-[340px] sm:h-[360px] md:h-[380px] flex flex-col">
                      <div className="relative w-full h-52 sm:h-56 md:h-64 mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-center text-gray-700 font-medium text-xs sm:text-sm flex-grow flex items-center justify-center">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Индикаторы-точки внизу */}
            <div className="flex justify-center gap-2 mt-4 px-4">
              {photos.map((_, index) => (
                <div
                  key={`indicator-${index}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === photoScrollIndex 
                      ? 'bg-yellow-500 w-6 scale-110' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Десктопная версия - сетка */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="card-lying rounded-3xl p-4 group animate-zoom-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full h-64 mb-4 rounded-2xl overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-gray-700 font-medium text-sm">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="card-lying rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in bg-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 sm:mb-6 text-center mx-auto">
              Присоединяйтесь к нашей команде!
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed text-center mx-auto">
              Станьте частью успешной истории и достигните своих целей вместе с нами
            </p>
            <div className="flex justify-center">
              <Link
                href="/contacts"
                className="btn-primary btn-magic text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-3 sm:py-4 group inline-block"
              >
                <span className="flex items-center space-x-2 sm:space-x-3">
                  <span>Записаться</span>
                  <span className="md:group-hover:animate-wiggle">📝</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}