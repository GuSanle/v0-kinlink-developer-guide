import { CodeBlock } from "@/components/code-block"

export default function FieldLinkingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">字段联动示例</h1>
        <p className="mt-2 text-lg text-muted-foreground">学习如何使用字段联动创建动态表单。</p>
      </div>

      <div className="docs-content">
        <p>
          字段联动是表单中的一种常见模式，其中一个字段的值会影响其他字段的行为。例如，您可能希望根据下拉菜单的选择显示或隐藏某些字段，或者根据多个字段的值计算总计。
        </p>

        <p>在本示例中，我们将创建一个具有以下字段联动行为的表单：</p>

        <ul>
          <li>根据下拉菜单选择显示/隐藏额外字段</li>
          <li>根据数量和价格字段计算总计</li>
          <li>根据表单状态应用不同的验证规则</li>
        </ul>

        <h2>示例代码</h2>

        <CodeBlock
          code={`(function() {
  // 表单加载时初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 初始隐藏额外字段
    form.hideField('additionalInfo');
    form.hideField('premiumOptions');
    
    // 设置数量和价格字段
    form.setFieldValue('quantity', 1);
    form.setFieldValue('price', 10);
    form.setFieldValue('total', 10);
    
    // 禁用总计字段（它是计算得出的）
    form.disableField('total');
    
    // 添加验证器
    form.addFieldValidator('quantity', (value) => {
      if (!value || value < 1) {
        return '数量必须至少为1';
      }
      return undefined;
    });
    
    form.addFieldValidator('price', (value) => {
      if (!value || value <= 0) {
        return '价格必须大于0';
      }
      return undefined;
    });
  });
  
  // 处理字段变化
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
    const { fieldName, value } = data;
    const form = kinlink.formApi;
    
    // 处理产品类型变化
    if (fieldName === 'productType') {
      if (value === 'premium') {
        form.showField('additionalInfo');
        form.showField('premiumOptions');
        
        // 为高级产品添加额外验证器
        form.addFieldValidator('additionalInfo', (value) => {
          if (!value || value.length < 10) {
            return '请提供详细信息（至少10个字符）';
          }
          return undefined;
        });
      } else {
        form.hideField('additionalInfo');
        form.hideField('premiumOptions');
        
        // 当字段隐藏时移除验证器
        form.removeFieldValidator('additionalInfo');
      }
    }
    
    // 当数量或价格变化时计算总计
    if (fieldName === 'quantity' || fieldName === 'price') {
      const quantity = Number(form.getFieldValue('quantity')) || 0;
      const price = Number(form.getFieldValue('price')) || 0;
      const total = quantity * price;
      
      form.setFieldValue('total', total);
    }
    
    // 如果选择了高级选项则应用折扣
    if (fieldName === 'premiumOptions' && value === 'discount') {
      const total = Number(form.getFieldValue('total')) || 0;
      const discountedTotal = total * 0.9; // 10%折扣
      
      form.setFieldValue('total', discountedTotal);
      form.showSuccess('已应用10%折扣！');
    }
  });
  
  // 提交前验证表单
  kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, (data) => {
    const { values } = data;
    const form = kinlink.formApi;
    
    // 执行最终验证
    const validationResult = form.validateForm();
    
    if (!validationResult.isValid) {
      form.showError('请在提交前修复验证错误。');
      return false; // 阻止提交
    }
    
    // 向提交添加时间戳
    values.submittedAt = new Date().toISOString();
    
    return true; // 允许提交
  });
})();`}
          language="javascript"
          filename="field-linking-example.js"
          showLineNumbers={true}
        />

        <h2>工作原理</h2>

        <h3>表单初始化</h3>
        <p>当表单加载时，我们通过以下方式初始化它：</p>
        <ul>
          <li>隐藏仅与高级产品相关的额外字段</li>
          <li>为数量、价格和总计字段设置默认值</li>
          <li>禁用总计字段，因为它是计算得出的</li>
          <li>为数量和价格字段添加验证器</li>
        </ul>

        <h3>字段联动逻辑</h3>
        <p>
          字段联动逻辑在<code>FIELD_CHANGE</code>事件处理程序中实现：
        </p>
        <ul>
          <li>当产品类型变为"premium"时，我们显示额外字段并为额外信息字段添加验证器</li>
          <li>当数量或价格变化时，我们计算总计</li>
          <li>当高级选项变为"discount"时，我们对总计应用10%的折扣</li>
        </ul>

        <h3>表单提交</h3>
        <p>在表单提交前，我们：</p>
        <ul>
          <li>验证整个表单</li>
          <li>如果有验证错误，显示错误消息</li>
          <li>向提交数据添加时间戳</li>
        </ul>

        <h2>最佳实践</h2>

        <ul>
          <li>
            使用<code>FORM_LOADED</code>事件初始化您的表单
          </li>
          <li>
            使用<code>FIELD_CHANGE</code>事件实现字段联动逻辑
          </li>
          <li>
            使用<code>BEFORE_SUBMIT</code>事件执行最终验证和数据准备
          </li>
          <li>使用验证器确保数据质量</li>
          <li>显示适当的消息引导用户</li>
        </ul>
      </div>
    </div>
  )
}
