'use client'

import { useState } from 'react'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqItems = [
    {
      question: "Как проходят занятия в центре?",
  answer: "Занятия проходят в мини-группах до 6 человек, что позволяет преподавателю уделить внимание каждому ученику. Длительность занятия - 2 часа, частота - 1 раз в неделю."
    },
    {
      question: "Можно ли начать обучение в середине учебного года?",
      answer: "Да, мы принимаем учеников круглый год. Перед началом занятий проводится бесплатное тестирование для определения уровня знаний и подбора подходящей группы."
    },
    {
      question: "Как происходит оплата занятий?",
      answer: "Оплата производится помесячно. Стоимость зависит от выбранного предмета и количества занятий в неделю. Первое занятие - бесплатное тестирование. При оплате за несколько месяцев вперед действуют скидки."
    },
    {
      question: "Что делать, если пропустил занятие?",
      answer: "Если вы пропустили занятие по уважительной причине, мы предоставляем возможность отработать его в другой группе или получить индивидуальную консультацию. Материалы занятия высылаются на email."
    },
    {
      question: "Есть ли домашние задания?",
      answer: "Да, домашние задания являются важной частью подготовки. Они помогают закрепить материал и выявить пробелы в знаниях. Объем ДЗ рассчитывается индивидуально с учетом загруженности ученика."
    },
    {
      question: "Предоставляете ли вы материалы для подготовки?",
      answer: "Да, мы предоставляем все необходимые материалы: учебники, рабочие тетради, тесты, пробные варианты ЕГЭ/ОГЭ. Все материалы включены в стоимость обучения."
    },
    {
      question: "Как часто проводятся пробные экзамены?",
      answer: "Пробные ЕГЭ/ОГЭ проводятся ежемесячно. Это помогает ученикам привыкнуть к формату экзамена, оценить свой уровень и скорректировать план подготовки."
    },
    {
      question: "Можно ли заниматься дистанционно?",
      answer: "Да, мы предлагаем дистанционные занятия через нашу платформу. Качество обучения остается высоким благодаря интерактивным материалам и современным технологиям."
    },
    {
      question: "Какова гарантия результата?",
      answer: "Мы гарантируем повышение баллов при регулярном посещении занятий и выполнении домашних заданий. Если результат не достигнут, мы предоставляем дополнительные занятия бесплатно."
    },
    {
      question: "Как записаться на пробное занятие?",
      answer: "Записаться можно через форму на сайте, по телефону или лично в центре. Пробное занятие включает тестирование и консультацию с преподавателем. Это поможет определить уровень подготовки и подобрать подходящую группу."
    }
    ,
    {
      question: "Где можно найти юридическую информацию о центре?",
      answer: "Юридические данные (ИНН, ОГРНИП, юридический адрес) размещены внизу сайта в футере и на странице 'Контакты'. Для получения договоров и реквизитов отправьте запрос на info@etalon-education.ru."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-100 to-white">
      <section className="pt-0 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-0">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 animate-slide-in-up">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                Часто задаваемые вопросы
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mx-auto leading-relaxed animate-slide-in-up max-w-3xl">
              Ответы на самые популярные вопросы о нашем образовательном центре
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="card-lying rounded-3xl overflow-hidden animate-zoom-in hover-lift"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-4 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300 hover:bg-yellow-50/50"
                >
                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight flex-1">
                      {item.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl transition-transform duration-300 leading-none ${
                      openItems.includes(index) ? 'rotate-45' : ''
                    }`}>
                      <span className="mt-[-1px]">+</span>
                    </div>
                  </div>
                </button>
                
                <div className={`transition-all duration-300 overflow-hidden ${
                  openItems.includes(index) 
                    ? 'max-h-[500px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <div className="border-t border-yellow-200 pt-3 sm:pt-4">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA блок */}
          <div className="mt-10 sm:mt-12 md:mt-16 text-center">
            <div className="card-lying rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 md:p-8 max-w-3xl mx-auto relative overflow-hidden animate-zoom-in hover-lift">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 mb-3 sm:mb-4">
                Не нашли ответ на свой вопрос?
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
                Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/contacts"
                  className="btn-primary text-sm sm:text-base md:text-lg px-5 sm:px-6 md:px-8 py-3 sm:py-4 inline-flex items-center justify-center"
                >
                  <span className="flex items-center space-x-2">
                    <span>Связаться с нами</span>
                    <span>📞</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}