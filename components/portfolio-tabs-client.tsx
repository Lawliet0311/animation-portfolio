"use client"; // 标记为客户端组件

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionTransition from "@/components/section-transition";
import PortfolioListClient from "@/components/portfolio-list-client"; // 导入 PortfolioListClient

interface PortfolioTabsClientProps {
  allProjects: any[]; // 根据您的项目数据结构定义更具体的类型
  animationProjects: any[];
  illustrationProjects: any[];
  gameProjects: any[];
  technicalProjects: any[];
}

export default function PortfolioTabsClient({
  allProjects,
  animationProjects,
  illustrationProjects,
  gameProjects,
  technicalProjects,
}: PortfolioTabsClientProps) {
  return (
    <Tabs defaultValue="all" className="w-full">
      <SectionTransition>
        <div className="flex justify-center mb-10 md:mb-12 overflow-x-auto pb-2">
          <ScrollArea className="w-full max-w-full sm:max-w-none">
            <div className="flex min-w-max px-1">
              <TabsList className="bg-elegant-card p-1">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-elegant-accent1 data-[state=active]:text-elegant-bg text-sm sm:text-base px-3 py-1.5"
                >
                  全部
                </TabsTrigger>
                <TabsTrigger
                  value="animation"
                  className="data-[state=active]:bg-elegant-accent1 data-[state=active]:text-elegant-bg text-sm sm:text-base px-3 py-1.5"
                >
                  二维动画
                </TabsTrigger>
                <TabsTrigger
                  value="illustration"
                  className="data-[state=active]:bg-elegant-accent1 data-[state=active]:text-elegant-bg text-sm sm:text-base px-3 py-1.5"
                >
                  商业插画
                </TabsTrigger>
                <TabsTrigger
                  value="game"
                  className="data-[state=active]:bg-elegant-accent1 data-[state=active]:text-elegant-bg text-sm sm:text-base px-3 py-1.5"
                >
                  游戏美术/UI
                </TabsTrigger>
                <TabsTrigger
                  value="technical"
                  className="data-[state=active]:bg-elegant-accent1 data-[state=active]:text-elegant-bg text-sm sm:text-base px-3 py-1.5"
                >
                  漫画制作
                </TabsTrigger>
              </TabsList>
            </div>
          </ScrollArea>
        </div>
      </SectionTransition>

      {/* 使用 PortfolioListClient 渲染项目列表 */}
      <PortfolioListClient
        allProjects={allProjects}
        animationProjects={animationProjects}
        illustrationProjects={illustrationProjects}
        gameProjects={gameProjects}
        technicalProjects={technicalProjects}
      />
    </Tabs>
  );
}