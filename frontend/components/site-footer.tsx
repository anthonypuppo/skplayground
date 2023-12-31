import { siteConfig } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <a
            href={siteConfig.links.gitHub.profile}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Anthony Puppo
          </a>
          . Hosted on{' '}
          <a
            href={siteConfig.links.microsoft.azure}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Microsoft Azure
          </a>
          . The source code is available on{' '}
          <a
            href={siteConfig.links.gitHub.repo}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
