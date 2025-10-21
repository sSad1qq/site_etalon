import Link from 'next/link'

export default function LocationPage() {
  return (
  <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Как нас найти
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Мы находимся в удобном месте в центре города с хорошей транспортной доступностью
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Карта */}
          <div className="animate-slide-in-left">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover-lift glow-effect">
              <div className="aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="text-center text-white relative z-10">
                  <div className="w-20 h-20 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <span className="text-3xl">🗺️</span>
                  </div>
                  <p className="text-2xl font-bold mb-2">Интерактивная карта</p>
                  <p className="text-lg opacity-90">Московская 12, 3 этаж</p>
                </div>
                {/* Интерактивная карта будет здесь */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-30"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">Наш адрес</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-500 text-xl">📍</span>
                    <span className="font-semibold">Московская улица, 12, 3 этаж</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-500 text-xl">🏢</span>
                    <span>Офис 301, 302, 303</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-500 text-xl">🚇</span>
                    <span>5 минут пешком от метро «Красные ворота»</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Информация о расположении */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Транспорт */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Как добраться</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-2xl">
                    🚇
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-2">На метро</h3>
                    <p className="text-gray-700 mb-2">Станция «Красные ворота» (Сокольническая линия)</p>
                    <p className="text-sm text-gray-600">Выход №3, 5 минут пешком по Московской улице</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-2xl">
                    🚌
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-2">На автобусе</h3>
                    <p className="text-gray-700 mb-2">Автобусы: 25, 40, 156</p>
                    <p className="text-sm text-gray-600">Остановка «Московская улица» - прямо у входа</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center text-2xl">
                    🚗
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-2">На автомобиле</h3>
                    <p className="text-gray-700 mb-2">Парковка во дворе здания</p>
                    <p className="text-sm text-gray-600">Бесплатная парковка для клиентов центра</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Время работы */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Время работы</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Понедельник - Пятница</span>
                  <span className="text-gray-900 font-bold">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Суббота</span>
                  <span className="text-gray-900 font-bold">10:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700 font-semibold">Воскресенье</span>
                  <span className="text-gray-900 font-bold">10:00 - 16:00</span>
                </div>
              </div>
            </div>

            {/* Контакты */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Контакты</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-2xl">
                    📞
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900">+7 (999) 123-45-67</div>
                    <div className="text-sm text-gray-600">Основной номер</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900">+7 (999) 765-43-21</div>
                    <div className="text-sm text-gray-600">WhatsApp/Telegram</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900">info@etalon-education.ru</div>
                    <div className="text-sm text-gray-600">Email</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Юридическая информация */}
        <div className="mt-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-lg font-black text-gray-900 mb-4">Юридическая информация</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div><strong>Полное наименование:</strong> ИП Мышенков Н.А.</div>
              <div><strong>ИНН:</strong> 580203100855</div>
              <div><strong>ОГРНИП:</strong> 325580000044230</div>
              <div>По вопросам юридического сопровождения и договора обращайтесь по email: info@etalon-education.ru</div>
            </div>
          </div>
        </div>

  {/* Видео «Как добраться» */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Видео «Как добраться»
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Посмотрите подробную инструкцию, как найти наш образовательный центр
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover-lift glow-effect">
              <div className="aspect-video bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="text-center text-white relative z-10">
                  <div className="w-24 h-24 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                    <span className="text-4xl group-hover:animate-wiggle">▶️</span>
                  </div>
                  <p className="text-2xl font-bold mb-2">Как добраться до центра</p>
                  <p className="text-lg opacity-90">Нажмите для просмотра</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Готовы начать обучение?
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Запишитесь на бесплатное тестирование и получите персональные рекомендации
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contacts"
                className="btn-primary btn-magic text-lg px-12 py-4 group"
              >
                <span className="flex items-center space-x-3">
                  <span>Записаться на тестирование</span>
                  <span className="group-hover:animate-wiggle">📝</span>
                </span>
              </Link>
              <a
                href="tel:+79991234567"
                className="btn-secondary hover-glow text-lg px-12 py-4 group"
              >
                <span className="flex items-center space-x-3">
                  <span>Позвонить нам</span>
                  <span className="group-hover:animate-wiggle">📞</span>
                </span>
              </a>
            </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/contacts"
                  className="btn-primary btn-magic text-lg px-12 py-4 group inline-flex items-center justify-center"
                >
                  <span className="flex items-center space-x-3">
                    <span>Перейти в Контакты</span>
                    <span className="group-hover:animate-wiggle">📊</span>
                  </span>
                </Link>
                <Link
                  href="/contacts"
                  className="btn-secondary hover-glow text-lg px-12 py-4 group inline-flex items-center justify-center"
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