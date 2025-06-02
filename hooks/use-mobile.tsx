"use client"

import { useState, useEffect } from "react"

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
      setIsLandscape(window.innerWidth > window.innerHeight)
    }

    // 初始检查
    checkDevice()

    // 监听窗口大小变化
    window.addEventListener("resize", checkDevice)

    // 监听设备方向变化
    window.addEventListener("orientationchange", checkDevice)

    // 清理函数
    return () => {
      window.removeEventListener("resize", checkDevice)
      window.removeEventListener("orientationchange", checkDevice)
    }
  }, [])

  return { isMobile, isTablet, isLandscape }
}
