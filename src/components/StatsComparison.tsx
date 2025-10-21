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
      label: "Средний балл ОГЭ", 
      ourValue: 88, 
      averageValue: 65, 
      color: "from-yellow-500 to-yellow-600",
      icon: "📈",
      description: "Превышаем общероссийские показатели на 23 балла"
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
      {/* Декоративные элементы */}
      <div className="absolute top-20 left-20 text-7xl opacity-10 animate-float">📊</div>
      <div className="absolute bottom-20 right-20 text-6xl opacity-10 animate-float-slow">🎯</div>
      <div className="absolute top-1/2 right-10 text-5xl opacity-10 animate-float">⭐</div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20 justify-items-center">
          {/* Левая колонка - График */}
          <div className="animate-slide-in-left w-full">
            <div className="card-lying rounded-3xl p-8 relative overflow-hidden">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black text-gray-900 mb-2">
                  Сравнение результатов
                </h3>
                <p className="text-gray-600">Наши показатели vs общероссийские</p>
              </div>
              
              <div className="space-y-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-50 to-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{stat.icon}</div>
                        <span className="text-lg font-bold text-gray-800">{stat.label}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <div className="text-2xl font-black text-yellow-600">{stat.ourValue}%</div>
                          <div className="text-xs text-gray-500">Наши</div>
                        </div>
                        <div className="text-gray-300 text-2xl">|</div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-600">{stat.averageValue}%</div>
                          <div className="text-xs text-gray-500">Среднее</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Наши результаты */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Наши результаты</span>
                          <span className="font-bold text-yellow-600">+{stat.ourValue - stat.averageValue}%</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div
                              className="progress-our h-6 rounded-full transition-all duration-2000 ease-out animate-pulse-glow flex items-center justify-end pr-2"
                              style={{ 
                                width: `${stat.ourValue}%`,
                                background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                                backgroundImage: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                                backgroundColor: '#fbbf24'
                              }}
                            >
                              <span className="text-white text-xs font-bold">{stat.ourValue}%</span>
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
                                width: `${stat.averageValue}%`,
                                background: 'linear-gradient(to right, #9ca3af, #6b7280)',
                                backgroundImage: 'linear-gradient(to right, #9ca3af, #6b7280)',
                                backgroundColor: '#9ca3af'
                              }}
                            >
                              <span className="text-white text-xs font-bold">{stat.averageValue}%</span>
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

          {/* Правая колонка - Ключевые факты */}
          <div className="space-y-8 animate-slide-in-right w-full">
            <div className="card-lying rounded-3xl p-8 text-center">
              <h3 className="text-3xl font-black text-gray-900 mb-6">
                Почему мы эффективнее?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Наши методики и подходы дают результат в 1.5-2 раза выше среднего
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-4 text-white">
                  <div className="text-3xl font-black">23+</div>
                  <div className="text-sm">баллов выше</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-4 text-white">
                  <div className="text-3xl font-black">95%</div>
                  <div className="text-sm">поступают</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { icon: "🎯", title: "Индивидуальный подход", desc: "Программа под каждого ученика", color: "from-yellow-400 to-yellow-500" },
                { icon: "👥", title: "Мини-группы", desc: "Максимум внимания каждому", color: "from-yellow-500 to-yellow-600" },
                { icon: "📚", title: "Проверенные методики", desc: "7 лет опыта и результатов", color: "from-yellow-600 to-yellow-700" },
                { icon: "💡", title: "Современные технологии", desc: "Интерактивные материалы и тесты", color: "from-yellow-700 to-yellow-800" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="card-lying rounded-2xl p-6 group animate-zoom-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-2xl group-hover:animate-wiggle`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900 mb-2 text-lg">{item.title}</h4>
                      <p className="text-sm text-gray-600 font-medium">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Дополнительная статистика */}
        <div className="card-lying rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Наше преимущество в цифрах
            </h3>
            <p className="text-lg text-gray-700">
              Конкретные показатели, которые говорят сами за себя
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: "23+", 
                label: "баллов выше среднего по ЕГЭ", 
                description: "Наши выпускники показывают результаты значительно выше общероссийских",
                color: "from-yellow-400 to-yellow-500", 
                icon: "📈" 
              },
              { 
                number: "17%", 
                label: "больше поступающих в вузы", 
                description: "Почти все наши выпускники успешно поступают в выбранные учебные заведения",
                color: "from-yellow-500 to-yellow-600", 
                icon: "🎓" 
              },
              { 
                number: "26%", 
                label: "выше удовлетворенность родителей", 
                description: "Родители довольны результатами и рекомендуют нас друзьям",
                color: "from-yellow-600 to-yellow-700", 
                icon: "😊" 
              }
            ].map((stat, index) => (
                      <div
                        key={index}
                        className="card-lying rounded-2xl p-8 animate-zoom-in text-center"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl group-hover:animate-wiggle`}>
                  {stat.icon}
                </div>
                <div className="text-5xl font-black text-yellow-600 mb-3 animate-pulse-glow">
                  {stat.number}
                </div>
                <div className="text-gray-800 font-bold text-lg mb-3">{stat.label}</div>
                <div className="text-gray-600 text-sm leading-relaxed">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}