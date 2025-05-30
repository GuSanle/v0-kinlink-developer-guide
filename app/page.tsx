import Link from "next/link";
import { ArrowRight, Code, ExternalLink, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                kinlink开发者
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                使用kinlink为您的Kintone数据构建强大的外部集成
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/docs">
                <Button>
                  开始使用
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs/api-reference">
                <Button variant="outline">API参考</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                什么是kinlink?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                kinlink是一个构建在Kintone之上的强大集成系统，允许您与外部系统共享和集成您的Kintone数据。
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Share2 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">外部共享</h3>
              <p className="text-center text-muted-foreground">
                与外部用户共享您的Kintone数据，无需授予他们访问您的Kintone实例的权限。
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Code className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">可定制表单</h3>
              <p className="text-center text-muted-foreground">
                使用kinlink JS API创建具有高级验证和动态行为的自定义表单。
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Zap className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">无缝集成</h3>
              <p className="text-center text-muted-foreground">
                使用kinlink强大的API将您的Kintone数据与其他系统和服务集成。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                准备开始了吗？
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                浏览我们的文档，了解如何使用kinlink为您的Kintone数据构建强大的集成。
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/docs">
                <Button className="gap-1">
                  阅读文档
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline">查看示例</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
