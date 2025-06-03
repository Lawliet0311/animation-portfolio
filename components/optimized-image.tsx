"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends Omit<ImageProps, 'className'> {
  lowQualitySrc?: string
  blurEffect?: boolean
  fadeIn?: boolean
  fadeInDuration?: number
  onLoadingComplete?: (success: boolean) => void
  className?: string
}

export default function OptimizedImage({
  src,
  alt,
  lowQualitySrc,
  blurEffect = true,
  fadeIn = true,
  fadeInDuration = 500,
  className,
  onLoadingComplete,


  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  // 处理图片加载完成
  const handleImageLoad = () => {
    setIsLoaded(true)
    if (onLoadingComplete) onLoadingComplete(true)
  }

  // 处理图片加载错误
  const handleImageError = () => {
    setIsError(true)
    onLoadingComplete && onLoadingComplete(false)
  }

  // 在组件卸载时清理
  useEffect(() => {
    return () => {
      // 清理可能的内存泄漏
      const img = new window.Image()
      img.onload = null
      img.onerror = null
    }
  }, [])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* 低质量图片预览 */}
      {blurEffect && lowQualitySrc && !isLoaded && (
        <Image
          src={lowQualitySrc || "/placeholder.svg"}
          alt={alt}
          fill={props.fill}
          width={!props.fill ? props.width : undefined}
          height={!props.fill ? props.height : undefined}
          className={cn(
            "object-cover transition-opacity duration-300",
            props.objectFit ? `object-${props.objectFit}` : "object-cover",
            "blur-sm scale-105",
            className || '',
          )}
        />
      )}

      {/* 主图片 */}
      <Image
        {...props}
        src={src || "/placeholder.svg"}
        alt={alt}
        className={cn("object-cover", className || '')}
        onLoadingComplete={handleImageLoad}
        onError={handleImageError}
      />

      {/* 加载错误显示 */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-elegant-bg/50 text-elegant-muted text-sm">
          图片加载失败
        </div>
      )}
    </div>
  )
}
