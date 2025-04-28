import { CodeBlock } from "@/components/code-block"

export default function ExternalIntegrationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">外部集成示例</h1>
        <p className="mt-2 text-lg text-muted-foreground">学习如何将Kinlink表单与外部系统和API集成。</p>
      </div>

      <div className="docs-content">
        <p>本示例演示如何将Kinlink表单与外部系统和API集成。我们将创建一个客户注册表单，该表单：</p>

        <ul>
          <li>使用地理编码API验证地址</li>
          <li>在外部CRM系统中检查重复客户</li>
          <li>根据税号获取公司信息</li>
          <li>使用电子邮件服务发送确认邮件</li>
        </ul>

        <h2>客户注册表单</h2>

        <p>假设我们有一个包含以下字段的客户注册表单：</p>

        <ul>
          <li>
            <code>customerType</code> - 个人或企业
          </li>
          <li>
            <code>firstName</code> - 名字（个人）
          </li>
          <li>
            <code>lastName</code> - 姓氏（个人）
          </li>
          <li>
            <code>companyName</code> - 公司名称（企业）
          </li>
          <li>
            <code>taxId</code> - 税号或企业注册号（企业）
          </li>
          <li>
            <code>email</code> - 电子邮件地址
          </li>
          <li>
            <code>phone</code> - 电话号码
          </li>
          <li>
            <code>address</code> - 街道地址
          </li>
          <li>
            <code>city</code> - 城市
          </li>
          <li>
            <code>state</code> - 州/省
          </li>
          <li>
            <code>postalCode</code> - 邮政编码
          </li>
          <li>
            <code>country</code> - 国家
          </li>
        </ul>

        <h2>完整示例</h2>

        <CodeBlock
          code={`(function() {
  // API端点（替换为您的实际端点）
  const API_ENDPOINTS = {
    GEOCODE: 'https://api.example.com/geocode',
    CHECK_CUSTOMER: 'https://api.example.com/check-customer',
    COMPANY_INFO: 'https://api.example.com/company-info',
    SEND_EMAIL: 'https://api.example.com/send-email'
  };
  
  // 表单加载时初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 初始隐藏企业特定字段
    form.hideField('companyName');
    form.hideField('taxId');
    
    // 添加验证器
    form.addFieldValidator('email', validateEmail);
    form.addFieldValidator('phone', validatePhone);
    form.addFieldValidator('postalCode', validatePostalCode);
  });
  
  // 处理字段变化
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, async (data) => {
    const { fieldName, value } = data;
    const form = kinlink.formApi;
    
    // 根据客户类型显示/隐藏字段
    if (fieldName === 'customerType') {
      if (value === 'business') {
        form.showField('companyName');
        form.showField('taxId');
        form.hideField('firstName');
        form.hideField('lastName');
      } else {
        form.hideField('companyName');
        form.hideField('taxId');
        form.showField('firstName');
        form.showField('lastName');
      }
    }
    
    // 输入税号时获取公司信息
    if (fieldName === 'taxId' && value) {
      try {
        form.showInfo('正在查询公司信息...');
        
        const companyInfo = await fetchCompanyInfo(value);
        
        if (companyInfo) {
          form.setFieldValue('companyName', companyInfo.name);
          form.setFieldValue('address', companyInfo.address);
          form.setFieldValue('city', companyInfo.city);
          form.setFieldValue('state', companyInfo.state);
          form.setFieldValue('postalCode', companyInfo.postalCode);
          form.setFieldValue('country', companyInfo.country);
          
          form.showSuccess('公司信息获取成功！');
        }
      } catch (error) {
        console.error('获取公司信息时出错:', error);
        form.showError('无法获取公司信息。请手动输入详细信息。');
      }
    }
    
    // 当所有地址字段填写完毕时验证地址
    if (['address', 'city', 'state', 'postalCode', 'country'].includes(fieldName)) {
      const address = form.getFieldValue('address');
      const city = form.getFieldValue('city');
      const state = form.getFieldValue('state');
      const postalCode = form.getFieldValue('postalCode');
      const country = form.getFieldValue('country');
      
      if (address && city && state && postalCode && country) {
        try {
          const isValid = await validateAddress(address, city, state, postalCode, country);
          
          if (isValid) {
            // 为地址字段应用成功样式
            ['address', 'city', 'state', 'postalCode', 'country'].forEach(field => {
              form.setFieldComponentStyle(field, {
                backgroundColor: '#f6ffed',
                borderColor: '#b7eb8f'
              });
            });
            
            form.showSuccess('地址验证成功！');
          } else {
            // 为地址字段应用错误样式
            ['address', 'city', 'state', 'postalCode', 'country'].forEach(field => {
              form.setFieldComponentStyle(field, {
                backgroundColor: '#fff2f0',
                borderColor: '#ffccc7'
              });
            });
            
            form.showWarning('无法验证地址。请检查是否有错误。');
          }
        } catch (error) {
          console.error('验证地址时出错:', error);
        }
      }
    }
    
    // 输入电子邮件时检查重复客户
    if (fieldName === 'email' && value) {
      try {
        const isDuplicate = await checkDuplicateCustomer(value);
        
        if (isDuplicate) {
          form.setFieldError('email', '我们系统中已存在使用此电子邮件的客户。');
          form.setFieldComponentStyle('email', {
            backgroundColor: '#fff2f0',
            borderColor: '#ffccc7'
          });
        } else {
          form.clearFieldError('email');
          form.setFieldComponentStyle('email', {
            backgroundColor: '#f6ffed',
            borderColor: '#b7eb8f'
          });
        }
      } catch (error) {
        console.error('检查重复客户时出错:', error);
      }
    }
  });
  
  // 提交前验证表单
  kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, async (data) => {
    const form = kinlink.formApi;
    const { values } = data;
    
    // 验证整个表单
    const validationResult = form.validateForm();
    
    if (!validationResult.isValid) {
      form.showError('提交前请修复验证错误。');
      return false;
    }
    
    // 执行最终地址验证
    try {
      const isAddressValid = await validateAddress(
        values.address,
        values.city,
        values.state,
        values.postalCode,
        values.country
      );
      
      if (!isAddressValid) {
        form.showWarning('无法验证地址。您是否要继续？');
        
        // 对于此示例，即使地址无效我们也允许提交
        // 在实际应用中，您可能希望提示用户确认
      }
    } catch (error) {
      console.error('验证地址时出错:', error);
    }
    
    // 向提交添加元数据
    values.submittedAt = new Date().toISOString();
    values.source = 'web_form';
    
    return true;
  });
  
  // 处理成功提交
  kinlink.events.on(kinlink.FormEvents.AFTER_SUBMIT, async (data) => {
    const { success, result } = data;
    const form = kinlink.formApi;
    
    if (success) {
      try {
        // 发送确认电子邮件
        await sendConfirmationEmail(
          form.getFieldValue('email'),
          form.getFieldValue('customerType') === 'business'
            ? form.getFieldValue('companyName')
            : \`\${form.getFieldValue('firstName')} \${form.getFieldValue('lastName')}\`
        );
        
        form.showSuccess('注册成功！已发送确认电子邮件。');
        
        // 延迟后重定向到感谢页面
        setTimeout(() => {
          window.location.href = '/thank-you';
        }, 3000);
      } catch (error) {
        console.error('发送确认电子邮件时出错:', error);
        form.showWarning('注册成功，但我们无法发送确认电子邮件。');
      }
    } else {
      form.showError('注册失败。请稍后再试。');
      console.error('提交错误:', result);
    }
  });
  
  // 电子邮件验证函数
  function validateEmail(value) {
    if (!value) return;
    if (!/^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$/.test(value)) {
      return '请输入有效的电子邮件地址';
    }
    return undefined;
  }
  
  // 电话验证函数
  function validatePhone(value) {
    if (!value) return;
    if (!/^\\+?[\\d\\s()-]{10,20}$/.test(value)) {
      return '请输入有效的电话号码';
    }
    return undefined;
  }
  
  // 邮政编码验证函数
  function validatePostalCode(value) {
    if (!value) return;
    
    const country = kinlink.formApi.getFieldValue('country');
    
    // 根据国家使用不同的验证规则
    if (country === 'US') {
      if (!/^\\d{5}(-\\d{4})?$/.test(value)) {
        return '请输入有效的美国邮政编码（例如，12345或12345-6789）';
      }
    } else if (country === 'CA') {
      if (!/^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$/.test(value)) {
        return '请输入有效的加拿大邮政编码（例如，A1A 1A1）';
      }
    } else if (country === 'UK') {
      if (!/^[A-Za-z]{1,2}\\d[A-Za-z\\d]? ?\\d[A-Za-z]{2}$/.test(value)) {
        return '请输入有效的英国邮政编码';
      }
    }
    
    return undefined;
  }
  
  // 地址验证函数（使用地理编码API）
  async function validateAddress(address, city, state, postalCode, country) {
    try {
      // 使用setTimeout模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际应用中，您会调用地理编码服务的API
      // 对于此示例，我们将模拟大多数情况下成功验证
      const simulatedSuccess = Math.random() > 0.2; // 80%成功率
      
      return simulatedSuccess;
    } catch (error) {
      console.error('验证地址时出错:', error);
      return false;
    }
  }
  
  // 检查重复客户函数
  async function checkDuplicateCustomer(email) {
    try {
      // 使用setTimeout模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际应用中，您会调用CRM系统的API
      // 对于此示例，我们将模拟对某些电子邮件域名发现重复
      const duplicateDomains = ['example.com', 'test.com', 'duplicate.com'];
      const emailDomain = email.split('@')[1];
      
      return duplicateDomains.includes(emailDomain);
    } catch (error) {
      console.error('检查重复客户时出错:', error);
      return false;
    }
  }
  
  // 获取公司信息函数
  async function fetchCompanyInfo(taxId) {
    try {
      // 使用setTimeout模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 在实际应用中，您会调用公司信息服务的API
      // 对于此示例，我们将为某些税号返回模拟数据
      if (taxId === '123456789') {
        return {
          name: 'Acme公司',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          postalCode: '12345',
          country: 'US'
        };
      } else if (taxId === '987654321') {
        return {
          name: '环球企业',
          address: '456 Market St',
          city: 'Somewhere',
          state: 'NY',
          postalCode: '67890',
          country: 'US'
        };
      }
      
      return null;
    } catch (error) {
      console.error('获取公司信息时出错:', error);
      return null;
    }
  }
  
  // 发送确认电子邮件函数
  async function sendConfirmationEmail(email, name) {
    try {
      // 使用setTimeout模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际应用中，您会调用电子邮件服务的API
      console.log(\`向\${email}发送\${name}的确认电子邮件\`);
      
      return true;
    } catch (error) {
      console.error('发送确认电子邮件时出错:', error);
      throw error;
    }
  }
})();`}
          language="javascript"
          filename="external-integration-example.js"
          showLineNumbers={true}
        />

        <h2>主要特性</h2>

        <h3>动态表单字段</h3>
        <p>表单根据客户类型（个人或企业）动态显示或隐藏字段。这创造了更专注的用户体验，只显示相关字段。</p>

        <h3>地址验证</h3>
        <p>
          表单使用模拟的地理编码API验证地址。在实际应用中，您会集成Google
          Maps地理编码API、SmartyStreets或类似服务。验证：
        </p>
        <ul>
          <li>在所有地址字段填写完毕时触发</li>
          <li>提供视觉反馈（绿色表示有效地址，红色表示无效）</li>
          <li>显示成功或警告消息</li>
        </ul>

        <h3>重复客户检查</h3>
        <p>表单在外部系统中检查重复客户，当输入电子邮件时。这有助于防止重复注册并提高数据质量。检查：</p>
        <ul>
          <li>当电子邮件字段变化时触发</li>
          <li>如果发现重复则显示错误消息</li>
          <li>提供视觉反馈（红色表示重复，绿色表示新客户）</li>
        </ul>

        <h3>公司信息查询</h3>
        <p>对于企业客户，表单可以根据税号获取公司信息。这为用户节省时间并确保准确的数据。查询：</p>
        <ul>
          <li>当输入税号时触发</li>
          <li>如果找到信息，自动填充公司名称和地址字段</li>
          <li>当信息获取成功时显示成功消息</li>
          <li>如果无法获取信息则显示错误消息</li>
        </ul>

        <h3>确认电子邮件</h3>
        <p>成功提交后，表单向客户发送确认电子邮件。这提供了即时反馈和注册确认。电子邮件：</p>
        <ul>
          <li>在表单成功提交后发送</li>
          <li>在电子邮件中使用客户的姓名或公司名称</li>
          <li>当电子邮件发送成功时显示成功消息</li>
          <li>如果电子邮件无法发送则显示警告</li>
        </ul>

        <h2>实现细节</h2>

        <h3>API集成</h3>
        <p>
          示例使用<code>setTimeout</code>模拟API调用，用于演示目的。在实际应用中，您会使用<code>fetch</code>{" "}
          API或类似方法替换这些为实际API调用。
        </p>

        <CodeBlock
          code={`// 使用fetch的真实API调用示例
async function validateAddress(address, city, state, postalCode, country) {
  try {
    const response = await fetch('https://api.example.com/geocode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        address,
        city,
        state,
        postalCode,
        country
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '地址验证失败');
    }
    
    return data.isValid;
  } catch (error) {
    console.error('验证地址时出错:', error);
    return false;
  }
}`}
          language="javascript"
          filename="real-api-call.js"
          showLineNumbers={true}
        />

        <h3>错误处理</h3>
        <p>示例包括所有API调用的全面错误处理。这确保即使外部服务不可用，表单也能继续工作。错误处理的关键方面：</p>
        <ul>
          <li>所有API调用都包装在try/catch块中</li>
          <li>错误记录到控制台以便调试</li>
          <li>在适当的情况下显示用户友好的错误消息</li>
          <li>即使某些外部服务失败，表单仍然可以提交</li>
        </ul>

        <h3>视觉反馈</h3>
        <p>示例通过以下方式为用户提供丰富的视觉反馈：</p>
        <ul>
          <li>字段的颜色编码样式（绿色表示成功，红色表示错误）</li>
          <li>成功、信息、警告和错误消息</li>
          <li>特定字段的错误消息</li>
        </ul>

        <h2>如何使用此示例</h2>

        <p>要在您自己的Kinlink表单中使用此示例：</p>

        <ol>
          <li>在您的Kinlink仪表板中创建一个包含必要字段的客户注册表单</li>
          <li>将此示例中的JavaScript代码复制到表单的自定义JavaScript部分</li>
          <li>将模拟的API调用替换为对您的外部系统的真实API调用</li>
          <li>更新API端点和认证详细信息</li>
          <li>自定义验证规则和错误消息以匹配您的需求</li>
          <li>测试表单以确保所有集成按预期工作</li>
        </ol>

        <h2>最佳实践</h2>

        <p>将Kinlink表单与外部系统集成时，请记住这些最佳实践：</p>

        <ul>
          <li>
            <strong>优雅处理API失败：</strong> 如果外部服务不可用，始终提供备选选项。
          </li>
          <li>
            <strong>考虑性能：</strong> 最小化API调用的数量并优化其时机，以避免减慢表单速度。
          </li>
          <li>
            <strong>保护您的API密钥：</strong> 切勿在客户端代码中暴露API密钥或敏感信息。
          </li>
          <li>
            <strong>提供清晰的反馈：</strong> 让用户知道外部操作何时正在进行、成功或失败。
          </li>
          <li>
            <strong>尊重用户隐私：</strong> 只收集和共享集成所需的最少数据量。
          </li>
          <li>
            <strong>彻底测试：</strong> 使用各种输入和边缘情况测试您的集成，以确保可靠性。
          </li>
        </ul>

        <h2>结论</h2>

        <p>
          将Kinlink表单与外部系统集成可以大大增强其功能和用户体验。通过连接地址验证、客户查询、公司信息和电子邮件服务的API，您可以创建更智能、更高效、更用户友好的表单。
        </p>
      </div>
    </div>
  )
}
