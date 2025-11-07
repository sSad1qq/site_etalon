import Link from 'next/link'

export default function FormatsGrid() {
  const formats = [
    {
      icon: "👤",
      title: "Индивидуально",
      description: "Персональные занятия один на один с преподавателем",
      features: [
        "100% внимание педагога",
        "Гибкий график",
        "Индивидуальная программа",
        "Максимальная эффективность"
      ],
      popular: false,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: "👥",
      title: "Мини-группы",
      description: "Занятия в группах 2-3 человека по уровню знаний",
      features: [
        "Персональное внимание",
        "Комфортная атмосфера",
        "Мотивация от группы",
        "Доступная цена"
      ],
      popular: true,
      color: "from-yellow-400 to-yellow-500"
    },
    {
      icon: "💻",
      title: "Онлайн",
      description: "Дистанционные занятия через видеосвязь",
      features: [
        "Занятия из дома",
        "Экономия времени",
        "Интерактивная доска",
        "Запись уроков"
      ],
      popular: false,
      color: "from-yellow-600 to-yellow-700"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Форматы обучения
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Выберите удобный формат занятий или комбинируйте несколько вариантов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch">
          {formats.map((format, index) => (
            <div
              key={index}
              className={`card-lying rounded-3xl p-8 group animate-zoom-in w-full max-w-md relative overflow-hidden ${
                format.popular ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {format.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-bl-3xl rounded-tr-3xl font-bold text-sm">
                  🌟 Популярно
                </div>
              )}
              
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${format.color} rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl group-hover:animate-wiggle transition-all duration-300`}>
                    {format.icon}
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    {format.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {format.description}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-5 mb-6 flex-grow">
                  <ul className="space-y-3">
                    {format.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <span className="text-yellow-600 text-lg">✓</span>
                        <span className="text-gray-800 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center mt-auto">
                  <Link 
                    href="/contacts"
                    className="btn-primary w-full inline-block text-center hover-glow"
                  >
                    Записаться
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

