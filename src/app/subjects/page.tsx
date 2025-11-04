import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Предметы подготовки к ЕГЭ и ОГЭ в Пензе',
  description: 'Подготовка к ЕГЭ и ОГЭ в Пензе по всем предметам: математика, информатика, русский язык, физика, химия. Репетиторы в центре Эталон, мини-группы и индивидуальные занятия.',
  keywords: ['предметы ЕГЭ Пенза', 'предметы ОГЭ Пенза', 'математика ЕГЭ Пенза', 'информатика ЕГЭ Пенза', 'подготовка к ЕГЭ математика Пенза', 'репетитор по математике Пенза', 'репетитор по информатике Пенза'],
  openGraph: {
    title: 'Предметы подготовки к ЕГЭ и ОГЭ в Пензе | Центр Эталон',
    description: 'Подготовка к ЕГЭ и ОГЭ в Пензе по всем предметам: математика, информатика, русский язык, физика, химия.',
  },
}

export default function SubjectsPage() {
  const subjects = [
    {
      name: "Математика",
      icon: "📐",
      description: "Алгебра, геометрия, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-400 to-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      stats: "Средний балл: 87",
      features: ["Алгебра", "Геометрия", "Тригонометрия", "Логарифмы", "Производные"],
      duration: "2 часа",
      frequency: "1 раз в неделю",
      price: "от 3000₽/месяц",
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
      features: ["Грамматика", "Орфография", "Пунктуация", "Сочинение", "Изложение"],
  duration: "2 часа",
        frequency: "1 раз в неделю",
      price: "от 3000₽/месяц",
      backgroundImage: "/rus-lang.jpg"
    },
    {
      name: "Физика",
      icon: "⚡",
      description: "Механика, термодинамика, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-600 to-yellow-700",
      bgColor: "bg-yellow-200",
      borderColor: "border-yellow-400",
      stats: "Средний балл: 85",
      features: ["Механика", "Термодинамика", "Электричество", "Оптика", "Квантовая физика"],
  duration: "2 часа",
        frequency: "1 раз в неделю",
      price: "от 3500₽/месяц",
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
      features: ["Неорганическая химия", "Органическая химия", "Физическая химия", "Аналитическая химия", "Биохимия"],
  duration: "2 часа",
        frequency: "1 раз в неделю",
      price: "от 3500₽/месяц",
      backgroundImage: "/chemistry.jpg"
    },
    {
      name: "Информатика",
      icon: "💻",
      description: "Программирование, алгоритмы, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-800 to-yellow-900",
      bgColor: "bg-yellow-400",
      borderColor: "border-yellow-600",
      stats: "Средний балл: 88",
      features: ["Программирование", "Алгоритмы", "Структуры данных", "Базы данных", "Сети"],
  duration: "2 часа",
        frequency: "1 раз в неделю",
      price: "от 4000₽/месяц",
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
      features: ["Право", "Экономика", "Политология", "Социология", "Философия"],
  duration: "2 часа",
        frequency: "1 раз в неделю",
      price: "от 3000₽/месяц",
      backgroundImage: "/society.jpg"
    },
    {
      name: "История",
      icon: "📜",
      description: "Российская и всемирная история, подготовка к ЕГЭ и ОГЭ",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      stats: "Средний балл: 83",
      features: ["Российская история", "Всемирная история", "Историография", "Археология", "Культурология"],
  duration: "2 часа",
        frequency: "1 раз в неделю",
      price: "от 3000₽/месяц",
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
      features: ["Анатомия", "Генетика", "Экология", "Эволюция", "Молекулярная биология"],
  duration: "2 часа",
        frequency: "1 раз в неделю",
      price: "от 3000₽/месяц",
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
      features: ["Анализ текста", "Сочинения", "Литературные жанры", "История литературы", "Критический анализ"],
      duration: "2 часа",
      frequency: "1 раз в неделю",
      price: "от 3000₽/месяц",
      backgroundImage: "/literature.jpg"
    }
  ]

  return (
  <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Предметы
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Подготовка по всем основным предметам ЕГЭ и ОГЭ с опытными преподавателями
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {subjects.map((subject, index) => (
                    <div
                      key={index}
                      className={`bg-white rounded-3xl group animate-zoom-in border-2 ${subject.borderColor} shadow-lg relative overflow-hidden min-h-96 hover-lift glow-effect`}
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
                  <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl`}>
                    {subject.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm">
                    {subject.description}
                  </p>
                </div>
              
                <div className={`${subject.bgColor} rounded-2xl p-3 mb-3`}>
                  <div className="text-center">
                    <div className="text-lg font-black text-yellow-800 mb-1">
                      {subject.stats}
                    </div>
                    <div className="text-xs text-yellow-700 font-semibold">
                      за последний год
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-semibold">Формат:</span>
                    <span className="text-gray-800 font-bold">Мини-группы</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-semibold">Длительность:</span>
                    <span className="text-gray-800 font-bold">{subject.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-semibold">Частота:</span>
                    <span className="text-gray-800 font-bold">{subject.frequency}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-semibold">Стоимость:</span>
                    <span className="text-gray-800 font-bold">{subject.price}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-xs font-bold text-gray-700 mb-2">Темы изучения:</h4>
                  <div className="flex flex-wrap gap-1">
                    {subject.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Кнопка записи удалена с карточек предметов по требованию — общий CTA снизу оставлен */}
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
                  <div className="card-lying rounded-3xl p-8 animate-zoom-in card-container">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                👥
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Мини-группы</h3>
              <p className="text-gray-700 leading-relaxed">
                Занятия в группах до 6 человек обеспечивают максимальное внимание каждому ученику и высокую эффективность обучения.
              </p>
            </div>
          </div>

                  <div className="card-lying rounded-3xl p-8 animate-zoom-in card-container">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                📚
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Материалы</h3>
              <p className="text-gray-700 leading-relaxed">
                Все необходимые учебные материалы, тесты и пробные варианты ЕГЭ/ОГЭ включены в стоимость обучения.
              </p>
            </div>
          </div>

                  <div className="card-lying rounded-3xl p-8 animate-zoom-in card-container">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                🎯
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Результат</h3>
              <p className="text-gray-700 leading-relaxed">
                Наши ученики показывают результаты на 20-30% выше среднего по стране и успешно поступают в ведущие вузы.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
                  <div className="card-lying rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Готовы начать подготовку?
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Запишитесь на бесплатное тестирование и получите персональные рекомендации по выбору предметов
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contacts"
                className="btn-primary btn-magic text-lg px-12 py-4 group"
              >
                <span className="flex items-center space-x-3">
                  <span>Перейти в Контакты</span>
                  <span className="group-hover:animate-wiggle">📊</span>
                </span>
              </Link>
              <Link
                href="/contacts"
                className="btn-secondary hover-glow text-lg px-12 py-4 group"
              >
                <span className="flex items-center space-x-3">
                  <span>Перейти в Контакты</span>
                  <span className="group-hover:animate-wiggle">💬</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}