'use client'

import { useEffect, useRef, useState } from 'react'

const YANDEX_MAPS_API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY
const YANDEX_MAPS_URL = 'https://yandex.ru/maps/?pt=45.014130,53.186782&z=17&l=map'

export default function YandexMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(Boolean(YANDEX_MAPS_API_KEY))
  const [hasError, setHasError] = useState(false)

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
              balloonContentBody: 'г. Пенза, ул. Московская, 12, 3 этаж<br><a href="tel:+78412283131" style="color: #f59e0b; text-decoration: none; font-weight: bold;">+7 (8412) 28-31-31</a><br><a href="tel:+79379151411" style="color: #f59e0b; text-decoration: none; font-weight: bold;">+7 (937) 915 14-11</a>',
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
        setIsLoading(false)
        setHasError(true)
      }
    }

    // Загружаем Яндекс.Карты API
    if (typeof window !== 'undefined') {
      if (!YANDEX_MAPS_API_KEY) {
        return
      }

      // Проверяем, загружен ли уже скрипт
      const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]')
      
      if (!window.ymaps && !existingScript) {
        const script = document.createElement('script')
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(YANDEX_MAPS_API_KEY)}&lang=ru_RU`
        script.async = true
        script.onload = () => {
          if (window.ymaps) {
            window.ymaps.ready(initMap)
          } else {
            setIsLoading(false)
            setHasError(true)
          }
        }
        script.onerror = () => {
          setIsLoading(false)
          setHasError(true)
        }
        document.head.appendChild(script)
      } else if (window.ymaps) {
        window.ymaps.ready(initMap)
      } else if (existingScript) {
        existingScript.addEventListener('load', () => {
          if (window.ymaps) {
            window.ymaps.ready(initMap)
          } else {
            setIsLoading(false)
            setHasError(true)
          }
        }, { once: true })
        existingScript.addEventListener('error', () => {
          setIsLoading(false)
          setHasError(true)
        }, { once: true })
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
      {(!YANDEX_MAPS_API_KEY || hasError) && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center p-6 z-10">
          <div className="text-center text-white">
            <div className="text-4xl mb-3" aria-hidden="true">🗺️</div>
            <p className="text-lg font-bold mb-4">Карта временно недоступна</p>
            <a
              href={YANDEX_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl bg-white px-5 py-3 font-bold text-yellow-700 transition-colors hover:bg-yellow-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-600"
            >
              Открыть адрес в Яндекс Картах
            </a>
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
