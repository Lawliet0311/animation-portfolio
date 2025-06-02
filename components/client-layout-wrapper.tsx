"use client"; // 标记为客户端组件

import dynamic from 'next/dynamic';
import Header from "@/components/header"; // 假设 Header 可以在客户端使用
import Footer from "@/components/footer"; // 假设 Footer 可以在客户端使用
import React from 'react'; // 导入 React

// 动态导入 PageTransition 和 ParallaxProvider，禁用 SSR
const PageTransition = dynamic(() => import('@/components/page-transition'), { ssr: false });
const ParallaxProvider = dynamic(() => import('@/components/parallax-provider'), { ssr: false });

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ParallaxProvider>
        <main className="flex-1">
          {children}
        </main>
      </ParallaxProvider>
      <Footer />
    </div>
  );
}