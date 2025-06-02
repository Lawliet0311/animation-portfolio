import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// 确保这是服务器端代码
export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json()

    if (!publicId) {
      return NextResponse.json({ error: "缺少publicId参数" }, { status: 400 })
    }

    // 配置Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
      api_key: process.env.CLOUDINARY_API_KEY || "",
      api_secret: process.env.CLOUDINARY_API_SECRET || "",
      secure: true,
    })

    // 删除资源
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("删除Cloudinary资源失败:", error)
    return NextResponse.json({ error: "删除资源失败" }, { status: 500 })
  }
}
