export default function AdvantagesGrid() {
  const advantages = [
    {
      icon: "🎯",
      title: "Индивидуальный подход",
      description: "Программа адаптируется под уровень и цели каждого ученика",
      color: "from-yellow-400 to-yellow-500",
      stats: "Персональный план"
    },
    {
      icon: "👥",
      title: "Мини-группы 2-3 чел",
      description: "Максимум внимания от преподавателя каждому ученику",
      color: "from-yellow-500 to-yellow-600",
      stats: "До 6 человек"
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
      description: "Регулярные тестирования и отчеты для родителей",
      color: "from-yellow-500 to-yellow-700",
      stats: "Еженедельные отчеты"
    },
    {
      icon: "🏆",
      title: "Высокие результаты",
      description: "Средний балл выпускников выше на 23 балла",
      color: "from-yellow-600 to-yellow-800",
      stats: "1000+ выпускников"
    },
    {
      icon: "💬",
      title: "Поддержка 24/7",
      description: "Ответим на вопросы в любое время",
      color: "from-yellow-700 to-yellow-900",
      stats: "Всегда на связи"
    },
    {
      icon: "🎓",
      title: "Опытные педагоги",
      description: "Преподаватели с опытом подготовки к экзаменам",
      color: "from-yellow-800 to-yellow-950",
      stats: "Средний стаж 10+ лет"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-yellow-50 to-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Наши преимущества
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Почему родители и ученики выбирают образовательный центр «Эталон»
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="card-lying rounded-3xl p-8 group animate-zoom-in w-full max-w-md hover-lift h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className={`w-20 h-20 bg-gradient-to-r ${advantage.color} rounded-3xl flex items-center justify-center mb-5 text-4xl group-hover:animate-wiggle transition-all duration-300`}>
                  {advantage.icon}
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                
                <p className="text-gray-700 mb-4 leading-relaxed flex-grow">
                  {advantage.description}
                </p>
                
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl px-4 py-2 mt-auto w-full">
                  <p className="text-sm font-bold text-yellow-800">
                    {advantage.stats}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Дополнительный блок с ключевыми цифрами */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { number: "7", label: "лет на рынке", icon: "📅" },
            { number: "1000+", label: "довольных учеников", icon: "😊" },
            { number: "15+", label: "опытных педагогов", icon: "👨‍🏫" },
            { number: "10", label: "предметов", icon: "📚" }
          ].map((stat, index) => (
            <div
              key={index}
              className="card-lying rounded-3xl p-8 text-center animate-zoom-in hover-lift"
              style={{ animationDelay: `${(advantages.length + index) * 0.1}s` }}
            >
              <div className="text-5xl mb-4 animate-bounce-in">{stat.icon}</div>
              <div className="text-4xl font-black text-yellow-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

