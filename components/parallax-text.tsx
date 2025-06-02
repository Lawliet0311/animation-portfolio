"use client"

import type { ReactNode } from "react"
import { Parallax } from "react-scroll-parallax"
import useMobile from "@/hooks/use-mobile"

interface ParallaxTextProps {
  children: ReactNode
  className?: string
  speed?: number
  easing?: "easeIn" | "easeOut" | "easeInOut" | "linear"
}

export default function ParallaxText({
  children,
  className = "",
  speed = 10,
  easing = "easeOutQuad",
}: ParallaxTextProps) {
  const { isMobile } = useMobile()

  // 在移动设备上减少视差效果的强度
  const mobileSpeed = isMobile ? speed * 0.3 : speed

  return (
    <Parallax
      translateY={[mobileSpeed, -mobileSpeed]}
      easing={easing}
      className={className}
      shouldAlwaysCompleteAnimation={true}
      scale={[0.95, 1.05]}
    >
      {children}
    </Parallax>
  )
}
