import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Kinlink介绍</h1>
        <p className="mt-2 text-lg text-muted-foreground">了解如何使用Kinlink与外部系统共享和集成您的Kintone数据。</p>
      </div>

      <div className="docs-content">
        <p>
          Kinlink是一个构建在Kintone之上的强大集成系统，允许您与外部系统共享和集成您的Kintone数据。使用Kinlink，您可以：
        </p>

        <ul>
          <li>与外部用户共享您的Kintone数据，无需授予他们访问您的Kintone实例的权限</li>
          <li>创建具有高级验证和动态行为的自定义表单</li>
          <li>将您的Kintone数据与其他系统和服务集成</li>
        </ul>

        <h2>什么是Kinlink?</h2>

        <p>
          Kinlink是Kintone的外部集成系统，提供了一种与外部用户共享Kintone数据的方式。它允许您创建可由没有访问您的Kintone实例权限的用户访问的自定义表单和工作流。
        </p>

        <h2>主要特性</h2>

        <h3>外部数据共享</h3>
        <p>
          Kinlink允许您与外部用户共享您的Kintone数据，无需授予他们访问您的Kintone实例的权限。这对于需要从外部用户收集数据或与合作伙伴或客户共享特定数据的场景非常有用。
        </p>

        <h3>可定制表单</h3>
        <p>
          Kinlink提供了一个强大的JavaScript
          API，允许您自定义表单的行为。您可以创建响应用户输入、验证数据并与外部系统集成的动态表单。
        </p>

        <h3>无缝集成</h3>
        <p>
          Kinlink与Kintone无缝集成，允许您利用现有的Kintone数据和工作流。您可以使用Kinlink扩展Kintone应用程序的功能，创建与数据交互的新方式。
        </p>

        <h2>入门指南</h2>

        <p>要开始使用Kinlink，您需要：</p>

        <ol>
          <li>设置Kinlink账户并将其连接到您的Kintone实例</li>
          <li>创建映射到您的Kintone应用程序的Kinlink表单</li>
          <li>使用Kinlink JavaScript API自定义您的表单</li>
          <li>与外部用户共享您的表单</li>
        </ol>

        <p>
          查看我们的{" "}
          <Link href="/docs/installation" className="font-medium underline underline-offset-4">
            安装指南
          </Link>{" "}
          了解如何为您的Kintone实例设置Kinlink。
        </p>

        <div className="mt-6">
          <Link href="/docs/api-reference">
            <Button>
              浏览API参考
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
