import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Согласие на обработку данных метрическими программами',
  description: 'Согласие на обработку данных метрическими программами Центра подготовки к ЕГЭ и ОГЭ Эталон',
}

export default function MetricsConsentPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-screen flex flex-col">
        {/* Верхняя панель с кнопкой скачивания */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Согласие на обработку данных метрическими программами
              </h1>
              <a
                href="/soglasie-na-obrabotku-metrikami.pdf"
                download
                className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-100 text-amber-600 font-semibold rounded-lg transition-all duration-300 shadow hover:shadow-lg whitespace-nowrap"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Скачать
              </a>
            </div>
          </div>
        </div>
        
        {/* PDF просмотрщик на весь экран */}
        <div className="flex-1 w-full">
          <object
            data="/soglasie-na-obrabotku-metrikami.pdf"
            type="application/pdf"
            className="w-full h-full"
          >
            <embed
              src="/soglasie-na-obrabotku-metrikami.pdf"
              type="application/pdf"
              className="w-full h-full"
            />
          </object>
        </div>
      </div>
    </div>
  )
}

