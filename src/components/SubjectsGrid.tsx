export default function SubjectsGrid() {
  const subjects = [
    {
      name: "Математика",
      icon: "📐",
      description: "Алгебра, геометрия, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-400 to-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      stats: "Средний балл: 87",
      backgroundImage: "/math.jpg"
    },
    {
      name: "Русский язык",
      icon: "📝",
      description: "Грамматика, сочинение, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      stats: "Средний балл: 89",
      backgroundImage: "/rus-lang.jpg"
    },
    {
      name: "Информатика",
      icon: "⚡",
      description: "Программирование, алгоритмы, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-800 to-yellow-900",
      bgColor: "bg-yellow-400",
      borderColor: "border-yellow-600",
      stats: "Средний балл: 88",
      backgroundImage: "/informatic.jpg"
    },
    {
      name: "Обществознание",
      icon: "🏛️",
      description: "Право, экономика, политология, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-900 to-yellow-950",
      bgColor: "bg-yellow-500",
      borderColor: "border-yellow-700",
      stats: "Средний балл: 84",
      backgroundImage: "/society.jpg"
    },
    {
      name: "Физика",
      icon: "⚡",
      description: "Механика, термодинамика, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-600 to-yellow-700",
      bgColor: "bg-yellow-200",
      borderColor: "border-yellow-400",
      stats: "Средний балл: 85",
      backgroundImage: "/physic.jpg"
    },
    {
      name: "Химия",
      icon: "🧪",
      description: "Органическая и неорганическая химия, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-700 to-yellow-800",
      bgColor: "bg-yellow-300",
      borderColor: "border-yellow-500",
      stats: "Средний балл: 86",
      backgroundImage: "/chemistry.jpg"
    },
    {
      name: "История",
      icon: "📜",
      description: "Российская и всемирная история, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      stats: "Средний балл: 83",
      backgroundImage: "/history.jpg"
    },
    {
      name: "Биология",
      icon: "🧬",
      description: "Анатомия, генетика, экология, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      stats: "Средний балл: 82",
      backgroundImage: "/biology.jpg"
    },
    {
      name: "Литература",
      icon: "📚",
      description: "Анализ произведений, сочинения, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-600 to-yellow-800",
      bgColor: "bg-yellow-200",
      borderColor: "border-yellow-400",
      stats: "Средний балл: 86",
      backgroundImage: "/literature.jpg"
    },
    {
      name: "Английский язык",
      icon: "🌍",
      description: "Грамматика, лексика, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      stats: "Средний балл: 87",
      backgroundImage: "/english.jpg"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-20 text-8xl opacity-10 animate-float">📚</div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-10 animate-float-slow">🎓</div>
      <div className="absolute top-1/2 left-10 text-5xl opacity-10 animate-float">⭐</div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Предметы
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Подготовка по всем основным предметам ЕГЭ и ОГЭ с опытными преподавателями
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center items-start">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className={`bg-white rounded-[2rem] group animate-zoom-in border-2 ${subject.borderColor} shadow-lg relative overflow-hidden min-h-96 hover-lift glow-effect`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Фоновое изображение - затухает при hover */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500 group-hover:opacity-0"
                style={{
                  backgroundImage: `url(${subject.backgroundImage})`,
                  zIndex: 1
                }}
              />
              
              {/* Белый фон - появляется при hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5"></div>
              
              {/* Контент - появляется при hover */}
              <div className="relative z-10 h-full flex flex-col justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-3xl flex items-center justify-center mx-auto mb-3 text-3xl group-hover:animate-wiggle shadow-lg`}>
                    {subject.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm">
                    {subject.description}
                  </p>
                </div>
              
                <div className={`${subject.bgColor} rounded-3xl p-3 mb-3 shadow-md`}>
                  <div className="text-center">
                    <div className="text-lg font-black text-yellow-800 mb-1">
                      {subject.stats}
                    </div>
                    <div className="text-xs text-yellow-700 font-semibold">
                      за последний год
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-semibold">Формат:</span>
                    <span className="text-gray-800 font-bold">Мини-группы</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-semibold">Длительность:</span>
                    <span className="text-gray-800 font-bold">2 часа</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-semibold">Частота:</span>
                    <span className="text-gray-800 font-bold">1 раз в неделю</span>
                  </div>
                </div>
              </div>

              {/* Кнопка записи удалена по просьбе — пользователю показаны единые CTA ниже */}
            </div>
          ))}
        </div>

        {/* CTA с анимацией */}
        <div className="text-center mt-20">
          <div className="card-lying rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in">
            <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Не знаете, с чего начать?
            </h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Пройдите бесплатное тестирование по всем предметам и получите персональные рекомендации
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/contacts" className="btn-primary btn-magic text-lg px-12 py-4 group inline-flex items-center justify-center">
                <span className="flex items-center space-x-3">
                  <span>Перейти в Контакты</span>
                  <span className="group-hover:animate-wiggle">📊</span>
                </span>
              </a>
              <button className="btn-secondary hover-glow text-lg px-12 py-4 group">
                <span className="flex items-center space-x-3">
                  <span>Консультация</span>
                  <span className="group-hover:animate-wiggle">💬</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}