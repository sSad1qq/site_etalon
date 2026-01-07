import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных',
  description: 'Согласие на обработку персональных данных Центра подготовки к ЕГЭ и ОГЭ Эталон',
}

export default function PersonalDataConsentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-100 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-6 sm:mb-8">
            Согласие на обработку персональных данных
          </h1>
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">
            <p className="mb-4">
              Здесь будет размещено согласие на обработку персональных данных.
            </p>
            <p className="mb-4">
              Документ находится в разработке.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

