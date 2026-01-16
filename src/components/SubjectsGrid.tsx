'use client'

import { useState, useRef, useEffect } from 'react'

export default function SubjectsGrid() {
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const subjects = [
    {
      name: "Математика",
      icon: "📐",
      description: "Алгебра, геометрия, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Опытные преподаватели по математике помогают детям полюбить предмет и сформировать устойчивую математическую культуру. Мы готовим к ЕГЭ и ОГЭ по математике на высокие баллы, помогаем подтянуть школьную программу, устранить пробелы в знаниях и развить уверенность в своих силах и результатах.",
      color: "from-yellow-400 to-yellow-500",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 82",
      backgroundImage: "/math.jpg",
      imagePosition: "center 20%",
      mobileImageHeight: "h-52"
    },
    {
      name: "Информатика",
      icon: "💻",
      description: "Программирование, алгоритмы, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Помогаем детям с нуля освоить язык программирования Python, затем последовательно объясняем алгоритмы, логику и основы кодирования информации. Такой подход позволяет глубоко понять информатику и успешно подготовиться к ОГЭ и ЕГЭ на высокие баллы.",
      color: "from-yellow-800 to-yellow-900",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 85",
      backgroundImage: "/informatic.jpg",
      imagePosition: "center 30%",
      mobileImageHeight: "h-52"
    },
    {
      name: "Русский язык",
      icon: "📝",
      description: "Грамматика, сочинение, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Русский язык — это не только правила и тесты, а путь к грамотной и уверенной речи. Мы помогаем освоить школьную программу, а также подготовиться к ОГЭ и ЕГЭ по русскому языку на высокие баллы. Наши преподаватели объясняют материал понятно и системно.",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 84",
      backgroundImage: "/rus-lang.jpg",
      imagePosition: "center 20%",
      mobileImageHeight: "h-52"
    },
    {
      name: "Физика",
      icon: "⚡",
      description: "Механика, термодинамика, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Помогаем ученикам понять логику и законы физики, объясняем сложные темы простым языком и учим решать задачи пошагово. Готовим к ОГЭ и ЕГЭ по физике без стресса и на высокие баллы.",
      color: "from-yellow-600 to-yellow-700",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 80",
      backgroundImage: "/physic.jpg",
      imagePosition: "center 25%",
      mobileImageHeight: "h-52"
    },
    {
      name: "Обществознание",
      icon: "🏛️",
      description: "Право, экономика, политология, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Научим понимать законы, изучим основы экономики и правовые нормы. Ребенок сможет формулировать мысли для второй части экзамена. Приведем к высокому баллу без лишнего стресса.",
      color: "from-yellow-900 to-yellow-950",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 82",
      backgroundImage: "/society.jpg",
      imagePosition: "center 25%",
      mobileImageHeight: "h-52"
    }
  ]

  // Создаём утроенный массив для бесконечного скролла
  const infiniteSubjects = [...subjects, ...subjects, ...subjects]

  // Отслеживание скролла на мобильной версии с бесконечной прокруткой
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Устанавливаем начальную позицию на средний набор
    const setInitialPosition = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length > 0) {
        const firstMiddleCard = cards[subjects.length] as HTMLElement
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
      setMobileScrollIndex(closestIndex % subjects.length)
    }

    // Логика бесконечного скролла
    const handleInfiniteScroll = () => {
      const cards = container.querySelectorAll('[data-card-index]')
      if (cards.length === 0) return

      const firstMiddleCard = cards[subjects.length] as HTMLElement
      const lastMiddleCard = cards[subjects.length * 2 - 1] as HTMLElement
      
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
  }, [subjects.length])

  return (
    <section id="subjects" className="pt-4 md:pt-4 lg:pt-6 pb-12 md:pb-8 lg:pb-6 bg-gradient-to-b from-white via-amber-100 to-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-8 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 md:mb-4 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Предметы
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-base lg:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Подготовка к основным предметам для поступления на технические направления
          </p>
        </div>

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
            <div className="flex gap-4" style={{ width: 'max-content' }}>
              {infiniteSubjects.map((subject, index) => (
                <div
                  key={`mobile-${index}`}
                  data-card-index={index}
                  className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                >
                  <div className="bg-white rounded-3xl border-2 border-yellow-200 shadow-xl overflow-hidden flex flex-col h-[620px]">
                    {/* Картинка сверху - фиксированная высота */}
                    <div className={`relative w-full ${subject.mobileImageHeight || 'h-40'} flex-shrink-0 overflow-hidden`}>
                      <img
                        src={subject.backgroundImage}
                        alt={subject.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: subject.imagePosition }}
                      />
                    </div>
                    
                    {/* Информация снизу */}
                    <div className="flex flex-col p-4 flex-grow">
                      {/* Иконка - фиксированная высота */}
                      <div className="h-16 flex items-center justify-center flex-shrink-0">
                        <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center text-2xl shadow-md`}>
                          {subject.icon}
                        </div>
                      </div>
                      
                      {/* Название - фиксированная высота */}
                      <div className="h-8 flex items-center justify-center flex-shrink-0">
                        <h3 className="text-lg font-black text-gray-900 text-center">
                          {subject.name}
                        </h3>
                      </div>
                      
                      {/* Короткое описание - фиксированная высота */}
                      <div className="h-12 flex items-center justify-center flex-shrink-0 px-2">
                        <p className="text-sm text-gray-600 font-medium text-center line-clamp-2">
                          {subject.description}
                        </p>
                      </div>
                      
                      {/* Полное описание - без ограничения строк */}
                      <div className="flex-grow overflow-y-auto my-2 min-h-[80px]">
                        <p className="text-xs text-gray-700 leading-relaxed text-center">
                          {subject.fullDescription}
                        </p>
                      </div>
                      
                      {/* Статистика - прижата к низу */}
                      <div className="mt-auto flex-shrink-0">
                        <div className={`${subject.bgColor} rounded-2xl p-3 shadow-md`}>
                          <div className="text-center">
                            <div className="text-base font-black text-yellow-800 mb-1">
                              {subject.stats}
                            </div>
                            <div className="text-xs text-yellow-700 font-semibold">
                              за последний год
                            </div>
                          </div>
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
            {subjects.map((_, index) => (
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

        {/* Десктопная версия - сетка карточек */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={`desktop-${index}`}
              className="group relative bg-white rounded-2xl border-2 border-yellow-200 shadow-lg overflow-hidden transition-all duration-300 h-[320px] cursor-pointer hover:shadow-xl hover:border-yellow-400"
            >
              {/* Картинка - по умолчанию видна */}
              <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0">
                <img
                  src={subject.backgroundImage}
                  alt={subject.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: subject.imagePosition }}
                />
                {/* Название на картинке */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-black text-white text-center drop-shadow-lg">
                    {subject.name}
                  </h3>
                </div>
              </div>
              
              {/* Информация - появляется при наведении */}
              <div className="absolute inset-0 flex flex-col p-3 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-white">
                {/* Иконка */}
                <div className="flex items-center justify-center mb-2">
                  <div className={`w-10 h-10 bg-gradient-to-r ${subject.color} rounded-xl flex items-center justify-center text-xl shadow-md`}>
                    {subject.icon}
                  </div>
                </div>
                
                {/* Название */}
                <h3 className="text-base font-black text-gray-900 mb-1">
                  {subject.name}
                </h3>
                
                {/* Описание */}
                <p className="text-[11px] text-gray-600 leading-snug flex-grow mb-2">
                  {subject.fullDescription}
                </p>
                
                {/* Средний балл внизу */}
                <div className={`${subject.bgColor} rounded-lg p-2 shadow-md`}>
                  <div className="text-center">
                    <div className="text-sm font-black text-yellow-800">
                      {subject.stats}
                    </div>
                    <div className="text-[10px] text-yellow-700 font-semibold">
                      за последний год
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
