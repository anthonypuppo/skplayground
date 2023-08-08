import { env } from '@/env/server'
import { siteConfig } from '@/lib/site'
import { Octokit } from '@octokit/rest'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { IconGitHub } from '@/components/ui/icons'

async function getGitHubStars() {
  try {
    const octokit = new Octokit({
      auth: env.GITHUB_ACCESS_TOKEN
    })
    const repo = await octokit.rest.repos.get({
      owner: siteConfig.gitHubOwner,
      repo: siteConfig.gitHubRepo
    })
    const stars = repo.data.stargazers_count

    return stars
  } catch (error) {
    return 0
  }
}

export async function OpenSourceSection() {
  const stars = await getGitHubStars()

  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          <Balancer>Participate in the Open-Source Journey</Balancer>
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          <Balancer>
            SKPlayground isn&apos;t just about discovery, it&apos;s also about
            contribution! Partake in the fascinating world of open-source
            development, provide your valuable feedback and let&apos;s advance
            AI technology together.
          </Balancer>
        </p>
        <Link
          href={siteConfig.links.gitHub.repo}
          target="_blank"
          rel="noreferrer"
          className="flex"
        >
          <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
            <IconGitHub className="h-5 w-5 text-foreground" />
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
            <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
              {stars} stars on GitHub
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
