import { LucideIcon } from 'lucide-react'

export interface ProcessStep {
  icon: LucideIcon
  title: string
  description: string
}

interface ProcessStepsProps {
  steps: ProcessStep[]
  title?: string
  subtitle?: string
}

export default function ProcessSteps({ steps, title, subtitle }: ProcessStepsProps) {
  // Determine grid columns based on number of steps
  const gridCols = steps.length <= 4
    ? 'lg:grid-cols-4'
    : steps.length === 5
      ? 'lg:grid-cols-5'
      : 'lg:grid-cols-4'

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="text-center mb-16" data-aos="fade-up">
            {title && <h2 className="section-title mb-4">{title}</h2>}
            {subtitle && <p className="section-subtitle mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-6`}>
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-10 left-full items-center justify-center w-6 z-0">
                  <div className="w-full h-0.5 bg-primary-300"></div>
                  <div className="absolute w-2 h-2 bg-primary-400 rounded-full"></div>
                </div>
              )}

              <div className="bg-white p-6 rounded-xl shadow-lg h-full border border-gray-100 relative z-10">
                {/* Icon only - no step numbers */}
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-5">
                  <step.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-secondary-900 mb-2">{step.title}</h3>
                <p className="text-secondary-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
