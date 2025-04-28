import { ExamplesClient } from "./examples-client"

export const metadata = {
  title: "示例 - Kinlink开发者",
  description: "浏览我们的示例集合，了解如何有效使用Kinlink。",
}

export default function ExamplesPage() {
  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">示例</h1>
          <p className="text-xl text-muted-foreground">浏览我们的示例集合，了解如何有效使用Kinlink。</p>
        </div>
      </div>

      <div className="my-8">
        <ExamplesClient />
      </div>

      <div className="mt-12 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">需要自定义示例？</h2>
        <p className="text-muted-foreground">找不到您需要的内容？我们的团队可以帮助您创建根据您特定需求定制的示例。</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="mailto:support@kinlink.io"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            联系支持
          </a>
          <a
            href="/docs"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            请求示例
          </a>
        </div>
      </div>
    </div>
  )
}
