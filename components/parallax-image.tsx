"use client"

import { Parallax } from "react-scroll-parallax"
import useMobile from "@/hooks/use-mobile"
import Image from "next/image"

interface ParallaxImageProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string
  speed?: number
  easing?: "easeIn" | "easeOut" | "easeInOut" | "linear"
  scale?: [number, number]
  aspectRatio?: string
  alt?: string
}

export default function ParallaxImage({
  className = "",
  speed = 10,
  easing = "easeOutQuad",
  scale = [1, 1.03],
  aspectRatio = "3/2",
  alt = "Parallax image",
}: ParallaxImageProps) {
  const { isMobile } = useMobile()

  // 在移动设备上减少视差效果的强度
  const mobileSpeed = isMobile ? speed * 0.3 : speed
  const mobileScale = isMobile ? [1, 1.01] : scale

  return (
    <Parallax
      translateY={[mobileSpeed, -mobileSpeed]}
      scale={mobileScale}
      easing={easing}
      className={`${className} relative`}
      shouldAlwaysCompleteAnimation={true}
    >
      <div style={{ aspectRatio }} className="w-full overflow-hidden">
        <Image
          src="https://media.discordapp.net/attachments/1353237706586591293/1374203413818249266/8.jpg?ex=682d3229&is=682be0a9&hm=fa84fdfdccfdb0826d92f10414beae6ccdd74d28592aef91dbe17727296bb7e3&=&format=webp&width=775&height=968"
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </Parallax>
  )
}
