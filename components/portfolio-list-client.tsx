"use client"; // 标记为客户端组件

import React from 'react';

import { TabsContent } from "@/components/ui/tabs"; // 导入 TabsContent
import SectionTransition from "@/components/section-transition"; // 导入 SectionTransition
import PortfolioItem from "@/components/portfolio-item"; // 导入 PortfolioItem


interface PortfolioListClientProps {
  allProjects: any[]; // 根据您的项目数据结构定义更具体的类型
  animationProjects: any[];
  illustrationProjects: any[];
  gameProjects: any[];
  technicalProjects: any[];
}

export default function PortfolioListClient({
  allProjects,
  animationProjects,
  illustrationProjects,
  gameProjects,
  technicalProjects,
}: PortfolioListClientProps) {
  return (
    <>
      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allProjects.map((project, index) => (
            <SectionTransition key={project.id} delay={0.1 * (index % 6)}>
              <PortfolioItem
                title={project.title}
                category={
                  project.category === "animation"
                    ? "二维动画"
                    : project.category === "illustration"
                      ? "商业插画"
                      : project.category === "game"
                        ? "游戏美术/UI"
                        : "项目管理/技术"
                }
                image={project.coverImage}
                cloudinaryId={project.cloudinaryId}
                href={`/portfolio/${project.slug}`}
              />
            </SectionTransition>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="animation" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {animationProjects.map((project, index) => (
            <SectionTransition key={project.id} delay={0.1 * (index % 6)}>
              <PortfolioItem
                title={project.title}
                category="二维动画"
                image={project.coverImage}
                cloudinaryId={project.cloudinaryId}
                href={`/portfolio/${project.slug}`}
              />
            </SectionTransition>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="illustration" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {illustrationProjects.map((project, index) => (
              <SectionTransition key={project.id} delay={0.1 * (index % 6)}>
                <PortfolioItem
                  title={project.title}
                  category="商业插画"
                  image={project.coverImage}
                  cloudinaryId={project.cloudinaryId}
                  href={`/portfolio/${project.slug}`}
                />
              </SectionTransition>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="game" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {gameProjects.map((project, index) => (
              <SectionTransition key={project.id} delay={0.1 * (index % 6)}>
                <PortfolioItem
                  title={project.title}
                  category="游戏美术/UI"
                  image={project.coverImage || "/placeholder.svg"}
                  cloudinaryId={project.cloudinaryId}
                  href={`/portfolio/${project.slug}`}
                />
              </SectionTransition>
            ))}
        </div>
      </TabsContent>

      <TabsContent value="technical" className="mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {technicalProjects.map((project, index) => (
              <SectionTransition key={project.id} delay={0.1 * (index % 6)}>
                <PortfolioItem
                  title={project.title}
                  category="项目管理/技术案例"
                  image={project.coverImage || "/placeholder.svg"}
                  cloudinaryId={project.cloudinaryId}
                  href={`/portfolio/${project.slug}`}
                />
              </SectionTransition>
            ))}
        </div>
      </TabsContent>
    </>
  );
}