"use client"

import { useRef, useState, useEffect } from "react" // 导入 useState 和 useEffect
import { motion } from "framer-motion"
import useMobile from "@/hooks/use-mobile"

// 定义元素类型接口，方便类型管理
interface FloatingElement {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
  shapeType: number
  opacity: number
}

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobile()

  // 使用状态来存储生成的元素，初始为空数组
  const [elements, setElements] = useState<FloatingElement[]>([])

  // 在客户端挂载后生成元素
  useEffect(() => {
    // 如果是移动设备，减少元素数量
    const elementsCount = isMobile ? 10 : 20

    // 生成随机元素
    const generateElements = () => {
      const generatedElements: FloatingElement[] = []
      for (let i = 0; i < elementsCount; i++) {
        const size = Math.random() * (isMobile ? 30 : 50) + 10
        const x = Math.random() * 100
        const y = Math.random() * 100
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5

        // 随机选择形状类型
        const shapeType = Math.floor(Math.random() * 3)

        generatedElements.push({
          id: i,
          size,
          x,
          y,
          duration,
          delay,
          shapeType,
          opacity: Math.random() * 0.07 + 0.03, // 非常微妙的不透明度
        })
      }
      return generatedElements
    }

    // 生成元素并更新状态
    setElements(generateElements())

  }, [isMobile]) // 当 isMobile 变化时重新生成元素

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 在元素生成前，elements 状态为空数组，不会渲染任何元素，避免水合不匹配 */}
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: element.size,
            height: element.size,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.shapeType === 0 ? (
            // 圆形
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `linear-gradient(135deg, rgba(110, 123, 242, ${element.opacity}) 0%, rgba(157, 141, 241, ${element.opacity}) 100%)`,
              }}
            />
          ) : element.shapeType === 1 ? (
            // 方形
            <div
              className="w-full h-full rounded-md"
              style={{
                background: `linear-gradient(135deg, rgba(74, 92, 255, ${element.opacity}) 0%, rgba(180, 165, 255, ${element.opacity}) 100%)`,
                transform: "rotate(45deg)",
              }}
            />
          ) : (
            // 三角形
            <div
              className="w-full h-full"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                background: `linear-gradient(135deg, rgba(110, 123, 242, ${element.opacity}) 0%, rgba(74, 92, 255, ${element.opacity}) 100%)`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
