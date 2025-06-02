"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface ImageFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc: string
  retryCount?: number
  retryDelay?: number
}

export default function ImageFallback({
  src,
  alt,
  fallbackSrc,
  retryCount = 2,
  retryDelay = 1000,
  ...props
}: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retries, setRetries] = useState(0)

  useEffect(() => {
    setImgSrc(src)
    setLoading(true)
    setError(false)
    setRetries(0)
  }, [src])

  const handleError = () => {
    if (retries < retryCount) {
      // Retry loading the image after delay
      setTimeout(() => {
        console.log(`Retrying image load (${retries + 1}/${retryCount}): ${src}`)
        // Add cache-busting parameter
        const cacheBuster = `?cb=${Date.now()}`
        setImgSrc(`${src}${typeof src === 'string' && src.includes("?") ? "&" : ""}${cacheBuster}`)
        setRetries((prev) => prev + 1)
      }, retryDelay)
    } else {
      console.error(`Image failed to load after ${retryCount} retries: ${src}`)
      setError(true)
      setImgSrc(fallbackSrc)
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-elegant-bg/20 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-elegant-accent1 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <Image
        {...props}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        onLoadingComplete={() => setLoading(false)}
        onError={handleError}
        unoptimized
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-elegant-bg/50 text-elegant-muted text-sm">
          图片加载失败
        </div>
      )}
    </div>
  )
}
