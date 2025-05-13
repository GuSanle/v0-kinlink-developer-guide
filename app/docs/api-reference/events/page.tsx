import { CodeBlock } from "@/components/code-block";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">事件</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          用于响应表单生命周期事件的事件系统。
        </p>
      </div>

      <div className="docs-content">
        <p>
          Kinlink事件系统允许您响应各种表单生命周期事件，例如表单加载时、字段值变化时以及表单提交前后。这使您能够创建动态和交互式表单。
        </p>

        <h2>事件注册</h2>

        <h3>on(eventName, callback)</h3>
        <p>注册一个回调函数，在指定事件发生时调用。</p>
        <CodeBlock
          code={`// 注册事件监听器
const listenerId = kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
  console.log('表单已加载');
  // 在此初始化表单逻辑
});`}
          language="javascript"
        />

        <h3>off(eventName, listenerId)</h3>
        <p>移除先前注册的事件监听器。</p>
        <CodeBlock
          code={`// 移除事件监听器
kinlink.events.off(kinlink.FormEvents.FORM_LOADED, listenerId);`}
          language="javascript"
        />

        <h2>可用事件</h2>

        <p>
          Kinlink提供了几个预定义的事件，您可以监听这些事件。这些事件可通过
          <code>kinlink.FormEvents</code>对象获取。
        </p>

        <h3>FORM_LOADED</h3>
        <p>在表单加载完成并准备好交互时触发。这是初始化表单逻辑的理想位置。</p>
        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.FORM_LOADED, (data) => {
  // data是一个简单对象，表示表单已加载
  const form = kinlink.formApi;
  
  // 初始化表单逻辑
  form.hideField('additionalInfo');
  form.addFieldValidator('email', (value) => {
    if (!value) return;
    if (!/^\\w+@\\w+\\.\\w+$/.test(value)) {
      return '请输入有效的电子邮件地址';
    }
    return undefined; // 验证通过
  });
});`}
          language="javascript"
          filename="form-loaded-event.js"
        />

        <h3>FIELD_CHANGE</h3>
        <p>
          在字段值变化时触发。这对于实现字段联动和基于用户输入的动态行为非常有用。
        </p>
        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
  const { fieldName, value } = data;
  const form = kinlink.formApi;
  
  // 实现字段联动逻辑
  if (fieldName === 'productType') {
    if (value === 'premium') {
      form.showField('additionalInfo');
    } else {
      form.hideField('additionalInfo');
    }
  }
  
  // 计算派生值
  if (fieldName === 'quantity' || fieldName === 'price') {
    const quantity = Number(form.getFieldValue('quantity')) || 0;
    const price = Number(form.getFieldValue('price')) || 0;
    form.setFieldValue('total', quantity * price);
  }
});`}
          language="javascript"
          filename="field-change-event.js"
        />

        <h3>BEFORE_SUBMIT</h3>
        <p>
          在表单提交前触发。这使您有机会执行最终验证、修改提交数据或在必要时阻止提交。
        </p>
        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, (data) => {
  const { values } = data;
  const form = kinlink.formApi;
  
  // 执行最终验证
  const validationResult = form.validateForm();
  if (!validationResult.isValid) {
    form.showError('请在提交前修复验证错误。');
    return false; // 阻止提交
  }
  
  // 修改提交数据
  values.submittedAt = new Date().toISOString();
  values.browser = navigator.userAgent;
  
  // 允许提交
  return true;
});`}
          language="javascript"
          filename="before-submit-event.js"
        />

        <h3>AFTER_SUBMIT</h3>
        <p>
          在表单提交后触发。这对于显示成功消息、重定向用户或执行其他提交后操作非常有用。
        </p>
        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.AFTER_SUBMIT, (data) => {
  const { result, success } = data;
  
  if (success) {
    // 显示成功消息
    kinlink.formApi.showSuccess('表单提交成功！');
    
    // 延迟后重定向
    setTimeout(() => {
      window.location.href = '/thank-you';
    }, 2000);
  } else {
    // 处理提交失败
    kinlink.formApi.showError('提交表单失败。请重试。');
    console.error('提交错误:', result);
  }
});`}
          language="javascript"
          filename="after-submit-event.js"
        />

        <h2>事件回调参数</h2>

        <p>
          每种事件类型为其回调函数提供不同的参数。以下是每个事件回调接收的详细说明：
        </p>

        <h3>FORM_LOADED 回调</h3>
        <p>回调接收一个简单对象，表示表单已加载。没有特定的属性可以访问。</p>
        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.FORM_LOADED, (data) => {
  // data是一个简单对象
  console.log('表单已加载');
});`}
          language="javascript"
        />

        <h3>FIELD_CHANGE 回调</h3>
        <p>
          回调接收一个带有<code>fieldName</code>和<code>value</code>
          属性的对象，表示哪个字段发生了变化及其新值。
        </p>
        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
  const { fieldName, value } = data;
  console.log(\`字段 \${fieldName} 变为 \${value}\`);
  
  // 注意：在此修改'value'不会影响表单
  // 使用kinlink.formApi.setFieldValue()来更改字段值
});`}
          language="javascript"
        />

        <h3>BEFORE_SUBMIT 回调</h3>
        <p>
          回调接收一个带有<code>values</code>
          属性的对象，这是提交数据的引用。您可以修改此对象以更改提交内容。
        </p>
        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, (data) => {
  const { values } = data;
  
  // 您可以修改提交数据
  values.timestamp = Date.now();
  
  // 返回false阻止提交，或返回true允许提交
  return true;
});`}
          language="javascript"
        />

        <h3>AFTER_SUBMIT 回调</h3>
        <p>
          回调接收一个带有<code>result</code>和<code>success</code>
          属性的对象，表示服务器的响应以及提交是否成功。
        </p>
        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.AFTER_SUBMIT, (data) => {
  const { result, success } = data;
  
  if (success) {
    console.log('提交成功:', result);
  } else {
    console.error('提交失败:', result);
  }
});`}
          language="javascript"
        />

        <h2>完整示例</h2>

        <p>以下是使用所有可用事件的完整示例：</p>

        <CodeBlock
          code={`(function() {
  // 表单初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 初始化表单状态
    form.hideField('additionalInfo');
    form.setFieldValue('quantity', 1);
    form.setFieldValue('price', 10);
    form.setFieldValue('total', 10);
    
    // 禁用计算字段
    form.disableField('total');
    
    // 添加验证器
    form.addFieldValidator('email', (value) => {
      if (!value) return;
      if (!/^\\w+@\\w+\\.\\w+$/.test(value)) {
        return '请输入有效的电子邮件地址';
      }
      return undefined;
    });
    
    console.log('表单已初始化');
  });
  
  // 字段联动
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
    const { fieldName, value } = data;
    const form = kinlink.formApi;
    
    // 基于产品类型显示/隐藏字段
    if (fieldName === 'productType') {
      if (value === 'premium') {
        form.showField('additionalInfo');
      } else {
        form.hideField('additionalInfo');
      }
    }
    
    // 计算总计
    if (fieldName === 'quantity' || fieldName === 'price') {
      const quantity = Number(form.getFieldValue('quantity')) || 0;
      const price = Number(form.getFieldValue('price')) || 0;
      form.setFieldValue('total', quantity * price);
    }
  });
  
  // 提交前验证和数据准备
  kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, (data) => {
    const { values } = data;
    const form = kinlink.formApi;
    
    // 最终验证
    const validationResult = form.validateForm();
    if (!validationResult.isValid) {
      form.showError('请在提交前修复验证错误。');
      return false; // 阻止提交
    }
    
    // 向提交添加元数据
    values.submittedAt = new Date().toISOString();
    values.browser = navigator.userAgent;
    
    return true; // 允许提交
  });
  
  // 提交后操作
  kinlink.events.on(kinlink.FormEvents.AFTER_SUBMIT, (data) => {
    const { result, success } = data;
    
    if (success) {
      // 显示成功消息
      kinlink.formApi.showSuccess('表单提交成功！');
      
      // 延迟后重定向
      setTimeout(() => {
        window.location.href = '/thank-you?id=' + result.id;
      }, 2000);
    } else {
      // 处理提交失败
      kinlink.formApi.showError('提交表单失败。请重试。');
      console.error('提交错误:', result);
    }
  });
})();`}
          language="javascript"
          filename="complete-events-example.js"
        />

        <h2>最佳实践</h2>

        <ul>
          <li>
            <strong>使用IIFE模式：</strong>{" "}
            将您的事件处理程序包装在立即调用的函数表达式（IIFE）中，以避免污染全局作用域。
          </li>
          <li>
            <strong>在FORM_LOADED中初始化：</strong>{" "}
            在FORM_LOADED事件处理程序中执行所有表单初始化，以确保表单已准备就绪。
          </li>
          <li>
            <strong>保持FIELD_CHANGE处理程序高效：</strong>{" "}
            字段变化处理程序频繁运行，因此保持它们高效以维持良好的性能。
          </li>
          <li>
            <strong>从BEFORE_SUBMIT返回布尔值：</strong>{" "}
            始终从BEFORE_SUBMIT处理程序返回布尔值，以明确指示是否应继续提交。
          </li>
          <li>
            <strong>在AFTER_SUBMIT中处理错误：</strong>{" "}
            始终在AFTER_SUBMIT处理程序中检查成功标志，并向用户提供适当的反馈。
          </li>
        </ul>
      </div>
    </div>
  );
}
