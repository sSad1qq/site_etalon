export default function AboutCenter() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-yellow-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Заголовок и оффер */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Готовим к ЕГЭ и ОГЭ без стресса на высокие баллы!
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Центр «Эталон» — эффективная подготовка к выпускным экзаменам в мини-группах и индивидуально. 
            Наши преимущества: мини‑группы 2–3 человека по уровню знаний, опытные репетиторы, 7 лет специализации, более 1000 довольных учеников.
          </p>
        </div>

        {/* Ключевые преимущества */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { icon: '👥', title: 'Мини-группы 2–3 чел.', desc: 'Работа по уровню знаний — эффективнее и комфортнее.' },
            { icon: '👨‍🏫', title: 'Опытные репетиторы', desc: 'Педагоги с реальными результатами и практическими методиками.' },
            { icon: '⏳', title: '7 лет специализации', desc: 'Мы знаем, как готовить к ЕГЭ/ОГЭ именно результат.' }
          ].map((it, i) => (
            <div key={i} className="card-lying rounded-2xl p-6 group">
              <div className="feature-icon text-3xl mb-3">{it.icon}</div>
              <div className="feature-title text-lg">{it.title}</div>
              <div className="feature-description mt-2">{it.desc}</div>
            </div>
          ))}
        </div>

        {/* Доска почёта: удалена — используется единый компонент ResultsBoard на главной странице */}

        {/* Отзывы — видео ссылки */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Отзывы выпускников (видео)</h3>
          <p className="text-sm text-gray-600 mb-4">Видео могут размещаться на Rutube/YouTube — на сайте мы встраиваем ссылки/плеер.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'История Ивана', url: 'https://rutube.ru/video/example1' },
              { title: 'Интервью с Анной', url: 'https://rutube.ru/video/example2' },
              { title: 'Отзыв Дмитрия', url: 'https://rutube.ru/video/example3' }
            ].map((t, i) => (
              <a key={i} href={t.url} target="_blank" rel="noreferrer" className="card-lying rounded-2xl p-4 text-left">
                <div className="font-semibold mb-1">{t.title}</div>
                <div className="text-sm text-gray-500">Открыть видео (Rutube)</div>
              </a>
            ))}
          </div>
        </div>

        {/* Путь ученика (шаги) */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Путь ученика</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Подаёте заявку' },
              { step: '2', title: 'Бесплатное входное тестирование' },
              { step: '3', title: 'Подбор мини‑группы или индивидуально' },
              { step: '4', title: 'Начало обучения и обратная связь после каждого занятия' }
            ].map((s) => (
              <div key={s.step} className="card-lying rounded-2xl p-6 text-center">
                <div className="text-2xl font-extrabold text-primary mb-2">{s.step}</div>
                <div className="font-semibold">{s.title}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">Мы проводим до 3 бесплатных тестирований в формате ЕГЭ для корректировки программы обучения.</p>
        </div>


        {/* Предметы и направления */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Предметы и направления</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              'Математика', 'Русский язык', 'Информатика', 'Обществознание', 'Физика',
              'Химия', 'Английский язык', 'История', 'Биология'
            ].map((subj, i) => (
              <div key={i} className={`card-lying rounded-xl p-3 text-center ${i < 5 ? 'border-2 border-primary' : ''}`}>
                <div className="font-semibold">{subj}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}