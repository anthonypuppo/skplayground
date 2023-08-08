import { cn } from '@/lib/utils'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/lib/site'
import { IconExternalLink } from '@/components/ui/icons'

export function HeroSection() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          <Balancer>Explore the Power of AI with SKPlayground.</Balancer>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          <Balancer>
            Step onto SKPlayground - your interactive portal to experiment with
            Microsoft&apos;s Semantic Kernel library. Uncover unique insights
            and watch your concepts take flight in this dynamic environment.
          </Balancer>
        </p>
        <div className="space-x-4">
          <Link
            href="/playground"
            className={cn(buttonVariants({ size: 'lg' }))}
          >
            Get Started
          </Link>
          <Link
            href={siteConfig.links.microsoft.semanticKernel}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            Semantic Kernel
            <IconExternalLink className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
