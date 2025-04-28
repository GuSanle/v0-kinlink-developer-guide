import Link from "next/link"
import { CodeBlock } from "@/components/code-block"

export default function ApiReferencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">API参考</h1>
        <p className="mt-2 text-lg text-muted-foreground">Kinlink JavaScript API的综合文档。</p>
      </div>

      <div className="docs-content">
        <p>
          Kinlink JavaScript
          API提供了一组函数和事件，允许您自定义Kinlink表单的行为。本参考文档涵盖了所有可用的API及其使用方法。
        </p>

        <h2>核心API</h2>

        <p>
          Kinlink API可通过全局<code>window.kinlink</code>对象访问，该对象提供对以下核心API的访问：
        </p>

        <ul>
          <li>
            <Link href="/docs/api-reference/form-api" className="font-medium underline underline-offset-4">
              formApi
            </Link>{" "}
            - 用于操作表单字段和值的函数
          </li>
          <li>
            <Link href="/docs/api-reference/layout-api" className="font-medium underline underline-offset-4">
              layoutApi
            </Link>{" "}
            - 用于控制表单布局的函数
          </li>
          <li>
            <Link href="/docs/api-reference/events" className="font-medium underline underline-offset-4">
              events
            </Link>{" "}
            - 用于响应表单事件的事件系统
          </li>
        </ul>

        <CodeBlock
          code={`// Global Kinlink object
window.kinlink = {
  // Form operations API
  formApi: {
    getFieldValue, setFieldValue, getAllValues, setFieldsValue,
    hideField, showField, visuallyHideField, getFieldState,
    disableField, enableField,
    addFieldValidator, removeFieldValidator, validateField, validateForm,
    setFieldError, clearFieldError, setFieldsErrors,
    // ... and more
  },
  
  // Layout control API
  layoutApi: {
    getHeaderHeight, isHeaderVisible, hideHeader, showHeader,
    getFooterHeight, isFooterVisible, hideFooter, showFooter,
    isSubmitButtonVisible, hideSubmitButton, showSubmitButton,
    // ... and more
  },
  
  // Event system
  events: {
    on, off
  },
  
  // Event types
  FormEvents: {
    FORM_LOADED, FIELD_CHANGE, BEFORE_SUBMIT, AFTER_SUBMIT
  },
  
  // Other properties
  version: "1.0.0",
  formFields: { /* field configuration */ }
}`}
          language="javascript"
          filename="kinlink-api-structure.js"
        />

        <h2>API使用入门</h2>

        <p>要使用Kinlink API，您通常会编写在表单加载时或特定事件发生时运行的JavaScript代码。以下是一个简单的示例：</p>

        <CodeBlock
          code={`(function() {
  // Listen for the form loaded event
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // Hide a field initially
    form.hideField('additionalInfo');
    
    // Add a custom validator to the email field
    form.addFieldValidator('email', (value) => {
      if (!value) return;
      if (!/^\\w+@\\w+\\.\\w+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return undefined; // Validation passed
    });
  });
  
  // Listen for field changes
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
    const { fieldName, value } = data;
    const form = kinlink.formApi;
    
    // Show/hide the additional info field based on the type field
    if (fieldName === 'type' && value === 'premium') {
      form.showField('additionalInfo');
    } else if (fieldName === 'type') {
      form.hideField('additionalInfo');
    }
  });
})();`}
          language="javascript"
          filename="example-usage.js"
          showLineNumbers={true}
        />

        <p>浏览特定的API部分，了解每个函数和事件的详细文档：</p>

        <ul>
          <li>
            <Link href="/docs/api-reference/form-api" className="font-medium underline underline-offset-4">
              表单API
            </Link>
          </li>
          <li>
            <Link href="/docs/api-reference/layout-api" className="font-medium underline underline-offset-4">
              布局API
            </Link>
          </li>
          <li>
            <Link href="/docs/api-reference/events" className="font-medium underline underline-offset-4">
              事件
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
