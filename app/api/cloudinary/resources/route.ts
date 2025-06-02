import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

// 确保这是服务器端代码
export const runtime = "nodejs"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder") || "animation-portfolio"
    const maxResults = Number.parseInt(searchParams.get("max_results") || "50", 10)

    // 配置Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
      api_key: process.env.CLOUDINARY_API_KEY || "",
      api_secret: process.env.CLOUDINARY_API_SECRET || "",
      secure: true,
    })

    // 获取资源
    const result = await new Promise((resolve, reject) => {
      cloudinary.api.resources(
        {
          type: "upload",
          prefix: folder,
          max_results: maxResults,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
    })

    // 格式化结果
    const resources = (result as any).resources.map((resource: any) => ({
      publicId: resource.public_id,
      url: resource.url,
      secureUrl: resource.secure_url,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      bytes: resource.bytes,
      createdAt: resource.created_at,
    }))

    return NextResponse.json({ resources })
  } catch (error) {
    console.error("获取Cloudinary资源失败:", error)
    return NextResponse.json({ error: "获取资源失败" }, { status: 500 })
  }
}
