import { useState, useEffect } from 'react'

interface FetchData<T> {
  data: T | null
  setData: React.Dispatch<React.SetStateAction<T | null>>
}

const useFetch = <T,>(url: string): FetchData<T> => {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const responseData = await response.json()
        setData(responseData)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchData()
  }, [url])

  return { data, setData }
}

export default useFetch
