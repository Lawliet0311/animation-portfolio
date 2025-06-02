"use client"; // 添加此行

import { useEffect } from "react"

export default function Footer() {
  // 确保浏览器会尝试恢复滚动位置
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      // 设置滚动恢复为 'auto'，这样浏览器会尝试恢复之前的滚动位置
      window.history.scrollRestoration = "auto"
    }
  }, [])

  // 自定义返回函数，确保滚动位置恢复
  const handleGoBack = () => {
    // 如果有上一页历史记录，则返回
    if (window.history.length > 1) {
      window.history.back()
    } else {
      // 如果没有历史记录，则返回首页
      window.location.href = "/"
    }
  }

  return (
    <footer className="bg-elegant-card py-8 border-t border-elegant-border/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-elegant-muted">&copy; {new Date().getFullYear()} 阮学敏. 保留所有权利.</p>
          </div>

          <div>
            <button
              onClick={handleGoBack}
              className="group px-4 py-2 rounded-md bg-elegant-bg border border-elegant-border hover:border-elegant-accent1 hover:bg-elegant-accent1/10 text-elegant-accent1 transition-all duration-300 flex items-center text-sm md:text-base hover:shadow-md hover:shadow-elegant-accent1/20 hover:scale-105 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-elegant-accent1/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 transform group-hover:-translate-x-1 transition-transform duration-300 ease-out"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="relative z-10">返回上一级</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
