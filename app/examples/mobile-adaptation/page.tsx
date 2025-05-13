import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "移动端适配 - Kinlink开发者",
  description: "学习如何根据设备类型提供不同的UI和交互体验",
};

export default function MobileAdaptationPage() {
  const sampleCode = `/**
 * 示例8: 移动端适配
 * 功能：根据设备类型提供不同的UI和交互体验
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 检测是否是移动端设备
      const isMobile = kinlink.layoutApi.checkIsMobileDevice();
      console.log('是否移动端:', isMobile);

      if (isMobile) {
        // === 移动端优化 ===
        applyMobileOptimization();
      } else {
        // === PC端优化 ===
        applyDesktopOptimization();
      }

      // 添加状态指示器
      addDeviceIndicator(isMobile);
    } catch (error) {
      console.error('移动端适配失败:', error);
    }
  });

  // 移动端优化函数
  function applyMobileOptimization() {
    const form = kinlink.formApi;

    // 隐藏复杂的同行者表格，简化移动端体验
    form.hideField('表格_13');

    // 增大触控区域，提高易用性
    const fieldsToEnlarge = [
      '文字列__1行__0',
      '文字列__1行__1',
      '单行文本框_8',
      '单行文本框_9',
      '文字列__1行__2',
      '文字列__1行__3',
    ];

    fieldsToEnlarge.forEach((field) => {
      form.setFieldComponentStyle(field, {
        fontSize: '16px',
        padding: '12px 8px',
        borderRadius: '8px',
        marginBottom: '16px',
      });
    });

    // 避免使用多列布局
    document.querySelectorAll('.ant-row').forEach((row) => {
      row.style.flexDirection = 'column';
    });

    // 修改提交按钮样式
    const submitButtonStyles = {
      width: '100%',
      height: '44px',
      fontSize: '16px',
      borderRadius: '8px',
    };

    // 假设有一个辅助函数来设置按钮样式（实际实现可能不同）
    const submitButton = document.querySelector(
      '#kinlink-mobile-submit-button',
    );
    if (submitButton) {
      Object.assign(submitButton.style, submitButtonStyles);
    }

    // 显示定制的移动端消息
    form.showInfo('正在使用移动端视图');
  }

  // PC端优化函数
  function applyDesktopOptimization() {
    // 使用更高级的表单布局
    // 显示所有高级功能

    // 显示定制的桌面端消息
    kinlink.formApi.showInfo('正在使用桌面端视图');
  }

  // 添加设备类型指示器
  function addDeviceIndicator(isMobile) {
    const indicator = document.createElement('div');

    // 设置样式
    Object.assign(indicator.style, {
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '5px 10px',
      backgroundColor: isMobile ? '#3498db' : '#27ae60',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: '1000',
    });

    indicator.textContent = isMobile ? '移动端模式' : '桌面端模式';
    document.body.appendChild(indicator);
  }
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
        <h1 className="text-3xl font-bold tracking-tight">移动端适配</h1>
      </div>

      <div className="my-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">功能概述</h2>
          <p>
            此示例演示如何使用Kinlink
            API根据用户的设备类型（移动端或桌面端）优化表单体验。移动设备通常需要更大的触控区域、简化的界面和更少的输入字段，而桌面设备可以展示更丰富的功能和布局。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">关键功能</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>检测当前设备类型</li>
            <li>为移动设备优化字段样式和大小</li>
            <li>在移动端隐藏复杂组件</li>
            <li>调整布局适应不同屏幕尺寸</li>
            <li>添加设备类型指示器</li>
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
          <h2 className="text-2xl font-bold tracking-tight">
            移动端优化最佳实践
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>增大触控区域</strong>
              ：移动设备上的触控目标应至少为44x44像素
            </li>
            <li>
              <strong>简化表单</strong>：隐藏或简化复杂字段，减少输入数量
            </li>
            <li>
              <strong>单列布局</strong>：避免使用多列布局，确保内容不会溢出屏幕
            </li>
            <li>
              <strong>优化按钮</strong>：增大按钮尺寸，提供清晰的操作反馈
            </li>
            <li>
              <strong>减少输入</strong>：尽可能使用选择控件代替手动输入
            </li>
            <li>
              <strong>考虑网络条件</strong>
              ：移动用户可能处于弱网环境，优化数据加载
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">使用说明</h2>
          <p>
            将代码复制到您的Kinlink自定义JavaScript中，根据您的表单字段和业务需求修改优化逻辑。您可以进一步定制以满足特定的移动设备需求。
          </p>
          <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200">
            <h3 className="font-semibold text-yellow-800">注意事项</h3>
            <p className="text-yellow-800">
              使用<code>document.querySelectorAll</code>
              等DOM操作方法时要小心，确保目标元素存在且唯一。另外，过度依赖JavaScript修改样式可能导致性能问题，应当配合CSS媒体查询使用。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API参考</h2>
          <p>此示例使用了以下Kinlink API：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>kinlink.layoutApi.checkIsMobileDevice()</code> -
              检查是否为移动设备
            </li>
            <li>
              <code>kinlink.formApi.hideField(fieldCode)</code> - 隐藏字段
            </li>
            <li>
              <code>
                kinlink.formApi.setFieldComponentStyle(fieldCode, styleObject)
              </code>{" "}
              - 设置字段组件样式
            </li>
            <li>
              <code>kinlink.formApi.showInfo(message)</code> - 显示信息消息
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
