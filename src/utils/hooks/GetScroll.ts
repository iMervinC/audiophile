import { useEffect, useState } from 'react'

export const useGetScroll = () => {
  const [positionY, setPositionY] = useState(0)

  useEffect(() => {
    const pos = () => {
      setPositionY(window.scrollY)
    }

    window.addEventListener('scroll', pos)

    return () => window.removeEventListener('scroll', pos)
  }, [])

  return { scrollY: positionY }
}
