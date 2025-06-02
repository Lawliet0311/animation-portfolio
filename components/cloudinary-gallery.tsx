"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw, Copy, Trash2, ExternalLink } from "lucide-react"
import CloudinaryImage from "@/components/cloudinary-image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import LoadingSpinner from "@/components/loading-spinner"

interface CloudinaryGalleryProps {
  folder?: string
  maxItems?: number
}

interface CloudinaryResource {
  publicId: string
  url: string
  secureUrl: string
  format: string
  width: number
  height: number
  bytes: number
  createdAt: string
}

export default function CloudinaryGallery({ folder = "animation-portfolio", maxItems = 50 }: CloudinaryGalleryProps) {
  const [resources, setResources] = useState<CloudinaryResource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<CloudinaryResource | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // 加载Cloudinary资源
  const loadResources = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/cloudinary/resources?folder=${folder}&max_results=${maxItems}`)

      if (!response.ok) {
        throw new Error("加载资源失败")
      }

      const data = await response.json()
      setResources(data.resources)
    } catch (err) {
      console.error("加载Cloudinary资源失败:", err)
      setError("加载图片资源失败，请重试")
    } finally {
      setIsLoading(false)
    }
  }

  // 初始加载
  useEffect(() => {
    loadResources()
  }, [folder, maxItems])

  // 过滤资源
  const filteredResources = resources.filter((resource) =>
    resource.publicId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // 删除资源
  const handleDelete = async (publicId: string) => {
    if (!confirm("确定要删除这张图片吗？此操作无法撤销。")) {
      return
    }

    try {
      setIsDeleting(true)

      const response = await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      })

      if (!response.ok) {
        throw new Error("删除失败")
      }

      // 更新资源列表
      setResources(resources.filter((r) => r.publicId !== publicId))

      // 如果当前选中的是被删除的图片，清除选择
      if (selectedImage?.publicId === publicId) {
        setSelectedImage(null)
      }
    } catch (err) {
      console.error("删除Cloudinary资源失败:", err)
      alert("删除图片失败，请重试")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* 搜索和刷新 */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-elegant-muted" />
          <Input
            type="text"
            placeholder="搜索图片..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-elegant-bg border-elegant-border"
          />
        </div>
        <Button variant="outline" size="icon" onClick={loadResources} disabled={isLoading} className="h-10 w-10">
          {isLoading ? <LoadingSpinner className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
        </Button>
      </div>

      {/* 错误提示 */}
      {error && <div className="text-red-500 text-sm p-4 bg-red-500/10 rounded-md">{error}</div>}

      {/* 加载中 */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner className="mb-4" />
          <p className="text-elegant-muted">加载图片资源中...</p>
        </div>
      )}

      {/* 图片网格 */}
      {!isLoading && filteredResources.length === 0 && (
        <div className="text-center py-12 text-elegant-muted">
          {searchQuery ? "没有找到匹配的图片" : "没有图片资源"}
        </div>
      )}

      {!isLoading && filteredResources.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.publicId}
              className="group relative aspect-square overflow-hidden rounded-md bg-elegant-card border border-elegant-border hover:border-elegant-accent1/30 transition-all duration-300"
            >
              <CloudinaryImage
                publicId={resource.publicId}
                alt={resource.publicId.split("/").pop() || "图片"}
                fill
                className="object-cover"
                transformations={{
                  width: 300,
                  height: 300,
                  crop: "fill",
                  quality: 80,
                }}
              />

              {/* 悬停操作 */}
              <div className="absolute inset-0 bg-elegant-bg/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2">
                <p className="text-xs text-elegant-text mb-2 truncate w-full text-center">
                  {resource.publicId.split("/").pop()}
                </p>

                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-elegant-bg/50"
                        onClick={() => setSelectedImage(resource)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-elegant-card border-elegant-border">
                      <DialogHeader>
                        <DialogTitle>图片详情</DialogTitle>
                      </DialogHeader>

                      {selectedImage && (
                        <div className="space-y-4">
                          <div className="relative aspect-video overflow-hidden rounded-md">
                            <CloudinaryImage
                              publicId={selectedImage.publicId}
                              alt={selectedImage.publicId.split("/").pop() || "图片"}
                              fill
                              className="object-contain"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div>
                              <span className="text-elegant-muted">Public ID: </span>
                              <span className="text-elegant-text break-all">{selectedImage.publicId}</span>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <span className="text-elegant-muted">格式: </span>
                                <span className="text-elegant-text">{selectedImage.format}</span>
                              </div>
                              <div>
                                <span className="text-elegant-muted">大小: </span>
                                <span className="text-elegant-text">{(selectedImage.bytes / 1024).toFixed(2)} KB</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-elegant-muted">尺寸: </span>
                              <span className="text-elegant-text">
                                {selectedImage.width} x {selectedImage.height}
                              </span>
                            </div>
                            <div>
                              <span className="text-elegant-muted">URL: </span>
                              <a
                                href={selectedImage.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-elegant-accent1 hover:underline break-all"
                              >
                                {selectedImage.url}
                              </a>
                            </div>
                            <div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  navigator.clipboard.writeText(selectedImage.url);
                                  alert("URL已复制到剪贴板");
                                }}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div>
                              <span className="text-elegant-muted">大小: </span>
                              <span className="text-elegant-text">
                                {(selectedImage.bytes / 1024).toFixed(2)} KB
                              </span>
                            </div>
                            <div>
                              <span className="text-elegant-muted">最后修改时间: </span>
                              <span className="text-elegant-text">
                                {new Date(selectedImage.lastModified).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => handleDelete(selectedImage.fileName)}
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              <LoadingSpinner className="mr-2" />
                            ) : (
                              <Trash2 className="mr-2 h-4 w-4" />
                            )}
                            删除图片
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-elegant-bg/50"
                    onClick={() => navigator.clipboard.writeText(resource.publicId)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 bg-elegant-bg/50"
                    onClick={() => handleDelete(resource.fileName)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
