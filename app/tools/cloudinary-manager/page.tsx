import PageHeader from "@/components/page-header";
import CloudinaryUploader from "@/components/cloudinary-uploader";
import SectionTransition from "@/components/section-transition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CloudinaryGallery from "@/components/cloudinary-gallery";

export default function CloudinaryManagerPage() {
  return (
    <SectionTransition>
      <PageHeader title="Cloudinary Manager" description="Manage your Cloudinary assets." />
      <div className="container mx-auto py-8">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList>
            <TabsTrigger value="upload">上传</TabsTrigger>
            <TabsTrigger value="gallery">图片库</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <CloudinaryUploader />
          </TabsContent>
          <TabsContent value="gallery">
            <CloudinaryGallery />
          </TabsContent>
        </Tabs>
      </div>
    </SectionTransition>
  );
}