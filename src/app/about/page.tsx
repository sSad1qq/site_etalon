'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

export default function AboutPage() {
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0)
  const [photoScrollIndex, setPhotoScrollIndex] = useState(0)
  const [familyScrollIndex, setFamilyScrollIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const photoScrollContainerRef = useRef<HTMLDivElement>(null)
  const familyScrollContainerRef = useRef<HTMLDivElement>(null)
  
  const familyItems = [
    {
      icon: "🤝",
      title: "Взаимоподдержка",
      description: "Всегда готовы помочь и поддержать",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: "😊",
      title: "Позитивная атмосфера",
      description: "Учимся с удовольствием и радостью",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: "🎉",
      title: "Совместные праздники",
      description: "Отмечаем успехи и важные события",
      color: "from-yellow-600 to-yellow-700"
    }
  ]
  const achievements = [
    {
      year: "2014",
      title: "Основание центра",
      description: "Открытие образовательного центра «Эталон» с фокусом на качественную подготовку к ЕГЭ и ОГЭ"
    },
    {
      year: "2017",
      title: "1000+ выпускников",
      description: "Достижение важной вехи - более 1000 успешных выпускников поступили в ведущие вузы страны"
    },
    {
      year: "2019",
      title: "Расширение программы",
      description: "Добавление новых предметов и внедрение современных методик обучения"
    },
    {
      year: "2021",
      title: "200+ выпускников ежегодно",
      description: "Преодолели отметку в 200 выпускников в год — стабильный рост и доверие родителей"
    },
    {
      year: "2023",
      title: "85+ средний балл",
      description: "Достижение рекордного среднего балла ЕГЭ среди наших выпускников"
    },
    {
      year: "2024",
      title: "95% поступлений",
      description: "95% наших выпускников успешно поступили в выбранные вузы"
    }
  ]

  // Отслеживание скролла на мобильной версии
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

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
      
      setMobileScrollIndex(closestIndex)
    }

    let rafId: number | null = null
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateIndex()
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
  }, [achievements.length])

  // Отслеживание скролла фотографий на мобильной версии
  useEffect(() => {
    const container = photoScrollContainerRef.current
    if (!container) return

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
      
      setPhotoScrollIndex(closestIndex)
    }

    let rafId: number | null = null
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateIndex()
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
  }, [])

  // Отслеживание скролла карточек "семья" на мобильной версии
  useEffect(() => {
    const container = familyScrollContainerRef.current
    if (!container) return

    const updateIndex = () => {
      const currentContainer = familyScrollContainerRef.current
      if (!currentContainer) return
      
      const containerRect = currentContainer.getBoundingClientRect()
      // Проверяем, что контейнер видим
      if (containerRect.width === 0) return
      
      const containerCenter = containerRect.left + containerRect.width / 2
      
      const cards = currentContainer.querySelectorAll('[data-family-index]')
      let closestIndex = 0
      let closestDistance = Infinity
      
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(cardCenter - containerCenter)
        
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = parseInt(card.getAttribute('data-family-index') || '0')
        }
      })
      
      setFamilyScrollIndex(closestIndex)
    }

    let rafId: number | null = null
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateIndex()
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
    
    // Инициализация с задержкой
    updateIndex()
    const timeoutId1 = setTimeout(updateIndex, 100)
    const timeoutId2 = setTimeout(updateIndex, 300)

    return () => {
      container.removeEventListener('scroll', onScroll)
      if ('onscrollend' in container) {
        container.removeEventListener('scrollend', updateIndex)
      }
      window.removeEventListener('resize', onResize)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
    }
  }, [])

  return (
  <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-12 md:pb-16">
        {/* Заголовок */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 animate-slide-in-up text-center">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              О центре «Эталон»
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up text-center">
            Более 10 лет мы помогаем школьникам достигать высоких результатов на экзаменах
          </p>
        </div>

        {/* История центра */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">Наша история</h2>
          
          {/* Мобильная версия - горизонтальный скролл */}
          <div className="lg:hidden relative">
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide" 
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {achievements.map((achievement, index) => (
                  <div
                    key={`mobile-${index}`}
                    data-card-index={index}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                  >
                    <div className="card-lying rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 animate-zoom-in bg-white h-[280px] sm:h-[300px] md:h-[320px] flex flex-col">
                      <div className="text-2xl sm:text-3xl font-black text-yellow-600 mb-3 sm:mb-4 flex-shrink-0">
                        {achievement.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4 flex-shrink-0">
                        {achievement.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex-grow">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Индикаторы-точки внизу */}
            <div className="flex justify-center gap-2 mt-4 px-4">
              {achievements.map((_, index) => (
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

          {/* Десктопная версия - временная линия */}
          <div className="hidden lg:block relative">
            {/* Временная линия */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
            
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center lg:items-center ${
                    index % 2 === 0 ? 'lg:flex-row lg:justify-start' : 'lg:flex-row-reverse lg:justify-end'
                  }`}
                >
                  <div className={`w-full max-w-md mx-auto lg:max-w-none lg:w-1/2 lg:mx-0 ${
                    index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                  }`}>
                    <div className="card-lying rounded-3xl p-8 animate-zoom-in">
                      <div className="text-3xl font-black text-yellow-600 mb-4">
                        {achievement.year}
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-4">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Точка на линии времени */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-yellow-500 rounded-full"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Дружелюбная атмосфера */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">Дружелюбная атмосфера</h2>
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
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex gap-4" style={{ width: 'max-content' }}>
                {[
                  { src: "/dosug_1.jpeg", alt: "Команда центра на мероприятии", caption: "Совместные праздники и мероприятия" },
                  { src: "/dosug_2.jpeg", alt: "Преподаватели с учениками", caption: "Неформальное общение с учениками" },
                  { src: "/dosug_3.jpeg", alt: "Командная работа", caption: "Работа в команде и взаимоподдержка" },
                  { src: "/dosug_4.jpeg", alt: "Творческие моменты", caption: "Творческие проекты и инициативы" },
                  { src: "/dosug_5.jpeg", alt: "Дружеское общение", caption: "Дружеское общение вне занятий" },
                  { src: "/dosug_6.jpeg", alt: "Совместные достижения", caption: "Празднование успехов и достижений" }
                ].map((photo, index) => (
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
              {[...Array(6)].map((_, index) => (
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
            {[
              { src: "/dosug_1.jpeg", alt: "Команда центра на мероприятии", caption: "Совместные праздники и мероприятия" },
              { src: "/dosug_2.jpeg", alt: "Преподаватели с учениками", caption: "Неформальное общение с учениками" },
              { src: "/dosug_3.jpeg", alt: "Командная работа", caption: "Работа в команде и взаимоподдержка" },
              { src: "/dosug_4.jpeg", alt: "Творческие моменты", caption: "Творческие проекты и инициативы" },
              { src: "/dosug_5.jpeg", alt: "Дружеское общение", caption: "Дружеское общение вне занятий" },
              { src: "/dosug_6.jpeg", alt: "Совместные достижения", caption: "Празднование успехов и достижений" }
            ].map((photo, index) => (
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
          
          <div className="mt-8 sm:mt-10 md:mt-12">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4 text-center">
              Мы не просто учим — мы создаем семью
            </h3>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 text-center">
              Каждый ученик для нас — часть большой дружной семьи.
            </p>
            
            {/* Мобильная версия - горизонтальный скролл */}
            <div className="md:hidden relative">
              <div 
                ref={familyScrollContainerRef}
                className="overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide" 
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="flex gap-4" style={{ width: 'max-content' }}>
                  {familyItems.map((item, index) => (
                    <div
                      key={`family-mobile-${index}`}
                      data-family-index={index}
                      className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-sm snap-center"
                    >
                      <div className="card-lying rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 animate-zoom-in bg-white h-[200px] sm:h-[210px] md:h-[220px] flex flex-col items-center justify-center text-center">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 text-2xl sm:text-3xl`}>
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Индикаторы-точки внизу */}
              <div className="flex justify-center gap-2 mt-4 px-4">
                {familyItems.map((_, index) => (
                  <div
                    key={`family-indicator-${index}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === familyScrollIndex 
                        ? 'bg-yellow-500 w-6 scale-110' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Десктопная версия - сетка */}
            <div className="hidden md:block">
              <div className="card-lying rounded-3xl p-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-3 gap-6 text-center">
                  {familyItems.map((item, index) => (
                    <div key={`family-desktop-${index}`} className="flex flex-col items-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-4 text-3xl`}>
                        {item.icon}
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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