'use client'

import { useState, useRef, useEffect } from 'react'

export default function StudentJourney() {
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const steps = [
    {
      number: 1,
      title: "Заявка",
      description: "Оставляете заявку на сайте или звоните нам",
      icon: "📝",
      details: "Быстрая регистрация за 2 минуты",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      number: 2,
      title: "Диагностика",
      description: "Проходите бесплатную диагностику для определения входного уровня знаний",
      icon: "📊",
      details: "15-20 минут, результаты сразу",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      number: 3,
      title: "Подбор формата обучения",
      description: "Подбираем подходящий Вам формат и расписание занятий",
      icon: "👥",
      details: "Мини-группы до 6 человек",
      color: "from-yellow-600 to-yellow-700"
    },
    {
      number: 4,
      title: "Начало обучения",
      description: "Начинаем регулярные занятия с опытным педагогом",
      icon: "📚",
      details: "1 раз в неделю, 2 часа",
      color: "from-yellow-700 to-yellow-800"
    },
    {
      number: 5,
      title: "Открытость обучения",
      description: "Еженедельная обратная связь о прогрессе ученика от педагога",
      icon: "📈",
      details: "Еженедельные отчеты родителям",
      color: "from-yellow-800 to-yellow-900"
    },
    {
      number: 6,
      title: "Промежуточная диагностика",
      description: "Проводим регулярные пробные тестирования в формате ЕГЭ/ОГЭ и корректируем программу обучения",
      icon: "🎯",
      details: "Полная имитация экзамена",
      color: "from-yellow-900 to-yellow-950"
    }
  ]

  // Создаём утроенный массив для бесконечного скролла
  const infiniteSteps = [...steps, ...steps, ...steps]

  // Отслеживание скролла на мобильной версии с бесконечной прокруткой
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Устанавливаем начальную позицию на средний набор
    const setInitialPosition = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length > 0) {
        const firstMiddleCard = cards[steps.length] as HTMLElement
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
      
      // Нормализуем индекс для отображения в индикаторах
      setMobileScrollIndex(closestIndex % steps.length)
    }

    // Логика бесконечного скролла
    const handleInfiniteScroll = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length === 0) return

      const firstMiddleCard = cards[steps.length] as HTMLElement
      const lastMiddleCard = cards[steps.length * 2 - 1] as HTMLElement
      
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

    // Обработчик скролла с throttling
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
  }, [steps.length])

  return (
    <section className="section-padding bg-gradient-to-b from-white via-amber-100 to-white relative overflow-hidden mt-16" aria-labelledby="journey-heading">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto px-4">
          <h2 id="journey-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Путь ученика
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed animate-slide-in-up">
            Продуманная система обучения, которая шаг за шагом ведёт к результату.
          </p>
        </div>

          <div className="relative">
          {/* Анимированная линия времени - только для десктопа */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transform -translate-y-1/2 rounded-full animate-pulse-glow"></div>
          
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
                {infiniteSteps.map((step, index) => (
                  <div
                    key={`step-${index}`}
                    data-card-index={index}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                  >
                    <article
                      className="card-lying rounded-3xl p-4 w-full flex flex-col items-center text-center md:hover-lift glow-effect h-[280px]"
                      aria-labelledby={`step-title-mobile-${index}`}
                    >
                      <div className="flex flex-col items-center text-center mb-4 flex-shrink-0">
                        <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mb-3 text-2xl shadow-lg transition-all duration-300`} aria-hidden>
                          <span aria-hidden>{step.icon}</span>
                        </div>
                        <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow-md">
                          <span className="sr-only">Шаг</span>
                          {step.number}
                        </div>
                      </div>

                      <h3 id={`step-title-mobile-${index}`} className="text-lg font-extrabold text-gray-900 mb-2 text-center flex-shrink-0">
                        {step.title}
                      </h3>

                      <p className="text-sm text-gray-700 mb-3 text-center leading-relaxed flex-grow flex items-center justify-center">
                        {step.description}
                      </p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Индикаторы-точки внизу */}
            <div className="flex justify-center gap-2 mt-4 px-4">
              {steps.map((_, index) => (
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
          <ol className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center items-stretch" role="list">
            {steps.map((step, index) => (
              <li key={step.number} className="relative w-full flex" role="listitem">
                <article
                  className="card-lying rounded-3xl p-4 sm:p-6 w-full flex flex-col hover-lift glow-effect"
                  style={{ animationDelay: `${index * 0.12}s` }}
                  aria-labelledby={`step-title-${step.number}`}
                >
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mb-3 text-2xl shadow-lg group-hover:animate-wiggle transition-all duration-300`} aria-hidden>
                      <span aria-hidden>{step.icon}</span>
                    </div>
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow-md">
                      <span className="sr-only">Шаг</span>
                      {step.number}
                    </div>
                  </div>

                  <h3 id={`step-title-${step.number}`} className="text-lg font-extrabold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-700 mb-3 flex-grow text-center leading-relaxed">
                    {step.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA с анимацией */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <div className="card-lying rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 md:p-8 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in hover-lift bg-white">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Сделайте первый шаг уже сейчас!
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Проведём для вас бесплатную диагностику знаний и профориентационное тестирование. По итогам вы получите подробные отчёты, которые помогут осознанно выбрать подходящую специальность.
            </p>
            <div className="flex justify-center">
              <a
                href="/contacts"
                className="btn-primary btn-magic text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-3 sm:py-4 inline-flex items-center justify-center"
              >
                <span className="flex items-center space-x-2 sm:space-x-3">
                  <span>Записаться</span>
                  <span>📝</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}