import Balancer from 'react-wrap-balancer'
import {
  IconLightbulb,
  IconShapes,
  IconSquareCode
} from '@/components/ui/icons'
import { Card, CardContent } from '@/components/ui/card'

export function FeaturesSection() {
  return (
    <section className="space-y-6 bg-muted py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          <Balancer>
            This platform is designed to provide an enriched understanding of
            the Semantic Kernel library while offering you opportunities for
            hands-on experimentation and learning enhancement.
          </Balancer>
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 px-8 text-center sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <Card>
          <CardContent className="p-3">
            <div className="flex flex-col items-center justify-between rounded-md p-6">
              <IconShapes className="h-12 w-12" />
              <div className="mt-2.5 space-y-2">
                <h3 className="font-bold">Learn, play, develop</h3>
                <p className="text-sm text-muted-foreground">
                  <Balancer>
                    Hands on experience with an app powered by Semantic Kernel.
                  </Balancer>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex flex-col items-center justify-between rounded-md p-6">
              <IconSquareCode className="h-12 w-12" />
              <div className="mt-2.5 space-y-2">
                <h3 className="font-bold">Easy to use tech stack</h3>
                <p className="text-sm text-muted-foreground">
                  <Balancer>
                    Built with a Next.js frontend and .NET minimal API backend.
                    Fully open source.
                  </Balancer>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="flex flex-col items-center justify-between rounded-md p-6">
              <IconLightbulb className="h-12 w-12" />
              <div className="mt-2.5 space-y-2">
                <h3 className="font-bold">Extendable</h3>
                <p className="text-sm text-muted-foreground">
                  <Balancer>
                    Use as a starting point for your own projects or as an
                    inspiration for your next idea.
                  </Balancer>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
