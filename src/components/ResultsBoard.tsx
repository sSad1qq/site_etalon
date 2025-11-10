'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function ResultsBoard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const results = [
    {
      image: "/pochet_1.jpg"
    },
    {
      image: "/pochet_2.jpg"
    },
    {
      image: "/pochet_3.jpg"
    },
    {
      image: "/pochet_4.jpg"
    },
    {
      image: "/pochet_5.jpg"
    },
    {
      image: "/pochet_6.jpg"
    },
    {
      image: "/pochet_7.jpg"
    },
    {
      image: "/pochet_8.jpg"
    },
    {
      image: "/pochet_9.jpg"
    },
    {
      image: "/pochet_10.jpg"
    },
    {
      image: "/pochet_11.jpg"
    },
    {
      image: "/pochet_12.jpg"
    },
    {
      image: "/pochet_13.jpg"
    },
    {
      image: "/pochet_14.jpg"
    },
    {
      image: "/pochet_15.jpg"
    },
    {
      image: "/pochet_16.jpg"
    }
  ]

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('left')
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? results.length - 1 : prevIndex - 1
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
      prevIndex === results.length - 1 ? 0 : prevIndex + 1
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
        index = results.length + index
      } else if (index >= results.length) {
        index = index - results.length
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
  }, [results.length])

  return (
    <section className="section-padding bg-gradient-to-b from-yellow-50 to-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Доска почета
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up px-4">
            Наши выпускники показывают выдающиеся результаты и поступают в лучшие вузы страны
          </p>
        </div>

        {/* Карусель */}
        <div className="relative">
          {/* Кнопка влево - десктоп */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-yellow-200/50 group"
            aria-label="Предыдущее изображение"
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
            aria-label="Следующее изображение"
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
              className="overflow-x-auto -mx-4 px-4 py-4 snap-x snap-mandatory scrollbar-hide" 
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {results.map((result, index) => (
                  <div
                    key={`mobile-${index}`}
                    data-card-index={index}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                  >
                    <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-2 shadow-[0_30px_80px_-20px_rgba(245,158,11,0.5)] ring-4 ring-yellow-400 ring-opacity-60">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white shadow-inner border-2 border-yellow-200">
                        <Image
                          src={result.image}
                          alt={`Достижение ${index + 1}`}
                          fill
                          className="object-contain"
                          style={{ padding: '1rem' }}
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Индикаторы-точки внизу */}
            <div className="flex justify-center gap-2 mt-4 px-4">
              {results.map((_, index) => (
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
              height: '800px',
              padding: '0 200px'
            }}
          >
            {getVisibleIndices().map(({ index, position }) => {
              const isCenter = position === 1
              const isLeft = position === 0
              const isRight = position === 2
              
              // iPod Cover Flow стиль - 3D трансформации
              const getCoverFlowStyle = () => {
                if (isCenter) {
                  // Центральное изображение - крупное, прямое, впереди
                  return {
                    transform: 'translate(-50%, -50%) rotateY(0deg) translateZ(0px) scale(1)',
                    zIndex: 10,
                    opacity: 1,
                    width: '500px',
                    height: '650px'
                  }
                } else if (isLeft) {
                  // Левое изображение - повернуто влево, меньше, дальше
                  return {
                    transform: 'translate(-50%, -50%) rotateY(50deg) translateX(-280px) translateZ(-250px) scale(0.6)',
                    zIndex: 1,
                    opacity: 0.5,
                    width: '300px',
                    height: '450px'
                  }
                } else if (isRight) {
                  // Правое изображение - повернуто вправо, меньше, дальше
                  return {
                    transform: 'translate(-50%, -50%) rotateY(-50deg) translateX(280px) translateZ(-250px) scale(0.6)',
                    zIndex: 1,
                    opacity: 0.5,
                    width: '300px',
                    height: '450px'
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
                    ${isCenter ? 'hover:scale-105' : 'hover:opacity-80'}
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
                  {/* Красивая оконтовка рамки с 3D эффектом */}
                  <div 
                    className={`
                      relative w-full h-full rounded-3xl overflow-hidden
                      ${isCenter 
                        ? 'bg-gradient-to-br from-yellow-50 via-white to-yellow-50 p-2 shadow-[0_30px_80px_-20px_rgba(245,158,11,0.5)] ring-4 ring-yellow-400 ring-opacity-60' 
                        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] ring-2 ring-gray-300 ring-opacity-50'
                      }
                      transition-all
                      ${isCenter ? 'hover:ring-yellow-500 hover:ring-opacity-80' : 'hover:ring-yellow-300 hover:ring-opacity-70'}
                    `}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Внутренняя рамка для дополнительной глубины */}
                    <div className={`
                      relative w-full h-full rounded-2xl overflow-hidden
                      ${isCenter 
                        ? 'bg-white shadow-inner border-2 border-yellow-200' 
                        : 'bg-white shadow-inner border border-gray-200'
                      }
                    `}>
                      <Image
                        src={results[index].image}
                        alt={`Достижение ${index + 1}`}
                        fill
                        className="object-contain transition-all"
                        style={{
                          padding: isCenter ? '1rem' : '0.75rem',
                          transform: 'translateZ(0)'
                        }}
                        priority={isCenter}
                      />
                    </div>
                  </div>
                  
                  {/* Индикатор центрального изображения */}
                  {isCenter && (
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-yellow-600">
                        {index + 1} / {results.length}
                      </span>
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Индикаторы внизу - только для десктопа */}
          <div className="hidden md:flex justify-center gap-2 mt-16 flex-wrap px-4">
            {results.map((_, index) => (
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
                aria-label={`Перейти к изображению ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}