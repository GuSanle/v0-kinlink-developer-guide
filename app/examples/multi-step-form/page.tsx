import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "多步骤表单 - Kinlink开发者",
  description: "学习如何创建具有进度跟踪和每步验证的多步骤表单",
};

export default function MultiStepFormPage() {
  return (
    <div className="container py-6 lg:py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/examples">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">多步骤表单</h1>
      </div>

      <div className="my-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">功能概述</h2>
          <p>
            此示例演示如何使用Kinlink
            API创建多步骤表单，包括步骤导航、进度指示器、分步验证和提交前摘要页面。多步骤表单可以将复杂的表单分解为更易于管理的部分，提高用户体验。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">关键功能</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>步骤配置和字段分组</li>
            <li>步骤导航和进度指示器</li>
            <li>每步字段验证</li>
            <li>提交前摘要页面</li>
            <li>自定义UI和操作按钮</li>
            <li>移动端适配</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">示例代码</h2>
          <p>
            完整代码请参考{" "}
            <a
              href="/samplesCodes/13-多步骤表单提交处理.js"
              className="text-blue-600 hover:underline"
            >
              samplesCodes/13-多步骤表单提交处理.js
            </a>{" "}
            文件。
          </p>
          <p>以下是核心功能的摘要：</p>
          <Tabs defaultValue="config">
            <TabsList>
              <TabsTrigger value="config">步骤配置</TabsTrigger>
              <TabsTrigger value="navigation">步骤导航</TabsTrigger>
              <TabsTrigger value="validation">表单验证</TabsTrigger>
              <TabsTrigger value="summary">摘要页面</TabsTrigger>
            </TabsList>
            <TabsContent value="config">
              <CodeBlock
                code={`// 步骤配置
const steps = [
  {
    title: '基本信息',
    icon: '📋',
    fields: [
      '文字列__1行__0',
      '文字列__1行__1',
      '单行文本框_8',
      '单行文本框_9',
      '单选框_0',
      '日期_1',
      '多选_0',
      '表格',
      '表格_13',
    ],
  },
  {
    title: '联系方式',
    icon: '📞',
    fields: ['文字列__1行__2', '文字列__1行__3', '单行文本框_10', '下拉菜单'],
  },
  {
    title: '证件信息',
    icon: '📝',
    fields: ['单行文本框_11', '日期_2', '附件_0'],
  },
  {
    title: '确认提交',
    icon: '✅',
    fields: [], // 最后一步显示所有信息摘要，不指定具体字段
  },
];

// 当前步骤
let currentStep = 0;`}
                language="javascript"
              />
            </TabsContent>
            <TabsContent value="navigation">
              <CodeBlock
                code={`// 显示特定步骤
function showStep(stepIndex) {
  const form = kinlink.formApi;

  // 隐藏所有字段
  steps.forEach((step) => {
    step.fields.forEach((field) => {
      form.visuallyHideField(field);
    });
  });

  // 如果是最后一步，显示一览页面
  if (stepIndex === steps.length - 1) {
    showSummaryPage();
  } else {
    // 显示当前步骤的字段
    steps[stepIndex].fields.forEach((field) => {
      form.showField(field);
    });
    // 隐藏一览页面（如果存在）
    hideSummaryPage();
  }

  // 更新步骤导航
  updateStepNavigation(stepIndex);

  // 更新按钮状态
  updateButtons(stepIndex);

  // 更新当前步骤
  currentStep = stepIndex;
}

// 导航到指定步骤
function navigateToStep(stepIndex) {
  if (stepIndex >= 0 && stepIndex < steps.length) {
    showStep(stepIndex);

    // 滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}`}
                language="javascript"
              />
            </TabsContent>
            <TabsContent value="validation">
              <CodeBlock
                code={`// 验证当前步骤
function validateCurrentStep() {
  const form = kinlink.formApi;
  const currentStepFields = steps[currentStep].fields;
  const values = form.getAllValues();
  let isValid = true;

  // 简单验证示例 - 实际项目中应根据业务需求完善
  currentStepFields.forEach((field) => {
    const fieldConfig = kinlink.formFields[field];

    // 验证必填字段
    if (fieldConfig && fieldConfig.required && !values[field]) {
      form.setFieldError(field, \`\${fieldConfig.label}は必須項目です\`);
      isValid = false;
    }
  });

  if (!isValid) {
    kinlink.formApi.showError('必須項目をご入力ください', 3);
  }

  return isValid;
}`}
                language="javascript"
              />
            </TabsContent>
            <TabsContent value="summary">
              <CodeBlock
                code={`// 显示一览页面（最后一步）
function showSummaryPage() {
  // 先移除之前的一览页面
  let summaryDiv = document.getElementById('step-summary-view');
  if (summaryDiv) summaryDiv.remove();

  summaryDiv = document.createElement('div');
  summaryDiv.id = 'step-summary-view';
  summaryDiv.style.margin = '32px 0 0 0';
  summaryDiv.style.background = '#fafbfc';
  summaryDiv.style.borderRadius = '8px';
  summaryDiv.style.boxShadow = '0 1px 8px 0 rgba(0,0,0,0.03)';
  summaryDiv.style.padding = '32px 24px';

  // 标题
  const title = document.createElement('h3');
  title.textContent = '请确认以下信息';
  title.style.margin = '0 0 24px 0';
  title.style.color = '#3f51b5';
  summaryDiv.appendChild(title);

  // 分组显示
  steps.slice(0, -1).forEach((step) => {
    const groupTitle = document.createElement('div');
    groupTitle.textContent = step.title;
    groupTitle.style.fontWeight = 'bold';
    groupTitle.style.margin = '18px 0 10px 0';
    groupTitle.style.padding = '5px 0';
    groupTitle.style.borderBottom = '1px solid #f0f0f0';
    summaryDiv.appendChild(groupTitle);

    step.fields.forEach((field) => {
      const fieldConfig = kinlink.formFields[field];
      if (!fieldConfig) return;
      const fieldValue = kinlink.formApi.getFieldValue(field);

      // 创建字段行
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.marginBottom = '8px';
      row.style.padding = '10px 0';
      row.style.borderRadius = '4px';
      row.style.background = '#fff';

      // 标签
      const label = document.createElement('div');
      label.style.fontWeight = 'bold';
      label.style.width = '40%';
      label.textContent = fieldConfig.label || field;
      row.appendChild(label);

      // 值
      const value = document.createElement('div');
      value.style.width = '60%';
      value.textContent = fieldValue || '未填写';
      row.appendChild(value);

      summaryDiv.appendChild(row);
    });
  });

  // 提示
  const tip = document.createElement('div');
  tip.style.margin = '24px 0 0 0';
  tip.style.padding = '12px';
  tip.style.background = 'rgba(76, 175, 80, 0.08)';
  tip.style.borderRadius = '6px';
  tip.style.color = '#388e3c';
  tip.textContent = '请仔细核对以上信息，确认无误后点击"提出"按钮。';
  summaryDiv.appendChild(tip);

  // 插入到表单前
  const formElement = document.querySelector('.ant-form');
  if (formElement) {
    formElement.parentNode.insertBefore(summaryDiv, formElement);
  }
}`}
                language="javascript"
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">实现方式</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>定义步骤配置，包括每个步骤的标题、图标和包含的字段</li>
            <li>创建自定义UI元素，包括步骤导航、进度指示器和操作按钮</li>
            <li>实现步骤切换逻辑，隐藏/显示相应步骤的字段</li>
            <li>实现每步验证逻辑，确保必填字段已填写</li>
            <li>创建最后一步的摘要页面，展示所有已填写的信息</li>
            <li>处理表单提交逻辑，包括表单验证和成功提交后的界面</li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">使用说明</h2>
          <p>
            将代码复制到您的Kinlink自定义JavaScript中，并根据您的表单字段结构进行以下修改：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>调整steps数组中的字段代码以匹配您的表单字段</li>
            <li>根据您的业务需求定制步骤标题和图标</li>
            <li>根据需要调整UI样式和验证逻辑</li>
            <li>如有需要，添加特定于业务的表单处理逻辑</li>
          </ul>
        </div>

        <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200">
          <h3 className="font-semibold text-yellow-800">注意事项</h3>
          <p className="text-yellow-800">
            多步骤表单可能会增加表单完成的复杂性。确保每个步骤的指示清晰，并提供返回前一步的选项。对于移动用户，特别注意步骤导航的可用性和可见性。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">常见应用场景</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>复杂注册流程</li>
            <li>分类型或主题的调查问卷</li>
            <li>订单和预订表单</li>
            <li>分步申请流程</li>
            <li>引导式安装或配置向导</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
