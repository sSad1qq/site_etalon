import Link from 'next/link'
import Image from 'next/image'

export default function ResultsBoard() {
  const results = [
    {
      image: "/pochet_1.jpg"
    },
    {
      image: "/pochet_2.jpg"
    },
    {
      image: "/pochet_3.jpg"
    },
    {
      image: "/pochet_4.jpg"
    },
    {
      image: "/pochet_5.jpg"
    },
    {
      image: "/pochet_6.jpg"
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-yellow-50 to-white relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🏆</div>
      <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-float-slow">⭐</div>
      <div className="absolute top-1/2 right-20 text-4xl opacity-10 animate-float">🎓</div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 animate-slide-in-up">
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Доска почета
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up">
            Наши выпускники показывают выдающиеся результаты и поступают в лучшие вузы страны
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center items-start">
          {results.map((item, index) => (
                    <div
                      key={index}
                      className="card-lying rounded-3xl p-1 group animate-zoom-in overflow-hidden"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
              <div className="relative w-full h-[500px] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={`Достижение ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA с анимацией */}
        <div className="text-center mt-20">
                  <div className="card-lying rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden animate-zoom-in">
            <h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
              Стань следующим в списке успешных выпускников!
            </h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Присоединяйся к тысячам учеников, которые уже достигли своих целей с нами
            </p>
            <Link href="/contacts" className="btn-primary btn-magic text-lg px-12 py-4 flex items-center justify-center">
              <span className="flex items-center space-x-3">
                <span>Начать подготовку</span>
                <span className="group-hover:animate-wiggle">🚀</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}