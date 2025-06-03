import { type NextRequest, NextResponse } from "next/server"
import { optimizeImage } from "@/lib/image-optimization"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import os from "os"
import { mkdir, writeFile, readFile } from "node:fs/promises"

export async function POST(request: NextRequest) {
  try {
    // 获取表单数据
    const formData = await request.formData()
    const file = formData.get("image") as File | null

    if (!file) {
      return NextResponse.json({ error: "未提供图片" }, { status: 400 })
    }

    // 获取优化参数
    const format = (formData.get("format") as string) || "webp"
    const quality = Number.parseInt((formData.get("quality") as string) || "80", 10)
    const width = Number.parseInt((formData.get("width") as string) || "0", 10)
    const height = Number.parseInt((formData.get("height") as string) || "0", 10)

    // 创建临时目录
    const tempDir = join(os.tmpdir(), "image-optimization")
    await mkdir(tempDir, { recursive: true })

    // 保存原始文件
    const originalFilename = `${uuidv4()}-original${getExtension(file.name)}`
    const originalPath = join(tempDir, originalFilename)
    await writeFile(originalPath, Buffer.from(await file.arrayBuffer()))

    // 优化图片
    const optimizedFilename = `${uuidv4()}-optimized.${format}`
    const optimizedPath = join(tempDir, optimizedFilename)

    await optimizeImage(originalPath, optimizedPath, {
      format: format as any,
      quality,
      width: width || undefined,
      height: height || undefined,
    })

    // 读取优化后的图片
    const optimizedFile = await readFile(optimizedPath)
    const optimizedBuffer = Buffer.from(optimizedFile)

    // 返回优化后的图片
    return new NextResponse(optimizedBuffer, {
      headers: {
        "Content-Type": `image/${format}`,
        "Content-Disposition": `attachment; filename="optimized.${format}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("图片优化失败:", error)
    return NextResponse.json({ error: "图片优化失败" }, { status: 500 })
  }
}

// 获取文件扩展名
function getExtension(filename: string): string {
  const ext = filename.split(".").pop()
  return ext ? `.${ext}` : ""
}
