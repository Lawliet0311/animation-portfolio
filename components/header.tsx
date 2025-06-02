"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // 这里可以实现搜索功能，例如跳转到搜索结果页面
      console.log(`搜索: ${searchQuery}`)
      // 可以添加路由跳转: router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // 禁止菜单打开时的背景滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: "首页", href: "/" },
    { name: "作品集", href: "/portfolio" },
    { name: "关于我", href: "/about" },
    { name: "联系", href: "/contact" },
  ]

  // 菜单动画变体
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-elegant-bg/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 z-50">
          <Link href="/" className="text-xl font-medium text-elegant-accent1 hidden sm:block">
            {/* 文字已删除 */}
          </Link>
          <form onSubmit={handleSearch} className="relative w-full max-w-[200px] sm:max-w-[250px]">
            <input
              type="search"
              placeholder="搜索内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-3 py-2 bg-elegant-bg/80 border border-elegant-border rounded-md text-sm text-elegant-text placeholder:text-elegant-muted focus:outline-none focus:ring-1 focus:ring-elegant-accent1 focus:border-elegant-accent1"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-elegant-muted hover:text-elegant-accent1"
              aria-label="搜索"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-elegant-accent1 elegant-text-hover",
                pathname === item.href ? "text-elegant-accent1" : "text-elegant-text",
              )}
            >
              {item.name}
            </Link>
          ))}

          <Button
            asChild
            className="bg-elegant-accent3 hover:bg-elegant-accent3/90 text-white transition-all duration-300 elegant-btn-hover"
          >
            <Link href="/contact">联系我</Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-elegant-text hover:text-elegant-accent1 hover:bg-transparent z-50"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* 移动端菜单 - 使用AnimatePresence实现平滑过渡 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-elegant-bg/95 backdrop-blur-md z-40 flex flex-col md:hidden"
          >
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 space-y-8 overflow-auto">
              {navItems.map((item, index) => (
                <motion.div key={item.name} variants={itemVariants} custom={index}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-2xl font-medium transition-colors hover:text-elegant-accent1 py-3 px-4 block",
                      pathname === item.href ? "text-elegant-accent1" : "text-elegant-text",
                    )}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="pt-4">
                <Button
                  asChild
                  className="bg-elegant-accent3 hover:bg-elegant-accent3/90 text-white transition-all duration-300 w-full elegant-btn-hover"
                >
                  <Link href="/contact" onClick={closeMenu}>
                    联系我
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}