'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    setIsMenuOpen(false)
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
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: 'Главная', href: '/', type: 'link' },
    { name: 'Предметы', href: '#subjects', type: 'anchor', onClick: handleSubjectsClick },
    { name: 'О центре', href: '#about', type: 'anchor', onClick: handleAboutClick },
    { name: 'FAQ', href: '/faq', type: 'link' },
    { name: 'Контакты', href: '/contacts', type: 'link' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : 'bg-gradient-to-br from-yellow-50 via-white to-yellow-100'
    }`}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Логотип */}
          <Link href="/" className="flex items-center">
            <Logo />
            <span className="ml-1 sm:ml-2 text-lg sm:text-xl font-bold">Эталон</span>
          </Link>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => {
              if (item.type === 'anchor') {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={item.onClick}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300"
                  >
                    {item.name}
                  </a>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300"
                >
                  {item.name}
                </Link>
              )
            })}
            <Link 
              href="/contacts" 
              className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold shadow-md"
            >
              Записаться
            </Link>
          </nav>

          {/* Мобильное меню */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 origin-center ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`} />
            <div className={`w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`} />
            <div className={`w-6 h-0.5 bg-gray-800 mt-1.5 transition-all duration-300 origin-center ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`} />
          </button>
        </div>

        {/* Мобильное меню (выпадающее) */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col space-y-3 py-4">
            {navItems.map((item) => {
              if (item.type === 'anchor') {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      item.onClick?.(e)
                      setIsMenuOpen(false)
                    }}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300"
                  >
                    {item.name}
                  </a>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <Link 
              href="/contacts" 
              className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 hover:shadow-xl transition-all duration-300 font-semibold shadow-md text-center"
            >
              Записаться
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}