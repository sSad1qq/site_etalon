'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToAnchor() {
  const pathname = usePathname()

  useEffect(() => {
    // Обработка якоря при загрузке страницы
    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash) {
        // Небольшая задержка для того, чтобы контент успел загрузиться
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1))
          if (element) {
            const headerHeight = 80 // Высота хедера
            const targetPosition = element.offsetTop - headerHeight
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      }
    }

    // Выполняем скролл при изменении пути
    handleHashScroll()

    // Также обрабатываем изменения хеша без перезагрузки страницы
    const handleHashChange = () => {
      handleHashScroll()
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [pathname])

  return null
}

