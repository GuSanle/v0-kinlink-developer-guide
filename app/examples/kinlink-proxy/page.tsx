import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kinlink代理 - Kinlink开发者",
  description: "学习如何使用Kinlink代理功能发送API请求",
};

export default function KinlinkProxyPage() {
  const sampleCode = `/**
 * 示例: Kinlink代理
 * 功能：在表单提交前使用代理发送API请求
 */
(function () {
  // 监听表单加载完成事件
  kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, async (data) => {
    try {
      const { values } = data;
      const res = await kinlink.proxy(
        'https://pokemon36.cybozu.cn/k/v1/record.json',
        'POST',
        { 'Content-Type': 'application/json' },
        {
          app: 187,
          record: {
            单行文本框: { value: 'kinlink' },
          },
        },
      );
      console.log(res, 'res');
    } catch (error) {
      console.error('表单提交前处理失败:', error);
    }
  });
})();
`;

  const advancedSampleCode = `/**
 * 示例: 高级Kinlink代理用例
 * 功能：使用代理获取外部数据并填充表单字段
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 创建搜索按钮
      const searchButton = document.createElement('button');
      searchButton.type = 'button';
      searchButton.textContent = '搜索公司信息';
      searchButton.style.marginLeft = '10px';
      searchButton.style.padding = '5px 10px';
      searchButton.style.backgroundColor = '#1890ff';
      searchButton.style.color = 'white';
      searchButton.style.border = 'none';
      searchButton.style.borderRadius = '4px';
      searchButton.style.cursor = 'pointer';
      
      // 获取公司名称字段
      const companyField = document.querySelector('[id$="单行文本框_10"]');
      if (companyField && companyField.parentNode) {
        companyField.parentNode.insertBefore(searchButton, companyField.nextSibling);
        
        // 添加点击事件
        searchButton.addEventListener('click', async () => {
          const companyName = kinlink.formApi.getFieldValue('单行文本框_10');
          if (!companyName) {
            kinlink.formApi.showError('请先输入公司名称', 3);
            return;
          }
          
          // 显示加载状态
          searchButton.disabled = true;
          searchButton.textContent = '搜索中...';
          
          try {
            // 使用代理请求获取公司信息（示例URL，实际URL需要替换）
            const response = await kinlink.proxy(
              'https://api.example.com/company/search',
              'GET',
              { 'Content-Type': 'application/json' },
              { query: companyName }
            );
            
            // 处理响应
            if (response && response.data) {
              // 填充相关字段
              kinlink.formApi.setFieldsValue({
                '文字列__1行__3': response.data.email,
                '文字列__1行__2': response.data.phone,
                '下拉菜单': response.data.category
              });
              
              kinlink.formApi.showSuccess('已自动填充公司相关信息', 3);
            } else {
              kinlink.formApi.showWarning('未找到相关公司信息', 3);
            }
          } catch (error) {
            console.error('获取公司信息失败:', error);
            kinlink.formApi.showError('搜索失败，请稍后再试', 3);
          } finally {
            // 恢复按钮状态
            searchButton.disabled = false;
            searchButton.textContent = '搜索公司信息';
          }
        });
      }
    } catch (error) {
      console.error('初始化搜索功能失败:', error);
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
        <h1 className="text-3xl font-bold tracking-tight">Kinlink代理</h1>
      </div>

      <div className="my-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">功能概述</h2>
          <p>
            此示例演示如何使用Kinlink的代理功能发送API请求。Kinlink代理允许您从表单前端安全地调用外部API，无需担心跨域问题或暴露敏感凭据。这对于与外部系统集成、数据验证或动态获取信息非常有用。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">基本示例</h2>
          <p>以下代码展示了如何在表单提交前使用Kinlink代理发送POST请求：</p>
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
          <h2 className="text-2xl font-bold tracking-tight">高级示例</h2>
          <p>
            以下代码展示了一个更复杂的用例，使用代理获取公司信息并自动填充表单字段：
          </p>
          <Tabs defaultValue="javascript">
            <TabsList>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="javascript">
              <CodeBlock code={advancedSampleCode} language="javascript" />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            代理功能参数说明
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    参数
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    类型
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    说明
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">url</td>
                  <td className="border border-gray-300 px-4 py-2">String</td>
                  <td className="border border-gray-300 px-4 py-2">
                    API请求的完整URL
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">method</td>
                  <td className="border border-gray-300 px-4 py-2">String</td>
                  <td className="border border-gray-300 px-4 py-2">
                    HTTP方法，如'GET'、'POST'、'PUT'、'DELETE'等
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">headers</td>
                  <td className="border border-gray-300 px-4 py-2">Object</td>
                  <td className="border border-gray-300 px-4 py-2">
                    HTTP请求头，如{`'Content-Type': 'application/json'`}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">body</td>
                  <td className="border border-gray-300 px-4 py-2">
                    Object/null
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    请求体数据，对于POST/PUT请求必需，GET请求可为null
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">使用场景</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>数据验证</strong>
              ：验证表单中输入的数据（如邮箱、公司名称等）
            </li>
            <li>
              <strong>数据填充</strong>：根据已有信息自动填充其他字段
            </li>
            <li>
              <strong>第三方集成</strong>：将表单数据发送到外部系统或服务
            </li>
            <li>
              <strong>数据查询</strong>：从外部数据源获取信息
            </li>
            <li>
              <strong>通知和消息</strong>：发送邮件、短信或其他通知
            </li>
            <li>
              <strong>工作流触发</strong>：触发外部系统中的工作流程
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">最佳实践</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>始终使用try/catch处理API请求异常</li>
            <li>为长时间运行的请求提供适当的用户反馈（如加载状态）</li>
            <li>处理请求失败的情况，并向用户提供友好的错误消息</li>
            <li>仅发送必要的数据，避免传输敏感信息</li>
            <li>使用HTTPS URL确保数据传输安全</li>
            <li>考虑请求的性能影响，避免过多或过大的请求</li>
          </ul>
        </div>

        <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200">
          <h3 className="font-semibold text-yellow-800">注意事项</h3>
          <p className="text-yellow-800">
            Kinlink代理功能受到安全策略和跨域限制。确保目标API允许来自Kinlink服务器的请求。敏感操作（如支付处理）应使用适当的安全措施和授权。在生产环境中，避免直接在前端存储API密钥或访问令牌。
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">API参考</h2>
          <p>此示例使用了以下Kinlink API：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>kinlink.proxy(url, method, headers, body)</code> -
              发送API代理请求
            </li>
            <li>
              <code>
                kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, callback)
              </code>{" "}
              - 监听表单提交前事件
            </li>
            <li>
              <code>
                kinlink.events.on(kinlink.FormEvents.FORM_LOADED, callback)
              </code>{" "}
              - 监听表单加载完成事件
            </li>
            <li>
              <code>kinlink.formApi.getFieldValue(fieldCode)</code> - 获取字段值
            </li>
            <li>
              <code>kinlink.formApi.setFieldsValue(valuesObject)</code> -
              设置多个字段的值
            </li>
            <li>
              <code>
                kinlink.formApi.showSuccess/showError/showWarning(message,
                duration)
              </code>{" "}
              - 显示消息
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
