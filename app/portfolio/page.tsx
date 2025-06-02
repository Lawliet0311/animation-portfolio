import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// 移除 PortfolioItem 的直接导入
// import PortfolioItem from "@/components/portfolio-item"
import PageHeader from "@/components/page-header"
import SectionTransition from "@/components/section-transition"
import { ScrollArea } from "@/components/ui/scroll-area"
import { portfolioProjects, getProjectsByCategory } from "@/data/portfolio-projects"

import React from 'react';
// 移除 dynamic 导入
// import dynamic from 'next/dynamic';

// 导入新的客户端组件
import PortfolioListClient from "@/components/portfolio-list-client";
// 导入新创建的客户端组件
import PortfolioTabsClient from "@/components/portfolio-tabs-client";


// 移除动态导入 PortfolioItem
// const DynamicPortfolioItem = dynamic(() => import('@/components/portfolio-item'), {
//   ssr: false,
//   loading: () => <div className="aspect-video w-full bg-elegant-card animate-pulse rounded-md"></div>, // 可选：添加加载状态
// });

export default function Portfolio() {
  // 获取所有项目
  const allProjects = portfolioProjects

  // 获取按类别分类的项目
  const animationProjects = getProjectsByCategory("animation")
  const illustrationProjects = getProjectsByCategory("illustration")
  const gameProjects = getProjectsByCategory("game")
  const technicalProjects = getProjectsByCategory("technical")

  return (
    <div className="min-h-screen bg-elegant-bg text-elegant-text">
      <PageHeader title="作品集" description="探索我的创意旅程与专业成果" />

      <section className="py-10 md:py-12 lg:py-20">
        <div className="container px-4 md:px-6">
          {/* 使用新的客户端组件来渲染整个 Tabs 部分 */}
          <PortfolioTabsClient
            allProjects={allProjects}
            animationProjects={animationProjects}
            illustrationProjects={illustrationProjects}
            gameProjects={gameProjects}
            technicalProjects={technicalProjects}
          />
        </div>
      </section>
    </div>
  )
}

// Removed the duplicate default export below:
// export default function PortfolioPage() {
//   return (
//     <div>
//       <h1>Portfolio</h1>
//       {/* 其他内容 ... */}
//     </div>
//   );
// }
