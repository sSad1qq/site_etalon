export default function StatsComparison() {
  const stats = [
    { 
      label: "Средний балл ЕГЭ", 
      ourValue: 85, 
      averageValue: 62, 
      color: "from-yellow-400 to-yellow-500",
      icon: "📊",
      description: "Наши выпускники показывают результаты на 23 балла выше среднего"
    },
    { 
      label: "Средний результат ОГЭ", 
      ourValue: 4.6, 
      averageValue: 3.5, 
      color: "from-yellow-500 to-yellow-600",
      icon: "📈",
      description: "Превышаем общероссийские показатели на 1.1 балла",
      isFivePointScale: true
    },
    { 
      label: "Поступление в вузы", 
      ourValue: 95, 
      averageValue: 78, 
      color: "from-yellow-600 to-yellow-700",
      icon: "🎓",
      description: "95% наших выпускников поступают в выбранные вузы"
    },
    { 
      label: "Удовлетворенность", 
      ourValue: 98, 
      averageValue: 72, 
      color: "from-yellow-700 to-yellow-800",
      icon: "😊",
      description: "Почти все родители рекомендуют нас друзьям"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-200 rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-yellow-300 rounded-full opacity-10 animate-float-slow"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Средние баллы — сравнение
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Наши результаты против общероссийских показателей — цифры не врут
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="animate-slide-in-left w-full">
            <div className="card-lying rounded-[2rem] p-8 relative overflow-hidden hover-lift">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black text-gray-900 mb-2">
                  Сравнение результатов
                </h3>
                <p className="text-gray-600">Наши показатели vs общероссийские</p>
              </div>
              
              <div className="space-y-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-50 to-white rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{stat.icon}</div>
                        <span className="text-lg font-bold text-gray-800">{stat.label}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <div className="text-2xl font-black text-yellow-600">
                            {stat.isFivePointScale ? stat.ourValue.toFixed(1) : `${stat.ourValue}%`}
                          </div>
                          <div className="text-xs text-gray-500">Наши</div>
                        </div>
                        <div className="text-gray-300 text-2xl">|</div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-600">
                            {stat.isFivePointScale ? stat.averageValue.toFixed(1) : `${stat.averageValue}%`}
                          </div>
                          <div className="text-xs text-gray-500">Среднее</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Наши результаты */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Наши результаты</span>
                          <span className="font-bold text-yellow-600">
                            {stat.isFivePointScale 
                              ? `+${(stat.ourValue - stat.averageValue).toFixed(1)}` 
                              : `+${stat.ourValue - stat.averageValue}%`}
                          </span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                              className="progress-our h-6 rounded-full transition-all duration-2000 ease-out animate-pulse-glow flex items-center justify-end pr-2"
                              style={{ 
                                width: `${stat.isFivePointScale ? (stat.ourValue / 5 * 100) : stat.ourValue}%`,
                                background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                                backgroundImage: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                                backgroundColor: '#fbbf24'
                              }}
                            >
                              <span className="text-white text-xs font-bold">
                                {stat.isFivePointScale ? stat.ourValue.toFixed(1) : `${stat.ourValue}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Средние по стране */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Общероссийские показатели</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div
                              className="progress-average h-4 rounded-full transition-all duration-2000 ease-out flex items-center justify-end pr-2"
                              style={{ 
                                width: `${stat.isFivePointScale ? (stat.averageValue / 5 * 100) : stat.averageValue}%`,
                                background: 'linear-gradient(to right, #9ca3af, #6b7280)',
                                backgroundImage: 'linear-gradient(to right, #9ca3af, #6b7280)',
                                backgroundColor: '#9ca3af'
                              }}
                            >
                              <span className="text-white text-xs font-bold">
                                {stat.isFivePointScale ? stat.averageValue.toFixed(1) : `${stat.averageValue}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-3 italic">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}