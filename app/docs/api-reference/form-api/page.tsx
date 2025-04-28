import { CodeBlock } from "@/components/code-block"

export default function FormApiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">表单API</h1>
        <p className="mt-2 text-lg text-muted-foreground">用于操作表单字段和值的函数。</p>
      </div>

      <div className="docs-content">
        <p>
          表单API（<code>kinlink.formApi</code>
          ）提供了用于操作表单字段和值的函数。这包括获取和设置字段值、隐藏和显示字段、验证字段等功能。
        </p>

        <h2>字段值操作</h2>

        <h3>getFieldValue(code)</h3>
        <p>获取特定字段的值。</p>
        <CodeBlock
          code={`// 获取'name'字段的值
const name = kinlink.formApi.getFieldValue('name');
console.log(name); // 输出: "张三"`}
          language="javascript"
        />

        <h3>setFieldValue(code, value)</h3>
        <p>设置特定字段的值。</p>
        <CodeBlock
          code={`// 设置'name'字段的值
kinlink.formApi.setFieldValue('name', '李四');`}
          language="javascript"
        />

        <h3>getAllValues()</h3>
        <p>获取表单中所有字段的值。</p>
        <CodeBlock
          code={`// 获取所有表单值
const values = kinlink.formApi.getAllValues();
console.log(values); // 输出: { name: "张三", email: "zhang@example.com", ... }`}
          language="javascript"
        />

        <h3>setFieldsValue(values)</h3>
        <p>一次性设置多个字段的值。</p>
        <CodeBlock
          code={`// 设置多个字段值
kinlink.formApi.setFieldsValue({
  name: '李四',
  email: 'li@example.com',
  age: 30
});`}
          language="javascript"
        />

        <h2>字段可见性</h2>

        <h3>hideField(code)</h3>
        <p>完全隐藏字段（字段的值不会被提交）。</p>
        <CodeBlock
          code={`// 隐藏'additionalInfo'字段
kinlink.formApi.hideField('additionalInfo');`}
          language="javascript"
        />

        <h3>showField(code)</h3>
        <p>显示先前隐藏的字段。</p>
        <CodeBlock
          code={`// 显示'additionalInfo'字段
kinlink.formApi.showField('additionalInfo');`}
          language="javascript"
        />

        <h3>visuallyHideField(code)</h3>
        <p>视觉上隐藏字段但在表单提交中保留其值。</p>
        <CodeBlock
          code={`// 视觉上隐藏'hiddenId'字段
kinlink.formApi.visuallyHideField('hiddenId');`}
          language="javascript"
        />

        <h3>getFieldState(code)</h3>
        <p>获取字段的当前状态。</p>
        <CodeBlock
          code={`// 获取'name'字段的状态
const state = kinlink.formApi.getFieldState('name');
console.log(state); // 输出: { visible: true, disabled: false, excludeFromSubmit: false }`}
          language="javascript"
        />

        <h2>字段启用/禁用</h2>

        <h3>disableField(code)</h3>
        <p>禁用字段（使其为只读）。</p>
        <CodeBlock
          code={`// 禁用'readOnlyField'字段
kinlink.formApi.disableField('readOnlyField');`}
          language="javascript"
        />

        <h3>enableField(code)</h3>
        <p>启用先前禁用的字段。</p>
        <CodeBlock
          code={`// 启用'readOnlyField'字段
kinlink.formApi.enableField('readOnlyField');`}
          language="javascript"
        />

        <h2>验证</h2>

        <h3>addFieldValidator(code, validator)</h3>
        <p>为字段添加自定义验证器函数。</p>
        <CodeBlock
          code={`// 为'email'字段添加验证器
kinlink.formApi.addFieldValidator('email', (value) => {
  if (!value) return;
  if (!/^\\w+@\\w+\\.\\w+$/.test(value)) {
    return '请输入有效的电子邮件地址';
  }
  return undefined; // 验证通过
});`}
          language="javascript"
        />

        <h3>removeFieldValidator(code)</h3>
        <p>从字段中移除自定义验证器。</p>
        <CodeBlock
          code={`// 从'email'字段移除验证器
kinlink.formApi.removeFieldValidator('email');`}
          language="javascript"
        />

        <h3>validateField(code, value)</h3>
        <p>验证特定字段值。</p>
        <CodeBlock
          code={`// 验证'email'字段
const error = kinlink.formApi.validateField('email', 'invalid-email');
console.log(error); // 输出: "请输入有效的电子邮件地址"`}
          language="javascript"
        />

        <h3>validateForm()</h3>
        <p>验证整个表单。</p>
        <CodeBlock
          code={`// 验证整个表单
const result = kinlink.formApi.validateForm();
console.log(result); // 输出: { errors: { email: "请输入有效的电子邮件地址" }, isValid: false }`}
          language="javascript"
        />

        <h3>setFieldError(code, errorMsg)</h3>
        <p>为字段设置错误消息。</p>
        <CodeBlock
          code={`// 为'email'字段设置错误消息
kinlink.formApi.setFieldError('email', '此电子邮件已注册');`}
          language="javascript"
        />

        <h3>clearFieldError(code)</h3>
        <p>清除字段的错误消息。</p>
        <CodeBlock
          code={`// 清除'email'字段的错误消息
kinlink.formApi.clearFieldError('email');`}
          language="javascript"
        />

        <h3>setFieldsErrors(fieldErrors)</h3>
        <p>为多个字段设置错误消息。</p>
        <CodeBlock
          code={`// 为多个字段设置错误消息
kinlink.formApi.setFieldsErrors({
  email: '此电子邮件已注册',
  password: '密码必须至少8个字符'
});`}
          language="javascript"
        />

        <h3>setFieldLabelStyle(code, styleObject)</h3>
        <p>设置字段标签的CSS样式。</p>
        <CodeBlock
          code={`// 设置'name'字段标签的样式
kinlink.formApi.setFieldLabelStyle('name', {
  color: 'red',
  fontWeight: 'bold'
});`}
          language="javascript"
        />

        <h3>getFieldLabelStyle(code)</h3>
        <p>获取字段标签的当前自定义样式。</p>
        <CodeBlock
          code={`// 获取'name'字段标签的样式
const style = kinlink.formApi.getFieldLabelStyle('name');
console.log(style); // 输出: { color: "red", fontWeight: "bold" }`}
          language="javascript"
        />

        <h3>resetFieldLabelStyle(code)</h3>
        <p>将字段标签的样式重置为默认值。</p>
        <CodeBlock
          code={`// 重置'name'字段标签的样式
kinlink.formApi.resetFieldLabelStyle('name');`}
          language="javascript"
        />

        <h3>setFieldsLabelStyles(stylesMap)</h3>
        <p>设置多个字段标签的CSS样式。</p>
        <CodeBlock
          code={`// 设置多个字段标签的样式
kinlink.formApi.setFieldsLabelStyles({
  name: { color: 'red', fontWeight: 'bold' },
  email: { color: 'blue', fontStyle: 'italic' }
});`}
          language="javascript"
        />

        <h3>setFieldComponentStyle(code, styleObject)</h3>
        <p>设置字段组件（输入框、选择框等）的CSS样式。</p>
        <CodeBlock
          code={`// 设置'name'字段组件的样式
kinlink.formApi.setFieldComponentStyle('name', {
  backgroundColor: '#f0f0f0',
  padding: '10px'
});`}
          language="javascript"
        />

        <h3>getFieldComponentStyle(code)</h3>
        <p>获取字段组件的当前自定义样式。</p>
        <CodeBlock
          code={`// 获取'name'字段组件的样式
const style = kinlink.formApi.getFieldComponentStyle('name');
console.log(style); // 输出: { backgroundColor: "#f0f0f0", padding: "10px" }`}
          language="javascript"
        />

        <h3>resetFieldComponentStyle(code)</h3>
        <p>将字段组件的样式重置为默认值。</p>
        <CodeBlock
          code={`// 重置'name'字段组件的样式
kinlink.formApi.resetFieldComponentStyle('name');`}
          language="javascript"
        />

        <h3>setFieldsComponentStyles(stylesMap)</h3>
        <p>设置多个字段组件的CSS样式。</p>
        <CodeBlock
          code={`// 设置多个字段组件的样式
kinlink.formApi.setFieldsComponentStyles({
  name: { backgroundColor: '#f0f0f0', padding: '10px' },
  email: { backgroundColor: '#e0e0e0', padding: '8px' }
});`}
          language="javascript"
        />

        <h3>setFieldLabelText(code, newText)</h3>
        <p>设置字段标签的文本。</p>
        <CodeBlock
          code={`// 设置'name'字段标签的文本
kinlink.formApi.setFieldLabelText('name', '全名');`}
          language="javascript"
        />

        <h3>resetFieldLabelText(code)</h3>
        <p>将字段标签的文本重置为原始值。</p>
        <CodeBlock
          code={`// 重置'name'字段标签的文本
kinlink.formApi.resetFieldLabelText('name');`}
          language="javascript"
        />

        <h2>消息</h2>

        <h3>showMessage(type, content, duration)</h3>
        <p>显示指定类型的消息。</p>
        <CodeBlock
          code={`// 显示信息消息
kinlink.formApi.showMessage('info', '这是一条信息消息', 5);`}
          language="javascript"
        />

        <h3>showSuccess(content, duration)</h3>
        <p>显示成功消息。</p>
        <CodeBlock
          code={`// 显示成功消息
kinlink.formApi.showSuccess('表单提交成功！');`}
          language="javascript"
        />

        <h3>showError(content, duration)</h3>
        <p>显示错误消息。</p>
        <CodeBlock
          code={`// 显示错误消息
kinlink.formApi.showError('提交表单时发生错误。');`}
          language="javascript"
        />

        <h3>showInfo(content, duration)</h3>
        <p>显示信息消息。</p>
        <CodeBlock
          code={`// 显示信息消息
kinlink.formApi.showInfo('请填写所有必填字段。');`}
          language="javascript"
        />

        <h3>showWarning(content, duration)</h3>
        <p>显示警告消息。</p>
        <CodeBlock
          code={`// 显示警告消息
kinlink.formApi.showWarning('您即将提交不完整的信息。');`}
          language="javascript"
        />

        <h3>clearAllMessages()</h3>
        <p>清除所有当前显示的消息。</p>
        <CodeBlock
          code={`// 清除所有消息
kinlink.formApi.clearAllMessages();`}
          language="javascript"
        />

        <h2>表单提交</h2>

        <h3>submit()</h3>
        <p>触发表单提交过程。</p>
        <CodeBlock
          code={`// 提交表单
kinlink.formApi.submit();`}
          language="javascript"
        />
      </div>
    </div>
  )
}
