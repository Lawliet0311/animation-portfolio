import { Pen, Palette, Settings, Users, ImageIcon, Gamepad2 } from "lucide-react"

interface SkillCardProps {
  title: string
  description: string
  icon: string
}

export default function SkillCard({ title, description, icon }: SkillCardProps) {
  const getIcon = (): JSX.Element => {
    const props = { className: "h-8 w-8 sm:h-10 sm:w-10 text-elegant-accent1" }

    switch (icon) {
      case "Pen":
        return <Pen {...props} />
      case "Palette":
        return <Palette {...props} />
      case "Settings":
        return <Settings {...props} />
      case "Users":
        return <Users {...props} />
      case "Image":
        return <ImageIcon {...props} />
      case "Gamepad2":
        return <Gamepad2 {...props} />
      default:
        return <Settings {...props} />
    }
  }

  return (
    <div className="bg-elegant-bg p-5 sm:p-6 rounded-md border border-elegant-border hover:border-elegant-accent1/30 transition-all duration-300 elegant-card-hover h-full">
      <div className="mb-4">{getIcon()}</div>
      <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-elegant-accent1 transition-colors">{title}</h3>
      <p className="text-sm sm:text-base text-elegant-muted">{description}</p>
    </div>
  )
}
