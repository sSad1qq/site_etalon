'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - Текст */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Готовим к{' '}
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                ЕГЭ и ОГЭ
              </span>
              <br />
              без стресса
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Образовательный центр «Эталон» — эффективная подготовка к выпускным экзаменам 
              в мини-группах и индивидуально. Более 1000 довольных учеников!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link 
                href="/contacts" 
                className="btn-primary text-lg px-8 py-4 group inline-flex items-center justify-center"
              >
                <span className="flex items-center space-x-2">
                  <span>Записаться на тестирование</span>
                  <span className="group-hover:animate-wiggle">🚀</span>
                </span>
              </Link>
              
              <Link 
                href="/about" 
                className="btn-secondary text-lg px-8 py-4 group inline-flex items-center justify-center"
              >
                <span className="flex items-center space-x-2">
                  <span>Узнать больше</span>
                  <span className="group-hover:animate-wiggle">📖</span>
                </span>
              </Link>
            </div>
            
            {/* Статистика */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center card-lying rounded-3xl p-4 hover-lift">
                <div className="text-2xl font-black text-yellow-600">1000+</div>
                <div className="text-sm text-gray-600">Выпускников</div>
              </div>
              <div className="text-center card-lying rounded-3xl p-4 hover-lift">
                <div className="text-2xl font-black text-yellow-600">7</div>
                <div className="text-sm text-gray-600">Лет опыта</div>
              </div>
              <div className="text-center card-lying rounded-3xl p-4 hover-lift">
                <div className="text-2xl font-black text-yellow-600">+10</div>
                <div className="text-sm text-gray-600">Средний балл</div>
              </div>
            </div>
          </div>
          
          {/* Правая колонка - Изображение совы */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-[3rem] p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover-lift">
                <Image
                  src="/sova.png"
                  alt="Сова - символ мудрости и знаний"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-sm mx-auto"
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
