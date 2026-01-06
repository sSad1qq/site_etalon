'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function FormatsGrid() {
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const formats = [
    {
      icon: "👥",
      title: "Мини-группа",
      description: "Занятия в группе из 2-4 человек, подобранных по уровню знаний.",
      features: [
        "Авторская программа подготовки к ОГЭ и ЕГЭ",
        "Коллективная мотивация",
        "Проверенная временем эффективность",
        "Доступная цена",
        "Двухчасовые занятия",
        "Можно подключаться дистанционно"
      ],
      popular: true,
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: "👤",
      title: "Индивидуально",
      description: "Персональные занятия один на один с преподавателем",
      features: [
        "Гибкий график",
        "Свой темп и длительность",
        "Разбор школьной программы",
        "Можно совмещать с мини-группой",
        "Можно заниматься дистанционно"
      ],
      popular: false,
      color: "from-yellow-500 to-yellow-600"
    }  ]

  // Создаём утроенный массив для бесконечного скролла
  const infiniteFormats = [...formats, ...formats, ...formats]

  // Отслеживание скролла на мобильной версии с бесконечной прокруткой
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Устанавливаем начальную позицию на средний набор
    const setInitialPosition = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length > 0) {
        const firstMiddleCard = cards[formats.length] as HTMLElement
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
      setMobileScrollIndex(closestIndex % formats.length)
    }

    // Логика бесконечного скролла
    const handleInfiniteScroll = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length === 0) return

      const firstMiddleCard = cards[formats.length] as HTMLElement
      const lastMiddleCard = cards[formats.length * 2 - 1] as HTMLElement
      
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

    const onResize = () => {
      updateIndex()
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    if ('onscrollend' in container) {
      container.addEventListener('scrollend', updateIndex, { passive: true })
    }
    window.addEventListener('resize', onResize)
    
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
      window.removeEventListener('resize', onResize)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      clearTimeout(timeoutId)
    }
  }, [formats.length])

  return (
    <section className="section-padding bg-gradient-to-b from-white via-yellow-100 to-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Форматы обучения
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Выберите удобный формат занятий или комбинируйте несколько вариантов
          </p>
        </div>

        {/* Мобильная версия - горизонтальный скролл */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide" 
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {infiniteFormats.map((format, index) => (
                <div
                  key={index}
                  data-card-index={index}
                  className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-md snap-center"
                >
                  <div
                    className={`card-lying rounded-3xl p-6 group w-full relative overflow-hidden h-[520px] ${
                      format.popular ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
                    }`}
                  >
                    {format.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-bl-3xl rounded-tr-3xl font-bold text-xs">
                        🌟 Эффективно
                      </div>
                    )}
                    
                    <div className="flex flex-col h-full">
                      <div className="text-center mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${format.color} rounded-3xl flex items-center justify-center mx-auto mb-4 text-3xl transition-all duration-300`}>
                          {format.icon}
                        </div>
                        
                        <h3 className="text-xl font-black text-gray-900 mb-2">
                          {format.title}
                        </h3>
                        
                        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                          {format.description}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-4 mb-4 flex-grow">
                        <ul className="space-y-2">
                          {format.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-xs">
                              <span className="text-yellow-600 text-base flex-shrink-0">✓</span>
                              <span className="text-gray-800 font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-center mt-auto">
                        <Link 
                          href="/contacts"
                          className="btn-primary w-full inline-block text-center md:hover-glow text-sm px-4 py-2"
                        >
                          Записаться
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Индикаторы-точки внизу */}
          <div className="flex justify-center gap-2 mt-4 px-4">
            {formats.map((_, index) => (
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

        {/* Десктопная версия - сетка */}
        <div className="hidden md:grid grid-cols-2 gap-8 justify-items-center items-stretch max-w-4xl mx-auto">
          {formats.map((format, index) => (
            <div
              key={index}
              className={`card-lying rounded-3xl p-8 group animate-zoom-in w-full max-w-md relative overflow-hidden ${
                format.popular ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {format.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-bl-3xl rounded-tr-3xl font-bold text-sm">
                  🌟 Эффективно
                </div>
              )}
              
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${format.color} rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl group-hover:animate-wiggle transition-all duration-300`}>
                    {format.icon}
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    {format.title}
                  </h3>
                  
                  <p className="text-base text-gray-700 mb-4 leading-relaxed">
                    {format.description}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-5 mb-6 flex-grow">
                  <ul className="space-y-3">
                    {format.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <span className="text-yellow-600 text-lg flex-shrink-0">✓</span>
                        <span className="text-gray-800 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center mt-auto">
                  <Link 
                    href="/contacts"
                    className="btn-primary w-full inline-block text-center hover-glow text-base px-6 py-3"
                  >
                    Записаться
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

