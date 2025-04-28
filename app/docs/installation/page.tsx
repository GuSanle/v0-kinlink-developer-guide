import Link from "next/link"
import { CodeBlock } from "@/components/code-block"

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">安装</h1>
        <p className="mt-2 text-lg text-muted-foreground">了解如何为您的Kintone实例设置Kinlink。</p>
      </div>

      <div className="docs-content">
        <p>
          本指南将引导您完成设置Kinlink以配合Kintone实例工作的过程。Kinlink允许您创建与Kintone应用程序集成的外部表单，使您能够从没有访问Kintone实例权限的用户那里收集数据。
        </p>

        <h2>前提条件</h2>

        <p>在开始之前，请确保您有：</p>

        <ul>
          <li>具有管理员权限的Kintone账户</li>
          <li>您想要与Kinlink集成的Kintone应用程序</li>
          <li>对Kintone应用程序结构和字段的基本了解</li>
        </ul>

        <h2>步骤1：注册Kinlink</h2>

        <p>首先，您需要创建一个Kinlink账户并将其连接到您的Kintone实例：</p>

        <ol>
          <li>
            访问{" "}
            <a href="https://kinlink.io/signup" className="font-medium underline underline-offset-4">
              Kinlink注册页面
            </a>
          </li>
          <li>使用您的电子邮件地址创建账户</li>
          <li>按照验证流程激活您的账户</li>
        </ol>

        <h2>步骤2：连接您的Kintone实例</h2>

        <p>创建Kinlink账户后，您需要将其连接到您的Kintone实例：</p>

        <ol>
          <li>登录您的Kinlink账户</li>
          <li>导航至"连接"部分</li>
          <li>点击"添加连接"并选择"Kintone"</li>
          <li>
            输入您的Kintone域名（例如，<code>your-company.kintone.com</code>）
          </li>
          <li>
            在Kintone管理设置中生成具有以下权限的API令牌：
            <ul>
              <li>应用程序访问</li>
              <li>记录查看</li>
              <li>记录创建</li>
              <li>记录编辑</li>
            </ul>
          </li>
          <li>在Kinlink连接表单中输入API令牌</li>
          <li>点击"测试连接"以验证一切正常工作</li>
          <li>保存连接</li>
        </ol>

        <h2>步骤3：创建Kinlink表单</h2>

        <p>现在您已经连接了Kintone实例，您可以创建一个映射到Kintone应用程序的Kinlink表单：</p>

        <ol>
          <li>在Kinlink仪表板中，点击"创建表单"</li>
          <li>选择您创建的Kintone连接</li>
          <li>选择您想要集成的Kintone应用程序</li>
          <li>
            将Kintone字段映射到Kinlink表单字段：
            <ul>
              <li>选择要包含在表单中的字段</li>
              <li>配置字段属性（必填、只读等）</li>
              <li>设置字段验证规则</li>
            </ul>
          </li>
          <li>自定义表单外观和行为</li>
          <li>保存并发布您的表单</li>
        </ol>

        <h2>步骤4：使用JavaScript自定义</h2>

        <p>
          Kinlink提供了一个强大的JavaScript
          API，允许您自定义表单的行为。您可以在Kinlink表单编辑器中为表单添加自定义JavaScript：
        </p>

        <CodeBlock
          code={`(function() {
  // 此代码将在表单加载时运行
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 示例：初始隐藏字段
    form.hideField('additionalInfo');
    
    // 示例：添加自定义验证器
    form.addFieldValidator('email', (value) => {
      if (!value) return;
      if (!/^\\w+@\\w+\\.\\w+$/.test(value)) {
        return '请输入有效的电子邮件地址';
      }
      return undefined; // 验证通过
    });
  });
  
  // 此代码将在字段值变化时运行
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
    const { fieldName, value } = data;
    const form = kinlink.formApi;
    
    // 示例：根据另一个字段的值显示/隐藏字段
    if (fieldName === 'requestType' && value === 'special') {
      form.showField('additionalInfo');
    } else if (fieldName === 'requestType') {
      form.hideField('additionalInfo');
    }
  });
})();`}
          language="javascript"
          filename="kinlink-custom-script.js"
          showLineNumbers={true}
        />

        <p>
          有关JavaScript API的更多信息，请参阅{" "}
          <Link href="/docs/api-reference" className="font-medium underline underline-offset-4">
            API参考
          </Link>
          。
        </p>

        <h2>步骤5：分享您的表单</h2>

        <p>发布表单后，您可以与外部用户分享：</p>

        <ol>
          <li>在Kinlink仪表板中，找到您创建的表单</li>
          <li>点击"分享"查看分享选项</li>
          <li>
            选择您想要分享表单的方式：
            <ul>
              <li>公共链接：任何拥有链接的人都可以访问表单</li>
              <li>嵌入代码：将表单嵌入到您的网站中</li>
              <li>电子邮件邀请：向特定用户发送电子邮件邀请</li>
              <li>访问码：需要访问码才能查看表单</li>
            </ul>
          </li>
          <li>配置任何额外的安全设置</li>
          <li>复制链接或嵌入代码并与您的用户分享</li>
        </ol>

        <h2>后续步骤</h2>

        <p>现在您已经设置了Kinlink表单，您可以：</p>

        <ul>
          <li>
            <Link href="/docs/guides/field-operations" className="font-medium underline underline-offset-4">
              了解字段操作
            </Link>
          </li>
          <li>
            <Link href="/docs/guides/form-validation" className="font-medium underline underline-offset-4">
              设置表单验证
            </Link>
          </li>
          <li>
            <Link href="/docs/guides/mobile-adaptation" className="font-medium underline underline-offset-4">
              为移动设备优化表单
            </Link>
          </li>
          <li>
            <Link href="/docs/examples/field-linking" className="font-medium underline underline-offset-4">
              查看字段联动示例
            </Link>
          </li>
        </ul>

        <h2>故障排除</h2>

        <p>如果您在安装过程中遇到任何问题，请检查以下内容：</p>

        <ul>
          <li>确保您的Kintone API令牌具有正确的权限</li>
          <li>验证您的Kintone域名输入正确</li>
          <li>检查您尝试集成的Kintone应用程序是否可访问</li>
          <li>确保您的浏览器已启用JavaScript</li>
          <li>清除浏览器缓存并重试</li>
        </ul>

        <p>
          如果您仍然遇到问题，请联系{" "}
          <a href="mailto:support@kinlink.io" className="font-medium underline underline-offset-4">
            Kinlink支持
          </a>
          。
        </p>
      </div>
    </div>
  )
}
