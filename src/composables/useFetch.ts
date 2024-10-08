interface FetchOption {
  timeout?: number
  headers?: Record<string, string>
}

export default async function useFetch(url: string, options: FetchOption = {}) {
  const BASE_URL = "https://api.unsplash.com"
  const accessId = import.meta.env.VITE_UNSPLASH_ACCESS_ID

  const timeout = options.timeout || 5000 // Default 5 second timeout
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(BASE_URL + url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Client-ID ${accessId}`
      },
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error("HTTP error! status: ${response.status}")
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    } else {
      return await response.text()
    }
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeout}ms`)
    }
    throw new Error(" Fetch error: ${error.message}")
  }
}
