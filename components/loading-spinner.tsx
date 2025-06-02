export default function LoadingSpinner({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative w-[${size}px] h-[${size}px]`}>

        <div className="absolute top-0 left-0 w-full h-full border-4 border-elegant-accent1/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-elegant-accent1 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
