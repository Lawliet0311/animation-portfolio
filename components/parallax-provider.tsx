"use client"

import type { ReactNode } from "react"
import { ParallaxProvider as ScrollParallaxProvider } from "react-scroll-parallax"
import useMobile from "@/hooks/use-mobile"

interface ParallaxProviderProps {
  children: ReactNode
}

export default function ParallaxProvider({ children }: ParallaxProviderProps) {
  const { isMobile } = useMobile()

  return (
    <ScrollParallaxProvider
      // 在移动设备上减少视差效果的强度，提高性能
      scrollAxis="vertical"
      shouldDisableScalingTranslations={isMobile}
    >
      {children}
    </ScrollParallaxProvider>
  )
}
