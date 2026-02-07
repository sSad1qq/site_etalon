'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      const headerHeight = 80
      const targetPosition = aboutSection.offsetTop - headerHeight
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* ===== DESKTOP HERO ===== */}
      <div className="hidden lg:block bg-[#FFFFFE]">
        <div className="max-w-[1352px] mx-auto px-4 pt-4 pb-10">
          {/* Card wrapper with aspect ratio matching hero-bg.svg viewBox */}
          <div
            className="relative w-full"
            style={{ aspectRatio: '1271 / 581' }}
          >
            {/* Orange gradient background shape (SVG) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-bg.svg"
              alt=""
              className="absolute inset-0 w-full h-full"
              draggable={false}
            />

            {/* Decorative arrow/vector overlay */}
            <div className="absolute top-[8%] left-[5%] w-[62%] h-[78%] pointer-events-none overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-underline-green.svg"
                alt=""
                className="w-full h-full"
                draggable={false}
              />
            </div>

            {/* Text content - left side */}
            <div className="absolute inset-0 flex items-center">
              <div className="pl-10 xl:pl-14 2xl:pl-16 max-w-[62%]">
                {/* Subtitle */}
                <p
                  className="text-lg xl:text-xl font-normal text-[#6A340A] mb-1 xl:mb-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: '50px',
                  }}
                >
                  Подготовка к ЕГЭ и ОГЭ без стресса в Пензе
                </p>

                {/* Main heading */}
                <h1
                  className="font-black uppercase text-[#423930] mb-6 xl:mb-8"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(32px, 2.9vw, 42px)',
                    lineHeight: 'clamp(34px, 3vw, 44px)',
                    maxWidth: '789px',
                  }}
                >
                  Увеличим
                  <br />
                  результат ребенка
                  <br />
                  <span className="whitespace-nowrap">
                    <span className="relative inline-block text-[#2A7B2B]">
                      <span>на 18 баллов</span>
                      {/* Green brush-stroke underline */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/hero-underline.svg"
                        alt=""
                        className="absolute left-0 pointer-events-none"
                        style={{
                          top: '100%',
                          marginTop: '-2px',
                          width: '100%',
                          height: 'clamp(6px, 0.6vw, 10px)',
                          filter:
                            'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.15))',
                        }}
                        draggable={false}
                      />
                    </span>{' '}
                    <span className="text-[#423930]">за первый месяц!</span>
                  </span>
                </h1>

                {/* CTA Buttons */}
                <div
                  className="flex items-center gap-4 xl:gap-5"
                  style={{ backdropFilter: 'blur(4.95px)' }}
                >
                  <Link
                    href="/contacts"
                    className="hero-btn-primary inline-flex items-center justify-center px-4 xl:px-6 h-[48px] xl:h-[55px] rounded-[15px] text-white font-extrabold text-base xl:text-xl whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background:
                        'radial-gradient(161.24% 266.36% at 55.03% 50.91%, #2A7B2B 0%, #FFCC92 100%)',
                    }}
                  >
                    Бесплатная консультация
                  </Link>
                  <a
                    href="#about"
                    onClick={handleAboutClick}
                    className="hero-btn-secondary inline-flex items-center justify-center px-4 xl:px-6 h-[48px] xl:h-[55px] rounded-[15px] font-extrabold text-base xl:text-lg text-[#6A340A] whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: 'rgba(191, 175, 167, 0.3)',
                      border: '3px solid #6A340A',
                    }}
                  >
                    Подробнее о центре
                  </a>
                </div>
              </div>
            </div>

            {/* Owl image - right side, cropped from bottom */}
            <div
              className="absolute right-[2%] xl:right-[3%] top-0 w-[32%] xl:w-[35%] overflow-hidden"
              style={{ height: '94%' }}
            >
              <Image
                src="/hero-sova-blur.webp"
                alt="Сова - символ мудрости и знаний"
                width={452}
                height={543}
                className="w-full h-auto"
                style={{ transform: 'rotate(-2.76deg)' }}
                sizes="(max-width: 1024px) 0px, 35vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE / TABLET HERO ===== */}
      <div
        className="lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, #FFE4AD 0%, #FFF0CE 40%, #FFF5D2 65%, #FFF4D2 80%, #FFFFFF 100%)',
        }}
      >
        <div className="px-4 sm:px-6 md:px-8 pt-4 pb-8">
          {/* Photo in golden frame */}
          <div
            className="mx-auto rounded-[20px] p-[4px] sm:p-[5px]"
            style={{
              background:
                'linear-gradient(135deg, #E8B84D 0%, #D4A03C 50%, #E8B84D 100%)',
              maxWidth: '500px',
            }}
          >
            <div className="relative w-full overflow-hidden rounded-[16px]">
              <Image
                src="/XXXL.png"
                alt="Ученики центра Эталон за занятиями"
                width={640}
                height={534}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Text content */}
          <div className="text-center mt-6 sm:mt-8">
            <h1 className="text-[28px] sm:text-4xl md:text-4xl font-black text-gray-900 mb-2 leading-tight">
              Увеличим результат
              <br />
              ребенка на{' '}
              <span className="text-[#f59e0b]">18 баллов</span>
              <br />
              за первый месяц
            </h1>
            <p className="text-base sm:text-lg text-gray-500 font-medium mt-2 mb-6">
              Подготовка к ЕГЭ и ОГЭ без стресса в Пензе
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            <Link
              href="/contacts"
              className="btn-primary text-lg px-6 py-4 inline-flex items-center justify-center w-full font-bold rounded-[20px]"
            >
              Бесплатная консультация
            </Link>

            <a
              href="#about"
              onClick={handleAboutClick}
              className="btn-secondary text-lg px-6 py-4 inline-flex items-center justify-center w-full font-bold rounded-[20px]"
            >
              Подробнее о центре
            </a>
          </div>

          {/* Mobile stats */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mt-6 md:hidden">
            {[
              { number: '7', label: 'лет на рынке', icon: '📅' },
              {
                number: '1289',
                label: 'довольных учеников',
                icon: '😊',
              },
              { number: '27', label: 'репетиторов', icon: '👨‍🏫' },
              { number: '5', label: 'предметов', icon: '📚' },
            ].map((stat, index) => (
              <div
                key={index}
                className="card-lying rounded-3xl p-3 text-center hover-lift bg-white"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-black text-yellow-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-700 font-bold leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
