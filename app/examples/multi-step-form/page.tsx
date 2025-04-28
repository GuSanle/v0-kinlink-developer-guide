import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "多步骤表单示例 - Kinlink开发者",
  description: "学习如何创建带有进度跟踪和验证的多步骤注册表单。",
}

export default function MultiStepFormPage() {
  return (
    <div className="container py-6 lg:py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/examples">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">多步骤表单示例</h1>
      </div>

      <div className="prose prose-blue dark:prose-invert max-w-none">
        <p className="lead">本示例演示如何创建带有进度跟踪、每步验证和最终提交前摘要审核的多步骤注册表单。</p>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">概述</TabsTrigger>
            <TabsTrigger value="code">代码</TabsTrigger>
            <TabsTrigger value="usage">使用方法</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <h2>您将学到什么</h2>
            <ul>
              <li>如何创建带有进度跟踪的多步骤表单</li>
              <li>如何在进入下一步之前验证每个步骤</li>
              <li>如何在最终提交前创建摘要审核</li>
              <li>如何管理步骤之间的导航</li>
            </ul>

            <h2>主要特性</h2>
            <ul>
              <li>
                <strong>步骤导航：</strong> 带有验证的步骤之间移动
              </li>
              <li>
                <strong>进度指示器：</strong> 当前步骤和完成状态的视觉指示器
              </li>
              <li>
                <strong>步骤验证：</strong> 在进入下一步之前验证每个步骤
              </li>
              <li>
                <strong>摘要审核：</strong> 在提交前显示所有输入的信息
              </li>
            </ul>

            <h2>使用场景</h2>
            <ul>
              <li>带有多个部分的注册表单</li>
              <li>带有不同信息类别的申请表单</li>
              <li>带有分组问题的调查表单</li>
              <li>带有多个步骤的结账流程</li>
            </ul>
          </TabsContent>

          <TabsContent value="code">
            <h2>完整示例</h2>
            <p>此代码演示了一个带有个人信息、联系方式、账户设置和最终审核步骤的多步骤注册表单。</p>

            <CodeBlock
              code={`(function() {
  // 定义表单中的步骤
  const STEPS = [
    { id: 'personal', title: '个人信息' },
    { id: 'contact', title: '联系方式' },
    { id: 'account', title: '账户详情' },
    { id: 'review', title: '审核与提交' }
  ];
  
  // 当前步骤索引
  let currentStepIndex = 0;
  
  // 表单加载时初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 隐藏除第一个步骤外的所有步骤
    hideAllStepsExcept('personal');
    
    // 初始化进度指示器
    createProgressIndicator();
    
    // 添加导航按钮
    addNavigationButtons();
    
    // 添加验证器
    addValidators();
  });
  
  // 隐藏除指定步骤外的所有步骤的函数
  function hideAllStepsExcept(stepId) {
    const form = kinlink.formApi;
    
    // 定义每个步骤的字段
    const stepFields = {
      personal: ['firstName', 'lastName', 'birthDate'],
      contact: ['email', 'phone', 'address', 'city', 'state', 'postalCode'],
      account: ['username', 'password', 'confirmPassword', 'termsAccepted'],
      review: ['reviewSection']
    };
    
    // 隐藏所有字段
    Object.values(stepFields).flat().forEach(field => {
      form.hideField(field);
    });
    
    // 显示当前步骤的字段
    stepFields[stepId].forEach(field => {
      form.showField(field);
    });
    
    // 更新进度指示器
    updateProgressIndicator();
  }
  
  // 创建进度指示器的函数
  function createProgressIndicator() {
    const form = document.querySelector('form');
    const progressContainer = document.createElement('div');
    progressContainer.id = 'progress-indicator';
    progressContainer.style.display = 'flex';
    progressContainer.style.justifyContent = 'space-between';
    progressContainer.style.marginBottom = '2rem';
    
    STEPS.forEach((step, index) => {
      const stepElement = document.createElement('div');
      stepElement.className = 'step';
      stepElement.dataset.step = step.id;
      stepElement.style.display = 'flex';
      stepElement.style.flexDirection = 'column';
      stepElement.style.alignItems = 'center';
      stepElement.style.flex = '1';
      
      const stepNumber = document.createElement('div');
      stepNumber.className = 'step-number';
      stepNumber.textContent = index + 1;
      stepNumber.style.width = '30px';
      stepNumber.style.height = '30px';
      stepNumber.style.borderRadius = '50%';
      stepNumber.style.backgroundColor = index === 0 ? '#1890ff' : '#d9d9d9';
      stepNumber.style.color = index === 0 ? 'white' : 'black';
      stepNumber.style.display = 'flex';
      stepNumber.style.alignItems = 'center';
      stepNumber.style.justifyContent = 'center';
      stepNumber.style.fontWeight = 'bold';
      
      const stepTitle = document.createElement('div');
      stepTitle.className = 'step-title';
      stepTitle.textContent = step.title;
      stepTitle.style.marginTop = '0.5rem';
      stepTitle.style.fontSize = '0.875rem';
      stepTitle.style.color = index === 0 ? '#1890ff' : '#666';
      
      stepElement.appendChild(stepNumber);
      stepElement.appendChild(stepTitle);
      
      if (index < STEPS.length - 1) {
        const line = document.createElement('div');
        line.className = 'step-line';
        line.style.flex = '1';
        line.style.height = '2px';
        line.style.backgroundColor = '#d9d9d9';
        line.style.margin = '15px 0.5rem 0 0.5rem';
        
        progressContainer.appendChild(stepElement);
        progressContainer.appendChild(line);
      } else {
        progressContainer.appendChild(stepElement);
      }
    });
    
    // 插入到表单顶部
    form.insertBefore(progressContainer, form.firstChild);
  }
  
  // 更新进度指示器的函数
  function updateProgressIndicator() {
    const stepElements = document.querySelectorAll('.step');
    const stepLines = document.querySelectorAll('.step-line');
    
    stepElements.forEach((stepElement, index) => {
      const stepNumber = stepElement.querySelector('.step-number');
      const stepTitle = stepElement.querySelector('.step-title');
      
      if (index < currentStepIndex) {
        // 已完成步骤
        stepNumber.style.backgroundColor = '#52c41a';
        stepNumber.style.color = 'white';
        stepTitle.style.color = '#52c41a';
      } else if (index === currentStepIndex) {
        // 当前步骤
        stepNumber.style.backgroundColor = '#1890ff';
        stepNumber.style.color = 'white';
        stepTitle.style.color = '#1890ff';
      } else {
        // 未来步骤
        stepNumber.style.backgroundColor = '#d9d9d9';
        stepNumber.style.color = 'black';
        stepTitle.style.color = '#666';
      }
    });
    
    // 更新线条
    stepLines.forEach((line, index) => {
      if (index < currentStepIndex) {
        line.style.backgroundColor = '#52c41a';
      } else {
        line.style.backgroundColor = '#d9d9d9';
      }
    });
  }
  
  // 添加导航按钮的函数
  function addNavigationButtons() {
    const form = document.querySelector('form');
    const navigationContainer = document.createElement('div');
    navigationContainer.id = 'navigation-buttons';
    navigationContainer.style.display = 'flex';
    navigationContainer.style.justifyContent = 'space-between';
    navigationContainer.style.marginTop = '2rem';
    
    const prevButton = document.createElement('button');
    prevButton.id = 'prev-button';
    prevButton.type = 'button';
    prevButton.textContent = '上一步';
    prevButton.style.padding = '0.5rem 1rem';
    prevButton.style.backgroundColor = 'transparent';
    prevButton.style.border = '1px solid #d9d9d9';
    prevButton.style.borderRadius = '4px';
    prevButton.style.cursor = 'pointer';
    prevButton.style.display = 'none'; // 初始隐藏
    
    const nextButton = document.createElement('button');
    nextButton.id = 'next-button';
    nextButton.type = 'button';
    nextButton.textContent = '下一步';
    nextButton.style.padding = '0.5rem 1rem';
    nextButton.style.backgroundColor = '#1890ff';
    nextButton.style.color = 'white';
    nextButton.style.border = 'none';
    nextButton.style.borderRadius = '4px';
    nextButton.style.cursor = 'pointer';
    
    const submitButton = document.createElement('button');
    submitButton.id = 'submit-button';
    submitButton.type = 'button';
    submitButton.textContent = '提交';
    submitButton.style.padding = '0.5rem 1rem';
    submitButton.style.backgroundColor = '#52c41a';
    submitButton.style.color = 'white';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '4px';
    submitButton.style.cursor = 'pointer';
    submitButton.style.display = 'none'; // 初始隐藏
    
    navigationContainer.appendChild(prevButton);
    navigationContainer.appendChild(nextButton);
    navigationContainer.appendChild(submitButton);
    
    form.appendChild(navigationContainer);
    
    // 添加事件监听器
    prevButton.addEventListener('click', goToPreviousStep);
    nextButton.addEventListener('click', goToNextStep);
    submitButton.addEventListener('click', submitForm);
  }
  
  // 前往上一步的函数
  function goToPreviousStep() {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      hideAllStepsExcept(STEPS[currentStepIndex].id);
      updateNavigationButtons();
    }
  }
  
  // 前往下一步的函数
  function goToNextStep() {
    const form = kinlink.formApi;
    
    // 验证当前步骤
    const currentStepId = STEPS[currentStepIndex].id;
    const isValid = validateStep(currentStepId);
    
    if (isValid) {
      if (currentStepIndex < STEPS.length - 1) {
        currentStepIndex++;
        
        // 如果移动到审核步骤，填充审核部分
        if (STEPS[currentStepIndex].id === 'review') {
          populateReviewSection();
        }
        
        hideAllStepsExcept(STEPS[currentStepIndex].id);
        updateNavigationButtons();
      }
    } else {
      form.showError('请在继续之前修复验证错误。');
    }
  }
  
  // 验证步骤的函数
  function validateStep(stepId) {
    const form = kinlink.formApi;
    let isValid = true;
    
    // 定义每个步骤的字段
    const stepFields = {
      personal: ['firstName', 'lastName', 'birthDate'],
      contact: ['email', 'phone', 'address', 'city', 'state', 'postalCode'],
      account: ['username', 'password', 'confirmPassword', 'termsAccepted'],
      review: [] // 审核步骤不需要验证
    };
    
    // 验证步骤中的每个字段
    stepFields[stepId].forEach(field => {
      const value = form.getFieldValue(field);
      const error = form.validateField(field, value);
      
      if (error) {
        form.setFieldError(field, error);
        isValid = false;
      } else {
        form.clearFieldError(field);
      }
    });
    
    return isValid;
  }
  
  // 更新导航按钮的函数
  function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');
    
    // 显示/隐藏上一步按钮
    prevButton.style.display = currentStepIndex > 0 ? 'block' : 'none';
    
    // 显示/隐藏下一步和提交按钮
    if (currentStepIndex === STEPS.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'block';
    } else {
      nextButton.style.display = 'block';
      submitButton.style.display = 'none';
    }
  }
  
  // 填充审核部分的函数
  function populateReviewSection() {
    const form = kinlink.formApi;
    const values = form.getAllValues();
    
    // 创建审核部分内容
    const reviewSection = document.createElement('div');
    reviewSection.id = 'review-section';
    reviewSection.style.padding = '1rem';
    reviewSection.style.backgroundColor = '#f5f5f5';
    reviewSection.style.borderRadius = '4px';
    
    // 个人信息
    const personalSection = document.createElement('div');
    personalSection.innerHTML = \`
      <h3 style="margin-top: 0;">个人信息</h3>
      <p><strong>姓名:</strong> \${values.firstName} \${values.lastName}</p>
      <p><strong>出生日期:</strong> \${values.birthDate}</p>
    \`;
    
    // 联系信息
    const contactSection = document.createElement('div');
    contactSection.innerHTML = \`
      <h3>联系信息</h3>
      <p><strong>电子邮件:</strong> \${values.email}</p>
      <p><strong>电话:</strong> \${values.phone}</p>
      <p><strong>地址:</strong> \${values.address}, \${values.city}, \${values.state} \${values.postalCode}</p>
    \`;
    
    // 账户信息
    const accountSection = document.createElement('div');
    accountSection.innerHTML = \`
      <h3>账户信息</h3>
      <p><strong>用户名:</strong> \${values.username}</p>
      <p><strong>密码:</strong> ********</p>
      <p><strong>已接受条款:</strong> \${values.termsAccepted ? '是' : '否'}</p>
    \`;
    
    reviewSection.appendChild(personalSection);
    reviewSection.appendChild(contactSection);
    reviewSection.appendChild(accountSection);
    
    // 查找审核部分字段并替换其内容
    const reviewField = document.querySelector('[data-field="reviewSection"]');
    if (reviewField) {
      // 清除现有内容
      while (reviewField.firstChild) {
        reviewField.removeChild(reviewField.firstChild);
      }
      
      // 添加新内容
      reviewField.appendChild(reviewSection);
    }
  }
  
  // 提交表单的函数
  function submitForm() {
    const form = kinlink.formApi;
    
    // 最终验证
    const isValid = validateAllSteps();
    
    if (isValid) {
      // 提交表单
      form.submit();
      
      // 显示成功消息
      form.showSuccess('注册提交成功！');
    } else {
      form.showError('请在提交前修复验证错误。');
    }
  }
  
  // 验证所有步骤的函数
  function validateAllSteps() {
    let isValid = true;
    
    // 验证每个步骤
    STEPS.forEach((step, index) => {
      if (step.id !== 'review' && !validateStep(step.id)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  // 添加验证器的函数
  function addValidators() {
    const form = kinlink.formApi;
    
    // 个人信息验证器
    form.addFieldValidator('firstName', (value) => {
      if (!value || value.trim() === '') {
        return '名字为必填项';
      }
      return undefined;
    });
    
    form.addFieldValidator('lastName', (value) => {
      if (!value || value.trim() === '') {
        return '姓氏为必填项';
      }
      return undefined;
    });
    
    form.addFieldValidator('birthDate', (value) => {
      if (!value) {
        return '出生日期为必填项';
      }
      
      const birthDate = new Date(value);
      const today = new Date();
      
      // 检查日期是否有效
      if (isNaN(birthDate.getTime())) {
        return '请输入有效日期';
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
    
    // 联系信息验证器
    form.addFieldValidator('email', (value) => {
      if (!value || value.trim() === '') {
        return '电子邮件为必填项';
      }
      
      if (!/^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$/.test(value)) {
        return '请输入有效的电子邮件地址';
      }
      
      return undefined;
    });
    
    // 添加更多字段的验证器...
  }
})();`}
              language="javascript"
              filename="multi-step-form-example.js"
              showLineNumbers={true}
            />
          </TabsContent>

          <TabsContent value="usage">
            <h2>如何使用此示例</h2>

            <h3>步骤1：创建您的表单</h3>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
