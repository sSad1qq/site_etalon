export default function AchievementsGrid() {
  const achievements = [
    {
      icon: "🏆",
      number: "100+",
      title: "Стобалльников",
      description: "Ученики, получившие максимальный балл по ЕГЭ",
      color: "from-yellow-400 to-yellow-500",
      gradient: "bg-gradient-to-br from-yellow-50 to-yellow-100"
    },
    {
      icon: "🎯",
      number: "95%",
      title: "Поступление в вузы",
      description: "Выпускники поступили в желаемые университеты",
      color: "from-yellow-500 to-yellow-600",
      gradient: "bg-gradient-to-br from-yellow-100 to-yellow-200"
    },
    {
      icon: "📈",
      number: "+23",
      title: "Баллов прирост",
      description: "Средний прирост баллов за курс обучения",
      color: "from-yellow-600 to-yellow-700",
      gradient: "bg-gradient-to-br from-yellow-200 to-yellow-300"
    },
    {
      icon: "⭐",
      number: "4.9",
      title: "Средняя оценка",
      description: "Рейтинг от учеников и родителей",
      color: "from-yellow-700 to-yellow-800",
      gradient: "bg-gradient-to-br from-yellow-300 to-yellow-400"
    },
    {
      icon: "🎓",
      number: "1000+",
      title: "Выпускников",
      description: "Успешно сдали экзамены с нашей помощью",
      color: "from-yellow-500 to-yellow-700",
      gradient: "bg-gradient-to-br from-yellow-150 to-yellow-250"
    },
    {
      icon: "📚",
      number: "10",
      title: "Предметов",
      description: "Готовим по всем основным дисциплинам",
      color: "from-yellow-600 to-yellow-800",
      gradient: "bg-gradient-to-br from-yellow-250 to-yellow-350"
    },
    {
      icon: "👨‍🏫",
      number: "15+",
      title: "Преподавателей",
      description: "Опытные педагоги с высшим образованием",
      color: "from-yellow-400 to-yellow-600",
      gradient: "bg-gradient-to-br from-yellow-100 to-yellow-300"
    },
    {
      icon: "⏰",
      number: "7",
      title: "Лет опыта",
      description: "Работаем и совершенствуем методики",
      color: "from-yellow-800 to-yellow-950",
      gradient: "bg-gradient-to-br from-yellow-400 to-yellow-500"
    },
    {
      icon: "💯",
      number: "98%",
      title: "Удовлетворенность",
      description: "Родители рекомендуют нас друзьям",
      color: "from-yellow-500 to-yellow-800",
      gradient: "bg-gradient-to-br from-yellow-200 to-yellow-400"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white via-amber-100 to-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Наши достижения
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Цифры и факты, которыми мы гордимся
          </p>
        </div>

        {/* Основные достижения */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-stretch mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`card-lying rounded-3xl p-8 group animate-zoom-in w-full max-w-md h-full ${achievement.gradient} hover-lift`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="text-center h-full flex flex-col">
                <div className={`w-20 h-20 bg-gradient-to-r ${achievement.color} rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl group-hover:animate-wiggle transition-all duration-300 shadow-lg`}>
                  {achievement.icon}
                </div>
                
                <div className="text-5xl font-black text-transparent bg-gradient-to-r bg-clip-text mb-3" style={{backgroundImage: `linear-gradient(to right, #f59e0b, #d97706)`}}>
                  {achievement.number}
                </div>
                
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  {achievement.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed text-sm flex-grow">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

