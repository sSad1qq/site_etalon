'use client'

export default function AboutCenter() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок и оффер */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            Готовим к ЕГЭ и ОГЭ без стресса на высокие баллы!
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Центр «Эталон» — эффективная подготовка к выпускным экзаменам в мини-группах и индивидуально. 
            Наши преимущества: мини‑группы 2–3 человека по уровню знаний, опытные репетиторы, 7 лет специализации, более 1000 довольных учеников.
          </p>
        </div>

        {/* Ключевые преимущества */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {[
            { icon: '👥', title: 'Мини-группы 2–3 чел.', desc: 'Работа по уровню знаний — эффективнее и комфортнее.' },
            { icon: '👨‍🏫', title: 'Опытные репетиторы', desc: 'Педагоги с реальными результатами и практическими методиками.' },
            { icon: '⏳', title: '7 лет специализации', desc: 'Мы знаем, как готовить к ЕГЭ/ОГЭ именно результат.' }
          ].map((it, i) => (
            <div key={i} className="card-lying rounded-2xl sm:rounded-3xl p-4 sm:p-6 group hover-lift glow-effect">
              <div className="feature-icon text-2xl sm:text-3xl mb-2 sm:mb-3">{it.icon}</div>
              <div className="feature-title text-base sm:text-lg">{it.title}</div>
              <div className="feature-description mt-1.5 sm:mt-2 text-sm sm:text-base">{it.desc}</div>
            </div>
          ))}
        </div>

        {/* Доска почёта: удалена — используется единый компонент ResultsBoard на главной странице */}

        {/* Отзывы — видео ссылки */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Видео-отзывы выпускников</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Смотрите реальные видео-отзывы наших учеников и их родителей</p>
          
          <div className="max-w-2xl mx-auto">
            {/* Блок с кнопкой VK */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center hover-lift glow-effect">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6">
                🎥
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Видео-отзывы наших выпускников
              </h4>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                Смотрите реальные видео-отзывы наших учеников и их родителей в нашей группе ВКонтакте
              </p>
              <a 
                href="https://vk.com/video/@repetitor_penza_etalon" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center space-x-2 sm:space-x-3 bg-blue-600 md:hover:bg-blue-700 text-white font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 md:hover:scale-105 md:hover:shadow-xl text-sm sm:text-base"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.63c-.21.45-.81.85-1.74.85-.88 0-1.75-.25-2.5-.88-.88-.74-1.66-1.81-2.42-2.81-.26-.35-.51-.68-.77-.95-.6.9-1.26 1.74-1.95 2.42-.88.86-1.81 1.29-2.65 1.22-.63-.05-1.12-.42-1.37-1.05-.42-1.05.07-2.46 1.39-3.98.42-.49.88-.95 1.35-1.35-.77-.39-1.46-.95-1.95-1.63-.42-.58-.63-1.22-.56-1.81.07-.53.35-.95.81-1.22.95-.56 2.39-.18 3.91 1.08.53.44 1.05.95 1.53 1.53.49-.58 1.01-1.08 1.53-1.53 1.53-1.26 2.96-1.64 3.91-1.08.46.28.74.7.81 1.22.07.6-.14 1.23-.56 1.81-.49.68-1.19 1.23-1.95 1.63.46.39.93.86 1.35 1.35 1.32 1.53 1.81 2.93 1.39 3.98z"/>
                </svg>
                <span>Смотреть видео-отзывы</span>
              </a>
            </div>
          </div>
        </div>

        {/* Путь ученика (шаги) */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Путь ученика</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { step: '1', title: 'Подаёте заявку' },
              { step: '2', title: 'Бесплатное входное тестирование' },
              { step: '3', title: 'Подбор мини‑группы или индивидуально' },
              { step: '4', title: 'Начало обучения и обратная связь после каждого занятия' }
            ].map((s) => (
              <div key={s.step} className="card-lying rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover-lift glow-effect">
                <div className="text-xl sm:text-2xl font-extrabold text-primary mb-1.5 sm:mb-2">{s.step}</div>
                <div className="font-semibold text-xs sm:text-sm md:text-base">{s.title}</div>
              </div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">Мы проводим до 3 бесплатных тестирований в формате ЕГЭ для корректировки программы обучения.</p>
        </div>


        {/* Предметы и направления */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Предметы и направления</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {[
              'Математика', 'Русский язык', 'Информатика', 'Обществознание', 'Физика',
              'Химия', 'Английский язык', 'История', 'Биология'
            ].map((subj, i) => (
              <div key={i} className={`card-lying rounded-xl sm:rounded-2xl md:rounded-3xl p-2 sm:p-3 text-center hover-lift glow-effect ${i < 5 ? 'border-2 border-primary' : ''}`}>
                <div className="font-semibold text-xs sm:text-sm md:text-base">{subj}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}