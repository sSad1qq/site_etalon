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
  <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Часто задаваемые вопросы
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-slide-in-up">
            Ответы на самые популярные вопросы о нашем образовательном центре
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto center-content">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl hover-lift glow-effect overflow-hidden animate-zoom-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-8 text-left focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-gray-900 pr-8">
                    {item.question}
                  </h3>
                  <div className={`w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold transition-transform duration-300 ${
                    openItems.includes(index) ? 'rotate-45' : ''
                  }`}>
                    +
                  </div>
                </div>
              </button>
              
              <div className={`transition-all duration-500 overflow-hidden ${
                openItems.includes(index) 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-8">
                  <div className="border-t border-yellow-200 pt-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}