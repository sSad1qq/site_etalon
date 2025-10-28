import ContactForm from '@/components/ContactForm'

export default function ContactsPage() {
  return (
  <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Контакты
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Форма обратной связи */}
          <div className="animate-slide-in-left">
            <ContactForm />
          </div>

          {/* Контактная информация */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Основные контакты */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Основные контакты</h2>
              <div className="space-y-6">
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

            {/* Адрес */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Наш адрес</h2>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <div className="text-lg font-black text-gray-900">г. Пенза, ул. Московская, 12, 3 этаж</div>
                </div>
              </div>
            </div>

            {/* Время работы */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">График работы</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Понедельник</span>
                  <span className="text-gray-900 font-bold">15:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Вторник</span>
                  <span className="text-gray-900 font-bold">15:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Среда</span>
                  <span className="text-gray-900 font-bold">15:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Четверг</span>
                  <span className="text-gray-900 font-bold">15:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Пятница</span>
                  <span className="text-gray-900 font-bold">15:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Суббота</span>
                  <span className="text-gray-900 font-bold">15:00 - 21:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Воскресенье</span>
                  <span className="text-gray-900 font-bold">10:00 - 21:00</span>
                </div>
              </div>
            </div>

            {/* Юридические данные */}
            <div id="legal" className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Юридическая информация</h2>
              <div className="text-sm text-gray-700 space-y-2">
                <div><strong>Полное наименование:</strong> ИП Мышенков Н.А.</div>
                <div><strong>Юридический адрес:</strong> г. Пенза, Московская ул., д.12, 3 этаж</div>
                <div><strong>ИНН:</strong> 580203100855</div>
                <div><strong>ОГРНИП:</strong> 325580000044230</div>
                <div>Документы (договор, счета) предоставляются по запросу по email или при личном визите.</div>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 hover-lift glow-effect">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Мы в соцсетях</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'VKontakte', icon: '📘', href: 'https://vk.com/repetitor_penza_etalon', color: 'from-blue-400 to-blue-500' },
                  { name: 'Telegram', icon: '📱', href: 'https://t.me/centerEtalon', color: 'from-blue-500 to-blue-600' },
                  { name: 'Yandex', icon: '�', href: 'https://yandex.ru/profile/154840463548', color: 'from-yellow-400 to-yellow-500' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`bg-gradient-to-r ${social.color} text-white rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 transform hover:animate-wiggle`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="text-2xl mb-2">{social.icon}</div>
                    <div className="text-sm font-bold">{social.name}</div>
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