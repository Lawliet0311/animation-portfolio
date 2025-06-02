import PageHeader from "@/components/page-header"
import ImageUploader from "@/components/image-uploader"
import SectionTransition from "@/components/section-transition"

export default function ImageOptimizerPage() {
  return (
    <div className="min-h-screen bg-elegant-bg text-elegant-text">
      <PageHeader title="图片优化工具" description="优化您的图片以节省存储空间和带宽" />

      <section className="py-10 md:py-12 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionTransition>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 elegant-gradient-text">图片优化</h2>
                  <p className="text-elegant-muted">
                    上传您的图片，我们将自动优化它们以减少文件大小，同时保持高质量。支持WebP、AVIF、JPEG和PNG格式。
                  </p>
                </div>

                <div className="bg-elegant-card p-6 rounded-md elegant-border">
                  <ImageUploader />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">图片优化提示</h3>
                  <ul className="list-disc list-inside space-y-2 text-elegant-muted">
                    <li>WebP格式通常比JPEG和PNG小25-35%，同时保持相似的视觉质量</li>
                    <li>AVIF格式提供最佳压缩，但在某些旧浏览器中可能不受支持</li>
                    <li>对于照片和复杂图像，选择"高"质量；对于简单图像和图标，选择"中"质量</li>
                    <li>优化后的图片可以直接下载或用于您的项目</li>
                  </ul>
                </div>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>
    </div>
  )
}
