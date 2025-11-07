import Link from 'next/link'
import Image from 'next/image'
import Logo from './Logo'

export default function Footer() {
  const navItems = [
    { name: 'Главная', href: '/' },
    { name: 'О центре', href: '/about' },
    { name: 'Предметы', href: '/subjects' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Контакты', href: '/contacts' }
  ]

  const socialLinks = [
    { 
      name: 'VKontakte', 
      icon: (
        <Image 
          src="/vk.png" 
          alt="VKontakte" 
          width={20} 
          height={20} 
          className="w-5 h-5 brightness-0 invert"
        />
      ), 
      href: 'https://vk.com/repetitor_penza_etalon', 
      color: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
    },
    { 
      name: 'Telegram', 
      icon: (
        <Image 
          src="/telegram.png" 
          alt="Telegram" 
          width={20} 
          height={20} 
          className="w-5 h-5 brightness-0 invert"
        />
      ), 
      href: 'https://t.me/centerEtalon', 
      color: 'from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600' 
    },
    { 
      name: 'Yandex', 
      icon: (
        <Image 
          src="/yandex.png" 
          alt="Yandex" 
          width={20} 
          height={20} 
          className="w-5 h-5 brightness-0 invert"
        />
      ), 
      href: 'https://yandex.ru/profile/154840463548', 
      color: 'from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600' 
    }
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-yellow-50 border-t-2 border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Основной контент футера */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Логотип и описание */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4 group">
              <Logo />
              <span className="ml-2 text-xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors">
                Эталон
              </span>
            </Link>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Центр подготовки к ЕГЭ и ОГЭ в Пензе. Профессиональные репетиторы, мини-группы и индивидуальные занятия.
            </p>
            {/* Социальные сети */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`bg-gradient-to-r ${social.color} text-white rounded-xl p-3 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-4">Навигация</h3>
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-yellow-600 transition-colors duration-200 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-4">Контакты</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-500 text-lg mt-0.5">📞</span>
                <div>
                  <a 
                    href="tel:+78412283131" 
                    className="text-gray-900 font-semibold hover:text-yellow-600 transition-colors block"
                  >
                    8 (8412) 28-31-31
                  </a>
                  <span className="text-gray-600 text-xs">Основной номер</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-yellow-500 text-lg mt-0.5">📱</span>
                <div>
                  <a 
                    href="https://wa.me/79379151411" 
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-900 font-semibold hover:text-yellow-600 transition-colors block"
                  >
                    8 (937) 915 14-11
                  </a>
                  <span className="text-gray-600 text-xs">WhatsApp/Telegram</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-yellow-500 text-lg mt-0.5">📍</span>
                <div>
                  <span className="text-gray-900 font-semibold block">
                    г. Пенза, ул. Московская, 12, 3 этаж
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* График работы */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-4">График работы</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Пн - Сб</span>
                <span className="text-gray-900 font-semibold">15:00 - 21:00</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Воскресенье</span>
                <span className="text-gray-900 font-semibold">10:00 - 21:00</span>
              </div>
            </div>
            <Link
              href="/contacts"
              className="mt-4 inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-xl hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
            >
              Записаться
            </Link>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-yellow-200 pt-8">
          {/* Юридическая информация */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 mb-3">Юридическая информация</h4>
            <div className="text-sm text-gray-700 space-y-1.5">
              <div><span className="font-semibold">Полное наименование:</span> ИП Мышенков Н.А.</div>
              <div><span className="font-semibold">Юридический адрес:</span> г. Пенза, Московская ул., д.12, 3 этаж</div>
              <div><span className="font-semibold">ИНН:</span> 580203100855</div>
              <div><span className="font-semibold">ОГРНИП:</span> 325580000044230</div>
              <div className="text-xs text-gray-600 mt-2">Банковские реквизиты и договор предоставляются по запросу.</div>
            </div>
          </div>

          {/* Копирайт */}
          <div className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Центр Эталон. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  )
}
