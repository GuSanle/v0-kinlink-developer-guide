import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "字段值读取与设置 - Kinlink开发者",
  description: "学习如何读取和设置表单字段的值",
};

export default function FieldValueOperationsPage() {
  const sampleCode = `/**
 * 示例: 字段值读取与设置
 * 功能：演示如何读取和设置不同类型表单字段的值
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 读取字段值示例
      // 确保将 '单行文本框_0', '数值_0', '用户选择_0' 替换为您的实际字段代码
      const textValue = kinlink.formApi.getFieldValue('单行文本框_0'); 
      console.log('单行文本框_0 值:', textValue);

      const numberValue = kinlink.formApi.getFieldValue('数值_0');
      console.log('数值_0 值:', numberValue);

      // 用户选择字段返回一个用户对象数组
      const userSelectValue = kinlink.formApi.getFieldValue('用户选择_0'); 
      console.log('用户选择_0 值:', userSelectValue);

      // 设置字段值示例
      // 确保将 '单行文本框_1', '数值_1', '多行文本框_0' 替换为您的实际字段代码
      kinlink.formApi.setFieldValue('单行文本框_1', 'Kinlink API 设定值');
      kinlink.formApi.setFieldValue('数值_1', 12345);
      
      // 注意：对于用户选择、组织选择、附件等复杂字段，
      // setFieldValue 需要特定格式的对象或数组。
      // 例如，设置用户选择字段:
      // kinlink.formApi.setFieldValue('用户选择_1', [{ code: 'user_login_name', name: '显示名称' }]);

      kinlink.formApi.showSuccess('字段值读取和设置操作已执行，请查看浏览器控制台的输出。');

      // 创建交互式控件以测试功能
      const controlPanel = document.createElement('div');
      controlPanel.style.margin = '10px 0';
      controlPanel.style.padding = '10px';
      controlPanel.style.backgroundColor = '#f8f9fa';
      controlPanel.style.border = '1px solid #dee2e6';
      controlPanel.style.borderRadius = '4px';

      const getValueBtn = document.createElement('button');
      getValueBtn.textContent = '读取"备注"字段值';
      getValueBtn.type = 'button';
      getValueBtn.style.cssText = 'margin-right: 10px; padding: 5px 10px; border-radius: 4px; border: 1px solid #007bff; background-color: #007bff; color: white; cursor: pointer;';
      getValueBtn.addEventListener('click', () => {
        // 将 '多行文本框_0' 替换为您的备注字段代码
        const notesValue = kinlink.formApi.getFieldValue('多行文本框_0'); 
        kinlink.formApi.showInfo('备注字段当前值: ' + (notesValue || '(空)'));
      });

      const setValueBtn = document.createElement('button');
      setValueBtn.textContent = '设置"备注"字段为当前时间';
      setValueBtn.type = 'button';
      setValueBtn.style.cssText = 'padding: 5px 10px; border-radius: 4px; border: 1px solid #28a745; background-color: #28a745; color: white; cursor: pointer;';
      setValueBtn.addEventListener('click', () => {
        // 将 '多行文本框_0' 替换为您的备注字段代码
        kinlink.formApi.setFieldValue('多行文本框_0', '设定于: ' + new Date().toLocaleString());
        kinlink.formApi.showSuccess('"备注"字段值已更新。');
      });
      
      controlPanel.appendChild(getValueBtn);
      controlPanel.appendChild(setValueBtn);

      // 将控制面板添加到表单的顶部
      const formElement = document.querySelector('.ant-form') || document.body; // ant-form 是Kintone表单的常见类名
      formElement.insertBefore(controlPanel, formElement.firstChild);

    } catch (error) {
      console.error('字段值读取/设置操作失败:', error);
      kinlink.formApi.showError('字段值操作失败，详情请查看控制台。');
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
        <h1 className="text-3xl font-bold tracking-tight">字段值读取与设置</h1>
      </div>

      <div className="my-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">功能概述</h2>
          <p>
            此示例演示如何使用Kinlink
            API来读取和设置表单中各种类型字段的值。这是表单自动化、数据联动和动态交互的核心功能，允许您根据业务逻辑灵活地操控表单数据。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">关键功能</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              读取文本框、数字、日期、下拉菜单、单选按钮、复选框等多种类型字段的值。
            </li>
            <li>
              设置不同类型字段的值，包括简单的文本值和复杂的对象值（如用户选择、组织选择字段）。
            </li>
            <li>实时获取表单数据，用于即时计算或条件判断。</li>
            <li>动态更新表单内容，例如根据用户输入自动填充其他相关字段。</li>
            <li>支持在表单加载完成或特定字段值改变时触发读取/设置操作。</li>
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
            将上述JavaScript代码复制到您的Kinlink自定义JavaScript配置中。关键在于根据您Kintone应用中的实际情况，正确替换示例代码中的字段代码
            (例如 <code>'单行文本框_0'</code>, <code>'数值_0'</code>,{" "}
            <code>'多行文本框_0'</code> 等)。
          </p>
          <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700/50">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
              注意事项
            </h3>
            <ul className="list-disc pl-5 text-yellow-700 dark:text-yellow-300">
              <li>
                <strong>字段代码准确性：</strong>{" "}
                确保您使用的字段代码与Kintone应用中的字段代码完全一致，否则API无法找到对应字段。
              </li>
              <li>
                <strong>数据类型匹配：</strong>{" "}
                设置字段值时，提供的值类型应与字段期望的类型相匹配。例如，数值字段应设置为数字，日期字段应设置为日期字符串或Date对象（具体查阅API文档）。
              </li>
              <li>
                <strong>复杂字段格式：</strong>{" "}
                对于用户选择、组织选择、附件、关联记录等复杂字段，
                <code>setFieldValue</code>{" "}
                通常需要特定格式的对象数组。请仔细查阅Kinlink
                API文档中关于这些字段类型的具体数据结构要求。
              </li>
              <li>
                <strong>异步操作：</strong>{" "}
                如果字段值的读取或设置依赖于异步操作（例如，从外部API获取数据后填充字段），请确保正确处理异步逻辑。
              </li>
              <li>
                <strong>错误处理：</strong> 示例代码中包含了基本的{" "}
                <code>try...catch</code>{" "}
                错误处理。在实际应用中，建议根据具体需求进行更完善的错误捕获和用户提示。
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API参考</h2>
          <p>此示例主要使用了以下Kinlink API：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>kinlink.formApi.getFieldValue(fieldCode: string): any</code>{" "}
              - 获取指定字段代码的字段值。返回值的类型取决于字段类型。
            </li>
            <li>
              <code>
                kinlink.formApi.setFieldValue(fieldCode: string, value: any):
                void
              </code>{" "}
              - 设置指定字段代码的字段值。<code>value</code>
              参数的格式需符合字段类型要求。
            </li>
            <li>
              <code>
                kinlink.events.on(eventName: string, callback: Function): void
              </code>{" "}
              - 注册事件监听器，如此示例中监听{" "}
              <code>kinlink.FormEvents.FORM_LOADED</code> 事件。
            </li>
            <li>
              <code>kinlink.formApi.showSuccess(message: string): void</code> -
              在表单顶部显示成功提示消息。
            </li>
            <li>
              <code>kinlink.formApi.showInfo(message: string): void</code> -
              在表单顶部显示普通信息提示消息。
            </li>
            <li>
              <code>kinlink.formApi.showError(message: string): void</code> -
              在表单顶部显示错误提示消息。
            </li>
          </ul>
          <p>更多详细信息和高级用法，请参阅完整的Kinlink API文档。</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">常见应用场景</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>计算字段：</strong>{" "}
              根据一个或多个字段的值计算出结果，并自动填充到另一个字段中（例如，单价
              x 数量 = 总价）。
            </li>
            <li>
              <strong>数据预填：</strong>{" "}
              表单加载时，根据当前登录用户信息（如姓名、部门）自动填充相应字段。
            </li>
            <li>
              <strong>字段联动：</strong>{" "}
              当一个字段的值发生改变时，动态更新其他关联字段的值或选项（例如，选择产品类别后，动态加载该类别下的产品列表）。
            </li>
            <li>
              <strong>从外部数据源填充：</strong>{" "}
              通过API调用从外部系统获取数据（如客户信息、产品详情），并将其填充到表单字段中。
            </li>
            <li>
              <strong>条件赋值：</strong>{" "}
              根据特定条件判断，为字段赋予不同的默认值或推荐值。
            </li>
            <li>
              <strong>重置或清空字段：</strong>{" "}
              提供按钮或逻辑，允许用户一键清空某些字段的内容或将其恢复到初始状态。
            </li>
            <li>
              <strong>数据格式化：</strong>{" "}
              读取用户输入的原始数据，进行格式化处理（如日期格式、数字精度）后再设置回字段。
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <Link href="/examples">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回示例列表
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
