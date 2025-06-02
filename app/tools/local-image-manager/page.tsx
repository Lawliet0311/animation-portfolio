import PageHeader from "@/components/page-header"
import LocalUploader from "@/components/cloudinary-uploader"
import SectionTransition from "@/components/section-transition"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LocalGallery from "@/components/cloudinary-gallery"

export default function LocalImageManagerPage() {
  return (
    <div className="min-h-screen bg-elegant-bg text-elegant-text">
      <PageHeader title="本地图片管理" description="上传、管理和优化您的本地图片资源" />

      <section className="py-10 md:py-12 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTransition>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="upload">上传本地图片</TabsTrigger>
                  <TabsTrigger value="gallery">图片库</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2 elegant-gradient-text">上传本地图片</h2>
                    <p className="text-elegant-muted">
                      上传您的图片到本地服务器，方便管理和使用。
                    </p>
                  </div>

                  <div className="bg-elegant-card p-6 rounded-md elegant-border">
                    <LocalUploader
                      folder="animation-portfolio"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">本地图片管理优势</h3>
                    <ul className="list-disc list-inside space-y-2 text-elegant-muted">
                      <li>完全掌控您的图片资源，无需依赖第三方服务</li>
                      <li>适用于对数据隐私和安全性有严格要求的项目</li>
                      <li>部署简单，易于集成到现有项目中</li>
                      <li>可根据项目需求自定义存储路径和管理逻辑</li>
                      <li>无需额外费用，降低项目运营成本</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2 elegant-gradient-text">本地图片库</h2>
                    <p className="text-elegant-muted">浏览和管理您上传到本地服务器的图片资源。</p>
                  </div>

                  <div className="bg-elegant-card p-6 rounded-md elegant-border">
                    <LocalGallery folder="animation-portfolio" />
                  </div>
                </TabsContent>
              </Tabs>
            </SectionTransition>
          </div>
        </div>
      </section>
    </div>
  )
}
