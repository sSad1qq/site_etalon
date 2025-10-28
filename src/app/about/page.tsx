import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const achievements = [
    {
      year: "2014",
      title: "Основание центра",
      description: "Открытие образовательного центра «Эталон» с фокусом на качественную подготовку к ЕГЭ и ОГЭ"
    },
    {
      year: "2017",
      title: "1000+ выпускников",
      description: "Достижение важной вехи - более 1000 успешных выпускников поступили в ведущие вузы страны"
    },
    {
      year: "2019",
      title: "Расширение программы",
      description: "Добавление новых предметов и внедрение современных методик обучения"
    },
    {
      year: "2021",
      title: "Онлайн-платформа",
      description: "Запуск дистанционного обучения и интерактивной платформы для учеников"
    },
    {
      year: "2023",
      title: "85+ средний балл",
      description: "Достижение рекордного среднего балла ЕГЭ среди наших выпускников"
    },
    {
      year: "2024",
      title: "95% поступлений",
      description: "95% наших выпускников успешно поступили в выбранные вузы"
    }
  ]

  const values = [
    {
      icon: "🎯",
      title: "Индивидуальный подход",
      description: "Каждый ученик уникален, поэтому мы разрабатываем персональную программу обучения"
    },
    {
      icon: "👥",
      title: "Мини-группы",
      description: "Занятия в группах до 6 человек обеспечивают максимальное внимание каждому"
    },
    {
      icon: "📚",
      title: "Современные методики",
      description: "Используем актуальные образовательные технологии и материалы"
    },
    {
      icon: "💡",
      title: "Практический опыт",
      description: "Наши преподаватели имеют многолетний опыт подготовки к экзаменам"
    },
    {
      icon: "🤝",
      title: "Поддержка",
      description: "Мы поддерживаем учеников на всех этапах подготовки к экзаменам"
    },
    {
      icon: "🏆",
      title: "Результат",
      description: "Наша главная цель - высокие баллы и поступление в желаемый вуз"
    }
  ]

  return (
  <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Заголовок */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              О центре «Эталон»
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Более 10 лет мы помогаем школьникам достигать высоких результатов на экзаменах
          </p>
        </div>

        {/* История центра */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Наша история</h2>
          <div className="relative">
            {/* Временная линия */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
            
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full lg:w-1/2 ${
                    index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                  }`}>
                    <div className="card-lying rounded-3xl p-8 animate-zoom-in">
                      <div className="text-3xl font-black text-yellow-600 mb-4">
                        {achievement.year}
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-4">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Точка на линии времени */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-yellow-500 rounded-full"></div>
                  
                  <div className="w-full lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Дружелюбная атмосфера */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Дружелюбная атмосфера</h2>
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              В центре «Эталон» мы создали особую атмосферу, где преподаватели и ученики находятся на одной волне. 
              Наша команда не просто учит — мы дружим, поддерживаем и вдохновляем каждого ученика на достижение целей.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Посмотрите, как мы проводим время вместе: совместные мероприятия, праздники, 
              неформальные встречи и просто теплые моменты общения.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {[
              { src: "/dosug_1.jpeg", alt: "Команда центра на мероприятии", caption: "Совместные праздники и мероприятия" },
              { src: "/dosug_2.jpeg", alt: "Преподаватели с учениками", caption: "Неформальное общение с учениками" },
              { src: "/dosug_3.jpeg", alt: "Командная работа", caption: "Работа в команде и взаимоподдержка" },
              { src: "/dosug_4.jpeg", alt: "Творческие моменты", caption: "Творческие проекты и инициативы" },
              { src: "/dosug_5.jpeg", alt: "Дружеское общение", caption: "Дружеское общение вне занятий" },
              { src: "/dosug_6.jpeg", alt: "Совместные достижения", caption: "Празднование успехов и достижений" }
            ].map((photo, index) => (
              <div
                key={index}
                className="card-lying rounded-3xl p-4 group animate-zoom-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full h-64 mb-4 rounded-2xl overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-gray-700 font-medium text-sm">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="card-lying rounded-3xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-black text-gray-900 mb-4">
                Мы не просто учим — мы создаем семью
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Каждый ученик для нас — это не просто клиент, а часть большой дружной семьи. 
                Мы помним дни рождения, поддерживаем в трудные моменты и радуемся каждому успеху.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-4 text-3xl">
                    🤝
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Взаимоподдержка</h4>
                  <p className="text-sm text-gray-600">Всегда готовы помочь и поддержать</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 text-3xl">
                    😊
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Позитивная атмосфера</h4>
                  <p className="text-sm text-gray-600">Учимся с удовольствием и радостью</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center mb-4 text-3xl">
                    🎉
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Совместные праздники</h4>
                  <p className="text-sm text-gray-600">Отмечаем успехи и важные события</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ценности */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {values.map((value, index) => (
              <div
                key={index}
                className="card-lying rounded-3xl p-8 group animate-zoom-in card-container"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:animate-wiggle">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">Наши достижения</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center justify-items-center">
            {[
              { number: "10+", label: "лет опыта", icon: "📅" },
              { number: "1000+", label: "выпускников", icon: "🎓" },
              { number: "85+", label: "средний балл", icon: "⭐" },
              { number: "95%", label: "поступают в вузы", icon: "🏆" }
            ].map((stat, index) => (
              <div
                key={index}
                className="card-lying rounded-2xl p-8 animate-zoom-in card-container"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 animate-bounce-in">{stat.icon}</div>
                <div className="text-4xl font-black text-yellow-600 mb-3 animate-pulse-glow">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-bold text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="card-lying rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Присоединяйтесь к нашей команде!
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Станьте частью успешной истории и достигните своих целей вместе с нами
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contacts"
                className="btn-primary btn-magic text-lg px-12 py-4 group"
              >
                <span className="flex items-center space-x-3">
                  <span>Перейти в Контакты</span>
                  <span className="group-hover:animate-wiggle">📝</span>
                </span>
              </Link>
              <Link
                href="/subjects"
                className="btn-secondary hover-glow text-lg px-12 py-4 group"
              >
                <span className="flex items-center space-x-3">
                  <span>Посмотреть предметы</span>
                  <span className="group-hover:animate-wiggle">📚</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}