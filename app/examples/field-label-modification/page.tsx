import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "修改字段标签 - Kinlink开发者",
  description: "学习如何修改表单中的字段标签显示文本",
};

export default function FieldLabelModificationPage() {
  const sampleCode = `/**
 * 示例1: 修改字段标签
 * 功能：修改表单字段的标签显示文本
 */
(function () {
  // 监听表单加载完成事件
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 修改字段标签文本
      kinlink.formApi.setFieldLabelText('文字列__1行__0', '姓（中文）');
      kinlink.formApi.setFieldLabelText('文字列__1行__1', '名（中文）');
      kinlink.formApi.setFieldLabelText('单行文本框_8', '姓（英文）');
      kinlink.formApi.setFieldLabelText('单行文本框_9', '名（英文）');
    } catch (error) {
      console.error('修改字段标签失败:', error);
    }
  });
})();
`;

  return (
    <div className="container py-6 lg:py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/examples">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">修改字段标签</h1>
      </div>

      <div className="my-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">功能概述</h2>
          <p>
            此示例演示如何使用Kinlink
            API修改表单字段的标签文本，使表单更符合业务需求或提供更友好的用户体验。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">关键功能</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>监听表单加载完成事件</li>
            <li>
              通过<code>setFieldLabelText</code>方法修改字段标签文本
            </li>
            <li>错误处理与日志记录</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">代码示例</h2>
          <Tabs defaultValue="javascript">
            <TabsList>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="javascript">
              <CodeBlock code={sampleCode} language="javascript" />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">使用说明</h2>
          <p>
            要使用此功能，只需将代码复制到您的Kinlink自定义JavaScript中。根据您的表单字段，修改代码中的字段代码（如'文字列__1行__0'）和所需的新标签文本。
          </p>
          <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-800">注意事项</h3>
            <p className="text-yellow-800">
              请确保使用正确的字段代码，字段代码可以在表单设计器中找到。如果字段代码不存在，修改操作将不会生效。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API参考</h2>
          <p>此示例使用了以下Kinlink API：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>kinlink.events.on(eventName, callback)</code> -
              注册事件监听器
            </li>
            <li>
              <code>kinlink.FormEvents.FORM_LOADED</code> - 表单加载完成事件
            </li>
            <li>
              <code>kinlink.formApi.setFieldLabelText(fieldCode, text)</code> -
              设置字段标签文本
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
