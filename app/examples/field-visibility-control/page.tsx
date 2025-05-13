import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "字段显示隐藏控制 - Kinlink开发者",
  description: "学习如何控制表单字段的显示和隐藏状态",
};

export default function FieldVisibilityControlPage() {
  const sampleCode = `/**
 * 示例3: 字段显示/隐藏控制
 * 功能：控制表单字段的显示和隐藏状态
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 完全隐藏字段（值不会被提交）
      kinlink.formApi.hideField('多选_0');

      // 仅视觉上隐藏字段（值仍会被提交）
      kinlink.formApi.visuallyHideField('选择组织');

      // 通过按钮控制显示/隐藏同行者表格
      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.textContent = '显示/隐藏同行者信息';
      toggleButton.style.margin = '10px 0';
      toggleButton.style.padding = '5px 10px';

      // 获取表单元素并添加按钮
      const formElement = document.querySelector('.ant-form') || document.body;
      formElement.insertBefore(toggleButton, formElement.firstChild);

      // 初始隐藏同行者表格
      kinlink.formApi.hideField('表格_13');
      let isVisible = false;

      // 设置点击事件切换显示状态
      toggleButton.addEventListener('click', () => {
        if (isVisible) {
          kinlink.formApi.hideField('表格_13');
          toggleButton.textContent = '显示同行者信息';
        } else {
          kinlink.formApi.showField('表格_13');
          toggleButton.textContent = '隐藏同行者信息';
        }
        isVisible = !isVisible;
      });
    } catch (error) {
      console.error('控制字段显示/隐藏失败:', error);
    }
  });
})();
`;

  const additionalSampleCode = `/**
 * 获取字段元素，并使用条件隐藏
 * 视觉隐藏为被隐藏的内容最终还是会被提交，而真实隐藏为被隐藏的内容不会被提交
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // ========== 携帯電話字段后面插入按钮，控制会社名隐藏/显示 ==========
      const targetFieldCode = '文字列__1行__2'; // 携帯電話
      const controlFieldCode = '单行文本框_10'; // 会社名

      const input = document.querySelector(\`[id$='\${targetFieldCode}']\`);
      if (input) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = '隐藏/显示会社名';
        btn.style.marginLeft = '8px';
        input.parentNode.insertBefore(btn, input.nextSibling);
        let isHidden = false;
        btn.onclick = function () {
          if (isHidden) {
            kinlink.formApi.showField(controlFieldCode);
            btn.textContent = '隐藏会社名';
          } else {
            kinlink.formApi.hideField(controlFieldCode);
            btn.textContent = '显示会社名';
          }
          isHidden = !isHidden;
        };
      }

      // ========== Eメールアドレス字段后面插入按钮，视觉隐藏/显示身分証番号 ==========
      const emailFieldCode = '文字列__1行__3'; // Eメールアドレス
      const idFieldCode = '单行文本框_11'; // パスポート番号／身分証番号
      const emailInput = document.querySelector(\`[id$='\${emailFieldCode}']\`);
      if (emailInput) {
        const btn2 = document.createElement('button');
        btn2.type = 'button';
        btn2.textContent = '视觉隐藏/显示身分証番号';
        btn2.style.marginLeft = '8px';
        emailInput.parentNode.insertBefore(btn2, emailInput.nextSibling);
        let isVisuallyHidden = false;
        btn2.onclick = function () {
          if (isVisuallyHidden) {
            kinlink.formApi.showField(idFieldCode);
            btn2.textContent = '视觉隐藏身分証番号';
          } else {
            kinlink.formApi.visuallyHideField(idFieldCode);
            btn2.textContent = '显示身分証番号';
          }
          isVisuallyHidden = !isVisuallyHidden;
        };
      }
    } catch (error) {
      console.error('插入按钮并控制字段显示失败:', error);
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
        <h1 className="text-3xl font-bold tracking-tight">字段显示隐藏控制</h1>
      </div>

      <div className="my-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">功能概述</h2>
          <p>
            此示例演示如何使用Kinlink
            API控制表单字段的显示和隐藏状态，包括完全隐藏和视觉隐藏两种方式，以及通过用户交互动态切换字段的可见性。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">关键概念</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>完全隐藏 (hideField)</strong>
              ：字段完全不可见，其值也不会被提交
            </li>
            <li>
              <strong>视觉隐藏 (visuallyHideField)</strong>
              ：字段不可见，但其值仍会被提交
            </li>
            <li>
              <strong>显示字段 (showField)</strong>：恢复字段的可见性
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">基本使用示例</h2>
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
          <h2 className="text-2xl font-bold tracking-tight">
            高级示例：获取字段元素并添加控制按钮
          </h2>
          <p>
            以下示例展示如何获取字段元素，并在其旁边添加控制按钮以切换其他字段的显示状态。
          </p>
          <Tabs defaultValue="javascript">
            <TabsList>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="javascript">
              <CodeBlock code={additionalSampleCode} language="javascript" />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">使用说明</h2>
          <p>
            将代码复制到您的Kinlink自定义JavaScript中，根据您的表单字段和需求修改字段代码。您可以根据业务逻辑控制字段的显示和隐藏。
          </p>
          <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-800">注意事项</h3>
            <p className="text-yellow-800">
              选择合适的隐藏方式很重要。如果需要保留字段值用于后续处理，请使用视觉隐藏；如果希望隐藏的字段不参与提交，则使用完全隐藏。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API参考</h2>
          <p>此示例使用了以下Kinlink API：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>kinlink.formApi.hideField(fieldCode)</code> -
              完全隐藏字段（值不提交）
            </li>
            <li>
              <code>kinlink.formApi.visuallyHideField(fieldCode)</code> -
              视觉隐藏字段（值仍提交）
            </li>
            <li>
              <code>kinlink.formApi.showField(fieldCode)</code> - 显示字段
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">常见应用场景</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>基于用户选择显示/隐藏相关字段</li>
            <li>简化复杂表单，只在需要时显示高级选项</li>
            <li>根据用户权限控制敏感字段的可见性</li>
            <li>创建动态性、交互性更强的表单</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
