interface TimelineItemProps {
  date: string
  company: string
  position: string
  responsibilities: string[]
  projects?: string
}

export default function TimelineItem({ date, company, position, responsibilities, projects }: TimelineItemProps) {
  return (
    <div className="relative">
      <div className="absolute -left-8 md:-left-10 mt-1.5 h-3 w-3 md:h-4 md:w-4 rounded-full border-2 border-elegant-accent1 bg-elegant-bg"></div>
      <div className="mb-2">
        <span className="text-elegant-accent1 font-medium text-sm md:text-base">{date}</span>
      </div>
      <div className="bg-elegant-card p-4 sm:p-6 rounded-md border border-elegant-border elegant-card-hover">
        <h3 className="text-lg md:text-xl font-bold mb-1">{company}</h3>
        <p className="text-elegant-accent2 mb-3 md:mb-4 text-sm md:text-base">{position}</p>
        <div className="space-y-2">
          <h4 className="text-xs md:text-sm text-elegant-muted">主要职责:</h4>
          <ul className="space-y-1 md:space-y-2">
            {responsibilities.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-elegant-accent1 mr-2 text-sm md:text-base">•</span>
                <span className="text-elegant-muted text-xs md:text-sm">{item}</span>
              </li>
            ))}
          </ul>
          {projects && (
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-elegant-border">
              <h4 className="text-xs md:text-sm text-elegant-muted mb-1 md:mb-2">项目:</h4>
              <p className="text-elegant-muted text-xs md:text-sm">{projects}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
