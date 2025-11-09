export default function AdvantagesGrid() {
  const advantages = [
    {
      icon: "🎓",
      title: "Опытные репетиторы",
      description: "Преподаватели с опытом подготовки к экзаменам",
      color: "from-yellow-800 to-yellow-950",
      stats: "Средний стаж 10+ лет"
    },
    {
      icon: "💻",
      title: "Комбинированные занятия",
      description: "Ученик может прийти очно, так и подключиться дистанционно",
      color: "from-yellow-400 to-yellow-600",
      stats: "Очно и онлайн"
    },
    {
      icon: "🏆",
      title: "Высокие результаты",
      description: "Наши ученики набирают на 17 баллов больше, чем другие",
      color: "from-yellow-600 to-yellow-800",
      stats: "1000+ выпускников"
    },
    {
      icon: "👥",
      title: "Мини-группы 2-3 чел",
      description: "Максимум внимания от преподавателя каждому ученику",
      color: "from-yellow-500 to-yellow-600",
      stats: "До 6 человек"
    },
    {
      icon: "🎯",
      title: "Индивидуальный подход",
      description: "Программа адаптируется под уровень и цели каждого ученика",
      color: "from-yellow-400 to-yellow-500",
      stats: "Персональный план"
    },
    {
      icon: "📚",
      title: "Авторские методики",
      description: "Проверенные программы подготовки к ЕГЭ и ОГЭ",
      color: "from-yellow-600 to-yellow-700",
      stats: "7 лет разработки"
    },
    {
      icon: "⏰",
      title: "Гибкое расписание",
      description: "Подберем удобное время для занятий",
      color: "from-yellow-700 to-yellow-800",
      stats: "7 дней в неделю"
    },
    {
      icon: "💡",
      title: "Современные материалы",
      description: "Актуальные задания и тесты по формату экзаменов",
      color: "from-yellow-400 to-yellow-600",
      stats: "Обновляется ежегодно"
    },
    {
      icon: "📊",
      title: "Контроль прогресса",
      description: "Тестирования и отчеты для родителей",
      color: "from-yellow-500 to-yellow-700",
      stats: "Еженедельные отчеты"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-yellow-50 to-white relative overflow-hidden pt-40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto relative z-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 animate-slide-in-up relative z-30">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Наши преимущества
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up relative z-30 px-4">
            Почему родители и ученики выбирают центр «Эталон»
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center items-stretch">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="card-lying rounded-3xl p-6 md:p-8 group animate-zoom-in w-full max-w-md hover-lift h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className={`w-20 h-20 bg-gradient-to-r ${advantage.color} rounded-3xl flex items-center justify-center mb-5 text-4xl group-hover:animate-wiggle transition-all duration-300`}>
                  {advantage.icon}
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                
                <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed flex-grow">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительный блок с ключевыми цифрами */}
        <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { number: "7", label: "лет на рынке", icon: "📅" },
            { number: "1000+", label: "довольных учеников", icon: "😊" },
            { number: "25+", label: "опытных репетиторов", icon: "👨‍🏫" },
            { number: "10", label: "предметов", icon: "📚" }
          ].map((stat, index) => (
            <div
              key={index}
              className="card-lying rounded-3xl p-6 md:p-8 text-center animate-zoom-in hover-lift"
              style={{ animationDelay: `${(advantages.length + index) * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl mb-4 animate-bounce-in">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-yellow-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-700 font-bold leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

