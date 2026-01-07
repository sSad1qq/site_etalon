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
      question: "Как вы подбираете преподавателей?",
      answer: "Все преподаватели проходят двухэтапный отбор: устное собеседование и письменное тестирование. Мы оцениваем уровень знаний, опыт работы и умение объяснять материал простым и понятным языком."
    },
    {
      question: "Даёте ли вы обратную связь об обучении?",
      answer: "Да. Родители регулярно получают обратную связь в учебной беседе, а после контрольных точек — подробный отчёт о прогрессе ученика."
    },
    {
      question: "Предоставляете ли вы материалы для подготовки?",
      answer: "Да. Все необходимые учебные материалы предоставляются центром «Эталон»."
    },
    {
      question: "В каком формате проходят занятия?",
      answer: "В центре «Эталон» предусмотрены два формата обучения:\nиндивидуальные занятия — 1 на 1 с преподавателем;\nмини-группы — 2–4 ученика, подобранные по уровню знаний."
    },
    {
      question: "Какой формат лучше выбрать?",
      answer: "Индивидуальные занятия подходят для повышения успеваемости и подготовки к экзаменам в вузе или колледже.\nМини-группы — оптимальный формат для подготовки к ЕГЭ, ОГЭ и ВПР: сохраняется индивидуальный подход и повышается учебная мотивация."
    },
    {
      question: "Как формируются группы?",
      answer: "Перед началом обучения ученик проходит бесплатную входную диагностику.\nПо её результатам мы подбираем мини-группу, подходящую по уровню знаний и расписанию."
    },
    {
      question: "Можно ли поменять группу или формат занятий?",
      answer: "Да. Если ученику становится слишком сложно или, наоборот, легко, мы предложим перевод в более подходящую группу или изменение формата обучения."
    },
    {
      question: "Можно ли заниматься онлайн?",
      answer: "Да. Обучение возможно полностью онлайн или в комбинированном формате — часть занятий проходит очно, часть дистанционно."
    },
    {
      question: "Сколько длится занятие?",
      answer: "Индивидуальные занятия — длительность и частота подбираются индивидуально.\nМини-группы — 1 раз в неделю по 2 часа."
    },
    {
      question: "Возможно ли пропустить занятие?",
      answer: "Да. Пропуски возможны, все пропущенные занятия подлежат обязательной отработке для полного усвоения материала."
    },
    {
      question: "Есть ли скидки или акции?",
      answer: "Да. В центре действуют акции (например, «Приведи друга», скидки при обучении по нескольким предметам и другие). Актуальные условия можно уточнить у администратора."
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
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
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