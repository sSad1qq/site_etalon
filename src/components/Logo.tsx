import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png"
        alt="Логотип образовательного центра ЭТАЛОН"
        width={150}
        height={60}
        className="h-12 w-auto"
        priority
      />
    </div>
  )
}
