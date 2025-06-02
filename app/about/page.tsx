import Image from "next/image"
import PageHeader from "@/components/page-header"
import SkillBar from "@/components/skill-bar"
import TimelineItem from "@/components/timeline-item"
import SectionTransition from "@/components/section-transition"

export default function About() {
  return (
    <div className="min-h-screen bg-elegant-bg text-elegant-text">
      <PageHeader title="关于我" description="了解我的专业背景与职业旅程" />

      <section className="py-10 md:py-12 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-20">
                <div className="elegant-border max-w-xs mx-auto lg:max-w-none animate-fade-in">
                  <div className="bg-elegant-bg aspect-[4/5] relative rounded-md overflow-hidden">
                    <Image
                      src="/images/placeholder-user.jpg"
                      alt="阮学敏"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 400px"
                    />
                  </div>
                </div>

                <div className="mt-6 md:mt-8 text-center lg:text-left animate-fade-in animation-delay-200">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 elegant-gradient-text">阮学敏</h2>
                  <p className="text-elegant-muted mb-4">动画技术总监|高级原画师</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-10 md:space-y-12">
              <SectionTransition direction="left">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 elegant-gradient-text">个人简介</h2>
                  <div className="w-20 h-[1px] elegant-divider mb-4 md:mb-6"></div>
                  <div className="space-y-3 md:space-y-4 text-elegant-muted leading-relaxed text-sm sm:text-base">
                    <p>
                      你好，我是阮学敏。凭借对动画艺术的无限热忱与超过七年的行业深耕，我从一名专注于细节的动画师成长为能够驾驭复杂项目、引领技术方向的动画技术总监。
                    </p>
                    <p>
                      我的职业足迹遍及商业插画、二维动画全流程制作（人物/动物设计、一原、二原、中割、上色）、游戏美术、UI设计、漫画绘制乃至项目的前期对接与后期管理。
                    </p>
                    <p>
                      在福州常青藤、精漫社、厦门智璞、厦门橙裂科技、赛几动漫科技、妙韵数相科技及星芒映画科技的多元化经历，不仅锤炼了我的专业技能，更赋予了我从宏观视角审视项目、高效配置资源、激发团队潜能的能力。
                    </p>
                    <p>
                      我坚信技术是创意的翅膀，卓越的视觉作品源于精密的规划与不懈的打磨。期待与您一同探索动态影像的无限可能。
                    </p>
                  </div>
                </div>
              </SectionTransition>

              <SectionTransition delay={0.1} direction="left">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 elegant-gradient-text">专业技能</h2>
                  <div className="w-20 h-[1px] elegant-divider mb-4 md:mb-6"></div>
                  <div className="space-y-4 md:space-y-6">
                    <SkillBar skill="二维动画全流程" level={5} />
                    <SkillBar skill="动画软件（Clip Studio Paint EX，Adobe Animate）" level={5} />
                    <SkillBar skill="图像处理与插画 (Adobe Photoshop, Adobe Illustrator)" level={5} />
                    <SkillBar skill="视频编辑与特效 (Adobe Premiere Pro, Adobe After Effects)" level={4} />
                    <SkillBar skill="项目管理与协作 (Jira, Trello, Teambition)" level={4} />
                    <SkillBar skill="游戏美术 (UI设计, 角色立绘, 场景概念)" level={3} />
                    <SkillBar skill="手绘与造型能力" level={5} />
                    <SkillBar skill="IH5制作与交互设计" level={3} />
                  </div>
                </div>
              </SectionTransition>

              <SectionTransition delay={0.2} direction="left">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 elegant-gradient-text">工作经历</h2>
                  <div className="w-20 h-[1px] elegant-divider mb-4 md:mb-6"></div>
                  <div className="relative border-l-2 border-elegant-border pl-6 md:pl-8 space-y-8 md:space-y-12">
                    <TimelineItem
                      date="2024.12 - 2025.04"
                      company="星芒映画科技有限公司"
                      position="技术总监"
                      responsibilities={[
                        "负责动画及游戏项目的整体技术方向与决策。",
                        "主导项目对接，明确客户需求与技术实现路径。",
                        "统筹游戏及动画内容的制作流程与质量把控。",
                        "负责制作团队的人员配置、任务分配与技能培养。",
                      ]}
                    />

                    <TimelineItem
                      date="2024.11 - 2024.12"
                      company="妙韵数相科技有限公司"
                      position="动画项目负责人"
                      responsibilities={[
                        "负责动画项目的客户对接、需求沟通与进度管理。",
                        "合理安排项目内动画制作人员的工作任务与排期。",
                        "参与并指导关键环节的动画制作，确保项目质量与交付。",
                      ]}
                    />

                    <TimelineItem
                      date="2022.03 - 2024.03"
                      company="赛几动漫科技有限公司"
                      position="高级动画师"
                      responsibilities={[
                        "负责动画项目中人物及动物角色的造型设计与动态表现。",
                        "独立完成高质量的一原（关键帧）绘制。",
                        "精准进行二原（中间帧）绘制与动态修型。",
                        "熟练完成动画中割（加动画）及清稿上色工作。",
                      ]}
                    />

                    <TimelineItem
                      date="2021.11 - 2022.12"
                      company="厦门橙裂科技有限公司"
                      position="动画师/插画师"
                      responsibilities={[
                        "根据项目经理需求对文本内容进行插画章节的绘制和修改。",
                        "根据项目经理需求完成新角色的立绘。",
                        "配合已制定的游戏风格优化马甲包的UI。",
                      ]}
                      projects="《恋爱教父张小伟》、《口袋鸡与奇异蛋》"
                    />

                    <TimelineItem
                      date="2019.10 - 2021.11"
                      company="厦门智璞广告有限公司"
                      position="插画师/动画师"
                      responsibilities={[
                        "按客户需求，独立完成插画项目的绘制和相关工作。",
                        "根据客户需求，完成IP的形象设计和后期的表情包的制作。",
                        "配合相关人员完成视频和H5的制作。",
                      ]}
                      projects="《世茂印山海系列插画》、《世茂大东海天玺系列插画》"
                    />

                    <TimelineItem
                      date="2019.06 - 2019.10"
                      company="精漫社(厦门)文化有限公司"
                      position="线稿/上色师"
                      responsibilities={[
                        "根据主笔需求，对精草的形体的修正并完成线稿的绘制。",
                        "根据主笔的需求完成线稿的上色。",
                      ]}
                      projects="《零距离触感》"
                    />

                    <TimelineItem
                      date="2017.11 - 2019.03"
                      company="福州常青藤设计机构"
                      position="插画师/动画师"
                      responsibilities={[
                        "按项目经历需求，独立完成插画项目的绘制等相关工作。",
                        "负责相关视频的制作和剪辑。",
                        "负责IP的设计和表情包与动画的制作。",
                        "通过学习IH5的功能，完成IH5的制作和修改。",
                        "协助组长完成平面内容的制作和修改。",
                      ]}
                      projects="《正荣20周年系列插画》、《三盛博饼活动》"
                    />
                  </div>
                </div>
              </SectionTransition>

              <SectionTransition delay={0.3} direction="left">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 elegant-gradient-text">教育背景</h2>
                  <div className="w-20 h-[1px] elegant-divider mb-4 md:mb-6"></div>
                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {/* 漳州职业技术学院 */}
                    <div className="bg-elegant-card p-4 sm:p-6 rounded-md border border-elegant-border elegant-card-hover">
                      <div className="flex justify-between items-start mb-3 md:mb-4 flex-wrap gap-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-base md:text-lg text-elegant-text">漳州职业技术学院</h3>
                          <p className="text-elegant-muted text-sm md:text-base">动画与游戏专业</p>
                        </div>
                        <div className="bg-elegant-bg px-2 py-1 rounded-sm text-xs font-medium text-elegant-accent1 border border-elegant-accent1/30">
                          专科
                        </div>
                      </div>
                      <div className="flex items-center text-xs md:text-sm text-elegant-muted mt-3 md:mt-4">
                        <span className="inline-block w-2 h-2 md:w-3 md:h-3 rounded-full bg-elegant-accent1 mr-2"></span>
                        <span>2015.06-2021.09</span>
                      </div>
                    </div>

                    {/* 福建师范大学协和学院 */}
                    <div className="bg-elegant-card p-4 sm:p-6 rounded-md border border-elegant-border elegant-card-hover">
                      <div className="flex justify-between items-start mb-3 md:mb-4 flex-wrap gap-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-base md:text-lg text-elegant-text">福建师范大学协和学院</h3>
                          <p className="text-elegant-muted text-sm md:text-base">动画与游戏专业</p>
                        </div>
                        <div className="bg-elegant-bg px-2 py-1 rounded-sm text-xs font-medium text-elegant-accent2 border border-elegant-accent2/30">
                          本科
                        </div>
                      </div>
                      <div className="flex items-center text-xs md:text-sm text-elegant-muted mt-3 md:mt-4">
                        <span className="inline-block w-2 h-2 md:w-3 md:h-3 rounded-full bg-elegant-accent2 mr-2"></span>
                        <span>2017.06-2025.09</span>
                      </div>
                    </div>

                    {/* 艺数绘 */}
                    <div className="bg-elegant-card p-4 sm:p-6 rounded-md border border-elegant-border elegant-card-hover">
                      <div className="flex justify-between items-start mb-3 md:mb-4 flex-wrap gap-2">
                        <div className="space-y-1">
                          <h3 className="font-bold text-base md:text-lg text-elegant-text">艺数绘</h3>
                          <p className="text-elegant-muted text-sm md:text-base">专业培训</p>
                        </div>
                        <div className="bg-elegant-bg px-2 py-1 rounded-sm text-xs font-medium text-elegant-accent4 border border-elegant-accent4/30">
                          培训
                        </div>
                      </div>
                      <div className="flex items-center text-xs md:text-sm text-elegant-muted mt-3 md:mt-4">
                        <span className="inline-block w-2 h-2 md:w-3 md:h-3 rounded-full bg-elegant-accent4 mr-2"></span>
                        <span>2020.04-2020.10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionTransition>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
