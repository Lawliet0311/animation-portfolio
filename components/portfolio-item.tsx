"use client"; // 添加此行
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"


interface PortfolioItemProps {
  title: string
  category: string
  image: string
  cloudinaryId?: string
  href: string
}

export default function PortfolioItem({ title, category, image, href, cloudinaryId }: PortfolioItemProps) {
  // 标题替换函数
  const getDisplayTitle = (originalTitle: string) => {
    // 不再需要替换标题，因为我们已经在数据源中使用了正确的标题
    return originalTitle
  }

  // 截断长标题
  const truncateTitle = (title: string, maxLength = 20) => {
    const displayTitle = getDisplayTitle(title)
    return displayTitle.length > maxLength ? `${displayTitle.substring(0, maxLength)}...` : displayTitle
  }

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-md bg-elegant-bg border border-elegant-border hover:border-elegant-accent1/30 transition-all duration-300 elegant-card-hover h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title || ""}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-elegant-bg to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        <Badge className="absolute top-4 left-4 bg-elegant-accent3/90 hover:bg-elegant-accent3/80 text-xs sm:text-sm">
          {category === "项目管理/技术" ? "漫画制作" : category}
        </Badge>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-elegant-accent1 text-elegant-bg px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm flex items-center text-sm sm:text-base">
            <span>查看详情</span>
            <ArrowRight className="ml-1.5 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold group-hover:text-elegant-accent1 transition-colors line-clamp-2">
          {truncateTitle(title)}
        </h3>
      </div>
    </Link>
  )
}
