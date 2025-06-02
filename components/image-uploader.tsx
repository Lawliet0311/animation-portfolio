"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon, Check } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import { QUALITY_PRESETS } from "@/lib/image-constants"

interface ImageUploaderProps {
  onImageOptimized?: (imageUrl: string) => void
  maxSizeMB?: number
  acceptedFormats?: string[]
  defaultQuality?: keyof typeof QUALITY_PRESETS
  showPreview?: boolean
}

export default function ImageUploader({
  onImageOptimized,
  maxSizeMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
  defaultQuality = "high",
  showPreview = true,
}: ImageUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizedUrl, setOptimizedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [quality, setQuality] = useState<keyof typeof QUALITY_PRESETS>(defaultQuality)
  const [format, setFormat] = useState<string>("webp")

  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!acceptedFormats.includes(file.type)) {
      setError(`不支持的文件格式。请上传 ${acceptedFormats.join(", ")} 格式的图片。`)
      return
    }

    // 验证文件大小
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`文件大小超过限制 (${maxSizeMB}MB)`)
      return
    }

    // 清除错误
    setError(null)
    setSelectedFile(file)

    // 创建预览URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // 清除优化结果
    setOptimizedUrl(null)
  }

  // 处理图片优化
  const handleOptimize = async () => {
    if (!selectedFile) return

    try {
      setIsOptimizing(true)

      // 创建表单数据
      const formData = new FormData()
      formData.append("image", selectedFile)
      formData.append("format", format)
      formData.append("quality", QUALITY_PRESETS[quality].toString())

      // 发送优化请求
      const response = await fetch("/api/optimize-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("图片优化失败")
      }

      // 获取优化后的图片
      const blob = await response.blob()
      const optimizedObjectUrl = URL.createObjectURL(blob)

      setOptimizedUrl(optimizedObjectUrl)

      // 回调通知
      if (onImageOptimized) {
        onImageOptimized(optimizedObjectUrl)
      }
    } catch (err) {
      setError("图片优化失败，请重试")
      console.error(err)
    } finally {
      setIsOptimizing(false)
    }
  }

  // 清除选择的文件
  const clearSelection = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    if (optimizedUrl) URL.revokeObjectURL(optimizedUrl)

    setSelectedFile(null)
    setPreviewUrl(null)
    setOptimizedUrl(null)
    setError(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {/* 文件选择区域 */}
      <div className="border-2 border-dashed border-elegant-border rounded-md p-6 text-center hover:border-elegant-accent1/50 transition-colors">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFormats.join(",")}
          className="hidden"
        />

        {!selectedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer flex flex-col items-center justify-center py-4"
          >
            <Upload className="h-10 w-10 text-elegant-muted mb-2" />
            <p className="text-elegant-text font-medium">点击或拖放图片到此处</p>
            <p className="text-elegant-muted text-sm mt-1">
              支持 {acceptedFormats.map((f) => f.replace("image/", "")).join(", ")} 格式，最大 {maxSizeMB}MB
            </p>
          </div>
        ) : (
          <div className="relative">
            {showPreview && previewUrl && (
              <div className="relative w-full aspect-video max-h-64 overflow-hidden rounded-md mb-4">
                <OptimizedImage src={previewUrl} alt="预览图" fill className="object-contain" />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ImageIcon className="h-5 w-5 text-elegant-accent1 mr-2" />
                <span className="text-sm text-elegant-text truncate max-w-[200px]">{selectedFile.name}</span>
                <span className="text-xs text-elegant-muted ml-2">
                  ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={clearSelection}
                className="h-8 w-8 text-elegant-muted hover:text-elegant-accent1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 错误提示 */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* 优化选项 */}
      {selectedFile && (
        <div className="space-y-3 bg-elegant-card p-4 rounded-md">
          <div>
            <label className="text-sm text-elegant-muted block mb-1">输出格式</label>
            <div className="flex space-x-2">
              {["webp", "avif", "jpeg", "png"].map((fmt) => (
                <Button
                  key={fmt}
                  variant={format === fmt ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormat(fmt)}
                  className={format === fmt ? "bg-elegant-accent1" : ""}
                >
                  {fmt.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-elegant-muted block mb-1">质量</label>
            <div className="flex space-x-2">
              {(Object.keys(QUALITY_PRESETS) as Array<keyof typeof QUALITY_PRESETS>).map((q) => (
                <Button
                  key={q}
                  variant={quality === q ? "default" : "outline"}
                  size="sm"
                  onClick={() => setQuality(q)}
                  className={quality === q ? "bg-elegant-accent1" : ""}
                >
                  {q === "low" ? "低" : q === "medium" ? "中" : q === "high" ? "高" : "最高"}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="w-full bg-elegant-accent3 hover:bg-elegant-accent3/90"
          >
            {isOptimizing ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-elegant-text border-t-transparent rounded-full" />
                优化中...
              </>
            ) : optimizedUrl ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                已优化
              </>
            ) : (
              "优化图片"
            )}
          </Button>
        </div>
      )}

      {/* 优化结果 */}
      {optimizedUrl && (
        <div className="space-y-3 bg-elegant-card p-4 rounded-md">
          <h3 className="text-elegant-text font-medium">优化结果</h3>

          {showPreview && (
            <div className="relative w-full aspect-video max-h-64 overflow-hidden rounded-md">
              <OptimizedImage src={optimizedUrl} alt="优化后的图片" fill className="object-contain" />
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const a = document.createElement("a")
                a.href = optimizedUrl
                a.download = `optimized.${format}`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
              }}
            >
              下载优化后的图片
            </Button>

            <Button variant="ghost" size="sm" onClick={clearSelection}>
              清除
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
