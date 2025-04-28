import { CodeBlock } from "@/components/code-block"

export default function CustomValidationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">自定义验证示例</h1>
        <p className="mt-2 text-lg text-muted-foreground">学习如何为您的Kinlink表单实现高级自定义验证。</p>
      </div>

      <div className="docs-content">
        <p>本示例演示如何为注册表单实现高级自定义验证。它包括各种类型的验证，例如：</p>

        <ul>
          <li>必填字段验证</li>
          <li>电子邮件格式验证</li>
          <li>密码强度验证</li>
          <li>密码确认验证</li>
          <li>用户名可用性验证（异步）</li>
          <li>年龄限制验证</li>
          <li>条款和条件接受验证</li>
        </ul>

        <h2>注册表单</h2>

        <p>假设我们有一个包含以下字段的注册表单：</p>

        <ul>
          <li>
            <code>username</code> - 用户期望的用户名
          </li>
          <li>
            <code>email</code> - 用户的电子邮件地址
          </li>
          <li>
            <code>password</code> - 用户的密码
          </li>
          <li>
            <code>confirmPassword</code> - 密码确认
          </li>
          <li>
            <code>fullName</code> - 用户的全名
          </li>
          <li>
            <code>birthDate</code> - 用户的出生日期
          </li>
          <li>
            <code>country</code> - 用户的国家
          </li>
          <li>
            <code>termsAccepted</code> - 接受条款和条件的复选框
          </li>
        </ul>

        <h2>完整示例</h2>

        <CodeBlock
          code={`(function() {
  // 表单加载时初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 必填字段验证
    form.addFieldValidator('username', (value) => {
      if (!value || value.trim() === '') {
        return '用户名为必填项';
      }
      
      // 检查用户名格式
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        return '用户名必须为3-20个字符，且只能包含字母、数字和下划线';
      }
      
      return undefined;
    });
    
    form.addFieldValidator('email', (value) => {
      if (!value || value.trim() === '') {
        return '电子邮件为必填项';
      }
      
      // 检查电子邮件格式
      if (!/^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$/.test(value)) {
        return '请输入有效的电子邮件地址';
      }
      
      return undefined;
    });
    
    form.addFieldValidator('fullName', (value) => {
      if (!value || value.trim() === '') {
        return '全名为必填项';
      }
      
      // 检查全名至少有两部分（名和姓）
      const nameParts = value.trim().split(/\\s+/);
      if (nameParts.length < 2) {
        return '请输入您的全名（名和姓）';
      }
      
      return undefined;
    });
    
    // 密码强度验证
    form.addFieldValidator('password', (value) => {
      if (!value) {
        return '密码为必填项';
      }
      
      const errors = [];
      
      // 检查密码长度
      if (value.length < 8) {
        errors.push('密码长度必须至少为8个字符');
      }
      
      // 检查大写字母
      if (!/[A-Z]/.test(value)) {
        errors.push('密码必须包含至少一个大写字母');
      }
      
      // 检查小写字母
      if (!/[a-z]/.test(value)) {
        errors.push('密码必须包含至少一个小写字母');
      }
      
      // 检查数字
      if (!/\\d/.test(value)) {
        errors.push('密码必须包含至少一个数字');
      }
      
      // 检查特殊字符
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        errors.push('密码必须包含至少一个特殊字符');
      }
      
      return errors.length > 0 ? errors.join('。 ') : undefined;
    });
    
    // 密码确认验证
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
    
    // 年龄限制验证（必须年满18岁）
    form.addFieldValidator('birthDate', (value) => {
      if (!value) {
        return '出生日期为必填项';
      }
      
      const birthDate = new Date(value);
      const today = new Date();
      
      // 检查日期是否有效
      if (isNaN(birthDate.getTime())) {
        return '请输入有效的日期';
      }
      
      // 计算年龄
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 18) {
        return '您必须年满18岁才能注册';
      }
      
      return undefined;
    });
    
    // 国家验证（必填）
    form.addFieldValidator('country', (value) => {
      if (!value) {
        return '请选择您的国家';
      }
      
      return undefined;
    });
    
    // 条款和条件验证
    form.addFieldValidator('termsAccepted', (value) => {
      if (!value || value !== true) {
        return '您必须接受条款和条件才能注册';
      }
      
      return undefined;
    });
    
    // 为密码强度添加视觉提示
    form.setFieldComponentStyle('password', {
      marginBottom: '5px'
    });
    
    // 创建密码强度指示器
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
        const takenUsernames = ['admin', 'user', 'test', 'demo', 'moderator', 'administrator'];
        
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
  
  // 提交前验证表单
  kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, (data) => {
    const form = kinlink.formApi;
    
    // 验证整个表单
    const validationResult = form.validateForm();
    
    if (!validationResult.isValid) {
      // 显示错误消息
      form.showError('请在提交前修复验证错误。');
      
      // 记录错误以便调试
      console.log('验证错误:', validationResult.errors);
      
      // 突出显示第一个有错误的字段
      const firstErrorField = Object.keys(validationResult.errors)[0];
      
      if (firstErrorField) {
        // 滚动到第一个错误字段
        const fieldElement = document.querySelector(\`[data-field="\${firstErrorField}"]\`);
        
        if (fieldElement) {
          fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      
      // 阻止表单提交
      return false;
    }
    
    // 添加注册时间戳
    data.values.registrationTimestamp = new Date().toISOString();
    
    // 允许表单提交
    return true;
  });
  
  // 处理成功提交
  kinlink.events.on(kinlink.FormEvents.AFTER_SUBMIT, (data) => {
    const { success, result } = data;
    
    if (success) {
      // 显示成功消息
      kinlink.formApi.showSuccess('注册成功！正在重定向到登录页面...');
      
      // 延迟后重定向到登录页面
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } else {
      // 显示错误消息
      kinlink.formApi.showError('注册失败。请稍后再试。');
      console.error('提交错误:', result);
    }
  });
  
  // 更新密码强度指示器的辅助函数
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
    
    // 检查数字
    if (/\\d/.test(password)) {
      strength += 12.5;
    }
    
    // 检查特殊字符
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
          filename="registration-form-validation.js"
          showLineNumbers={true}
        />

        <h2>主要特性</h2>

        <h3>必填字段验证</h3>
        <p>
          所有必填字段都经过验证，确保它们不为空。对于<code>username</code>、<code>email</code>和<code>fullName</code>
          等字段，我们还检查它们不仅仅包含空格。
        </p>

        <h3>格式验证</h3>
        <p>我们验证各种字段的格式：</p>
        <ul>
          <li>
            <code>username</code>必须为3-20个字符，且只能包含字母、数字和下划线
          </li>
          <li>
            <code>email</code>必须是有效的电子邮件地址
          </li>
          <li>
            <code>fullName</code>必须至少包含名和姓
          </li>
        </ul>

        <h3>密码强度验证</h3>
        <p>我们实现了全面的密码强度验证，检查：</p>
        <ul>
          <li>最小长度（8个字符）</li>
          <li>是否包含大写字母</li>
          <li>是否包含小写字母</li>
          <li>是否包含数字</li>
          <li>是否包含特殊字符</li>
        </ul>
        <p>我们还添加了一个视觉密码强度指示器，根据密码强度变化颜色和长度。</p>

        <h3>密码确认验证</h3>
        <p>
          我们确保<code>confirmPassword</code>字段与<code>password</code>字段匹配。当<code>password</code>
          字段变化时，我们也会重新验证<code>confirmPassword</code>字段。
        </p>

        <h3>年龄限制验证</h3>
        <p>我们根据用户的出生日期验证用户是否年满18岁。这涉及计算用户的年龄并检查它是否满足最低要求。</p>

        <h3>条款和条件验证</h3>
        <p>
          我们确保用户已接受条款和条件，方法是检查<code>termsAccepted</code>复选框是否被选中。
        </p>

        <h3>异步用户名验证</h3>
        <p>
          我们为<code>username</code>
          字段实现异步验证，检查用户名是否已被占用。这模拟了对服务器的API调用，以检查用户名可用性。
        </p>

        <h3>视觉反馈</h3>
        <p>我们通过以下方式为用户提供视觉反馈：</p>
        <ul>
          <li>无效字段的错误消息</li>
          <li>字段的颜色编码样式（红色表示错误，绿色表示成功）</li>
          <li>变化颜色和长度的密码强度指示器</li>
          <li>表单提交的成功和错误消息</li>
        </ul>

        <h3>表单提交处理</h3>
        <p>
          我们在提交前验证整个表单，如果有任何验证错误，则阻止提交。我们还滚动到第一个错误字段，帮助用户定位并修复错误。
        </p>

        <h2>如何使用此示例</h2>

        <p>要在您自己的Kinlink表单中使用此示例：</p>

        <ol>
          <li>在您的Kinlink仪表板中创建一个包含必要字段的注册表单</li>
          <li>将此示例中的JavaScript代码复制到表单的自定义JavaScript部分</li>
          <li>调整字段名称和验证规则以匹配您的特定需求</li>
          <li>测试表单以确保所有验证规则按预期工作</li>
          <li>自定义视觉反馈和错误消息以匹配您的品牌</li>
        </ol>

        <h2>最佳实践</h2>

        <p>在为表单实现自定义验证时，请记住这些最佳实践：</p>

        <ul>
          <li>
            <strong>提供即时反馈：</strong> 在用户与字段交互时验证字段，而不仅仅是在提交表单时。
          </li>
          <li>
            <strong>清晰具体：</strong> 错误消息应清楚地解释问题所在及如何修复。
          </li>
          <li>
            <strong>使用视觉提示：</strong> 使用颜色、图标和其他视觉元素指示验证状态。
          </li>
          <li>
            <strong>考虑可访问性：</strong> 确保所有用户都能访问验证错误，包括使用屏幕阅读器的用户。
          </li>
          <li>
            <strong>平衡安全性和可用性：</strong> 强验证提高安全性，但不应使用过于复杂的要求使用户感到沮丧。
          </li>
          <li>
            <strong>彻底测试：</strong> 使用各种输入测试您的验证，包括边缘情况和无效数据。
          </li>
        </ul>

        <h2>结论</h2>

        <p>
          自定义验证是Kinlink的一个强大功能，允许您创建收集准确和有效数据的表单。通过实施全面的验证规则，您可以改善用户体验，减少错误，并确保收集的数据满足您的要求。
        </p>
      </div>
    </div>
  )
}
