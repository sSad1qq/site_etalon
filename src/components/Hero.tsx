'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 py-8 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Левая колонка - Текст */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 md:mb-3 leading-tight">
              Рост на{' '}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                18 баллов
              </span>
              <br />
              уже за первый месяц
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium mb-4 md:mb-6">
              Подготовка к ЕГЭ и ОГЭ без стресса в Пензе
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Центр «Эталон» — эффективная подготовка к выпускным экзаменам 
              в мини-группах и индивидуально. 1289 довольных учеников!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start mb-6 md:mb-8">
              <Link 
                href="/contacts" 
                className="btn-primary text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 md:py-4 group inline-flex items-center justify-center w-full sm:w-auto"
              >
                <span className="flex items-center space-x-2">
                  <span className="whitespace-nowrap">Бесплатная консультация</span>
                  <span className="md:group-hover:animate-wiggle text-xl md:text-2xl">🚀</span>
                </span>
              </Link>
              
              <Link 
                href="/about" 
                className="btn-secondary text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 md:py-4 group inline-flex items-center justify-center md:hover:text-gray-900 w-full sm:w-auto"
              >
                <span className="flex items-center space-x-2">
                  <span>Узнать больше</span>
                  <span className="md:group-hover:animate-wiggle text-xl md:text-2xl">📖</span>
                </span>
              </Link>
            </div>
            
            {/* Статистика - только мобильная версия */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto md:hidden">
              {[
                { number: "7", label: "лет на рынке", icon: "📅" },
                { number: "1289", label: "довольных учеников", icon: "😊" },
                { number: "27", label: "репетиторов", icon: "👨‍🏫" },
                { number: "10", label: "предметов", icon: "📚" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="card-lying rounded-3xl p-3 text-center hover-lift bg-white"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-black text-yellow-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-700 font-bold leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Правая колонка - Изображение совы */}
          <div className="flex justify-center order-1 md:order-2 -mt-8 md:mt-0">
            <div className="relative w-full max-w-[450px] sm:max-w-[500px] md:max-w-[500px]">
              {/* Фоновое свечение */}
              <div className="absolute -inset-8 md:-inset-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-3xl opacity-20 -z-10"></div>
              
              {/* Контейнер изображения */}
              <div className="relative w-full h-[280px] md:h-auto rounded-3xl overflow-hidden">
                <Image
                  src="/sova.png"
                  alt="Сова - символ мудрости и знаний"
                  width={1024}
                  height={1536}
                  className="w-full h-full object-cover object-top md:object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-200 rounded-full opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-300 rounded-full opacity-10"></div>
      </div>
    </section>
  )
}
