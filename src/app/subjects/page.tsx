'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'

export default function SubjectsPage() {
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
      backgroundImage: "/math.jpg"
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
      backgroundImage: "/physic.jpg"
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
      backgroundImage: "/chemistry.jpg"
    },
    {
      name: "Информатика",
      icon: "💻",
      description: "Программирование, алгоритмы, подготовка к ЕГЭ и ОГЭ",
      fullDescription: "Готовим учеников к ОГЭ и ЕГЭ по информатике, разбираем школьную программу, учим логике, алгоритмам и мышлению, которое помогает не только на экзаменах, но и в жизни. Преподаватели объясняют доступно, поэтапно и с примерами!",
      color: "from-yellow-800 to-yellow-900",
      bgColor: "bg-yellow-400",
      borderColor: "border-orange-200",
      stats: "Средний балл: 88",
      duration: "2 часа",
      frequency: "1 раз в неделю",
      backgroundImage: "/informatic.jpg"
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
      backgroundImage: "/society.jpg"
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
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
      duration: "2 часа",
      frequency: "1 раз в неделю",
      backgroundImage: "/english.jpg"
    }
  ]

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
  <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-12 md:pb-16">
        <div className="text-center mb-10 sm:mb-14 md:mb-20 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Предметы
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Подготовка по всем основным предметам ЕГЭ и ОГЭ с опытными преподавателями
          </p>
        </div>

        {/* Мобильная версия - горизонтальный скроллинг с видимым описанием */}
        <div className="lg:hidden relative">
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory" 
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-4 pr-4" style={{ width: 'max-content' }}>
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  data-card-index={index}
                  className={`bg-white rounded-3xl border-2 ${subject.borderColor} shadow-xl overflow-hidden flex-shrink-0 animate-zoom-in snap-center flex flex-col h-[520px]`}
                  style={{ 
                    width: 'calc(100vw - 2rem)',
                    maxWidth: '400px',
                    animationDelay: `${index * 0.1}s` 
                  }}
                >
                  {/* Фоновое изображение - фиксированная высота */}
                  <div className="relative w-full h-40 flex-shrink-0 overflow-hidden">
                    <img
                      src={subject.backgroundImage}
                      alt={subject.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Контент карточки - всегда видимый на мобильных */}
                  <div className="p-4 bg-white flex flex-col flex-grow">
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

        {/* Десктопная версия - сетка с hover эффектом */}
        <div className="hidden lg:grid grid-cols-3 gap-8 justify-items-center">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl group animate-zoom-in border-2 ${subject.borderColor} shadow-lg relative overflow-hidden min-h-96 hover-lift glow-effect`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Фоновое изображение - затухает при hover */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500 group-hover:opacity-0"
                style={{
                  backgroundImage: `url(${subject.backgroundImage})`,
                  zIndex: 1
                }}
              />
              
              {/* Белый фон - появляется при hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"></div>
              
              {/* Контент - появляется при hover */}
              <div className="relative z-10 h-full flex flex-col justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl`}>
                    {subject.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm mb-3">
                    {subject.description}
                  </p>
                  <p className="text-gray-700 text-xs leading-relaxed mb-3">
                    {subject.fullDescription}
                  </p>
                </div>
              
                <div className={`${subject.bgColor} rounded-2xl p-3 mb-3`}>
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
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="card-lying rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-4 sm:mb-6">
              Готовы начать подготовку?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Запишитесь на бесплатное тестирование и получите персональные рекомендации по выбору предметов
            </p>
            <div className="flex justify-center">
              <Link
                href="/contacts"
                className="btn-primary btn-magic text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-3 sm:py-4 group"
              >
                <span className="flex items-center space-x-2 sm:space-x-3">
                  <span>Записаться</span>
                  <span className="md:group-hover:animate-wiggle">📊</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}