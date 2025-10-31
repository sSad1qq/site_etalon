'use client'

import { useEffect, useState } from 'react'

export default function VKVideoPlayer({ oid, id, autoplay = false }: { oid: string; id: string; autoplay?: boolean }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const videoUrl = `https://vk.com/video_ext.php?oid=${oid}&id=${id}&hd=2${autoplay ? '&autoplay=1' : ''}`
  
  if (!mounted) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-gray-900" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-5xl mb-4 animate-pulse">▶️</div>
            <p className="text-lg font-bold">Загрузка видео...</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gray-900" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={videoUrl}
        width="853"
        height="480"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
        frameBorder="0"
        allowFullScreen
        title="VK Video"
      />
    </div>
  )
}

