"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface VideoThumbnailProps {
  videoUrl: string
  title: string
  className?: string
}

export default function VideoThumbnail({ videoUrl, title, className = "" }: VideoThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block aspect-video overflow-hidden rounded-md bg-elegant-card relative elegant-border group hover:shadow-lg hover:shadow-elegant-accent1/20 transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        {/* 背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-elegant-bg to-elegant-card z-10"></div>

        {/* 视频播放提示 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
          <div
            className={`bg-elegant-accent1/80 p-3 rounded-full mb-2 transform transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          >
            <Play className="h-6 w-6 text-white" />
          </div>
          <span className="text-elegant-text text-sm font-medium px-3 py-1 bg-elegant-bg/70 rounded-md">
            {title || "点击观看视频"}
          </span>
        </div>

        {/* 悬停效果 */}
        <div
          className={`absolute inset-0 bg-elegant-accent1/10 transition-opacity duration-300 z-40 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>
    </a>
  )
}
