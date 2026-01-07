'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

export default function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  const handleSubjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === '/') {
      // Если мы на главной странице, скроллим к разделу
      const subjectsSection = document.getElementById('subjects')
      if (subjectsSection) {
        const headerHeight = 80 // Примерная высота хедера
        const targetPosition = subjectsSection.offsetTop - headerHeight
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      // Если мы на другой странице, переходим на главную и скроллим
      router.push('/#subjects')
    }
  }

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === '/') {
      // Если мы на главной странице, скроллим к разделу
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        const headerHeight = 80 // Примерная высота хедера
        const targetPosition = aboutSection.offsetTop - headerHeight
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      // Если мы на другой странице, переходим на главную и скроллим
      router.push('/#about')
    }
  }
  const navItems = [
    { name: 'Главная', href: '/' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-16">
        {/* Основной контент футера */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* О центре */}
          <div className="lg:col-span-1">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
              Центр подготовки к ЕГЭ и ОГЭ в Пензе. Профессиональные репетиторы, мини-группы и индивидуальные занятия.
            </p>
            {/* Социальные сети */}
            <div className="flex space-x-2 sm:space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`bg-gradient-to-r ${social.color} text-white rounded-lg sm:rounded-xl p-2.5 sm:p-3 md:hover:scale-110 transition-all duration-300 shadow-md md:hover:shadow-lg`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="text-base sm:text-lg font-black text-gray-900 mb-3 sm:mb-4">Навигация</h3>
            <nav className="flex flex-col space-y-1.5 sm:space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 md:hover:text-yellow-600 transition-colors duration-200 text-xs sm:text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="#about"
                onClick={handleAboutClick}
                className="text-gray-600 md:hover:text-yellow-600 transition-colors duration-200 text-xs sm:text-sm font-medium"
              >
                О центре
              </a>
              <a
                href="#subjects"
                onClick={handleSubjectsClick}
                className="text-gray-600 md:hover:text-yellow-600 transition-colors duration-200 text-xs sm:text-sm font-medium"
              >
                Предметы
              </a>
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-base sm:text-lg font-black text-gray-900 mb-3 sm:mb-4">Контакты</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <span className="text-yellow-500 text-base sm:text-lg mt-0.5">📞</span>
                <div>
                  <a 
                    href="tel:+78412283131" 
                    className="text-gray-900 font-semibold md:hover:text-yellow-600 transition-colors block text-xs sm:text-sm"
                  >
                    8 (8412) 28-31-31
                  </a>
                  <span className="text-gray-600 text-xs">Основной номер</span>
                </div>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <span className="text-yellow-500 text-base sm:text-lg mt-0.5">📱</span>
                <div>
                  <a 
                    href="https://wa.me/79379151411" 
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-900 font-semibold md:hover:text-yellow-600 transition-colors block text-xs sm:text-sm"
                  >
                    8 (937) 915 14-11
                  </a>
                  <span className="text-gray-600 text-xs">WhatsApp/Telegram</span>
                </div>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3">
                <span className="text-yellow-500 text-base sm:text-lg mt-0.5">📍</span>
                <div>
                  <span className="text-gray-900 font-semibold block text-xs sm:text-sm">
                    г. Пенза, ул. Московская, 12, 3 этаж
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* График работы */}
          <div>
            <h3 className="text-base sm:text-lg font-black text-gray-900 mb-3 sm:mb-4">График работы</h3>
            <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-200">
                <span className="text-gray-600">Пн - Сб</span>
                <span className="text-gray-900 font-semibold">15:00 - 21:00</span>
              </div>
              <div className="flex justify-between items-center py-1.5 sm:py-2">
                <span className="text-gray-600">Воскресенье</span>
                <span className="text-gray-900 font-semibold">10:00 - 21:00</span>
              </div>
            </div>
            <Link
              href="/contacts"
              className="mt-3 sm:mt-4 inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl md:hover:from-yellow-500 md:hover:to-yellow-600 md:hover:scale-105 transition-all duration-300 text-xs sm:text-sm font-semibold shadow-md md:hover:shadow-lg"
            >
              Записаться
            </Link>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-yellow-200 pt-6 sm:pt-8">
          {/* Юридическая информация */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Юридическая информация</h4>
            <div className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-1.5">
              <div><span className="font-semibold">Полное наименование:</span> ИП Мышенков Н.А.</div>
              <div><span className="font-semibold">Юридический адрес:</span> г. Пенза, Московская ул., д.12, 3 этаж</div>
              <div><span className="font-semibold">ИНН:</span> 580203100855</div>
              <div><span className="font-semibold">ОГРНИП:</span> 325580000044230</div>
              <div className="text-xs text-gray-600 mt-1.5 sm:mt-2">Банковские реквизиты и договор предоставляются по запросу.</div>
            </div>
          </div>

          {/* Юридические документы */}
          <div className="mb-4 sm:mb-6">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Документы</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm">
              <Link 
                href="/privacy-policy" 
                className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
              >
                Положение об обработке персональных данных
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
              >
                Пользовательское соглашение
              </Link>
              <Link 
                href="/metrics-consent" 
                className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
              >
                Согласие на обработку данных метрическими программами
              </Link>
              <Link 
                href="/personal-data-consent" 
                className="text-gray-600 hover:text-yellow-600 transition-colors duration-200"
              >
                Согласие на обработку персональных данных
              </Link>
            </div>
          </div>

          {/* Копирайт */}
          <div className="text-center text-xs sm:text-sm text-gray-600">
            © {new Date().getFullYear()} Центр Эталон. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  )
}
