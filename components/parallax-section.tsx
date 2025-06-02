"use client"

import type { ReactNode } from "react"
import { Parallax } from "react-scroll-parallax"
import useMobile from "@/hooks/use-mobile"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  easing?: "easeIn" | "easeOut" | "easeInOut" | "linear"
  className?: string
  direction?: "up" | "down" | "left" | "right"
  opacity?: [number, number]
  scale?: [number, number]
  rotate?: number
  shouldAlwaysCompleteAnimation?: boolean
}

export default function ParallaxSection({
  children,
  speed = 5,
  easing = "easeOutQuad",
  className = "",
  direction = "up",
  opacity,
  scale,
  rotate,
  shouldAlwaysCompleteAnimation = true,
}: ParallaxSectionProps) {
  const { isMobile } = useMobile()

  // 在移动设备上减少视差效果的强度
  const mobileSpeed = isMobile ? speed * 0.5 : speed

  // 根据方向设置视差效果
  const getTranslateConfig = () => {
    switch (direction) {
      case "up":
        return { y: [mobileSpeed, -mobileSpeed] }
      case "down":
        return { y: [-mobileSpeed, mobileSpeed] }
      case "left":
        return { x: [mobileSpeed, -mobileSpeed] }
      case "right":
        return { x: [-mobileSpeed, mobileSpeed] }
      default:
        return { y: [mobileSpeed, -mobileSpeed] }
    }
  }

  return (
    <Parallax
      {...getTranslateConfig()}
      opacity={opacity}
      scale={scale}
      rotate={rotate ? [0, rotate] : undefined}
      easing={easing}
      className={className}
      shouldAlwaysCompleteAnimation={shouldAlwaysCompleteAnimation}
    >
      {children}
    </Parallax>
  )
}
