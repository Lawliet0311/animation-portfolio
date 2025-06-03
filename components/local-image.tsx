"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import CloudinaryImage from "@/components/cloudinary-image"

interface LocalImageProps extends ImageProps {
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  cloudinaryId?: string
}

export default function LocalImage({
  src,
  alt,
  className,
  onLoad,
  cloudinaryId,
  ...props
}: LocalImageProps) {
  const [isError, setIsError] = useState(false)

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    onLoad && onLoad(event)
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsError(true)
    onLoad && onLoad(event)
  }

  if (cloudinaryId) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <CloudinaryImage
          publicId={cloudinaryId}
          alt={alt}
          className={cn(
            "object-cover",
            props.className || '',
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...props}
        />

        {isError && (
          <div className="absolute inset-0 flex items-center justify-center bg-elegant-bg/50 text-elegant-muted text-sm">
            图片加载失败
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        {...props}
        src={isError ? "/placeholder.svg" : src}
        alt={alt}
        className={cn(
          "object-cover",
          props.className || '',
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-elegant-bg/50 text-elegant-muted text-sm">
          图片加载失败
        </div>
      )}
    </div>
  )
}
