declare namespace NodeJS {
  interface ProcessEnv {
    // Cloudinary环境变量
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string
  }
}
