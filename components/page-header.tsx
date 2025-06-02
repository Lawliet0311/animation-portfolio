interface PageHeaderProps {
  title: string
  description: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-8 sm:pb-10 md:pb-12 lg:pb-20 bg-elegant-card elegant-bg-pattern">
      <div className="container px-4 md:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 elegant-gradient-text">
          {title}
        </h1>
        <div className="w-16 sm:w-20 h-[1px] mx-auto mb-4 md:mb-6 elegant-divider"></div>
        <p className="text-base sm:text-lg md:text-xl text-elegant-muted max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
  )
}
