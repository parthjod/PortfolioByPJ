import { TextShimmer } from '../components/ui/text-shimmer'
import { HeroButton } from '../components/hero-button'

export function TextShimmerColor() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-12 mt-[300px]">
      <TextShimmer
        duration={1.2}
        className="text-5xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
      >
        Hi, how are you?
      </TextShimmer>

      <TextShimmer
        duration={1.2}
        className="text-3xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
      >
        Get ready to explore Portfolio of Parth A Jain
      </TextShimmer>
      <HeroButton/>
    </div>
  )
}
