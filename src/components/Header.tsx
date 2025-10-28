'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Главная', href: '/' },
    { name: 'О центре', href: '/about' },
    { name: 'Предметы', href: '/subjects' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Расположение', href: '/location' },
    { name: 'Контакты', href: '/contacts' },
    { name: 'Юридическая информация', href: '/contacts#legal' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Логотип */}
          <Link href="/" className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-bold">Эталон</span>
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.slice(0,3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            <div className="flex items-center space-x-3 ml-4">
              <Link href="/contacts" className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300">Контакты</Link>
              <Link href="/location" className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300">Расположение</Link>
              <Link href="/faq" className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300">FAQ</Link>
              <Link href="/contacts#legal" className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300">Юр. инфа</Link>
            </div>

            <div className="ml-4">
              <Link href="/contacts" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-5 py-2 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 hover:scale-110 hover:shadow-xl transition-all duration-300 inline-block text-center font-semibold shadow-md">Записаться</Link>
            </div>
          </nav>

          {/* Мобильное меню */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            <div className={`w-6 h-px bg-text transition-all duration-300 ${
              isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''
            }`} />
            <div className={`w-6 h-px bg-text mt-1.5 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <div className={`w-6 h-px bg-text mt-1.5 transition-all duration-300 ${
              isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
            }`} />
          </button>
        </div>

        {/* Мобильное меню (выпадающее) */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/contacts#legal" className="text-text hover:text-primary transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
              Юр. информация
            </Link>
            <Link href="/contacts" className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-2xl hover:from-yellow-500 hover:to-yellow-600 hover:scale-110 hover:shadow-xl transition-all duration-300 inline-block text-center font-semibold shadow-md">
              Записаться
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}