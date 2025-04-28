import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404 - 页面未找到</h1>
      <p className="text-muted-foreground">您查找的页面不存在或已被移动。</p>
      <Link href="/">
        <Button>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回首页
        </Button>
      </Link>
    </div>
  )
}
