import { useCallback, useEffect, useRef, useState } from 'react'

// Loads `fetcher` now and every `intervalMs`, so automatic replies show up without a reload.
export function usePolling<T>(fetcher: () => Promise<T>, intervalMs = 5000) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const fetcherRef = useRef(fetcher)
  useEffect(() => {
    fetcherRef.current = fetcher
  }, [fetcher])

  const reload = useCallback(async () => {
    try {
      setData(await fetcherRef.current())
      setError(null)
    } catch (e) {
      setError(e as Error)
    }
  }, [])

  useEffect(() => {
    void reload()
    const timer = setInterval(() => void reload(), intervalMs)
    return () => clearInterval(timer)
  }, [reload, intervalMs])

  return { data, error, reload }
}
