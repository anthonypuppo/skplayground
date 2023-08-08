import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SkillSelector } from '@/components/playground/skill-selector'
import { SubmitButton } from '@/components/playground/submit-button'
import { FunctionSelector } from '@/components/playground/function-selector'
import { Separator } from '@/components/ui/separator'
import { InputText } from '@/components/playground/input-text'
import { InputVariables } from '@/components/playground/input-variables'
import { OpenAIApiKeySelector } from '@/components/playground/openai-api-key-selector'
import { BingApiKeySelector } from '@/components/playground/bing-api-key-selector'
import { OutputCard } from '@/components/playground/output-card'
import { OutputVariablesTable } from '@/components/playground/output-variables-table'

export const metadata: Metadata = {
  title: 'Playground'
}

export default function PlaygroundPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="grid h-96 items-stretch gap-6 md:grid-cols-[1fr_auto_250px]">
        <div className="flex flex-col justify-between space-y-4 md:order-3">
          <div className="grid gap-4">
            <OpenAIApiKeySelector />
            <BingApiKeySelector />
            <SkillSelector />
            <FunctionSelector />
          </div>
          <div className="mt-6 justify-end">
            <SubmitButton />
          </div>
        </div>
        <Separator orientation="vertical" className="md:order-2" />
        <div className="flex flex-col md:order-1">
          <Tabs defaultValue="input" className="flex flex-1 flex-col">
            <div className="flex items-center justify-between">
              <TabsList className="mb-3 w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="input"
                  className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Input
                </TabsTrigger>
                <TabsTrigger
                  value="variables"
                  className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  Variables
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="input" className="flex-1">
              <InputText />
            </TabsContent>
            <TabsContent value="variables" className="flex-1">
              <InputVariables />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Separator className="mb-4 mt-8" />
      <Tabs defaultValue="output" className="flex h-96 flex-col">
        <div className="flex items-center justify-between">
          <TabsList className="mb-3 w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="output"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Output
            </TabsTrigger>
            <TabsTrigger
              value="variables"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Variables
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="output" className="flex-1">
          <OutputCard />
        </TabsContent>
        <TabsContent value="variables" className="flex-1">
          <OutputVariablesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
