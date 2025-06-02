"use client"

import { type ReactNode, useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import useMobile from "@/hooks/use-mobile"

interface SectionTransitionProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  threshold?: number
}

export default function SectionTransition({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.2,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const [hasAnimated, setHasAnimated] = useState(false)
  const { isMobile } = useMobile()

  // 移动端减少动画距离和时间
  const distance = isMobile ? 15 : 30
  const duration = isMobile ? 0.5 : 0.7

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true)
    }
  }, [isInView])

  const getInitialPosition = () => {
    // 移动端只使用上下方向的动画，避免水平方向的复杂动画
    if (isMobile) {
      return { opacity: 0, y: direction === "down" ? -distance : distance }
    }

    switch (direction) {
      case "up":
        return { opacity: 0, y: distance }
      case "down":
        return { opacity: 0, y: -distance }
      case "left":
        return { opacity: 0, x: distance }
      case "right":
        return { opacity: 0, x: -distance }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getFinalPosition = () => {
    if (isMobile) {
      return { opacity: 1, y: 0 }
    }

    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
      case "right":
        return { opacity: 1, x: 0 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration: duration,
        delay: isMobile ? delay * 0.7 : delay, // 移动端减少延迟时间
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
