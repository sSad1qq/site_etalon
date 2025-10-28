import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    center: [
      { name: 'О центре', href: '/about' },
      { name: 'Предметы', href: '/subjects' },
      { name: 'Результаты', href: '/#results' },
      { name: 'Отзывы', href: '/#testimonials' }
    ],
    info: [
      { name: 'FAQ', href: '/faq' },
      { name: 'Расположение', href: '/location' },
      { name: 'Контакты', href: '/contacts' },
      { name: 'Политика конфиденциальности', href: '/privacy' }
    ],
    subjects: [
      { name: 'Математика', href: '/subjects#math' },
      { name: 'Русский язык', href: '/subjects#russian' },
      { name: 'Физика', href: '/subjects#physics' },
      { name: 'Химия', href: '/subjects#chemistry' }
    ]
  }

  const socialLinks = [
    { name: 'VKontakte', href: 'https://vk.com/repetitor_penza_etalon', icon: '📘' },
    { name: 'Telegram', href: 'https://t.me/centerEtalon', icon: '📱' },
    { name: 'Yandex', href: 'https://yandex.ru/profile/154840463548', icon: '🔍' }
  ]

  return (
  <footer className="bg-white border-t border-yellow-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Логотип и описание */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Готовим к ЕГЭ и ОГЭ без стресса на высокие баллы. 
              Мини-группы, опытные преподаватели, индивидуальный подход.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⭐</span>
                <span>4.9/5 рейтинг</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">👥</span>
                <span>1000+ выпускников</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">🎯</span>
                <span>Средний балл выше по сравнению со страной на 10 пунктов</span>
              </div>
            </div>
          </div>

          {/* Центр */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-6">О центре</h3>
            <ul className="space-y-3">
              {footerLinks.center.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-yellow-600 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-6">Информация</h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-yellow-600 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Предметы */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-6">Предметы</h3>
            <ul className="space-y-3">
              {footerLinks.subjects.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-yellow-600 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="mt-16 pt-8 border-t border-yellow-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Контакты */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-4">Контакты</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">📞</span>
                  <div>
                    <div className="font-semibold">8 (8412) 28-31-31</div>
                    <div className="text-sm">Основной номер</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">📱</span>
                  <div>
                    <div className="font-semibold">8 (937) 915 14-11</div>
                    <div className="text-sm">WhatsApp/Telegram</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">📱</span>
                  <div>
                    <div className="font-semibold">8 (952) 190 61-43</div>
                    <div className="text-sm">Доп. номер</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">�</span>
                  <div>
                    <div className="font-semibold">Московская 12, 3 этаж</div>
                    <div className="text-sm">г. Пенза</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link href="/contacts#legal" className="text-sm text-gray-600 hover:text-yellow-600">Юридическая информация</Link>
            </div>

            {/* Социальные сети */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-4">Мы в соцсетях</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:animate-wiggle"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-lg font-black text-gray-900 mb-4">Начните обучение</h3>
              <p className="text-gray-600 mb-4">
                Запишитесь на бесплатное тестирование и получите персональные рекомендации
              </p>
              <Link
                href="/contacts"
                className="btn-primary text-sm px-6 py-3 group inline-block"
              >
                <span className="flex items-center space-x-2">
                  <span>Перейти в Контакты</span>
                  <span className="group-hover:animate-wiggle">✨</span>
                </span>
              </Link>
              <a
                href="/api/leads/export"
                className="ml-3 inline-block text-sm px-4 py-2 bg-gray-50 border border-gray-200 rounded-2xl hover:bg-gray-100 hover:scale-105 hover:shadow-md transition-all duration-300"
                title="Скачать лиды в CSV"
              >
                Скачать лиды
              </a>
            </div>
          </div>
        </div>

        {/* Полезные ссылки */}
        <div className="mt-10">
          <h4 className="text-lg font-black text-gray-900 mb-4">Полезные ссылки</h4>
          <div className="flex flex-wrap gap-3">
            <Link href="/contacts" className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-2xl font-medium hover:bg-yellow-200 hover:scale-105 hover:shadow-md transition-all duration-300">Контакты</Link>
            <Link href="/location" className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-2xl font-medium hover:bg-yellow-200 hover:scale-105 hover:shadow-md transition-all duration-300">Расположение</Link>
            <Link href="/faq" className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-2xl font-medium hover:bg-yellow-200 hover:scale-105 hover:shadow-md transition-all duration-300">FAQ</Link>
            <Link href="/contacts#legal" className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-2xl font-medium hover:bg-yellow-200 hover:scale-105 hover:shadow-md transition-all duration-300">Юридическая информация</Link>
            <Link href="/subjects" className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-2xl font-medium hover:bg-yellow-200 hover:scale-105 hover:shadow-md transition-all duration-300">Предметы</Link>
            <Link href="/about" className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-2xl font-medium hover:bg-yellow-200 hover:scale-105 hover:shadow-md transition-all duration-300">О центре</Link>
          </div>
        </div>

        {/* Юридическая информация (явно) */}
        <div className="mt-8 bg-yellow-50 p-6 rounded-3xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
          <h4 className="text-sm font-bold text-gray-900 mb-2">Юридическая информация</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <div>Полное наименование: ИП Мышенков Н.А.</div>
            <div>Юридический адрес: г. Пенза, Московская ул., д.12, 3 этаж</div>
            <div>ИНН: 580203100855</div>
            <div>ОГРНИП: 325580000044230</div>
            <div>Банковские реквизиты и договор предоставляются по запросу.</div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="mt-12 pt-8 border-t border-yellow-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              © {currentYear} Образовательный центр «Эталон». Все права защищены.
            </div>
            <div className="text-gray-500 text-sm">
              ИП Мышенков Н.А. | ИНН: 580203100855 | ОГРНИП: 325580000044230
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}