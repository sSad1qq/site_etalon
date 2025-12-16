'use client'

import { useState, useRef, useEffect } from 'react'

export default function SubjectsGrid() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const subjects = [
    {
      name: "Математика",
      icon: "📐",
      description: "Алгебра, геометрия, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Сильные преподаватели по математике, которые умеют не просто «натаскать», а действительно научить. Подготовим к ОГЭ и ЕГЭ на высокий балл, поможем подтянуть школьную программу и развить уверенность в своих силах!",
      color: "from-yellow-400 to-yellow-500",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 87",
      backgroundImage: "/math.jpg"
    },
    {
      name: "Информатика",
      icon: "⚡",
      description: "Программирование, алгоритмы, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Готовим учеников к ОГЭ и ЕГЭ по информатике, разбираем школьную программу, учим логике, алгоритмам и мышлению, которое помогает не только на экзаменах, но и в жизни. Преподаватели объясняют доступно, поэтапно и с примерами!",
      color: "from-yellow-800 to-yellow-900",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 88",
      backgroundImage: "/informatic.jpg"
    },
    {
      name: "Русский язык",
      icon: "📝",
      description: "Грамматика, сочинение, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Русский язык — это не только правила и тесты, но и увлекательный путь к уверенной речи и высоким баллам. Наши преподаватели помогут подготовиться к ОГЭ и ЕГЭ, прокачать навыки написания сочинений и изложений!",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 89",
      backgroundImage: "/rus-lang.jpg"
    },
    {
      name: "Физика",
      icon: "⚡",
      description: "Механика, термодинамика, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Помогаем ученикам увидеть логику и красоту физики. Объясняем сложные законы простым языком, учим решать задачи пошагово и готовим к ОГЭ и ЕГЭ без стресса. С нами формулы начинают работать, а баллы — расти!",
      color: "from-yellow-600 to-yellow-700",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 85",
      backgroundImage: "/physic.jpg"
    },
    {
      name: "Обществознание",
      icon: "🏛️",
      description: "Право, экономика, политология, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Опытные преподаватели помогут разобраться в сложных темах, уверенно подготовиться к ОГЭ и ЕГЭ и повысить оценки в школе. Делаем акцент на логику, понимание и реальные примеры!",
      color: "from-yellow-900 to-yellow-950",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 84",
      backgroundImage: "/society.jpg"
    },
    {
      name: "Химия",
      icon: "🧪",
      description: "Органическая и неорганическая химия, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Помогаем ученикам понять химию, а не просто учить реакции наизусть. Преподаватели шаг за шагом объясняют сложные темы, учат решать задачи и грамотно оформлять ответы. Подготовка к экзаменам проходит результативно!",
      color: "from-yellow-700 to-yellow-800",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 86",
      backgroundImage: "/chemistry.jpg"
    },
    {
      name: "История",
      icon: "📜",
      description: "Российская и всемирная история, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Опытные преподаватели по истории не только подготовят к ОГЭ и ЕГЭ на высокий балл, но и помогут разобраться в школьной программе, полюбить предмет и уверенно чувствовать себя на уроках.",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 83",
      backgroundImage: "/history.jpg"
    },
    {
      name: "Биология",
      icon: "🧬",
      description: "Анатомия, генетика, экология, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Биология — не просто термины, а наука о жизни, которую можно понять и полюбить! Превращаем подготовку к экзаменам в увлекательное путешествие по живому миру. Преподаватели научат решать задачи без зубрёжки и паники!",
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 82",
      backgroundImage: "/biology.jpg"
    },
    {
      name: "Литература",
      icon: "📚",
      description: "Анализ произведений, сочинения, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Помогаем ученикам раскрыть глубину произведений, научиться анализировать текст и писать уверенные сочинения. Преподаватели подготовят к ОГЭ и ЕГЭ, улучшат успеваемость по школьной программе и разовьют любовь к литературе!",
      color: "from-yellow-600 to-yellow-800",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 86",
      backgroundImage: "/literature.jpg"
    },
    {
      name: "Английский язык",
      icon: "🌍",
      description: "Грамматика, лексика, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Помогаем ученикам не только подготовиться к ОГЭ и ЕГЭ, но и уверенно общаться на английском. Преподаватели развивают все навыки — от грамматики до разговорной практики, чтобы экзамены и реальная жизнь стали легко решаемыми!",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 87",
      backgroundImage: "/english.jpg"
    }
  ]

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection('left')
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? subjects.length - 1 : prevIndex - 1
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
      prevIndex === subjects.length - 1 ? 0 : prevIndex + 1
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
        index = subjects.length + index
      } else if (index >= subjects.length) {
        index = index - subjects.length
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
  }, [subjects.length])

  return (
    <section className="section-padding bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mb-4 md:mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Предметы
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Подготовка по всем основным предметам ЕГЭ и ОГЭ с опытными преподавателями
          </p>
        </div>

        {/* Карусель */}
        <div className="relative">
          {/* Кнопка влево - десктоп */}
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-yellow-200/50 group"
            aria-label="Предыдущий предмет"
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
            aria-label="Следующий предмет"
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
                {subjects.map((subject, index) => (
                  <div
                    key={`mobile-${index}`}
                    data-card-index={index}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                  >
                    <div className="bg-white rounded-3xl border-2 border-yellow-200 shadow-xl overflow-hidden flex flex-col h-[520px]">
                      {/* Картинка сверху - фиксированная высота */}
                      <div className="relative w-full h-40 flex-shrink-0 overflow-hidden">
                        <img
                          src={subject.backgroundImage}
                          alt={subject.name}
                          className="w-full h-full object-cover"
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
                        
                        {/* Полное описание - фиксированная высота с ограничением строк */}
                        <div className="h-24 flex-shrink-0 overflow-hidden my-2">
                          <p className="text-xs text-gray-700 leading-relaxed line-clamp-5">
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
              const subject = subjects[index]
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
                    ${isCenter ? '' : 'hover:opacity-80'}
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
                    className={`bg-white rounded-[2rem] group border-2 ${subject.borderColor} shadow-lg relative overflow-hidden glow-effect inline-block`}
                    style={{
                      maxWidth: isCenter ? '500px' : '300px',
                      width: 'fit-content',
                      transformStyle: 'flat'
                    }}
                  >
                    {/* Фоновое изображение - затухает при hover */}
                    <div 
                      className="relative transition-opacity duration-500 group-hover:opacity-0"
                      style={{
                        zIndex: 1,
                        display: 'block'
                      }}
                    >
                      <img
                        src={subject.backgroundImage}
                        alt={subject.name}
                        className="block object-contain rounded-[2rem]"
                        style={{
                          maxWidth: isCenter ? '500px' : '300px',
                          width: 'auto',
                          height: 'auto',
                          display: 'block'
                        }}
                        onLoad={(e) => {
                          // Убеждаемся, что контейнер соответствует размеру изображения
                          const img = e.currentTarget
                          const width = img.offsetWidth
                          const height = img.offsetHeight
                          if (width && height && width > 0 && height > 0) {
                            const container = img.closest('.group') as HTMLElement
                            if (container) {
                              container.style.width = `${width}px`
                              container.style.height = `${height}px`
                            }
                          }
                        }}
                      />
                    </div>
                    
                    {/* Белый фон - появляется при hover */}
                    <div 
                      className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" 
                      style={{ 
                        zIndex: 5
                      }}
                    ></div>
                    
                    {/* Контент - появляется при hover */}
                    <div 
                      className="absolute top-0 left-0 right-0 bottom-0 z-20 flex flex-col justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 rounded-[2rem] overflow-y-auto"
                      style={{
                        isolation: 'isolate',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'geometricPrecision',
                        imageRendering: 'crisp-edges',
                        transform: 'none',
                        WebkitTransform: 'none',
                        willChange: 'opacity',
                        backfaceVisibility: 'visible',
                        perspective: 'none'
                      }}
                    >
                      <div className="text-center" style={{ 
                        transform: 'none',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'geometricPrecision',
                        imageRendering: 'crisp-edges'
                      }}>
                        <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-3xl flex items-center justify-center mx-auto mb-3 text-3xl group-hover:animate-wiggle shadow-lg`}>
                          {subject.icon}
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2" style={{ 
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',
                          textRendering: 'geometricPrecision',
                          transform: 'none',
                          imageRendering: 'crisp-edges',
                          fontSize: '1.25rem',
                          lineHeight: '1.5'
                        }}>
                          {subject.name}
                        </h3>
                        <p className="text-gray-600 font-medium text-sm mb-3" style={{ 
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',
                          textRendering: 'geometricPrecision',
                          transform: 'none',
                          imageRendering: 'crisp-edges',
                          fontSize: '0.875rem',
                          lineHeight: '1.5'
                        }}>
                          {subject.description}
                        </p>
                        <p className="text-gray-700 text-xs leading-relaxed" style={{ 
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale',
                          textRendering: 'geometricPrecision',
                          fontWeight: 500,
                          transform: 'none',
                          imageRendering: 'crisp-edges',
                          fontSize: '0.75rem',
                          lineHeight: '1.6'
                        }}>
                          {subject.fullDescription}
                        </p>
                      </div>
                    
                      <div className={`${subject.bgColor} rounded-3xl p-3 mb-3 shadow-md mt-3`}>
                        <div className="text-center">
                          <div className="text-lg font-black text-yellow-800 mb-1">
                            {subject.stats}
                          </div>
                          <div className="text-xs text-yellow-700 font-semibold">
                            за последний год
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Индикатор центральной карточки */}
                  {isCenter && (
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-yellow-600">
                        {index + 1} / {subjects.length}
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
            {subjects.map((_, index) => (
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
                aria-label={`Перейти к предмету ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}