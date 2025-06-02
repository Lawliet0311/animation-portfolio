interface SkillBarProps {
  skill: string
  level: number
}

export default function SkillBar({ skill, level }: SkillBarProps) {
  return (
    <div className="space-y-1 md:space-y-2">
      <div className="flex justify-between items-center flex-wrap gap-1">
        <span className="font-medium text-sm md:text-base">{skill}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-base md:text-xl ${i < level ? "text-elegant-accent1" : "text-elegant-border"}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="w-full bg-elegant-card rounded-sm h-1.5 md:h-2">
        <div
          className="bg-gradient-to-r from-elegant-accent1 to-elegant-accent2 h-1.5 md:h-2 rounded-sm"
          style={{ width: `${level * 20}%` }}
        ></div>
      </div>
    </div>
  )
}
