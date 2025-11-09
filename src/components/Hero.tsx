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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
              Готовим к{' '}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                ЕГЭ и ОГЭ
              </span>
              <br />
              без стресса
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Центр «Эталон» — эффективная подготовка к выпускным экзаменам 
              в мини-группах и индивидуально. Более 1000 довольных учеников!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start mb-6 md:mb-8">
              <Link 
                href="/contacts" 
                className="btn-primary text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 md:py-4 group inline-flex items-center justify-center w-full sm:w-auto"
              >
                <span className="flex items-center space-x-2">
                  <span className="whitespace-nowrap">Записаться на тестирование</span>
                  <span className="group-hover:animate-wiggle text-xl md:text-2xl">🚀</span>
                </span>
              </Link>
              
              <Link 
                href="/about" 
                className="btn-secondary text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 md:py-4 group inline-flex items-center justify-center hover:text-gray-900 w-full sm:w-auto"
              >
                <span className="flex items-center space-x-2">
                  <span>Узнать больше</span>
                  <span className="group-hover:animate-wiggle text-xl md:text-2xl">📖</span>
                </span>
              </Link>
            </div>
            
            {/* Статистика */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto md:mx-0">
              <div className="text-center card-lying rounded-3xl p-3 sm:p-4 hover-lift">
                <div className="text-xl sm:text-2xl font-black text-yellow-600 mb-1">1000+</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Выпускников</div>
              </div>
              <div className="text-center card-lying rounded-3xl p-3 sm:p-4 hover-lift">
                <div className="text-xl sm:text-2xl font-black text-yellow-600 mb-1">7</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Лет на рынке</div>
              </div>
              <div className="text-center card-lying rounded-3xl p-3 sm:p-4 hover-lift">
                <div className="text-xl sm:text-2xl font-black text-yellow-600 mb-1">20+</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-tight">Балов за месяц</div>
              </div>
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
