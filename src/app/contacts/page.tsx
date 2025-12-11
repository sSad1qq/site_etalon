import ContactForm from '@/components/ContactForm'
import YandexMap from '@/components/YandexMap'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакты центра подготовки к ЕГЭ и ОГЭ в Пензе',
  description: 'Контакты центра подготовки к ЕГЭ и ОГЭ Эталон в Пензе. Запись на бесплатное тестирование. Телефон, адрес, расположение. Репетиторы по математике и информатике в Пензе.',
  keywords: ['контакты репетитор Пенза', 'запись на ЕГЭ Пенза', 'телефон центра подготовки Пенза', 'адрес центра Эталон Пенза'],
  openGraph: {
    title: 'Контакты центра подготовки к ЕГЭ и ОГЭ в Пензе | Центр Эталон',
    description: 'Контакты центра подготовки к ЕГЭ и ОГЭ Эталон в Пензе. Запись на бесплатное тестирование.',
  },
}

export default function ContactsPage() {
  return (
  <div className="min-h-screen pt-4 sm:pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Контакты
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Форма обратной связи */}
          <div className="animate-slide-in-left">
            <ContactForm />
          </div>

          {/* Контактная информация */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-slide-in-right">
            {/* Основные контакты */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 hover-lift glow-effect">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">Основные контакты</h2>
              <div className="space-y-4 sm:space-y-6">
                <a 
                  href="tel:+78412283131" 
                  className="flex items-center space-x-3 sm:space-x-4 group transition-all duration-300 md:hover:scale-105"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-xl sm:text-2xl md:group-hover:scale-110 transition-transform duration-300">
                    📞
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-gray-900 md:group-hover:text-yellow-600 transition-colors duration-300">8 (8412) 28-31-31</div>
                    <div className="text-xs sm:text-sm text-gray-600">Основной номер</div>
                  </div>
                </a>
                <a 
                  href="https://wa.me/79379151411" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3 sm:space-x-4 group transition-all duration-300 md:hover:scale-105"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-xl sm:text-2xl md:group-hover:scale-110 transition-transform duration-300">
                    📱
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-black text-gray-900 md:group-hover:text-yellow-600 transition-colors duration-300">8 (937) 915 14-11</div>
                    <div className="text-xs sm:text-sm text-gray-600">WhatsApp/Telegram</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Адрес */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden hover-lift glow-effect">
              <YandexMap />
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">Наш адрес</h2>
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-500 text-lg sm:text-xl">📍</span>
                  <a 
                    href="https://yandex.ru/maps/?pt=45.014130,53.186782&z=17&l=map"
                    target="_blank"
                    rel="noreferrer"
                    className="text-base sm:text-lg font-black text-gray-900 md:hover:text-yellow-600 transition-colors duration-300"
                  >
                    г. Пенза, ул. Московская, 12, 3 этаж
                  </a>
                </div>
              </div>
            </div>

            {/* Время работы */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 hover-lift glow-effect">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">График работы</h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm sm:text-base text-gray-700 font-semibold">Понедельник - Суббота</span>
                  <span className="text-sm sm:text-base text-gray-900 font-bold">15:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm sm:text-base text-gray-700 font-semibold">Воскресенье</span>
                  <span className="text-sm sm:text-base text-gray-900 font-bold">10:00 - 21:00</span>
                </div>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-5 sm:p-6 md:p-8 hover-lift glow-effect">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">Мы в соцсетях</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { 
                    name: 'VKontakte', 
                    icon: '/vk.png',
                    href: 'https://vk.com/repetitor_penza_etalon', 
                    color: 'from-blue-400 to-blue-500' 
                  },
                  { 
                    name: 'Telegram', 
                    icon: '/telegram.png',
                    href: 'https://t.me/centerEtalon', 
                    color: 'from-blue-500 to-blue-600' 
                  }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`bg-gradient-to-r ${social.color} text-white rounded-xl p-3 sm:p-4 text-center md:hover:scale-105 transition-all duration-300 transform md:hover:animate-wiggle`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="mb-1.5 sm:mb-2 flex items-center justify-center">
                      <Image 
                        src={social.icon} 
                        alt={social.name} 
                        width={32} 
                        height={32} 
                        className="w-6 h-6 sm:w-8 sm:h-8 mx-auto"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-bold">{social.name}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}