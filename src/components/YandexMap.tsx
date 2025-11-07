'use client'

import { useEffect, useRef, useState } from 'react'

export default function YandexMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let map: YMapsMap | null = null

    function initMap() {
      if (!mapRef.current || !window.ymaps) return

      try {
        // Точные координаты здания по адресу Пенза, ул. Московская, 12
        const buildingCoords: [number, number] = [53.186782, 45.014130]

        // Создаем карту с центром на здании
        map = new window.ymaps.Map(mapRef.current, {
          center: buildingCoords,
          zoom: 17,
          controls: ['zoomControl', 'geolocationControl', 'trafficControl']
        })

        // Создаем метку на здании
        const placemark = new window.ymaps.Placemark(
          buildingCoords,
            {
              balloonContentHeader: '<strong>Центр "Эталон"</strong>',
              // TODO: Заменить на реальный номер телефона
              balloonContentBody: 'г. Пенза, ул. Московская, 12, 3 этаж<br><a href="tel:+7XXXXXXXXXX">+7 (XXX) XXX-XX-XX</a>',
              balloonContentFooter: 'Пн-Сб: 15:00-21:00, Вс: 10:00-21:00',
              hintContent: 'Центр "Эталон"'
            },
          {
            preset: 'islands#redEducationIcon',
            iconColor: '#f59e0b' // Желтый цвет в стиле сайта
          }
        )

        map.geoObjects.add(placemark)
        setIsLoading(false)
      } catch {
        // Ошибка инициализации карты (логирование отключено для production)
        setIsLoading(false)
      }
    }

    // Загружаем Яндекс.Карты API
    if (typeof window !== 'undefined') {
      // Проверяем, загружен ли уже скрипт
      const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]')
      
      if (!window.ymaps && !existingScript) {
        const script = document.createElement('script')
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU'
        script.async = true
        script.onload = () => {
          if (window.ymaps) {
          window.ymaps.ready(initMap)
          }
        }
        document.head.appendChild(script)
      } else if (window.ymaps) {
        window.ymaps.ready(initMap)
      }
    }

    return () => {
      if (map) {
        map.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-full min-h-[400px] rounded-t-3xl overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-3xl">🗺️</span>
            </div>
            <p className="text-lg font-bold">Загрузка карты...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        style={{ width: '100%', height: '400px' }}
        className="yandex-map"
      />
    </div>
  )
}

// Типы для TypeScript и Яндекс.Карт
interface YMapsPlacemarkProperties {
  balloonContentHeader?: string
  balloonContentBody?: string
  balloonContentFooter?: string
  hintContent?: string
}

interface YMapsPlacemarkOptions {
  preset?: string
  iconColor?: string
}

interface YMapsPlacemark {
  options: YMapsPlacemarkOptions
}

interface YMapsMapOptions {
  center: [number, number]
  zoom: number
  controls: string[]
}

interface YMapsMap {
  geoObjects: {
    add: (object: YMapsPlacemark) => void
  }
  destroy: () => void
}

interface YMapsAPI {
  ready: (callback: () => void) => void
  Map: new (element: HTMLElement, options: YMapsMapOptions) => YMapsMap
  Placemark: new (coords: [number, number], properties: YMapsPlacemarkProperties, options: YMapsPlacemarkOptions) => YMapsPlacemark
}

declare global {
  interface Window {
    ymaps?: YMapsAPI
  }
}

