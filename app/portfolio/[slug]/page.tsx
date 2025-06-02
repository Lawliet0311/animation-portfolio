'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, X, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { portfolioProjects, PortfolioProject } from '@/data/portfolio-projects';
// import ClientLayoutWrapper from '@/components/client-layout-wrapper';
import LoadingSpinner from '@/components/loading-spinner';
import DynamicSectionTransition from '@/components/section-transition';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';


import dynamic from 'next/dynamic';

const DynamicImageFallback = dynamic(() => import('@/components/image-fallback'), {
  ssr: false,
  loading: () => <div className="aspect-video w-full bg-elegant-card animate-pulse rounded-md"></div>,
});


// 定义一个辅助函数来处理可能的 undefined 或 null
const getSafeImageUrl = (publicId?: string | null) => {
  if (!publicId) return undefined; // 或者返回一个默认的占位符 URL
  return publicId;};

// 定义项目接口，确保类型安全
interface Project extends PortfolioProject {
  links?: { label: string; url: string }[];
  tags?: string[];
  awards?: string[];
}















export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [mainImageError, setMainImageError] = useState(false);
  const [galleryImageLoaded, setGalleryImageLoaded] = useState<boolean[]>([]);
  const [galleryImageError, setGalleryImageError] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const foundProject = portfolioProjects.find((p) => p.slug === slug);
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        setError("Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  const handleMainImageLoad = useCallback(() => {
    setMainImageLoaded(true);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  const { date, overview, isFeatured } = project;

  // 判断是否是特步项目，以便应用不同的布局和样式
  const isXtepProject = project.slug === 'xtep-illustration';

  return (
    <>
      {/* <ClientLayoutWrapper> */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Button variant="link" asChild className="mb-8 text-elegant-muted hover:text-elegant-text transition-colors duration-200">
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回作品集
          </Link>
        </Button>

        <div className="space-y-6 md:space-y-8">
          <DynamicSectionTransition>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold elegant-gradient-text">
                {project.title}
              </h1>
              <div className="w-20 h-[1px] elegant-divider mt-4"></div>
            </div>
          </DynamicSectionTransition>

          {isXtepProject ? (
            // 特步项目的特殊布局
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              <DynamicSectionTransition className="md:col-span-5" delay={0.1} direction="right">
                <div className="overflow-hidden rounded-md bg-elegant-card relative elegant-border">
                  {/* 图片加载占位符 */}
                  {!mainImageLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-elegant-bg/50 backdrop-blur-sm z-10">
                      <div className="w-16 h-16 rounded-full bg-elegant-bg/80 flex items-center justify-center mb-2">
                        <LoadingSpinner />
                      </div>
                      <div className="text-sm text-elegant-muted animate-pulse">加载中...</div>
                    </div>
                  )}

                  {/* 特步项目封面图，链接到视频 */}
                  <a
                    href="https://www.bilibili.com/video/BV1Fb421a78t/?spm_id_from=333.1387.upload.video_card.click"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Image
                      src={getSafeImageUrl(project.coverImage) || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={800}
                      className={`w-full h-auto object-cover rounded-md transition-opacity duration-500 ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={handleMainImageLoad}
                      onError={() => setMainImageError(true)}
                      priority // 封面图优先加载
                    />
                  </a>
                  {mainImageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-elegant-bg/80 text-elegant-muted text-sm">
                      图片加载失败
                    </div>
                  )}
                </div>
              </DynamicSectionTransition>

              {/* 将文字信息部分放在右侧，占据 7 列 */}
              <DynamicSectionTransition className="md:col-span-7" delay={0.2} direction="left">
                <div className="space-y-4 text-elegant-muted bg-elegant-card rounded-lg p-6">
                  {/* 客户/类型 */}
                  <div className="mb-6 border border-elegant-border rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-elegant-text">客户/类型</h3>
                    <p className="text-lg font-medium text-elegant-text">{project.client} / {project.type}</p>
                  </div>

                  {/* 担任角色 */}
                  <div className="mb-6 border border-elegant-border rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-elegant-text">担任角色</h3>
                    <p className="text-lg font-medium text-elegant-text">{project.role}</p>
                  </div>

                  {/* 担任角色 */}
                  <div className="mb-6 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-6 w-6 text-elegant-accent1"></svg>
                    <div>
                      <h3 className="text-elegant-muted font-normal mb-1">担任角色</h3>
                      <p className="text-lg font-normal text-elegant-text">{project.role}</p>
                    </div>
                  </div>

                  {/* 项目周期 */}
                  <div className="mb-6 border border-elegant-border rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-elegant-text">项目周期</h3>
                    <p className="text-lg font-medium text-elegant-text">{project.duration}</p>
                  </div>

                  {/* 技术/软件 */}
                  <div className="mb-6 border border-elegant-border rounded-lg p-4">
                    <h3 className="text-xl font-bold text-elegant-text">技术/软件</h3>
                    <p className="text-lg font-medium text-elegant-text">{project.tech}</p>
                  </div>

                  {/* 标签 */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-elegant-text mb-2">标签</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-elegant-text bg-elegant-card-hover border-elegant-border">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 奖项 */}
                  {project.awards && project.awards.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-elegant-text mb-2">奖项</h3>
                      <ul className="list-disc list-inside text-elegant-muted">
                        {project.awards.map((award) => (
                          <li key={award}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 相关链接 */}
                  {project.links && project.links.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">相关链接</h2>
                      <ul className="list-disc list-inside">
                        {project.links.map((link) => (
                          <li key={link.url}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-elegant-accent1 hover:underline"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </DynamicSectionTransition>
            </div>
          ) : (
            // 其他项目的默认布局
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* 左侧图片部分，占据 8 列 */}
              <DynamicSectionTransition className="md:col-span-8" delay={0.1} direction="right">
                <div className="overflow-hidden rounded-md bg-elegant-card relative elegant-border">
                  {/* 图片加载占位符 */}
                  {!mainImageLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-elegant-bg/50 backdrop-blur-sm z-10">
                      <div className="w-16 h-16 rounded-full bg-elegant-bg/80 flex items-center justify-center mb-2">
                        <LoadingSpinner />
                      </div>
                      <div className="text-sm text-elegant-muted animate-pulse">加载中...</div>
                    </div>
                  )}
                  <Image
                    src={getSafeImageUrl(project.coverImage) || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className={`w-full h-auto object-cover rounded-md transition-opacity duration-500 ${mainImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={handleMainImageLoad}
                    onError={() => setMainImageError(true)}
                    priority // 封面图优先加载
                  />
                  {mainImageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-elegant-bg/80 text-elegant-muted text-sm">
                      图片加载失败
                    </div>
                  )}
                </div>
              </DynamicSectionTransition>

              {/* 右侧文字信息部分，占据 4 列 */}
              <DynamicSectionTransition className="md:col-span-4" delay={0.2} direction="left">
                <div className="space-y-4 text-elegant-muted bg-elegant-card rounded-lg p-6 border border-elegant-border">
                  {/* 客户/类型 */}
                  <div className="mb-6">
                    <div>
                      <h3 className="text-elegant-muted font-normal mb-1">客户/类型</h3>
                      <p className="text-lg font-normal text-elegant-text">{project.client} / {project.type}</p>
                    </div>
                  </div>

                  {/* 担任角色 */}
                  <div className="mb-6">
                    <div>
                      <h3 className="text-elegant-muted font-normal mb-1">担任角色</h3>
                      <p className="text-lg font-normal text-elegant-text">{project.role}</p>
                    </div>
                  </div>

                  {/* 项目周期 */}
                  <div className="mb-6">
                    <div>
                      <h3 className="text-elegant-muted font-normal mb-1">项目周期</h3>
                      <p className="text-lg font-normal text-elegant-text">{project.duration}</p>
                    </div>
                  </div>

                  {/* 使用技术 */}
                  <div className="mb-6">
                    <div>
                      <h3 className="text-elegant-muted font-semibold mb-1">使用技术</h3>
                      <p className="text-lg font-normal text-elegant-text">{project.tech}</p>
                    </div>
                  </div>

                  {/* 标签 */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-elegant-text mb-2">标签</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-elegant-text bg-elegant-card-hover border-elegant-border">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 奖项 */}
                  {project.awards && project.awards.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-elegant-text mb-2">奖项</h3>
                      <ul className="list-disc list-inside text-elegant-muted">
                        {project.awards.map((award) => (
                          <li key={award}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 相关链接 */}
                  {project.links && project.links.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">相关链接</h2>
                      <ul className="list-disc list-inside">
                        {project.links.map((link) => (
                          <li key={link.url}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-elegant-accent1 hover:underline"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </DynamicSectionTransition>
            </div>
          )}

          {project.slug === 'jing-man-she' && (
            <DynamicSectionTransition direction="down" delay={0.2}>
              <div className="space-y-2 bg-elegant-card rounded-lg p-6 text-elegant-muted elegant-border">
                <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">相关链接</h2>
                <p className="text-base font-normal text-elegant-muted mt-0 mb-0">
                  请点击以下链接查看更多信息：
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link href="https://www.kuaikanmanhua.com/web/topic/4404/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="elegant-button-outline">
                      快看漫画
                    </Button>
                  </Link>
                </div>
              </div>
            </DynamicSectionTransition>
          )}

          {/* 项目描述 */}
          <DynamicSectionTransition delay={0.3}>
            <div className="bg-elegant-card rounded-lg p-6 text-elegant-muted elegant-border">
              <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">项目描述</h2>
              <p className="whitespace-pre-wrap">{project.description}</p>
            </div>
          </DynamicSectionTransition>

          {/* 职责 */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <DynamicSectionTransition delay={0.4}>
              <div className="bg-elegant-card rounded-lg p-6 text-elegant-muted elegant-border">
                  <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">职责</h2>
                <ul className="list-disc list-inside">
                  {project.responsibilities.map((resp) => (
                    <li key={resp}>{resp}</li>
                  ))}
                </ul>
              </div>
            </DynamicSectionTransition>
          )}

          {/* 挑战 */}
          {project.challenges && (
            <DynamicSectionTransition delay={0.5}>
              <div className="bg-elegant-card rounded-lg p-6 text-elegant-muted elegant-border">
                  <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">项目挑战</h2>
                <p className="whitespace-pre-wrap">{project.challenges}</p>
              </div>
            </DynamicSectionTransition>
          )}

          {/* 成就 */}
          {project.achievements && project.achievements.length > 0 && (
            <DynamicSectionTransition delay={0.6}>
              <div className="bg-elegant-card rounded-lg p-6 text-elegant-muted elegant-border">
                  <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">项目成就</h2>
                <ul className="list-disc list-inside">
                  {project.achievements.map((ach) => (
                    <li key={ach}>{ach}</li>
                  ))}
                </ul>
              </div>
            </DynamicSectionTransition>
          )}

          {/* 视频链接 */}
          {project.videoUrl && project.videoThumbnails && project.videoThumbnails.length > 0 && (
            <DynamicSectionTransition delay={0.7}>
              <div className="bg-elegant-card rounded-lg p-6 text-elegant-muted elegant-border">
                <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">相关视频</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.videoThumbnails?.map((thumbnail, index) => (
                    <Link key={thumbnail} href={project.videoUrl?.[index] || '#'} target="_blank" rel="noopener noreferrer">
                      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-lg overflow-hidden group">
                        <Image
                          src={thumbnail}
                          alt={`Video thumbnail ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <PlayCircle className="text-white h-12 w-12" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </DynamicSectionTransition>
          )}



                  {project.images && project.images.length > 0 && (
                    <DynamicSectionTransition delay={0.8}>
                      <div className="bg-elegant-card rounded-lg p-6">
                        <h2 className="text-lg md:text-xl font-bold mb-2 elegant-gradient-text">图片画廊</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                          {project.images?.map((imageSrc, index) => (
                            <DynamicSectionTransition key={imageSrc} direction="up" delay={0.2}>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DynamicImageFallback
                                    src={getSafeImageUrl(imageSrc) || "/placeholder.svg"}
                                    fallbackSrc="/placeholder.svg?height=400&width=600"
                                    alt={`${project.title} - Gallery Image ${index + 1}`}
                                    key={imageSrc}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
                                  />
                                </DialogTrigger>
                                <DialogContent className="fixed inset-0 flex items-center justify-center w-screen h-screen max-w-none bg-black/80 backdrop-blur-sm p-0 overflow-hidden">
                                  <DynamicImageFallback
                                    src={getSafeImageUrl(imageSrc) || "/placeholder.svg"}
                                    fallbackSrc="/placeholder.svg?height=1080&width=1920"
                                    alt={`Gallery image ${index + 1}`}
                                    key={imageSrc}
                                    width={1920}
                                    height={1080}
                                    className="w-[90vw] h-[90vh] object-contain"
                                  />
                                </DialogContent>
                              </Dialog>
                            </DynamicSectionTransition>
                          ))}
                        </div>
                      </div>
                    </DynamicSectionTransition>
                  )}

        </div>
      </div>
    </>
  );
}