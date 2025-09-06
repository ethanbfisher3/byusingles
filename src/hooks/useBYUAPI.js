import { useState, useEffect } from "react"

export const useBYUAPIPost = (url, info) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        origin: "https://commtech.byu.edu",
        body: JSON.stringify(info),
      })
      const json = await response.json()
      setData(json)
    }
    fetchData()
  }, [url, info])
  return data
}
const useAPI = (url) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
    }
    fetchData()
  }, [url])
  return data
}

export default useAPI
