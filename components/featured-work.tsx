"use client"

import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import LocalImage from "@/components/local-image"
import Image from "next/image"
import { useState } from "react"

interface FeaturedWorkProps {
  title: string
  category: string
  image: string

  href: string
  imageStyle?: React.CSSProperties
}

export default function FeaturedWork({ title, category, image, href, imageStyle }: FeaturedWorkProps) {
  // 截断长标题
  const truncateTitle = (title: string, maxLength = 20) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title
  }

  // 检查是否为特步项目
  const isXtepProject = title.includes("特步品牌")

  // 在组件内部添加状态跟踪图片加载
  const [imageError, setImageError] = useState(false)

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-md bg-elegant-bg border border-elegant-border hover:border-elegant-accent1/30 transition-all duration-300 elegant-card-hover h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <LocalImage
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="transition-transform duration-500 group-hover:scale-105 object-cover"
            style={imageStyle}
          />
        ) : image ? (
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="transition-transform duration-500 group-hover:scale-105 object-cover"
            style={imageStyle}
          />
        ) : (
          <LocalImage
            src="/placeholder.svg"
            alt={title}
            fill
            className="transition-transform duration-500 group-hover:scale-105 object-cover"
            style={imageStyle}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-elegant-bg to-transparent opacity-60" />
        <Badge className="absolute top-4 left-4 bg-elegant-accent3/90 hover:bg-elegant-accent3/80 text-xs sm:text-sm">
          {category}
        </Badge>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold mb-2 group-hover:text-elegant-accent1 transition-colors line-clamp-2">
          {truncateTitle(title)}
        </h3>
        <div className="flex items-center text-xs sm:text-sm text-elegant-muted group-hover:text-elegant-text transition-colors">
          <span>查看详情</span>
          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
