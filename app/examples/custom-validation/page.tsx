import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import {
  HighlightTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../highlight-tabs";
import { Metadata } from "next";
import { Tabs } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "自定义验证规则 - Kinlink开发者",
  description: "学习如何为表单字段添加自定义验证规则",
};

export default function CustomValidationPage() {
  const sampleCode = `/**
 * 示例6: 自定义验证规则
 * 功能：为表单字段添加自定义验证规则
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      const form = kinlink.formApi;

      // 为邮箱字段添加格式验证
      form.addFieldValidator('文字列__1行__3', (value) => {
        if (!value) return; // 非必填，空值不验证

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          return '请输入有效的邮箱地址';
        }
        return undefined; // 验证通过
      });

      // 为手机号字段添加格式验证
      form.addFieldValidator('文字列__1行__2', (value) => {
        if (!value) return; // 非必填，空值不验证

        // 简单的手机号验证规则（不限制国家/地区前缀）
        const phoneRegex = /^\\+?[0-9]{7,15}$/;
        if (!phoneRegex.test(value)) {
          return '请输入有效的手机号码（7-15位数字，可以包含+号前缀）';
        }
        return undefined; // 验证通过
      });

      // 为护照有效期添加未过期验证
      form.addFieldValidator('日期_2', (value) => {
        if (!value) return; // 非必填，空值不验证

        const today = new Date();
        const expiryDate = new Date(value);

        // 确保日期有效
        if (isNaN(expiryDate.getTime())) {
          return '请输入有效的日期';
        }

        // 检查是否已过期
        if (expiryDate < today) {
          return '护照/证件已过期，请提供有效期内的证件';
        }

        // 检查是否即将过期（小于6个月）
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(today.getMonth() + 6);

        if (expiryDate < sixMonthsLater) {
          // 这是警告而非错误，需手动显示
          form.showWarning(
            '您的护照/证件将在6个月内过期，可能影响某些国家/地区的入境要求',
          );
        }

        return undefined; // 验证通过
      });

      // 添加手动触发验证的按钮
      const validateButton = document.createElement('button');
      validateButton.textContent = '验证表单';
      validateButton.style.margin = '10px 0';
      validateButton.style.padding = '5px 10px';

      validateButton.addEventListener('click', () => {
        const result = form.validateForm();
        console.log('验证结果:', result);

        if (result.isValid) {
          form.showSuccess('表单验证通过');
        } else {
          form.showError('表单验证失败，请检查输入');
        }
      });

      // 添加按钮到表单
      const formElement = document.querySelector('.ant-form') || document.body;
      formElement.insertBefore(validateButton, formElement.firstChild);
    } catch (error) {
      console.error('添加自定义验证规则失败:', error);
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
        <h1 className="text-3xl font-bold tracking-tight">自定义验证规则</h1>
      </div>

      <div className="my-8 space-y-6">
        <div className="prose prose-blue dark:prose-invert max-w-none">
          <p className="lead">学习如何为表单字段添加自定义验证规则。</p>

          <HighlightTabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">概述</TabsTrigger>
              <TabsTrigger value="code">代码</TabsTrigger>
              <TabsTrigger value="usage">使用方法</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <h2>您将学到什么</h2>
              <ul>
                <li>如何为表单字段创建自定义验证规则</li>
                <li>如何实现带有视觉指示器的密码强度验证</li>
                <li>如何执行异步验证（例如，检查用户名是否可用）</li>
                <li>如何为用户提供实时反馈</li>
              </ul>

              <h2>主要特性</h2>
              <ul>
                <li>
                  <strong>密码强度验证：</strong> 显示密码强度的视觉指示器
                </li>
                <li>
                  <strong>异步验证：</strong> 实时检查用户名可用性
                </li>
                <li>
                  <strong>自定义错误消息：</strong> 提供清晰、具体的错误消息
                </li>
                <li>
                  <strong>视觉反馈：</strong> 基于验证状态的颜色编码输入
                </li>
              </ul>

              <h2>使用场景</h2>
              <ul>
                <li>带有用户名可用性检查的注册表单</li>
                <li>带有强度要求的密码创建表单</li>
                <li>带有复杂验证规则的表单</li>
                <li>需要针对外部数据源验证的表单</li>
              </ul>
            </TabsContent>

            <TabsContent value="code">
              <h2>完整示例</h2>
              <p>
                此代码演示了注册表单中的高级验证技术，包括密码强度验证和异步用户名检查。
              </p>

              <CodeBlock
                code={sampleCode}
                language="javascript"
                filename="custom-validation-example.js"
              />

              <h3>表单结构</h3>
              <p>此示例假设表单具有以下字段：</p>

              <CodeBlock
                code={`<form>
  <div data-field="username">
    <label>用户名</label>
    <input type="text" />
  </div>
  
  <div data-field="password">
    <label>密码</label>
    <input type="password" />
    <!-- 密码强度指示器将插入到这里 -->
  </div>
  
  <div data-field="confirmPassword">
    <label>确认密码</label>
    <input type="password" />
  </div>
  
  <button type="submit">注册</button>
</form>`}
                language="html"
                filename="form-structure.html"
              />
            </TabsContent>

            <TabsContent value="usage">
              <h2>如何使用此示例</h2>

              <h3>步骤1：创建您的表单</h3>
              <p>
                首先，在您的Kinlink仪表板中创建一个具有表单结构中所示字段的表单。确保使用与示例代码中相同的字段名称。
              </p>

              <h3>步骤2：添加JavaScript代码</h3>
              <p>
                从"代码"选项卡复制JavaScript代码，并将其粘贴到Kinlink表单的自定义JavaScript部分。
              </p>

              <h3>步骤3：测试您的表单</h3>
              <p>预览您的表单并测试以下功能：</p>
              <ul>
                <li>输入不同的用户名以查看可用性检查的运行情况</li>
                <li>尝试输入不同强度的密码，查看强度指示器的变化</li>
                <li>测试密码确认匹配</li>
                <li>使用有效和无效数据提交表单</li>
              </ul>

              <h3>自定义选项</h3>
              <p>您可以通过多种方式自定义此示例：</p>
              <ul>
                <li>修改密码强度要求</li>
                <li>更改强度指示器的视觉外观</li>
                <li>添加更多具有自定义验证规则的字段</li>
                <li>实现用户名可用性检查的真实API调用</li>
              </ul>

              <h3>最佳实践</h3>
              <ul>
                <li>
                  <strong>实时反馈：</strong> 在用户输入时提供即时反馈
                </li>
                <li>
                  <strong>清晰的错误消息：</strong> 使错误消息具体且有帮助
                </li>
                <li>
                  <strong>视觉提示：</strong> 使用颜色和指示器显示验证状态
                </li>
                <li>
                  <strong>性能：</strong> 防抖API调用以防止过多请求
                </li>
              </ul>
            </TabsContent>
          </HighlightTabs>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/examples">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回示例
              </Button>
            </Link>
            <Link href="/docs/guides/form-validation">
              <Button variant="secondary">查看表单验证指南</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
