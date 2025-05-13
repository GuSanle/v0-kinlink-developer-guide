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

export const metadata = {
  title: "字段联动示例 - Kinlink开发者",
  description: "学习如何使用字段联动和条件逻辑创建动态表单。",
};

export default function FieldLinkingPage() {
  return (
    <div className="container py-6 lg:py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/examples">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">字段联动示例</h1>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p className="lead">
          本示例演示如何使用字段联动和条件逻辑创建动态表单。您将学习如何基于用户输入显示/隐藏字段、自动计算值，以及根据表单状态应用不同的验证规则。
        </p>

        <HighlightTabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">概述</TabsTrigger>
            <TabsTrigger value="code">代码</TabsTrigger>
            <TabsTrigger value="usage">使用方法</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <h2>您将学到什么</h2>
            <ul>
              <li>如何基于下拉选择显示和隐藏字段</li>
              <li>如何基于数量和价格输入计算总计</li>
              <li>如何根据表单状态应用不同的验证规则</li>
              <li>如何创建响应式和交互式表单体验</li>
            </ul>

            <h2>主要特性</h2>
            <ul>
              <li>
                <strong>动态字段可见性：</strong> 基于用户选择显示或隐藏字段
              </li>
              <li>
                <strong>自动计算：</strong> 自动计算总计并应用折扣
              </li>
              <li>
                <strong>条件验证：</strong> 根据表单状态应用不同的验证规则
              </li>
              <li>
                <strong>视觉反馈：</strong> 为用户提供清晰的视觉反馈
              </li>
            </ul>

            <h2>使用场景</h2>
            <ul>
              <li>带有产品选项和定价的订单表单</li>
              <li>基于用户类型有不同路径的注册表单</li>
              <li>带有条件问题的调查表单</li>
              <li>带有动态部分的申请表单</li>
            </ul>
          </TabsContent>

          <TabsContent value="code">
            <h2>完整示例</h2>
            <p>
              此代码演示了产品订单表单中的字段联动。它基于产品类型显示/隐藏字段，计算总计，并应用折扣。
            </p>

            <CodeBlock
              code={`(function() {
  // 表单加载时初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 初始隐藏附加字段
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
            />

            <h3>表单结构</h3>
            <p>此示例假设表单具有以下字段：</p>

            <CodeBlock
              code={`<form>
  <div data-field="productType">
    <label>产品类型</label>
    <select>
      <option value="standard">标准</option>
      <option value="premium">高级</option>
    </select>
  </div>
  
  <div data-field="quantity">
    <label>数量</label>
    <input type="number" min="1" />
  </div>
  
  <div data-field="price">
    <label>价格</label>
    <input type="number" min="0" step="0.01" />
  </div>
  
  <div data-field="total">
    <label>总计</label>
    <input type="number" readonly />
  </div>
  
  <div data-field="additionalInfo">
    <label>附加信息</label>
    <textarea></textarea>
  </div>
  
  <div data-field="premiumOptions">
    <label>高级选项</label>
    <select>
      <option value="">选择一个选项</option>
      <option value="discount">应用10%折扣</option>
      <option value="express">快递配送</option>
    </select>
  </div>
  
  <button type="submit">提交订单</button>
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
              <li>在标准和高级之间更改产品类型</li>
              <li>输入不同的数量和价格以查看总计更新</li>
              <li>为高级产品选择折扣选项</li>
              <li>使用有效和无效数据提交表单</li>
            </ul>

            <h3>自定义选项</h3>
            <p>您可以通过多种方式自定义此示例：</p>
            <ul>
              <li>添加更多具有不同字段和选项的产品类型</li>
              <li>实现不同的折扣率或计算方法</li>
              <li>为特定字段添加更多验证规则</li>
              <li>自定义成功和错误消息</li>
            </ul>

            <h3>最佳实践</h3>
            <ul>
              <li>
                <strong>清晰的用户反馈：</strong>{" "}
                当字段出现或消失时，始终提供清晰的反馈
              </li>
              <li>
                <strong>一致的验证：</strong> 确保验证规则一致且有意义
              </li>
              <li>
                <strong>性能：</strong> 注意可能影响性能的复杂计算
              </li>
              <li>
                <strong>无障碍：</strong> 确保在字段显示或隐藏时表单仍然可访问
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
          <Link href="/docs/api-reference/form-api">
            <Button variant="secondary">查看表单API文档</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
