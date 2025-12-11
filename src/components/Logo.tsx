import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/logo.png?v=2"
        alt="Логотип образовательного центра ЭТАЛОН"
        width={200}
        height={80}
        className="h-16 w-auto"
        priority
        unoptimized
      />
    </div>
  )
}
