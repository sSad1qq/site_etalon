export default function StatsComparison() {
  const stats = [
    { 
      label: "Средний балл ЕГЭ", 
      ourValue: 80, 
      averageValue: 62, 
      color: "from-yellow-400 to-yellow-500",
      icon: "📊",
      description: "Наши выпускники показывают результаты на 18 баллов выше среднего",
      isPoints: true
    },
    { 
      label: "Средний результат ОГЭ", 
      ourValue: 4.6, 
      averageValue: 3.5, 
      color: "from-yellow-500 to-yellow-600",
      icon: "📈",
      description: "Превышаем на 1.1 балл средние показатели по стране",
      isFivePointScale: true
    },
    { 
      label: "Поступление в вузы", 
      ourValue: 95, 
      averageValue: 78, 
      color: "from-yellow-600 to-yellow-700",
      icon: "🎓",
      description: "95% наших выпускников поступают в выбранные вузы"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white via-yellow-100 to-white relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-200 rounded-full opacity-10 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-yellow-300 rounded-full opacity-10 animate-float-slow"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto mb-12 md:mb-20">
          <div className="animate-slide-in-left w-full">
            <div className="card-lying rounded-[2rem] p-4 sm:p-6 md:p-8 relative overflow-hidden hover-lift bg-white">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-2xl sm:text-3xl font-black mb-2 bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Сравнение результатов
                </h3>
                <p className="text-sm sm:text-base text-gray-600">Наши показатели vs средние по стране</p>
              </div>
              
              <div className="space-y-6 md:space-y-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-3xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover-lift">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="text-xl sm:text-2xl">{stat.icon}</div>
                        <span className="text-base sm:text-lg font-bold text-gray-800">{stat.label}</span>
                      </div>
                      <div className="flex items-center justify-end space-x-2 sm:space-x-3 w-full sm:w-auto">
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-black text-yellow-600">
                            {stat.isFivePointScale ? stat.ourValue.toFixed(1) : stat.isPoints ? stat.ourValue : `${stat.ourValue}%`}
                          </div>
                          <div className="text-xs text-gray-500">Наши</div>
                        </div>
                        <div className="text-gray-300 text-xl sm:text-2xl">|</div>
                        <div className="text-center">
                          <div className="text-lg sm:text-xl font-bold text-gray-600">
                            {stat.isFivePointScale ? stat.averageValue.toFixed(1) : stat.isPoints ? stat.averageValue : `${stat.averageValue}%`}
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
                              : stat.isPoints 
                                ? `+${stat.ourValue - stat.averageValue}` 
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
                                {stat.isFivePointScale ? stat.ourValue.toFixed(1) : stat.isPoints ? stat.ourValue : `${stat.ourValue}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Средние по стране */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Средние по стране</span>
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
                                {stat.isFivePointScale ? stat.averageValue.toFixed(1) : stat.isPoints ? stat.averageValue : `${stat.averageValue}%`}
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