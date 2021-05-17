import { useState, useEffect } from 'react'
// let isPageWide = useMediaQuery('(min-width: 800px)')

export function useMediaQuery (query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}
