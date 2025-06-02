// 项目类型定义
export interface PortfolioProject {
  id: string
  slug: string
  title: string
  client: string
  type: string
  role: string
  description: string
  responsibilities: string[]
  tech: string | string[]
  challenges: string | string[]
  achievements?: string[]
  duration?: string
  year?: string
  category: "animation" | "illustration" | "game" | "technical"
  coverImage: string
  images?: string[]
  videoUrl?: string[]
  videoThumbnail?: string
  videoThumbnails?: string[] // 添加视频缩略图数组
  fullSizeImages?: string[] // 添加完整尺寸图片数组
  date?: string;
  overview?: string;
  isFeatured?: boolean;
}

// 项目数据
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "animation-series",
    slug: "animation-series",
    title: "赛几动漫 - 动画剧集",
    client: "厦门赛几动漫科技有限公司", // 修改此处，移除 "/ 商业动画剧集"
    type: "商业动画剧集",
    role: "高级原画师",
    description: "为赛几动漫制作的商业动画剧集，负责核心角色的动态表演设计与一原绘制。",
    responsibilities: [
      "负责核心角色的动态表演设计与一二原绘制",
      "兼顾中割与上色，确保动画质量与风格统一",
      "与导演和制片人紧密合作，确保项目按时高质量完成",
    ],
    tech: "Clip Studio Paint, Photoshop", // 移除 Toon Boom Harmony
    challenges:
      "项目中最大的挑战是在有限的时间内保证角色动作的流畅性和表现力。通过精心设计关键帧和动作分解，以及与团队的紧密协作，最终呈现出高质量的动画效果。",

    duration: "2023.03 - 2024.03",
    year: "2023",
    category: "animation",
    coverImage: "/images/saiji/fengmian.jpg",
    images: [
      "/images/saiji/saiji1.jpg",
      "/images/saiji/saiji2.jpg",
    ],
    videoUrl: [
      'https://www.bilibili.com/video/BV1B44y1F7YK/?spm_id_from=333.337.search-card.all.click',
      'https://www.bilibili.com/video/BV1Fb421a78t/?spm_id_from=333.337.search-card.all.click&vd_source=efd7004b6a926d756447fd2866210318'
    ],
    videoThumbnails: [
      "/images/saiji/saiji-video-1.jpg",
      "/images/saiji/saiji-video-2.jpg",
    ],
  },
  {
    id: "fifth-personality-animation",
    slug: "fifth-personality-animation",
    title: "第五人格XP5动画PV",
    client: "光树映画",
    type: "游戏宣传动画",
    role: "原画师",
    description: "为网易游戏《第五人格》XP5赛季制作的宣传动画PV，展现游戏角色和世界观。",
    responsibilities: [
      "负责部分镜头中角色的动作设计和关键帧绘制",
      "配合导演完成动画一二原角色的绘制工作",
    ],
    tech: "Clip Studio Paint",
    challenges:
      "项目最大的挑战是在保持游戏原有角色风格的同时，为动画赋予流畅自然的动作表现。同时，紧张的制作周期也要求团队高效协作。",
    duration: "2023.03 - 2023.05",
    year: "2023",
    category: "animation",
    coverImage: "/images/P5/P5-cover.jpg",
    videoUrl: [
      "https://www.bilibili.com/video/BV17oStYGESa/?buvid=Y440EC4AF4C18A534608A7EA7909DCB4C599&is_story_h5=false&mid=aBIrBsiUTTa140ikTvQ03w%3D%3D&plat_id=114&share_from=ugc&share_medium=iphone&share_plat=ios&share_session_id=3A78FFF3-4BBC-44E9-ACB9-2E11596D5FAD&share_source=WEIXIN_MONMENT&share_tag=s_i&timestamp=1731066921&unique_k=VjulGEw&up_id=211005705&vd_source=efd7004b6a926d756447fd2866210318",
      "https://www.bilibili.com/video/BV1ZS421X7iy/?spm_id_from=333.337.search-card.all.click&vd_source=efd7004b6a926d756447fd2866210318"
    ],
    videoThumbnails: [
      "/images/P5/video-thumbnails/fifth-personality-video-1.jpg",
      "/images/P5/video-thumbnails/fifth-personality-video-2.jpg"
    ],
  },
  {
    id: "game-art",
    slug: "game-art",
    title: "恋爱教父张小伟",
    client: "厦门橙裂科技有限公司",
    type: "游戏美术/UI设计",
    role: "角色设计师/UI设计师",
    description: "为手机游戏《恋爱教父张小伟》设计角色立绘和UI界面，创造吸引人的视觉体验。",
    responsibilities: [
      "设计并绘制主要角色的立绘和表情",
      "创建游戏UI界面元素，确保视觉一致性",
      "与开发团队协作，确保美术资源的正确实现",
      "参与游戏视觉风格的确定和优化",
    ],
    tech: "Photoshop, Illustrator, Clip Studio Paint",
    challenges:
      "最大的挑战是在保持角色形象一致性的同时，结合剧情,为不同场景创建多样化的表情和姿态。",
    duration: "2021.11 - 2022.12",
    year: "2022",
    category: "game",
    coverImage: "/images/zhang-xiaowei/zhang-xiaowei_cover.jpg",
    images: [
      "/images/zhang-xiaowei/zhang-xiaowei1.jpg",
      "/images/zhang-xiaowei/zhang-xiaowei2.jpg",
    ],
    date: "2022-12-01",
    overview: "为手机游戏《恋爱教父张小伟》设计角色立绘和UI界面，创造吸引人的视觉体验。",
    isFeatured: true,
  },
  {
    id: "jing-man-she",
    slug: "jing-man-she",
    title: "精漫社漫画项目",
    client: "精漫社（厦门）文化科技有限公司",
    type: "漫画",
    role: "漫画师",
    description:
      "负责精漫社漫画项目的漫画制作，包括角色设计、场景绘制和分镜。与团队紧密合作，确保漫画质量和项目进度。",
    responsibilities: [
      "对精草形体的修正并完成线稿的绘制.",
      "确保漫画符合项目风格和质量标准.",
      "按时完成漫画任务，并参与漫画的后期修改和优化.",
    ],
    tech: ["Clip Studio Paint", "Photoshop", "Sai"],
    challenges: [
      "在紧张的项目周期内保持高质量的漫画输出.",
      "处理复杂的角色表情和动作细节.",
      "协调不同团队成员的工作，确保漫画风格统一.",
    ],
    duration: "2019.06-2019.10",
    year: "2023",
    category: "technical",
    coverImage: "/images/jing-man-she/TT-cover.jpg",
    images: [
      '/images/jing-man-she/jing-man-she1.jpg',
      '/images/jing-man-she/jing-man-she2.jpg',
    ],
  },
  {
    id: "illustration-2",
    slug: "illustration-2",
    title: "正荣20周年系列插画",
    client: "福州常青藤设计机构",
    type: "商业插画",
    role: "插画师",
    description: "为正荣地产20周年庆典创作的系列商业插画，展现企业发展历程和未来愿景。",
    responsibilities: [
      "根据企业历史和文化创作主题插画",
      "设计20周年庆典的视觉元素",
      "为不同宣传材料调整插画格式",
      "参与庆典活动的视觉设计",
    ],
    tech: "Photoshop, Illustrator",
    challenges: "需要在插画中融入企业20年的发展历程和成就，同时保持现代感和艺术性，平衡商业需求和艺术表达。",
    duration: "2017.11 - 2019.03",
    year: "2018",
    category: "illustration",
    coverImage: "/images/zheng-rong/illustration/zheng-rong-cover.jpg",
    images: [
      '/images/zheng-rong/illustration/zheng-rong-1.jpg',
      '/images/zheng-rong/illustration/zheng-rong-2.jpg',
      '/images/zheng-rong/illustration/zheng-rong-3.jpg',
    ]
  },
  {
    id: "xtep-illustration",
    slug: "xtep-illustration",
    title: "特步品牌2021牛年限定系列创意插画",
    client: "特步",
    type: "商业插画",
    role: "插画师",
    description: "为特步品牌创作的商业插画，用于宣传和产品设计。",
    responsibilities: [
      "根据品牌需求创作插画",
      "参与产品包装和广告设计",
      "与市场团队协作，确保插画符合品牌形象",
    ],
    tech: "Photoshop, Illustrator",
    challenges: "在保持特步品牌运动风格的同时，融入艺术性和时尚感，创作出既有视觉冲击力又符合商业用途的插画。",
    duration: "2020.01 - 2020.03",
    year: "2020",
    category: "illustration",
    coverImage: "/images/xtep/xtep-cover.png",
    images: [
      "/images/xtep/xtep-1.jpg",
      "/images/xtep/xtep-2.jpg",
      "/images/xtep/xtep-3.jpg",
    ],
    videoUrl: ["https://www.bilibili.com/video/BV1B44y1F7YK"],
    videoThumbnails: [
      "/images/xtep/xtep-video-1.jpg",
      "/images/xtep/xtep-video-2.jpg",
      "/images/xtep/xtep-video-3.jpg",
      "/images/xtep/xtep-video-4.jpg",
      "/images/xtep/xtep-video-5.jpg",
    ],
  }
]

// 通过ID获取项目
export function getProjectById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.id === id);
}



// 通过类别获取项目
export function getProjectsByCategory(category: string): PortfolioProject[] {
  if (category === "all") return portfolioProjects;
  return portfolioProjects.filter((project) => project.category === category);
}



// 获取相关项目
export function getRelatedProjects(currentId: string, limit = 3): PortfolioProject[] {
  const currentProject = getProjectById(currentId)
  if (!currentProject) return []

  // 首先获取同类别的项目
  const sameCategory = portfolioProjects
    .filter((p) => p.id !== currentId && p.category === currentProject.category)
    .slice(0, limit)

  // 如果同类别项目不足，添加其他类别的项目
  if (sameCategory.length < limit) {
    const otherProjects = portfolioProjects
      .filter((p) => p.id !== currentId && p.category !== currentProject.category)
      .slice(0, limit - sameCategory.length)

    return [...sameCategory, ...otherProjects];
  }

  return sameCategory;
}

