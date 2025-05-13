import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "字段样式自定义 - Kinlink开发者",
  description: "学习如何修改表单字段标签和组件的样式",
};

export default function FieldStyleCustomizationPage() {
  const sampleCode = `/**
 * 示例2: 字段样式自定义
 * 功能：修改表单字段标签和组件的样式
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 设置字段标签样式
      kinlink.formApi.setFieldLabelStyle('单行文本框_0', {
        color: '#e74c3c',
        fontWeight: 'bold',
        fontSize: '16px',
      });

      // 设置输入组件样式
      kinlink.formApi.setFieldComponentStyle('单行文本框_0', {
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        padding: '8px',
      });

      // 批量设置必填字段标签样式
      const requiredFields = [
        '文字列__1行__0',
        '文字列__1行__1',
        '单行文本框_8',
        '单行文本框_9',
      ];
      requiredFields.forEach((field) => {
        kinlink.formApi.setFieldLabelStyle(field, {
          color: '#e74c3c',
          position: 'relative',
        });
      });

      // 批量设置日期字段组件样式
      kinlink.formApi.setFieldsComponentStyles({
        日期_1: { width: '180px' },
        日期_2: { width: '180px' },
      });
    } catch (error) {
      console.error('设置字段样式失败:', error);
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
        <h1 className="text-3xl font-bold tracking-tight">字段样式自定义</h1>
      </div>

      <div className="my-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">功能概述</h2>
          <p>
            此示例演示如何使用Kinlink
            API自定义表单字段的样式，包括修改字段标签和输入组件的样式属性，使表单更符合您的品牌风格或提高用户体验。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">关键功能</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>设置单个字段标签样式</li>
            <li>设置单个字段输入组件样式</li>
            <li>批量设置多个字段标签样式</li>
            <li>批量设置多个字段组件样式</li>
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
            将代码复制到您的Kinlink自定义JavaScript中，根据您的表单字段和需求修改样式。您可以使用标准的CSS属性来自定义样式。
          </p>
          <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-800">注意事项</h3>
            <p className="text-yellow-800">
              样式修改会覆盖系统默认样式。如果遇到样式冲突，可能需要增加CSS选择器的特异性或使用!important规则。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API参考</h2>
          <p>此示例使用了以下Kinlink API：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>
                kinlink.formApi.setFieldLabelStyle(fieldCode, styleObject)
              </code>{" "}
              - 设置字段标签样式
            </li>
            <li>
              <code>
                kinlink.formApi.setFieldComponentStyle(fieldCode, styleObject)
              </code>{" "}
              - 设置字段组件样式
            </li>
            <li>
              <code>
                kinlink.formApi.setFieldsComponentStyles(stylesObject)
              </code>{" "}
              - 批量设置多个字段组件样式
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">常见应用场景</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>突出显示必填字段或重要字段</li>
            <li>根据字段内容或状态改变样式（如错误状态）</li>
            <li>统一表单风格以符合企业VI</li>
            <li>优化特定字段的用户交互体验</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
