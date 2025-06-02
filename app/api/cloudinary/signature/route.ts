import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// 确保这是服务器端代码
export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder") || "animation-portfolio"

    // 配置Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
      api_key: process.env.CLOUDINARY_API_KEY || "",
      api_secret: process.env.CLOUDINARY_API_SECRET || "",
      secure: true,
    })

    // 生成签名
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      cloudinary.config().api_secret || "",
    )

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: cloudinary.config().cloud_name,
      apiKey: cloudinary.config().api_key,
      folder,
    })
  } catch (error) {
    console.error("生成Cloudinary签名失败:", error)
    return NextResponse.json({ error: "生成签名失败" }, { status: 500 })
  }
}
