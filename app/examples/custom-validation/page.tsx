import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "自定义验证示例 - Kinlink开发者",
  description: "学习如何为您的表单实现高级验证规则，并提供视觉反馈。",
}

export default function CustomValidationPage() {
  return (
    <div className="container py-6 lg:py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/examples">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">自定义验证示例</h1>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p className="lead">
          本示例演示如何为您的表单实现高级验证规则，并提供视觉反馈。您将学习如何创建密码强度验证、异步用户名检查等功能。
        </p>

        <Tabs defaultValue="overview">
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
            <p>此代码演示了注册表单中的高级验证技术，包括密码强度验证和异步用户名检查。</p>

            <CodeBlock
              code={`(function() {
  // 表单加载时初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 添加验证器
    form.addFieldValidator('username', (value) => {
      if (!value || value.trim() === '') {
        return '用户名为必填项';
      }
      
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        return '用户名必须为3-20个字符，且只能包含字母、数字和下划线';
      }
      
      return undefined;
    });
    
    form.addFieldValidator('password', (value) => {
      if (!value) {
        return '密码为必填项';
      }
      
      const errors = [];
      
      if (value.length < 8) {
        errors.push('密码长度必须至少为8个字符');
      }
      
      if (!/[A-Z]/.test(value)) {
        errors.push('密码必须包含至少一个大写字母');
      }
      
      if (!/[a-z]/.test(value)) {
        errors.push('密码必须包含至少一个小写字母');
      }
      
      if (!/\\d/.test(value)) {
        errors.push('密码必须包含至少一个数字');
      }
      
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errors.push('密码必须包含至少一个特殊字符');
      }
      
      return errors.length > 0 ? errors.join('。 ') : undefined;
    });
    
    form.addFieldValidator('confirmPassword', (value) => {
      if (!value) {
        return '请确认您的密码';
      }
      
      const password = form.getFieldValue('password');
      
      if (value !== password) {
        return '密码不匹配';
      }
      
      return undefined;
    });
    
    // 创建密码强度指示器
    createPasswordStrengthIndicator();
  });
  
  // 处理字段变化
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, async (data) => {
    const { fieldName, value } = data;
    const form = kinlink.formApi;
    
    // 更新密码强度指示器
    if (fieldName === 'password') {
      updatePasswordStrength(value);
      
      // 如果确认密码有值，重新验证
      const confirmPassword = form.getFieldValue('confirmPassword');
      if (confirmPassword) {
        const error = form.validateField('confirmPassword', confirmPassword);
        if (error) {
          form.setFieldError('confirmPassword', error);
        } else {
          form.clearFieldError('confirmPassword');
        }
      }
    }
    
    // 检查用户名可用性（异步验证）
    if (fieldName === 'username' && value && /^[a-zA-Z0-9_]{3,20}$/.test(value)) {
      try {
        // 显示加载状态
        form.setFieldComponentStyle('username', {
          backgroundColor: '#f5f5f5'
        });
        
        // 使用setTimeout模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 检查用户名是否已被占用（演示用途）
        const takenUsernames = ['admin', 'user', 'test', 'demo', 'moderator'];
        
        if (takenUsernames.includes(value.toLowerCase())) {
          form.setFieldError('username', '此用户名已被占用');
          form.setFieldComponentStyle('username', {
            backgroundColor: '#fff2f0',
            borderColor: '#ffccc7'
          });
        } else {
          form.clearFieldError('username');
          form.setFieldComponentStyle('username', {
            backgroundColor: '#f6ffed',
            borderColor: '#b7eb8f'
          });
          
          // 显示成功消息
          form.showSuccess('用户名可用！');
        }
      } catch (error) {
        console.error('检查用户名时出错:', error);
        form.resetFieldComponentStyle('username');
      }
    }
  });
  
  // 创建密码强度指示器函数
  function createPasswordStrengthIndicator() {
    const passwordField = document.querySelector('[data-field="password"]');
    
    if (passwordField) {
      const strengthIndicator = document.createElement('div');
      strengthIndicator.id = 'password-strength-indicator';
      strengthIndicator.style.height = '5px';
      strengthIndicator.style.marginBottom = '10px';
      strengthIndicator.style.backgroundColor = '#e0e0e0';
      strengthIndicator.style.borderRadius = '2px';
      strengthIndicator.style.overflow = 'hidden';
      
      const strengthBar = document.createElement('div');
      strengthBar.id = 'password-strength-bar';
      strengthBar.style.height = '100%';
      strengthBar.style.width = '0%';
      strengthBar.style.backgroundColor = '#ff4d4f';
      strengthBar.style.transition = 'width 0.3s, background-color 0.3s';
      
      strengthIndicator.appendChild(strengthBar);
      
      // 插入到密码字段后面
      passwordField.parentNode.insertBefore(strengthIndicator, passwordField.nextSibling);
    }
  }
  
  // 更新密码强度指示器函数
  function updatePasswordStrength(password) {
    if (!password) {
      setStrength(0, '#e0e0e0');
      return;
    }
    
    let strength = 0;
    
    // 检查密码长度
    if (password.length >= 8) {
      strength += 25;
    }
    
    // 检查大写字母
    if (/[A-Z]/.test(password)) {
      strength += 25;
    }
    
    // 检查小写字母
    if (/[a-z]/.test(password)) {
      strength += 25;
    }
    
    // 检查数字和特殊字符
    if (/\\d/.test(password)) {
      strength += 12.5;
    }
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 12.5;
    }
    
    // 根据强度设置颜色
    let color = '#ff4d4f'; // 红色（弱）
    
    if (strength >= 75) {
      color = '#52c41a'; // 绿色（强）
    } else if (strength >= 50) {
      color = '#faad14'; // 黄色（中等）
    } else if (strength >= 25) {
      color = '#ff7a45'; // 橙色（弱）
    }
    
    setStrength(strength, color);
  }
  
  // 设置强度指示器的辅助函数
  function setStrength(percentage, color) {
    const strengthBar = document.getElementById('password-strength-bar');
    
    if (strengthBar) {
      strengthBar.style.width = \`\${percentage}%\`;
      strengthBar.style.backgroundColor = color;
    }
  }
})();`}
              language="javascript"
              filename="custom-validation-example.js"
              showLineNumbers={true}
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
              showLineNumbers={true}
            />
          </TabsContent>

          <TabsContent value="usage">
            <h2>如何使用此示例</h2>

            <h3>步骤1：创建您的表单</h3>
            <p>首先，在您的Kinlink仪表板中创建一个具有表单结构中所示字段的表单。确保使用与示例代码中相同的字段名称。</p>

            <h3>步骤2：添加JavaScript代码</h3>
            <p>从"代码"选项卡复制JavaScript代码，并将其粘贴到Kinlink表单的自定义JavaScript部分。</p>

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
        </Tabs>

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
  )
}
