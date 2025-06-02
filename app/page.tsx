import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroBackground from "@/components/hero-background"
import SkillCard from "@/components/skill-card"
import FeaturedWork from "@/components/featured-work"
import SectionTransition from "@/components/section-transition"
import ParallaxSection from "@/components/parallax-section"
import ParallaxImage from "@/components/parallax-image"
import ParallaxText from "@/components/parallax-text"
import FloatingElements from "@/components/floating-elements"
import { Noto_Sans_SC } from "next/font/google"

// 加载更符合整体风格的现代字体
const siteFont = Noto_Sans_SC({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
})

export default function Home() {
  return (
    <div className="min-h-screen bg-elegant-bg text-elegant-text overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <FloatingElements />
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center space-y-6 md:space-y-8 animate-fade-in">
          <ParallaxSection speed={3} direction="down">
            {/* Badge已移除 */}
          </ParallaxSection>

          <ParallaxText>
            <h1
              className={`${siteFont.className} text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight elegant-gradient-text`}
            >
              阮学敏
            </h1>
          </ParallaxText>

          <ParallaxSection speed={2} direction="up">
            <p className="text-lg sm:text-xl md:text-2xl text-elegant-muted max-w-3xl">动画技术总监|高级原画师</p>
          </ParallaxSection>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-8 w-full sm:w-auto">
            <ParallaxSection speed={1.5} direction="left">
              <Button
                asChild
                className="bg-elegant-accent3 text-white hover:bg-elegant-accent3/90 transition-all duration-300 group elegant-btn-hover w-full sm:w-auto"
              >
                <Link href="/portfolio">
                  探索我的作品
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </ParallaxSection>

            <ParallaxSection speed={1.5} direction="right">
              <Button
                asChild
                variant="outline"
                className="border-elegant-border text-elegant-text hover:bg-elegant-card hover:text-elegant-accent1 transition-all duration-300 w-full sm:w-auto"
              >
                <Link href="/about">关于我</Link>
              </Button>
            </ParallaxSection>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="h-6 w-6 text-elegant-accent1 rotate-90" />
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-16 md:py-20 bg-elegant-card relative overflow-hidden">
        <ParallaxSection speed={5} className="absolute -top-20 -right-20 opacity-10 z-0">
          <div className="w-80 h-80 rounded-full bg-gradient-to-br from-elegant-accent1 to-elegant-accent2 blur-3xl"></div>
        </ParallaxSection>

        <ParallaxSection speed={3} className="absolute -bottom-40 -left-20 opacity-10 z-0">
          <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-elegant-accent3 to-elegant-accent4 blur-3xl"></div>
        </ParallaxSection>

        <div className="container px-4 md:px-6 relative z-10">
          <SectionTransition>
            <div className="flex flex-col items-center text-center mb-12 md:mb-16">
              <ParallaxText>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 elegant-gradient-text">作品精选</h2>
              </ParallaxText>
              <div className="w-20 h-[1px] elegant-divider"></div>
            </div>
          </SectionTransition>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <SectionTransition delay={0.1} direction="up">
              <ParallaxSection speed={2} direction="up">
                <FeaturedWork
                  title="第五人格XP5动画PV"
                  category="二维动画"
                  image="/placeholder.svg?height=400&width=600"
                  href="/portfolio/fifth-personality-animation"
                />
              </ParallaxSection>
            </SectionTransition>

            <SectionTransition delay={0.2} direction="up">
              <ParallaxSection speed={3} direction="up">
                <FeaturedWork
                  title="赛几动漫 - 动画剧集"
                  category="二维动画"
                  image="/placeholder.svg?height=400&width=600"
                  href="/portfolio/animation-series"
                />
              </ParallaxSection>
            </SectionTransition>

            <SectionTransition delay={0.3} direction="up">
              <ParallaxSection speed={4} direction="up">
                <FeaturedWork
                  title="特步品牌2021牛年限定系列创意插画"
                  category="商业插画"
                  image="/images/xtep-cover.png"
                  href="/portfolio/xtep-illustration"
                  imageStyle={{ objectFit: "contain", aspectRatio: "1376/881" }}
                />
              </ParallaxSection>
            </SectionTransition>
          </div>

          <SectionTransition delay={0.4}>
            <div className="flex justify-center mt-10 md:mt-12">
              <ParallaxSection speed={1} direction="up">
                <Button
                  asChild
                  variant="outline"
                  className="border-elegant-border text-elegant-text hover:bg-elegant-card hover:text-elegant-accent1 transition-all duration-300 group w-full sm:w-auto"
                >
                  <Link href="/portfolio">
                    查看全部作品
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </ParallaxSection>
            </div>
          </SectionTransition>
        </div>
      </section>

      {/* Brief About */}
      <section className="py-16 md:py-20 bg-elegant-bg relative overflow-hidden">
        <ParallaxSection speed={4} className="absolute top-40 right-0 opacity-5 z-0">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-elegant-accent2 to-elegant-accent3 blur-3xl"></div>
        </ParallaxSection>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-12 items-center">
            <SectionTransition className="w-full lg:w-1/3" direction="right">
              <ParallaxImage className="relative elegant-border max-w-xs mx-auto lg:max-w-none">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="阮学敏"
                  width={400}
                  height={500}
                  className="rounded-md w-full"
                />
              </ParallaxImage>
            </SectionTransition>

            <SectionTransition className="w-full lg:w-2/3 space-y-4 md:space-y-6" direction="left">
              <ParallaxText>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold elegant-gradient-text text-center lg:text-left">
                  我是谁
                </h2>
              </ParallaxText>

              <div className="w-20 h-[1px] elegant-divider mx-auto lg:mx-0"></div>

              <ParallaxSection speed={2} direction="left">
                <p className="text-base md:text-lg text-elegant-muted leading-relaxed">
                  拥有超过7年动画行业经验，从一线高级动画师到动画项目负责人及技术总监。我热衷于将精湛的动画技艺与前瞻性的项目管理相结合，驱动团队打造卓越的视觉内容。专业领域涵盖二维动画全流程、游戏美术、商业插画及技术指导。
                </p>
              </ParallaxSection>

              <div className="text-center lg:text-left">
                <ParallaxSection speed={1} direction="left">
                  <Button
                    asChild
                    variant="link"
                    className="text-elegant-accent1 p-0 hover:text-elegant-accent2 transition-colors group"
                  >
                    <Link href="/about">
                      了解完整履历
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </ParallaxSection>
              </div>
            </SectionTransition>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-16 md:py-20 bg-elegant-card elegant-bg-pattern relative overflow-hidden">
        <ParallaxSection speed={3} className="absolute -top-40 -left-40 opacity-10 z-0">
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-elegant-accent1 to-elegant-accent4 blur-3xl"></div>
        </ParallaxSection>

        <div className="container px-4 md:px-6 relative z-10">
          <SectionTransition>
            <div className="flex flex-col items-center text-center mb-12 md:mb-16">
              <ParallaxText>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 elegant-gradient-text">核心能力</h2>
              </ParallaxText>
              <div className="w-20 h-[1px] elegant-divider"></div>
            </div>
          </SectionTransition>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <SectionTransition delay={0.1}>
              <ParallaxSection speed={1.5} direction="up">
                <SkillCard title="二维动画制作" description="一原、二原、中割、上色" icon="Pen" />
              </ParallaxSection>
            </SectionTransition>

            <SectionTransition delay={0.2}>
              <ParallaxSection speed={2} direction="up">
                <SkillCard title="角色/场景设计" description="人物造型、场景构建、视觉风格" icon="Palette" />
              </ParallaxSection>
            </SectionTransition>

            <SectionTransition delay={0.3}>
              <ParallaxSection speed={2.5} direction="up">
                <SkillCard title="技术指导与流程优化" description="工作流程设计、技术难点攻克" icon="Settings" />
              </ParallaxSection>
            </SectionTransition>

            <SectionTransition delay={0.4}>
              <ParallaxSection speed={3} direction="up">
                <SkillCard title="项目管理与团队协作" description="进度把控、资源调配、团队领导" icon="Users" />
              </ParallaxSection>
            </SectionTransition>

            <SectionTransition delay={0.5}>
              <ParallaxSection speed={3.5} direction="up">
                <SkillCard title="商业插画" description="品牌插画、概念设计、视觉表达" icon="Image" />
              </ParallaxSection>
            </SectionTransition>

            <SectionTransition delay={0.6}>
              <ParallaxSection speed={4} direction="up">
                <SkillCard title="游戏美术 & UI" description="界面设计、角色立绘、游戏资产" icon="Gamepad2" />
              </ParallaxSection>
            </SectionTransition>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-elegant-bg relative overflow-hidden">
        <ParallaxSection speed={2} className="absolute bottom-0 right-0 opacity-5 z-0">
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-elegant-accent1 to-elegant-accent3 blur-3xl"></div>
        </ParallaxSection>

        <div className="container px-4 md:px-6 relative z-10">
          <SectionTransition>
            <ParallaxSection speed={2} direction="up">
              <div className="bg-elegant-card p-6 sm:p-8 md:p-12 rounded-md elegant-border text-center">
                <ParallaxText>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 elegant-gradient-text">
                    开启合作新篇章
                  </h2>
                </ParallaxText>

                <ParallaxSection speed={1.5} direction="up">
                  <p className="text-base md:text-lg text-elegant-muted max-w-2xl mx-auto mb-6 md:mb-8">
                    无论是动画项目、游戏美术设计还是商业插画需求，我都能为您提供专业的解决方案。
                  </p>
                </ParallaxSection>

                <ParallaxSection speed={1} direction="up">
                  <Button
                    asChild
                    className="bg-elegant-accent3 text-white hover:bg-elegant-accent3/90 transition-all duration-300 group elegant-btn-hover w-full sm:w-auto"
                  >
                    <Link href="/contact">
                      联系我
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </ParallaxSection>
              </div>
            </ParallaxSection>
          </SectionTransition>
        </div>
      </section>
    </div>
  )
}
