"use client"

import type React from "react"
import Image from "next/image"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon, Check, Cloud } from "lucide-react"


interface CloudinaryUploaderProps {
  onUploadComplete?: (result: { fileName: string; url: string }) => void;
  folder?: string;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  showPreview?: boolean;
}

export default function CloudinaryUploader({
  onUploadComplete,
  folder = "uploads", // 默认上传到本地的 uploads 文件夹
  maxSizeMB = 10,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif"],
  showPreview = true,
}: CloudinaryUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{ fileName: string; url: string; public_id?: string; format?: string; width?: number; height?: number; bytes?: number; secure_url?: string; } | null>(null);
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

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

    // 清除上传结果
    setUploadResult(null)
    setUploadProgress(0)
  }

  // 处理本地文件上传
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('folder', folder);

    try {
      const response = await fetch('/api/upload-local', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '文件上传失败');
      }

      const result = await response.json();
      setUploadResult({ fileName: selectedFile.name, url: result.url });
      if (onUploadComplete) {
        onUploadComplete({ fileName: selectedFile.name, url: result.url });
      }
    } catch (err: any) {
      setError(err.message || '文件上传过程中发生错误');
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  // 清除选择的文件
  const clearSelection = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)

    setSelectedFile(null)
    setPreviewUrl(null)
    setUploadResult(null)
    setError(null)
    setUploadProgress(0)

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
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="预览图"
                  fill
                  className="object-contain"
                  unoptimized
                />
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

      {/* 上传按钮和进度 */}
      {selectedFile && !uploadResult && (
        <div className="space-y-3">
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full bg-elegant-accent3 hover:bg-elegant-accent3/90 flex items-center justify-center"
          >
            {isUploading ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-elegant-text border-t-transparent rounded-full animate-spin" />
                上传中... {uploadProgress}%
              </>
            ) : (
              <>
                <Cloud className="mr-2 h-4 w-4" />
                上传到本地
              </>
            )}
          </Button>

          {isUploading && (
            <div className="w-full bg-elegant-card rounded-full h-2.5">
              <div className="bg-elegant-accent1 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}
        </div>
      )}

      {/* 上传结果 */}
      {uploadResult && (
        <div className="space-y-3 bg-elegant-card p-4 rounded-md">
          <h3 className="text-elegant-text font-medium flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            上传成功
          </h3>

          {showPreview && (
            <div className="relative w-full aspect-video max-h-64 overflow-hidden rounded-md">
          <img
            src={uploadResult.url}
            alt={uploadResult.fileName}
            width={200}
            height={150}
            className="rounded-md object-cover"
          />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-elegant-muted">Public ID: </span>
              <span className="text-elegant-text break-all">{uploadResult?.public_id}</span>
            </div>
            <div>
              <span className="text-elegant-muted">格式: </span>
              <span className="text-elegant-text">{uploadResult?.format}</span>
            </div>
            <div>
              <span className="text-elegant-muted">尺寸: </span>
              <span className="text-elegant-text">
                {uploadResult?.width} x {uploadResult?.height}
              </span>
            </div>
            <div>
              <span className="text-elegant-muted">大小: </span>
              <span className="text-elegant-text">{((uploadResult?.bytes || 0) / 1024).toFixed(2)} KB</span>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(uploadResult?.secure_url || '')
              }}
            >
              复制URL
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
