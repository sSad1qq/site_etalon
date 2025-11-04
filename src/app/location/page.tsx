import Link from 'next/link'
import YandexMap from '@/components/YandexMap'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Расположение центра подготовки к ЕГЭ и ОГЭ в Пензе',
  description: 'Адрес центра подготовки к ЕГЭ и ОГЭ Эталон в Пензе. Как добраться: ул. Московская, 12, 3 этаж. Карта, маршрут, ближайшие остановки. Репетиторы по математике и информатике в центре Пензы.',
  keywords: ['адрес центра подготовки Пенза', 'как добраться центр Эталон Пенза', 'расположение репетитора Пенза', 'центр ЕГЭ адрес Пенза', 'ул Московская Пенза', 'центр подготовки карта Пенза'],
  openGraph: {
    title: 'Расположение центра подготовки к ЕГЭ и ОГЭ в Пензе | Центр Эталон',
    description: 'Адрес центра подготовки к ЕГЭ и ОГЭ Эталон в Пензе: ул. Московская, 12, 3 этаж. Карта и маршрут.',
  },
}

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
              <YandexMap />
              <div className="p-6">
                <h3 className="text-xl font-black text-gray-900 mb-4">Наш адрес</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-500 text-xl">📍</span>
                    <span className="font-semibold">г. Пенза, ул. Московская, 12, 3 этаж</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-500 text-xl">🚶</span>
                    <span>В центре города</span>
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
              
              <div className="mb-6">
                <h3 className="font-black text-gray-900 mb-4">Ближайшие остановки общественного транспорта:</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-1">
                      🚌
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">«Детская библиотека»</p>
                      <p className="text-sm text-gray-600">примерно 320 м от центра</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-1">
                      🚌
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">«Библиотека имени Лермонтова»</p>
                      <p className="text-sm text-gray-600">примерно 580 м от центра</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-1">
                      🚌
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">«Кинотеатр Октябрь»</p>
                      <p className="text-sm text-gray-600">примерно 660 м от центра</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-700 to-yellow-800 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-1">
                      🚌
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold">«Улица Куйбышева»</p>
                      <p className="text-sm text-gray-600">примерно 760 м от центра</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-black text-gray-900 mb-4">Как узнать конкретные маршруты:</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🗺️
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-2">Онлайн-карты и сервисы</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Воспользуйтесь <strong>Яндекс.Картами</strong>, <strong>2ГИС</strong> или другими картографическими сервисами — они показывают актуальные маршруты, расписание и время прибытия транспорта
                      </p>
                      <p className="text-sm text-gray-600">
                        В сервисах можно построить маршрут от вашего текущего местоположения до центра «Эталон» и увидеть все подходящие рейсы
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-700 to-yellow-800 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      🚗
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-2">На автомобиле</h4>
                      <p className="text-sm text-gray-600">Во дворе здания есть места, где можно оставить машину. Также доступна платная парковка в центре города</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Время работы */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">График работы</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700 font-semibold">Понедельник - Суббота</span>
                  <span className="text-gray-900 font-bold">15:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-semibold">Воскресенье</span>
                  <span className="text-gray-900 font-bold">10:00 - 21:00</span>
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
                    <div className="text-lg font-black text-gray-900">8 (8412) 28-31-31</div>
                    <div className="text-sm text-gray-600">Основной номер</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <div>
                    <div className="text-lg font-black text-gray-900">8 (937) 915 14-11</div>
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
                href="tel:+78412283131"
                className="btn-secondary hover-glow text-lg px-12 py-4 group"
              >
                <span className="flex items-center space-x-3">
                  <span>Позвонить нам</span>
                  <span className="group-hover:animate-wiggle">📞</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}