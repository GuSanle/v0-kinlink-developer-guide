import { CodeBlock } from "@/components/code-block"

export default function MobileAdaptationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">移动端适配指南</h1>
        <p className="mt-2 text-lg text-muted-foreground">了解如何为移动设备优化Kinlink表单。</p>
      </div>

      <div className="docs-content">
        <p>为现代Web应用程序创建良好的移动体验至关重要。Kinlink提供了多种API和技术，帮助您为移动设备优化表单。</p>

        <h2>检测移动设备</h2>

        <p>Kinlink提供了一个实用函数来检测当前设备是否为移动设备：</p>

        <CodeBlock
          code={`// 检查当前设备是否为移动设备
if (kinlink.layoutApi.checkIsMobileDevice()) {
  // 移动端特定代码
} else {
  // 桌面端特定代码
}`}
          language="javascript"
        />

        <p>此函数使用媒体查询来检查视口宽度是否小于或等于575px，这是Kinlink中移动设备的标准断点。</p>

        <h2>移动端特定布局</h2>

        <p>移动设备的屏幕空间有限，因此优化表单布局对移动设备很重要。以下是一些技巧：</p>

        <h3>简化表单</h3>

        <CodeBlock
          code={`// 在移动端隐藏非必要字段
if (kinlink.layoutApi.checkIsMobileDevice()) {
  const form = kinlink.formApi;
  
  // 隐藏次要字段
  ['secondaryField1', 'secondaryField2', 'detailedDescription'].forEach(field => {
    form.hideField(field);
  });
  
  // 显示复杂字段的简化版本
  form.hideField('complexTable');
  form.showField('simplifiedTable');
}`}
          language="javascript"
          filename="simplify-mobile-form.js"
        />

        <h3>优化输入字段</h3>

        <CodeBlock
          code={`// 使输入字段在移动端更易于触摸
if (kinlink.layoutApi.checkIsMobileDevice()) {
  const form = kinlink.formApi;
  
  // 使输入字段更大，更容易点击
  ['name', 'email', 'phone'].forEach(field => {
    form.setFieldComponentStyle(field, {
      fontSize: '16px',
      padding: '12px 8px',
      height: 'auto'
    });
  });
}`}
          language="javascript"
          filename="optimize-mobile-inputs.js"
        />

        <h2>移动端表单操作栏</h2>

        <p>Kinlink提供了一个固定在屏幕底部的移动端特定表单操作栏。这对于在移动设备上提供表单操作的便捷访问非常有用。</p>

        <h3>管理移动端表单操作栏</h3>

        <CodeBlock
          code={`// 检查移动端表单操作栏是否可见
const isVisible = kinlink.layoutApi.mobileIsFormActionBarVisible();

// 隐藏移动端表单操作栏
kinlink.layoutApi.mobileHideFormActionBar();

// 显示移动端表单操作栏
kinlink.layoutApi.mobileShowFormActionBar();

// 切换移动端表单操作栏
kinlink.layoutApi.toggleFormActionBar();

// 获取移动端表单操作栏的高度
const height = kinlink.layoutApi.mobileGetFormActionBarHeight();`}
          language="javascript"
          filename="mobile-action-bar-api.js"
        />

        <h3>自定义移动端操作栏</h3>

        <p>您可以创建自定义移动端操作栏来替代默认操作栏：</p>

        <CodeBlock
          code={`// 创建自定义移动端操作栏
if (kinlink.layoutApi.checkIsMobileDevice()) {
  // 隐藏默认操作栏
  kinlink.layoutApi.mobileHideFormActionBar();
  
  // 创建自定义操作栏
  const customBar = document.createElement('div');
  customBar.style.position = 'fixed';
  customBar.style.bottom = '0';
  customBar.style.left = '0';
  customBar.style.right = '0';
  customBar.style.height = '70px';
  customBar.style.backgroundColor = '#f5f5f5';
  customBar.style.display = 'flex';
  customBar.style.justifyContent = 'space-between';
  customBar.style.padding = '10px 20px';
  customBar.style.zIndex = '1000';
  
  // 添加自定义按钮
  const saveBtn = document.createElement('button');
  saveBtn.innerText = '保存草稿';
  saveBtn.onclick = () => {
    // 保存草稿逻辑
    kinlink.formApi.showSuccess('草稿已保存！');
  };
  customBar.appendChild(saveBtn);
  
  const submitBtn = document.createElement('button');
  submitBtn.innerText = '提交表单';
  submitBtn.onclick = () => kinlink.formApi.submit();
  customBar.appendChild(submitBtn);
  
  document.body.appendChild(customBar);
}`}
          language="javascript"
          filename="custom-mobile-action-bar.js"
          showLineNumbers={true}
        />

        <h2>响应式布局调整</h2>

        <p>您可以根据可用内容区域高度调整表单布局：</p>

        <CodeBlock
          code={`// 获取可用内容区域高度
const contentHeight = kinlink.layoutApi.getContentAreaHeight();

// 监听布局变化
const cleanup = kinlink.layoutApi.onLayoutChange((detail) => {
  console.log('布局已变更:', detail);
  
  // 重新计算内容区域高度
  const newContentHeight = kinlink.layoutApi.getContentAreaHeight();
  console.log('新内容高度:', newContentHeight);
  
  // 根据新高度调整布局
  // ...
});

// 不再需要时清理监听器
cleanup();`}
          language="javascript"
          filename="responsive-layout.js"
        />

        <h2>移动端表单最佳实践</h2>

        <ul>
          <li>
            <strong>简化表单：</strong> 在移动端隐藏非必要字段并简化复杂输入。
          </li>
          <li>
            <strong>使用更大的触摸目标：</strong> 使按钮和输入框在移动端更大、更容易点击。
          </li>
          <li>
            <strong>为竖屏方向优化：</strong> 大多数移动用户会在竖屏方向使用您的表单。
          </li>
          <li>
            <strong>减少输入：</strong> 使用下拉菜单、单选按钮和其他需要较少输入的输入类型。
          </li>
          <li>
            <strong>使用适当的输入类型：</strong> 为每个字段使用适当的输入类型（例如，<code>tel</code>用于电话号码，
            <code>email</code>用于电子邮件地址）。
          </li>
          <li>
            <strong>在真实设备上测试：</strong> 在真实移动设备上测试您的表单，以确保良好的用户体验。
          </li>
        </ul>

        <h2>完整示例</h2>

        <CodeBlock
          code={`(function() {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    // 检测当前设备是否为移动设备
    const isMobile = kinlink.layoutApi.checkIsMobileDevice();
    const form = kinlink.formApi;
    
    if (isMobile) {
      // 移动端特定设置
      
      // 隐藏复杂字段
      form.hideField('detailedTable');
      form.showField('simplifiedTable');
      
      // 使输入更易于触摸
      ['name', 'email', 'phone'].forEach(field => {
        form.setFieldComponentStyle(field, {
          fontSize: '16px',
          padding: '12px 8px',
          height: 'auto'
        });
      });
      
      // 创建自定义移动端操作栏
      kinlink.layoutApi.mobileHideFormActionBar();
      
      const customBar = document.createElement('div');
      customBar.style.position = 'fixed';
      customBar.style.bottom = '0';
      customBar.style.left = '0';
      customBar.style.right = '0';
      customBar.style.height = '70px';
      customBar.style.backgroundColor = '#f5f5f5';
      customBar.style.display = 'flex';
      customBar.style.justifyContent = 'space-between';
      customBar.style.padding = '10px 20px';
      customBar.style.zIndex = '1000';
      
      const saveBtn = document.createElement('button');
      saveBtn.innerText = '保存草稿';
      saveBtn.style.padding = '10px 20px';
      saveBtn.style.backgroundColor = '#e0e0e0';
      saveBtn.style.border = 'none';
      saveBtn.style.borderRadius = '4px';
      saveBtn.onclick = () => {
        form.showSuccess('草稿已保存！');
      };
      customBar.appendChild(saveBtn);
      
      const submitBtn = document.createElement('button');
      submitBtn.innerText = '提交表单';
      submitBtn.style.padding = '10px 20px';
      submitBtn.style.backgroundColor = '#1890ff';
      submitBtn.style.color = 'white';
      submitBtn.style.border = 'none';
      submitBtn.style.borderRadius = '4px';
      submitBtn.onclick = () => form.submit();
      customBar.appendChild(submitBtn);
      
      document.body.appendChild(customBar);
    } else {
      // 桌面端特定设置
      
      // 显示所有字段
      form.showField('detailedTable');
      form.hideField('simplifiedTable');
    }
    
    // 监听布局变化
    kinlink.layoutApi.onLayoutChange((detail) => {
      console.log('布局已变更:', detail);
      
      // 重新计算内容区域高度
      const contentHeight = kinlink.layoutApi.getContentAreaHeight();
      console.log('内容高度:', contentHeight);
      
      // 根据新高度调整布局
      // ...
    });
  });
})();`}
          language="javascript"
          filename="complete-mobile-adaptation.js"
          showLineNumbers={true}
        />
      </div>
    </div>
  )
}
