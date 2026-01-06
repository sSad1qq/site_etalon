'use client'

import { useState, useRef, useEffect } from 'react'

export default function AdvantagesGrid() {
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const advantages = [
    {
      icon: "👥",
      title: "Мини-группы 2-4 человека",
      description: "Максимум внимания от преподавателя каждому ученику",
      color: "from-yellow-500 to-yellow-600",
      stats: "До 6 человек"
    },
    {
      icon: "💻",
      title: "Комбинированные занятия",
      description: "Ученик может прийти очно, так и подключиться дистанционно",
      color: "from-yellow-400 to-yellow-600",
      stats: "Очно и онлайн"
    },
    {
      icon: "📊",
      title: "Контроль прогресса",
      description: "Еженедельные отчеты об успеваемости ребенка",
      color: "from-yellow-500 to-yellow-700",
      stats: "Еженедельные отчеты"
    },
    {
      icon: "🎓",
      title: "Опытные репетиторы",
      description: "Преподаватели с опытом подготовки к экзаменам",
      color: "from-yellow-800 to-yellow-950",
      stats: "Средний стаж 10+ лет"
    },
    {
      icon: "🏆",
      title: "Высокие результаты",
      description: "Средний балл наших учеников на 18 выше, чем средний балл по стране",
      color: "from-yellow-600 to-yellow-800",
      stats: "1000+ выпускников"
    },
    {
      icon: "⏰",
      title: "Гибкое расписание",
      description: "Подберем удобное время для занятий",
      color: "from-yellow-700 to-yellow-800",
      stats: "7 дней в неделю"
    },
    {
      icon: "⚙️",
      title: "Технический центр",
      description: "Специализируемся на подготовке к поступлению на технические направления",
      color: "from-yellow-500 to-yellow-700",
      stats: "Технические ВУЗы"
    }
  ]

  // Создаём утроенный массив для бесконечного скролла
  const infiniteAdvantages = [...advantages, ...advantages, ...advantages]

  // Отслеживание скролла на мобильной версии с бесконечной прокруткой
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Устанавливаем начальную позицию на средний набор
    const setInitialPosition = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length > 0) {
        const firstMiddleCard = cards[advantages.length] as HTMLElement
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
      setMobileScrollIndex(closestIndex % advantages.length)
    }

    // Логика бесконечного скролла
    const handleInfiniteScroll = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length === 0) return

      const firstMiddleCard = cards[advantages.length] as HTMLElement
      const lastMiddleCard = cards[advantages.length * 2 - 1] as HTMLElement
      
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
  }, [advantages.length])

  return (
    <section className="section-padding bg-gradient-to-b from-white via-yellow-100 to-white relative overflow-hidden pt-40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto relative z-20 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 animate-slide-in-up relative z-30">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Наши преимущества
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up relative z-30">
            Почему родители и ученики выбирают центр «Эталон»
          </p>
        </div>

        {/* Мобильная версия - горизонтальный скролл */}
        <div className="md:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide" 
            style={{ 
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              overscrollBehaviorX: 'contain'
            }}
          >
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {infiniteAdvantages.map((advantage, index) => (
                <div
                  key={index}
                  data-card-index={index}
                  className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                >
                  <div className="card-lying rounded-3xl p-6 group w-full md:hover-lift flex flex-col h-[280px]">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className={`w-20 h-20 bg-gradient-to-r ${advantage.color} rounded-3xl flex items-center justify-center mb-5 text-4xl transition-all duration-300 flex-shrink-0`}>
                        {advantage.icon}
                      </div>
                      
                      <h3 className="text-xl font-black text-gray-900 mb-3 flex-shrink-0">
                        {advantage.title}
                      </h3>
                      
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed flex-grow flex items-center">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Индикаторы-точки внизу */}
          <div className="flex justify-center gap-2 mt-4 px-4">
            {advantages.map((_, index) => (
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
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center items-stretch">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="card-lying rounded-3xl p-6 md:p-8 group animate-zoom-in w-full max-w-md hover-lift h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className={`w-20 h-20 bg-gradient-to-r ${advantage.color} rounded-3xl flex items-center justify-center mb-5 text-4xl group-hover:animate-wiggle transition-all duration-300`}>
                  {advantage.icon}
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed flex-grow">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

