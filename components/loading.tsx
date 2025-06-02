"use client"

import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // 在组件挂载后，设置一个定时器来隐藏加载界面
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 800)

    // 清理函数
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-elegant-bg/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner className="mb-4" />
        <p className="text-elegant-muted">加载中...</p>
      </div>
    </div>
  )
}
