import { CodeBlock } from "@/components/code-block"

export default function FormValidationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">表单验证</h1>
        <p className="mt-2 text-lg text-muted-foreground">了解如何为Kinlink表单实现自定义验证。</p>
      </div>

      <div className="docs-content">
        <p>
          表单验证对于确保用户提交准确和完整的数据至关重要。Kinlink提供了一个强大的验证系统，允许您为表单字段定义自定义验证规则。本指南介绍如何使用Kinlink
          API实现各种类型的验证。
        </p>

        <h2>基本验证概念</h2>

        <p>Kinlink表单有两种类型的验证：</p>

        <ol>
          <li>
            <strong>内置验证：</strong> 基于表单配置中的字段类型和必填设置
          </li>
          <li>
            <strong>自定义验证：</strong> 使用Kinlink JavaScript API定义
          </li>
        </ol>

        <p>本指南重点介绍自定义验证，它使您能够完全控制表单字段的验证规则。</p>

        <h2>添加自定义验证器</h2>

        <p>
          您可以使用<code>addFieldValidator</code>
          方法为任何字段添加自定义验证器。验证器是一个函数，它接收字段值作为输入，并返回错误消息（如果验证失败）或
          <code>undefined</code>（如果验证通过）。
        </p>

        <CodeBlock
          code={`// 为电子邮件字段添加自定义验证器
kinlink.formApi.addFieldValidator('email', (value) => {
  // 如果字段为空则跳过验证
  if (!value) return;
  
  // 检查值是否为有效的电子邮件地址
  if (!/^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/.test(value)) {
    return '请输入有效的电子邮件地址';
  }
  
  // 如果验证通过则返回undefined
  return undefined;
});`}
          language="javascript"
          filename="add-validator.js"
          showLineNumbers={true}
        />

        <p>
          您通常在<code>FORM_LOADED</code>事件处理程序中添加验证器：
        </p>

        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
  const form = kinlink.formApi;
  
  // 为各种字段添加验证器
  form.addFieldValidator('email', validateEmail);
  form.addFieldValidator('phone', validatePhone);
  form.addFieldValidator('password', validatePassword);
});

// 验证器函数
function validateEmail(value) {
  if (!value) return;
  if (!/^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/.test(value)) {
    return '请输入有效的电子邮件地址';
  }
  return undefined;
}

function validatePhone(value) {
  if (!value) return;
  if (!/^\\d{10}$/.test(value.replace(/\\D/g, ''))) {
    return '请输入10位电话号码';
  }
  return undefined;
}

function validatePassword(value) {
  if (!value) return;
  if (value.length < 8) {
    return '密码长度必须至少为8个字符';
  }
  if (!/[A-Z]/.test(value)) {
    return '密码必须包含至少一个大写字母';
  }
  if (!/[a-z]/.test(value)) {
    return '密码必须包含至少一个小写字母';
  }
  if (!/\\d/.test(value)) {
    return '密码必须包含至少一个数字';
  }
  return undefined;
}`}
          language="javascript"
          filename="form-loaded-validators.js"
          showLineNumbers={true}
        />

        <h2>移除验证器</h2>

        <p>
          您可以使用<code>removeFieldValidator</code>方法移除自定义验证器：
        </p>

        <CodeBlock
          code={`// 从电子邮件字段移除验证器
kinlink.formApi.removeFieldValidator('email');`}
          language="javascript"
          filename="remove-validator.js"
        />

        <h2>手动验证字段</h2>

        <p>
          您可以使用<code>validateField</code>方法手动验证字段：
        </p>

        <CodeBlock
          code={`// 验证电子邮件字段
const error = kinlink.formApi.validateField('email', 'invalid-email');
console.log(error); // 输出: "请输入有效的电子邮件地址"

// 使用有效值验证
const noError = kinlink.formApi.validateField('email', 'user@example.com');
console.log(noError); // 输出: undefined (验证通过)`}
          language="javascript"
          filename="validate-field.js"
          showLineNumbers={true}
        />

        <h2>验证整个表单</h2>

        <p>
          您可以使用<code>validateForm</code>方法验证整个表单：
        </p>

        <CodeBlock
          code={`// 验证整个表单
const result = kinlink.formApi.validateForm();
console.log(result);
// 输出: {
//   errors: {
//     email: "请输入有效的电子邮件地址",
//     phone: "请输入10位电话号码"
//   },
//   isValid: false
// }`}
          language="javascript"
          filename="validate-form.js"
          showLineNumbers={true}
        />

        <p>
          这在<code>BEFORE_SUBMIT</code>事件处理程序中特别有用，可以在存在验证错误时阻止提交：
        </p>

        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, (data) => {
  const form = kinlink.formApi;
  
  // 验证整个表单
  const validationResult = form.validateForm();
  
  if (!validationResult.isValid) {
    // 显示错误消息
    form.showError('提交前请修复验证错误。');
    
    // 阻止表单提交
    return false;
  }
  
  // 允许表单提交
  return true;
});`}
          language="javascript"
          filename="before-submit-validation.js"
          showLineNumbers={true}
        />

        <h2>手动设置错误消息</h2>

        <p>
          您可以使用<code>setFieldError</code>方法手动设置字段的错误消息：
        </p>

        <CodeBlock
          code={`// 为电子邮件字段设置错误消息
kinlink.formApi.setFieldError('email', '此电子邮件已被注册');

// 清除错误消息
kinlink.formApi.clearFieldError('email');

// 为多个字段设置错误消息
kinlink.formApi.setFieldsErrors({
  email: '此电子邮件已被注册',
  username: '此用户名已被使用'
});`}
          language="javascript"
          filename="set-field-errors.js"
          showLineNumbers={true}
        />

        <h2>常见验证模式</h2>

        <p>以下是您可以在表单中使用的一些常见验证模式：</p>

        <h3>必填字段</h3>

        <CodeBlock
          code={`// 验证字段不为空
form.addFieldValidator('name', (value) => {
  if (!value || value.trim() === '') {
    return '姓名为必填项';
  }
  return undefined;
});`}
          language="javascript"
          filename="required-field.js"
        />

        <h3>电子邮件验证</h3>

        <CodeBlock
          code={`// 验证电子邮件格式
form.addFieldValidator('email', (value) => {
  if (!value) return;
  if (!/^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/.test(value)) {
    return '请输入有效的电子邮件地址';
  }
  return undefined;
});`}
          language="javascript"
          filename="email-validation.js"
        />

        <h3>电话号码验证</h3>

        <CodeBlock
          code={`// 验证电话号码格式
form.addFieldValidator('phone', (value) => {
  if (!value) return;
  // 移除非数字字符并检查长度
  if (!/^\\d{10}$/.test(value.replace(/\\D/g, ''))) {
    return '请输入10位电话号码';
  }
  return undefined;
});`}
          language="javascript"
          filename="phone-validation.js"
        />

        <h3>密码强度验证</h3>

        <CodeBlock
          code={`// 验证密码强度
form.addFieldValidator('password', (value) => {
  if (!value) return;
  
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
  
  return errors.length > 0 ? errors.join('。 ') : undefined;
});`}
          language="javascript"
          filename="password-validation.js"
          showLineNumbers={true}
        />

        <h3>数值范围验证</h3>

        <CodeBlock
          code={`// 验证数字是否在特定范围内
form.addFieldValidator('age', (value) => {
  if (!value) return;
  
  const age = Number(value);
  
  if (isNaN(age)) {
    return '请输入有效的数字';
  }
  if (age < 18) {
    return '您必须年满18岁';
  }
  if (age > 120) {
    return '请输入有效的年龄';
  }
  
  return undefined;
});`}
          language="javascript"
          filename="range-validation.js"
          showLineNumbers={true}
        />

        <h3>日期验证</h3>

        <CodeBlock
          code={`// 验证日期是否在未来
form.addFieldValidator('eventDate', (value) => {
  if (!value) return;
  
  const eventDate = new Date(value);
  const today = new Date();
  
  // 清除时间部分以进行日期比较
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(eventDate.getTime())) {
    return '请输入有效的日期';
  }
  if (eventDate < today) {
    return '活动日期必须在未来';
  }
  
  return undefined;
});`}
          language="javascript"
          filename="date-validation.js"
          showLineNumbers={true}
        />

        <h3>条件验证</h3>

        <CodeBlock
          code={`// 根据另一个字段的值验证字段
form.addFieldValidator('otherEmail', (value) => {
  if (!value) return;
  
  const primaryEmail = form.getFieldValue('email');
  
  if (value === primaryEmail) {
    return '备用电子邮件必须与主要电子邮件不同';
  }
  
  // 仍然验证电子邮件格式
  if (!/^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/.test(value)) {
    return '请输入有效的电子邮件地址';
  }
  
  return undefined;
});`}
          language="javascript"
          filename="conditional-validation.js"
          showLineNumbers={true}
        />

        <h2>异步验证</h2>

        <p>
          对于需要服务器端检查的验证（如检查用户名是否已被使用），您可以在<code>FIELD_CHANGE</code>
          事件处理程序中使用异步验证：
        </p>

        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, async (data) => {
  const { fieldName, value } = data;
  const form = kinlink.formApi;
  
  // 检查用户名是否可用
  if (fieldName === 'username' && value) {
    try {
      // 显示加载状态
      form.setFieldComponentStyle('username', {
        backgroundColor: '#f5f5f5'
      });
      
      // 调用API检查用户名可用性
      const response = await fetch(\`/api/check-username?username=\${encodeURIComponent(value)}\`);
      const result = await response.json();
      
      if (!result.available) {
        form.setFieldError('username', '此用户名已被使用');
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
      }
    } catch (error) {
      console.error('检查用户名时出错:', error);
      form.resetFieldComponentStyle('username');
    }
  }
});`}
          language="javascript"
          filename="async-validation.js"
          showLineNumbers={true}
        />

        <h2>完整示例</h2>

        <p>这是一个展示各种验证技术的完整示例：</p>

        <CodeBlock
          code={`(function() {
  // 表单加载时初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 为各种字段添加验证器
    form.addFieldValidator('name', (value) => {
      if (!value || value.trim() === '') {
        return '姓名为必填项';
      }
      return undefined;
    });
    
    form.addFieldValidator('email', (value) => {
      if (!value) return;
      if (!/^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/.test(value)) {
        return '请输入有效的电子邮件地址';
      }
      return undefined;
    });
    
    form.addFieldValidator('phone', (value) => {
      if (!value) return;
      if (!/^\\d{10}$/.test(value.replace(/\\D/g, ''))) {
        return '请输入10位电话号码';
      }
      return undefined;
    });
    
    form.addFieldValidator('password', (value) => {
      if (!value) return;
      
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
      
      return errors.length > 0 ? errors.join('。 ') : undefined;
    });
    
    form.addFieldValidator('confirmPassword', (value) => {
      if (!value) return;
      
      const password = form.getFieldValue('password');
      
      if (value !== password) {
        return '两次输入的密码不匹配';
      }
      
      return undefined;
    });
    
    form.addFieldValidator('age', (value) => {
      if (!value) return;
      
      const age = Number(value);
      
      if (isNaN(age)) {
        return '请输入有效的数字';
      }
      if (age < 18) {
        return '您必须年满18岁';
      }
      if (age > 120) {
        return '请输入有效的年龄';
      }
      
      return undefined;
    });
    
    form.addFieldValidator('eventDate', (value) => {
      if (!value) return;
      
      const eventDate = new Date(value);
      const today = new Date();
      
      // 清除时间部分以进行日期比较
      today.setHours(0, 0, 0, 0);
      
      if (isNaN(eventDate.getTime())) {
        return '请输入有效的日期';
      }
      if (eventDate < today) {
        return '活动日期必须在未来';
      }
      
      return undefined;
    });
  });
  
  // 处理字段变化以进行异步验证
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, async (data) => {
    const { fieldName, value } = data;
    const form = kinlink.formApi;
    
    // 检查用户名是否可用
    if (fieldName === 'username' && value) {
      try {
        // 显示加载状态
        form.setFieldComponentStyle('username', {
          backgroundColor: '#f5f5f5'
        });
        
        // 使用setTimeout模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 检查用户名是否已被使用（演示用途）
        const takenUsernames = ['admin', 'user', 'test', 'demo'];
        
        if (takenUsernames.includes(value.toLowerCase())) {
          form.setFieldError('username', '此用户名已被使用');
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
        }
      } catch (error) {
        console.error('检查用户名时出错:', error);
        form.resetFieldComponentStyle('username');
      }
    }
    
    // 当密码变化时更新确认密码验证
    if (fieldName === 'password') {
      const confirmPassword = form.getFieldValue('confirmPassword');
      
      if (confirmPassword) {
        // 重新验证确认密码
        const error = form.validateField('confirmPassword', confirmPassword);
        
        if (error) {
          form.setFieldError('confirmPassword', error);
        } else {
          form.clearFieldError('confirmPassword');
        }
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
      form.showError('提交前请修复验证错误。');
      
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
    
    // 允许表单提交
    return true;
  });
})();`}
          language="javascript"
          filename="complete-validation-example.js"
          showLineNumbers={true}
        />

        <h2>最佳实践</h2>

        <ul>
          <li>
            <strong>尽早验证，频繁验证：</strong> 在用户与字段交互后立即验证，以提供即时反馈。
          </li>
          <li>
            <strong>错误消息要具体：</strong> 提供清晰、具体的错误消息，告诉用户确切的问题和如何修复。
          </li>
          <li>
            <strong>处理空值：</strong>{" "}
            决定是否应验证空值或跳过。对于必填字段，验证空值；对于可选字段，如果值为空则跳过验证。
          </li>
          <li>
            <strong>使用视觉提示：</strong> 使用颜色、图标和样式来指示验证状态（错误、成功、加载）。
          </li>
          <li>
            <strong>考虑可访问性：</strong> 确保所有用户都能访问验证错误，包括使用屏幕阅读器的用户。
          </li>
          <li>
            <strong>测试边缘情况：</strong> 使用边缘情况测试您的验证，如空字符串、特殊字符和非常长的输入。
          </li>
        </ul>
      </div>
    </div>
  )
}
