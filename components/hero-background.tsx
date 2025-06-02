"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import useMobile from "@/hooks/use-mobile"

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useMobile()

  useEffect(() => {
    if (!containerRef.current) return

    // 创建场景
    const scene = new THREE.Scene()

    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // 创建粒子 - 移动端减少粒子数量
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = isMobile ? 800 : 1500

    const posArray = new Float32Array(particlesCount * 3)
    const colorsArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // 位置
      posArray[i] = (Math.random() - 0.5) * 10

      // 颜色 - 高级动漫风格的蓝紫色调
      if (i % 3 === 0) {
        // R
        colorsArray[i] = Math.random() * 0.3 + 0.1
      } else if (i % 3 === 1) {
        // G
        colorsArray[i] = Math.random() * 0.2 + 0.1
      } else {
        // B
        colorsArray[i] = Math.random() * 0.5 + 0.5
      }
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorsArray, 3))

    // 材质 - 移动端减小粒子大小
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.015 : 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    })

    // 创建粒子系统
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // 鼠标交互
    let mouseX = 0
    let mouseY = 0

    function onDocumentMouseMove(event: MouseEvent) {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.0002
      mouseY = (event.clientY - window.innerHeight / 2) * 0.0002
    }

    // 触摸交互
    function onDocumentTouchMove(event: TouchEvent) {
      if (event.touches.length === 1) {
        mouseX = (event.touches[0].clientX - window.innerWidth / 2) * 0.0002
        mouseY = (event.touches[0].clientY - window.innerHeight / 2) * 0.0002
      }
    }

    document.addEventListener("mousemove", onDocumentMouseMove)
    document.addEventListener("touchmove", onDocumentTouchMove)

    // 窗口大小调整
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", onWindowResize)

    // 动画循环 - 移动端降低旋转速度
    const rotationSpeed = isMobile ? 0.0002 : 0.0003
    const animate = () => {
      requestAnimationFrame(animate)

      particlesMesh.rotation.x += rotationSpeed
      particlesMesh.rotation.y += rotationSpeed

      particlesMesh.rotation.x += mouseY * 0.3
      particlesMesh.rotation.y += mouseX * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // 清理
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", onWindowResize)
      document.removeEventListener("mousemove", onDocumentMouseMove)
      document.removeEventListener("touchmove", onDocumentTouchMove)
    }
  }, [isMobile])

  return <div ref={containerRef} className="absolute inset-0 -z-10" />
}
