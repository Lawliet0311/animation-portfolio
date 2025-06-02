import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
// 移除对 Header, Footer, PageTransition, ParallaxProvider 的直接导入


// 导入新的客户端包裹组件
import ClientLayoutWrapper from "@/components/client-layout-wrapper";


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ruan Xuemin - Animation Director | Visual Storyteller",
  description: "Ruan Xuemin's personal portfolio website, showcasing animation, illustration, game art, and professional skills.",
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="dark">
      <body className={`${inter.className} min-h-screen bg-elegant-bg text-elegant-text`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="dark"
        >
      <ClientLayoutWrapper>{children}</ClientLayoutWrapper>

        </ThemeProvider>
        {/* <script src="/scripts/clipboard.min.js" async></script> */} {/* 保持注释或根据需要处理 */}
      </body>
    </html>
  )
}