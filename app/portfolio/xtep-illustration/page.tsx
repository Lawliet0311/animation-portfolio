"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectById } from "@/data/portfolio-projects"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
// import ImageFallback from "@/components/image-fallback" // 移除直接导入

// 动态导入 ImageFallback 并禁用 SSR
import dynamic from 'next/dynamic';
const DynamicImageFallback = dynamic(() => import('@/components/image-fallback'), {
  ssr: false,
  loading: () => <div className="aspect-video w-full bg-elegant-card animate-pulse rounded-md"></div>, // 可选：添加加载状态
});

export default function XtepProjectPage() {
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    const projectData = getProjectById("xtep-illustration")
    setProject(projectData)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen bg-elegant-bg text-elegant-text flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-elegant-accent1 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-elegant-bg text-elegant-text">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <Button
          asChild
          variant="ghost"
          className="mb-6 md:mb-8 text-elegant-muted hover:text-elegant-accent1 transition-colors"
        >
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回作品集
          </Link>
        </Button>

        <div className="space-y-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold elegant-gradient-text">
              {project.title}
            </h1>
            <div className="w-20 h-[1px] elegant-divider mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="overflow-hidden rounded-md bg-elegant-card relative elegant-border">
              {/* 使用动态导入的组件 */}
              <DynamicImageFallback
                src="/images/xtep-cover.png"
                fallbackSrc="/placeholder.svg?height=881&width=1376"
                alt={project.title}
                width={1376}
                height={881}
                className="w-full h-auto"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <div className="space-y-6">
              <div className="bg-elegant-card p-6 rounded-md space-y-4 elegant-border">
                <div>
                  <h3 className="text-sm md:text-base text-elegant-muted font-medium">客户/类型</h3>
                  <p className="text-base md:text-lg">
                    {project.client} / {project.type}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm md:text-base text-elegant-muted font-medium">担任角色</h3>
                  <p className="text-base md:text-lg">{project.role}</p>
                </div>

                <div>
                  <h3 className="text-sm md:text-base text-elegant-muted font-medium">项目周期</h3>
                  <p className="text-base md:text-lg">{project.duration}</p>
                </div>

                <div>
                  <h3 className="text-sm md:text-base text-elegant-muted font-medium">使用技术/软件</h3>
                  <p className="text-base md:text-lg">{project.tech}</p>
                </div>
              </div>

              <div className="bg-elegant-card p-6 rounded-md space-y-4 elegant-border">
                <div>
                  <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">项目概述</h2>
                  <p className="text-elegant-muted leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">创作思考</h2>
                  <p className="text-elegant-muted leading-relaxed">{project.challenges}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-6 elegant-gradient-text">作品展示</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 占位符图片 1 */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="overflow-hidden rounded-md bg-elegant-card relative elegant-border cursor-pointer">
                    <DynamicImageFallback
                      src="/images/xtep-2.jpg"
                      fallbackSrc="/placeholder.svg?height=400&width=600"
                      alt={`${project.title} - 图片 2`}
                      width={600}
                      height={400}
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="fixed inset-0 flex items-center justify-center w-screen h-screen max-w-none bg-black/80 backdrop-blur-sm p-0 overflow-hidden">
                  <DynamicImageFallback
                    src="/images/xtep-2.jpg"
                    fallbackSrc="/placeholder.svg?height=400&width=600"
                    alt={`${project.title} - 图片 2`}
                    width={1920}
                    height={1080}
                    className="w-[90vw] h-[90vh] object-contain"
                  />
                </DialogContent>
              </Dialog>

              {/* 占位符图片 2 */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="overflow-hidden rounded-md bg-elegant-card relative elegant-border cursor-pointer">
                    <DynamicImageFallback
                      src="/images/xtep-3.jpg"
                      fallbackSrc="/placeholder.svg?height=400&width=600"
                      alt={`${project.title} - 图片 3`}
                      width={600}
                      height={400}
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="fixed inset-0 flex items-center justify-center w-screen h-screen max-w-none bg-black/80 backdrop-blur-sm p-0 overflow-hidden">
                  <DynamicImageFallback
                    src="/images/xtep-3.jpg"
                    fallbackSrc="/placeholder.svg?height=400&width=600"
                    alt={`${project.title} - 图片 3`}
                    width={1920}
                    height={1080}
                    className="w-[90vw] h-[90vh] object-contain"
                  />
                </DialogContent>
              </Dialog>

              {/* 占位符图片 3 */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="overflow-hidden rounded-md bg-elegant-card relative elegant-border cursor-pointer">
                    <DynamicImageFallback
                      src="/images/xtep-4.jpg"
                      fallbackSrc="/placeholder.svg?height=400&width=600"
                      alt={`${project.title} - 图片 4`}
                      width={600}
                      height={400}
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="fixed inset-0 flex items-center justify-center w-screen h-screen max-w-none bg-black/80 backdrop-blur-sm p-0 overflow-hidden">
                  <DynamicImageFallback
                    src="/images/xtep-4.jpg"
                    fallbackSrc="/placeholder.svg?height=400&width=600"
                    alt={`${project.title} - 图片 4`}
                    width={1920}
                    height={1080}
                    className="w-[90vw] h-[90vh] object-contain"
                  />
                </DialogContent>
              </Dialog>

              {/* 占位符图片 4 */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="overflow-hidden rounded-md bg-elegant-card relative elegant-border cursor-pointer">
                    <DynamicImageFallback
                      src="/images/xtep-5.jpg"
                      fallbackSrc="/placeholder.svg?height=400&width=600"
                      alt={`${project.title} - 图片 5`}
                      width={600}
                      height={400}
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="fixed inset-0 flex items-center justify-center w-screen h-screen max-w-none bg-black/80 backdrop-blur-sm p-0 overflow-hidden">
                  <DynamicImageFallback
                    src="/images/xtep-5.jpg"
                    fallbackSrc="/placeholder.svg?height=400&width=600"
                    alt={`${project.title} - 图片 5`}
                    width={1920}
                    height={1080}
                    className="w-[90vw] h-[90vh] object-contain"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
