import Link from 'next/link'
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
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.45 14.63c-.21.45-.81.85-1.74.85-.88 0-1.75-.25-2.5-.88-.88-.74-1.66-1.81-2.42-2.81-.26-.35-.51-.68-.77-.95-.6.9-1.26 1.74-1.95 2.42-.88.86-1.81 1.29-2.65 1.22-.63-.05-1.12-.42-1.37-1.05-.42-1.05.07-2.46 1.39-3.98.42-.49.88-.95 1.35-1.35-.77-.39-1.46-.95-1.95-1.63-.42-.58-.63-1.22-.56-1.81.07-.53.35-.95.81-1.22.95-.56 2.39-.18 3.91 1.08.53.44 1.05.95 1.53 1.53.49-.58 1.01-1.08 1.53-1.53 1.53-1.26 2.96-1.64 3.91-1.08.46.28.74.7.81 1.22.07.6-.14 1.23-.56 1.81-.49.68-1.19 1.23-1.95 1.63.46.39.93.86 1.35 1.35 1.32 1.53 1.81 2.93 1.39 3.98z"/>
        </svg>
      ), 
      href: 'https://vk.com/repetitor_penza_etalon', 
      color: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
    },
    { 
      name: 'Telegram', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ), 
      href: 'https://t.me/centerEtalon', 
      color: 'from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600' 
    },
    { 
      name: 'Yandex', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.5 0C5.596 0 0 5.596 0 12.5S5.596 25 12.5 25 25 19.404 25 12.5 19.404 0 12.5 0zm0 22.5c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"/>
          <path d="M8.5 7.5h7v2h-5v3h5v2h-5v5h-2v-12z"/>
        </svg>
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
          <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100 hover:shadow-lg transition-all duration-300 mb-6">
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
