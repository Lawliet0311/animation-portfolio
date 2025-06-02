import { Noto_Sans_SC, Ma_Shan_Zheng, ZCOOL_QingKe_HuangYou, ZCOOL_XiaoWei, Noto_Serif_SC } from "next/font/google"

// 加载更有艺术感的中文字体
export const maShangZheng = Ma_Shan_Zheng({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ma-shang-zheng",
  display: "swap",
})

export const zcoolQingKeHuangYou = ZCOOL_QingKe_HuangYou({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zcool-qingke-huangyou",
  display: "swap",
})

export const zcoolXiaoWei = ZCOOL_XiaoWei({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-zcool-xiaowei",
  display: "swap",
})

export const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
  display: "swap",
})

export const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-sc",
  display: "swap",
})
