import TestSignupCTA from './TestSignupCTA'

export default function StudentJourney() {
  const steps = [
    {
      number: 1,
      title: "Заявка",
      description: "Оставляете заявку на сайте или звоните нам",
      icon: "📝",
      details: "Быстрая регистрация за 2 минуты",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      number: 2,
      title: "Тестирование",
      description: "Проходите бесплатное тестирование для определения уровня",
      icon: "📊",
      details: "15-20 минут, результаты сразу",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      number: 3,
      title: "Подбор группы",
      description: "Подбираем подходящую группу по уровню и расписанию",
      icon: "👥",
      details: "Мини-группы до 6 человек",
      color: "from-yellow-600 to-yellow-700"
    },
    {
      number: 4,
      title: "Обучение",
      description: "Регулярные занятия с опытными преподавателями",
      icon: "📚",
      details: "1 раз в неделю, 2 часа",
      color: "from-yellow-700 to-yellow-800"
    },
    {
      number: 5,
      title: "Обратная связь",
      description: "Постоянный контроль прогресса и корректировка программы",
      icon: "📈",
      details: "Еженедельные отчеты родителям",
      color: "from-yellow-800 to-yellow-900"
    },
    {
      number: 6,
      title: "Итоговые тесты",
      description: "Пробные ЕГЭ/ОГЭ и финальная подготовка",
      icon: "🎯",
      details: "Полная имитация экзамена",
      color: "from-yellow-900 to-yellow-950"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden mt-16" aria-labelledby="journey-heading">
      {/* Декоративные элементы */}
      <div className="absolute top-20 right-20 text-8xl opacity-10 animate-float">🎓</div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-10 animate-float-slow">📖</div>
      <div className="absolute top-1/2 left-10 text-5xl opacity-10 animate-float">⭐</div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h2 id="journey-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Путь к успеху
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed animate-slide-in-up">
            Краткая и понятная дорожная карта: от заявки до итоговой сдачи. Прозрачно и без сюрпризов.
          </p>
        </div>

          <div className="relative">
          {/* Анимированная линия времени */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 transform -translate-y-1/2 rounded-full animate-pulse-glow"></div>
          
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch" role="list">
            {steps.map((step, index) => (
              <li key={step.number} className="relative w-full flex" role="listitem">
                <article
                  className="card-lying rounded-3xl p-6 w-full flex flex-col hover-lift glow-effect"
                  style={{ animationDelay: `${index * 0.12}s` }}
                  aria-labelledby={`step-title-${step.number}`}
                >
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mb-3 text-2xl shadow-lg group-hover:animate-wiggle transition-all duration-300`} aria-hidden>
                      <span aria-hidden>{step.icon}</span>
                    </div>
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow-md">
                      <span className="sr-only">Шаг</span>
                      {step.number}
                    </div>
                  </div>

                  <h3 id={`step-title-${step.number}`} className="text-lg font-extrabold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-700 mb-3 flex-grow text-center">
                    {step.description}
                  </p>

                  <div className="bg-yellow-50 rounded-2xl px-3 py-2 mt-auto shadow-sm">
                    <p className="text-xs text-yellow-800 font-semibold text-center">
                      {step.details}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA с анимацией */}
        <div className="text-center mt-16">
          <div className="card-lying rounded-[2rem] p-8 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in hover-lift">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Готовы начать свой путь к успеху?
            </h3>
            <p className="text-base text-gray-700 mb-6">
              Первый шаг — бесплатное тестирование. Узнайте уровень и получите план подготовки.
            </p>
            <TestSignupCTA />
          </div>
        </div>
      </div>
    </section>
  )
}