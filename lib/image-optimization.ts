import fs from "node:fs/promises"
import path from "path"
import sharp from "sharp"

// 图片尺寸预设
export const SIZE_PRESETS = {
  thumbnail: { width: 200, height: 200 },
  small: { width: 400, height: 400 },
  medium: { width: 800, height: 800 },
  large: { width: 1200, height: 1200 },
  hero: { width: 1920, height: 1080 },
}

// 图片优化选项
export interface ImageOptimizationOptions {
  format?: ImageFormat
  quality?: number
  width?: number
  height?: number
  fit?: "cover" | "contain" | "fill" | "inside" | "outside"
  position?: "center" | "top" | "right" | "bottom" | "left"
  background?: string
  progressive?: boolean
}

/**
 * 优化单个图片
 */
export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: ImageOptimizationOptions = {},
): Promise<void> {
  try {
    // 确保输出目录存在
    const outputDir = path.dirname(outputPath)
    await fs.mkdir(outputDir, { recursive: true })

    // 读取图片
    let image = sharp(inputPath)

    // 调整尺寸
    if (options.width || options.height) {
      image = image.resize({
        width: options.width,
        height: options.height,
        fit: options.fit || "cover",
        position: options.position || "center",
        background: options.background ? { r: 0, g: 0, b: 0, alpha: 0 } : undefined,
      })
    }

    // 设置格式和质量
    const format = options.format || (path.extname(inputPath).substring(1) as ImageFormat)
    const quality = options.quality || QUALITY_PRESETS.high

    switch (format) {
      case "webp":
        image = image.webp({ quality, effort: 6 })
        break
      case "avif":
        image = image.avif({ quality })
        break
      case "jpeg":
        image = image.jpeg({ quality, progressive: options.progressive || true })
        break
      case "png":
        image = image.png({ quality, progressive: options.progressive || true })
        break
    }

    // 保存优化后的图片
    await image.toFile(outputPath)

    console.log(`图片已优化: ${outputPath}`)
  } catch (error) {
    console.error(`图片优化失败: ${inputPath}`, error)
    throw error
  }
}

/**
 * 批量优化图片
 */
export async function optimizeImages(
  inputDir: string,
  outputDir: string,
  options: ImageOptimizationOptions = {},
): Promise<void> {
  try {
    // 读取目录中的所有文件
    const files = await fs.readdir(inputDir)

    // 过滤出图片文件
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return [".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)
    })

    // 并行优化所有图片
    await Promise.all(
      imageFiles.map(async (file) => {
        const inputPath = path.join(inputDir, file)
        const outputPath = path.join(outputDir, file)

        // 获取文件信息
        const stats = await fs.stat(inputPath)

        // 只处理文件，跳过目录
        if (stats.isFile()) {
          await optimizeImage(inputPath, outputPath, options)
        }
      }),
    )

    console.log(`批量优化完成: ${imageFiles.length} 个图片已处理`)
  } catch (error) {
    console.error(`批量优化失败: ${inputDir}`, error)
    throw error
  }
}

/**
 * 生成响应式图片集
 */
export async function generateResponsiveImages(
  inputPath: string,
  outputDir: string,
  baseName: string,
  widths: number[] = [320, 640, 960, 1280, 1920],
  formats: ImageFormat[] = ["webp", "jpeg"],
): Promise<{ [key: string]: string }> {
  const result: { [key: string]: string } = {}

  try {
    // 确保输出目录存在
    await fs.mkdir(outputDir, { recursive: true })

    // 为每个宽度和格式生成图片
    for (const width of widths) {
      for (const format of formats) {
        const fileName = `${baseName}-${width}.${format}`
        const outputPath = path.join(outputDir, fileName)

        await optimizeImage(inputPath, outputPath, {
          width,
          format,
          quality: width < 640 ? QUALITY_PRESETS.medium : QUALITY_PRESETS.high,
        })

        // 记录生成的图片路径
        result[`${width}-${format}`] = outputPath
      }
    }

    return result
  } catch (error) {
    console.error(`生成响应式图片失败: ${inputPath}`, error)
    throw error
  }
}
