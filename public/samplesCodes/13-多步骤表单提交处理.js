(function () {
  // 步骤配置
  const steps = [
    {
      title: "基本信息",
      icon: "📋",
      fields: [
        "文字列__1行__0",
        "文字列__1行__1",
        "单行文本框_8",
        "单行文本框_9",
        "单选框_0",
        "日期_1",
        "多选_0",
        "表格",
        "表格_13",
      ],
    },
    {
      title: "联系方式",
      icon: "📞",
      fields: ["文字列__1行__2", "文字列__1行__3", "单行文本框_10", "下拉菜单"],
    },
    {
      title: "证件信息",
      icon: "📝",
      fields: ["单行文本框_11", "日期_2", "附件_0"],
    },
    {
      title: "确认提交",
      icon: "✅",
      fields: [], // 最后一步显示所有信息摘要，不指定具体字段
    },
  ];

  // 需要隐藏的未使用字段
  const unusedFields = [];

  // 当前步骤
  let currentStep = 0;

  // 全局变量存储 AFTER_SUBMIT 监听器 ID，防止重复注册
  let afterSubmitListenerId = null;

  // 附件字段名集合（可根据实际表单字段名扩展）
  const attachmentFields = ["パスポート写真", "附件_0"];

  // 表单加载完成时的初始化回调
  const formLoadedHandler = () => {
    if (
      !window.kinlink ||
      !window.kinlink.formApi ||
      !window.kinlink.layoutApi
    ) {
      console.error("kinlink API not fully available on FORM_LOADED!");
      return;
    }
    // 隐藏未用到的字段
    unusedFields.forEach((field) => {
      window.kinlink.formApi.visuallyHideField(field);
    });
    performInitialization();
  };

  // 实际执行初始化逻辑的函数
  function performInitialization() {
    const form = window.kinlink.formApi;
    const layout = window.kinlink.layoutApi;

    if (!layout || !form) {
      console.error("[TestJS Init] layoutApi or formApi is not available!");
      return;
    }

    // 不再需要setTimeout，因为FORM_LOADED事件已确保DOM就绪
    console.log("[TestJS Init] 执行UI初始化操作...");

    // 直接执行Kintone元素隐藏操作
    try {
      console.log("[TestJS] 隐藏Kintone标签...");
      form.hideKintoneLabel();
    } catch (e) {
      console.error("[TestJS] 隐藏Kintone标签出错:", e);
    }

    try {
      console.log("[TestJS] 隐藏Kintone分组/折叠元素...");
      form.hideKintoneCollapse();
    } catch (e) {
      console.error("[TestJS] 隐藏Kintone分组/折叠元素出错:", e);
    }

    // 隐藏官方提交按钮
    console.log("[TestJS] 尝试隐藏官方提交按钮...");
    let hideResult = null;
    let hideError = null;
    try {
      hideResult = layout.hideSubmitButton();
      console.log(
        `[TestJS] layoutApi.hideSubmitButton()执行结果: ${hideResult}`
      );

      // 再次检查状态
      if (typeof layout.isSubmitButtonVisible === "function") {
        console.log(
          "[TestJS] 通过API检查官方按钮隐藏后的可见性:",
          layout.isSubmitButtonVisible()
        );
      } else {
        const officialButton = document.getElementById("kinlink-submit-button");
        if (officialButton) {
          console.log(
            "[TestJS] 检查官方按钮(#kinlink-submit-button)隐藏后的样式:",
            window.getComputedStyle(officialButton).display
          );
        } else {
          console.warn(
            "[TestJS] 无法通过ID #kinlink-submit-button找到官方按钮来检查样式"
          );
        }
      }
    } catch (error) {
      hideError = error;
      console.error("[TestJS] 调用layoutApi.hideSubmitButton()时出错:", error);
    }

    // 其他初始化操作
    layout.hideHeader();
    if (layout.checkIsMobileDevice()) {
      layout.mobileHideFormActionBar();
    }

    // UI 创建需要放在 API 可用之后
    createCustomUI();
    showStep(currentStep);
    applyGlobalStyles();

    // 注册 AFTER_SUBMIT 监听器 (确保只注册一次)
    console.log("[TestJS Init] 注册AFTER_SUBMIT事件处理器");
    registerAfterSubmitHandler();
  }

  // 注册 AFTER_SUBMIT 事件处理
  function registerAfterSubmitHandler() {
    if (afterSubmitListenerId) {
      console.log(
        "[TestJS Register] AFTER_SUBMIT listener already registered."
      );
      return;
    }
    console.log(
      "[TestJS Register] Attempting to register AFTER_SUBMIT listener..."
    );
    try {
      afterSubmitListenerId = kinlink.events.on(
        kinlink.FormEvents.AFTER_SUBMIT,
        (data) => {
          console.log("[TestJS Event] AFTER_SUBMIT event received:", data);
          if (data && data.success) {
            console.log(
              "[TestJS Event] Submission successful (data.success is true), calling showSuccessScreen."
            );
            showSuccessScreen();
          } else {
            console.error(
              "[TestJS Event] Submission failed or data.success is not true."
            );
          }
        }
      );
      if (afterSubmitListenerId) {
        console.log(
          "[TestJS Register] AFTER_SUBMIT listener registered successfully with ID:",
          afterSubmitListenerId
        );
      } else {
        console.error(
          "[TestJS Register] kinlink.events.on returned null/undefined, registration failed?"
        );
      }
    } catch (error) {
      console.error(
        "[TestJS Register] Error during AFTER_SUBMIT listener registration:",
        error
      );
    }
  }

  // 注册 FORM_LOADED 监听器
  if (
    window.kinlink &&
    window.kinlink.events &&
    typeof window.kinlink.events.on === "function"
  ) {
    kinlink.events.on(kinlink.FormEvents.FORM_LOADED, formLoadedHandler);
  } else {
    console.error(
      "Failed to register FORM_LOADED listener: kinlink.events.on not available"
    );
  }

  // 创建自定义UI
  function createCustomUI() {
    createHeader();
    createStepNavigation();
    createButtons();
    createSuccessScreen();
  }

  // 创建自定义头部
  function createHeader() {
    const header = document.createElement("div");
    header.id = "custom-header";
    header.innerHTML = `
      <div class="header-content">
        <div class="logo-area">
          <div class="logo">旅行申請</div>
        </div>
        <div class="title-area">
          <h1>ツアー参加申込書</h1>
          <p>以下のフォームに必要事項をご記入ください。</p>
        </div>
      </div>
    `;

    const formContainer = document.querySelector(".ant-form");
    formContainer.parentNode.insertBefore(header, formContainer);

    // 添加头部样式
    const style = document.createElement("style");
    style.textContent = `
      #custom-header {
        background: linear-gradient(135deg, #1890ff, #0050b3);
        color: white;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        margin-bottom: 20px;
        border-radius: 8px;
      }

      .header-content {
        display: flex;
        align-items: center;
      }

      .logo-area {
        margin-right: 20px;
      }

      .logo {
        font-size: 24px;
        font-weight: bold;
        background: white;
        color: #1890ff;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .title-area h1 {
        margin: 0;
        color: white;
        font-size: 28px;
      }

      .title-area p {
        margin: 5px 0 0;
        opacity: 0.8;
      }

      @media (max-width: 575px) {
        .header-content {
          flex-direction: column;
          text-align: center;
        }

        .logo-area {
          margin-right: 0;
          margin-bottom: 15px;
        }

        .title-area h1 {
          font-size: 22px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 创建步骤导航
  function createStepNavigation() {
    const stepNav = document.createElement("div");
    stepNav.id = "step-navigation";

    let stepsHtml = '<div class="steps-container">';

    steps.forEach((step, index) => {
      stepsHtml += `
        <div class="step${index === 0 ? " active" : ""}" data-step="${index}">
          <div class="step-icon">${step.icon}</div>
          <div class="step-title">${step.title}</div>
          <div class="step-line"></div>
        </div>
      `;
    });

    stepsHtml += "</div>";
    stepNav.innerHTML = stepsHtml;

    const formContainer = document.querySelector(".ant-form");
    formContainer.parentNode.insertBefore(stepNav, formContainer);

    // 添加导航样式
    const style = document.createElement("style");
    style.textContent = `
      #step-navigation {
        margin-bottom: 30px;
        overflow-x: auto; /* Default horizontal scroll if needed */
        overflow-y: visible; /* Default no vertical scroll */
      }

      .steps-container {
        display: flex;
        min-width: 750px;
      }

      .step {
        flex: 1;
        text-align: center;
        position: relative;
        cursor: pointer;
        transition: all 0.3s;
      }

      .step-icon {
        width: 50px;
        height: 50px;
        margin: 0 auto 10px;
        background-color: #f0f0f0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        position: relative;
        z-index: 2;
        transition: all 0.3s;
      }

      .step.active .step-icon, .step.completed .step-icon {
        background-color: #1890ff;
        color: white;
      }

      .step-title {
        font-size: 14px;
        font-weight: 500;
        color: #5A5A5A;
        transition: all 0.3s;
      }

      .step.active .step-title {
        color: #1890ff;
        font-weight: bold;
      }

      .step-line {
        position: absolute;
        top: 25px;
        left: calc(50% + 25px);
        right: calc(50% - 25px);
        height: 2px;
        background-color: #f0f0f0;
        z-index: 1;
      }

      .step:last-child .step-line {
        display: none;
      }

      .step.completed .step-line {
        background-color: #1890ff;
      }

      @media (max-width: 575px) {
        #step-navigation {
          margin-bottom: 20px;
          /* overflow-x: visible; */ /* Temporarily replaced for debugging */
          /* overflow-y: visible; */ /* Temporarily replaced for debugging */
          overflow: hidden !important; /* Force hide overflow for debugging */
        }

        /* Override min-width for mobile */
        .steps-container {
          min-width: auto;
        }

        .step-icon {
          width: 40px;
          height: 40px;
          font-size: 18px;
        }

        .step-title {
          font-size: 12px;
          display: none;
        }

        .step.active .step-title {
          display: block;
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }

        .step-line {
          top: 20px;
        }
      }
    `;
    document.head.appendChild(style);

    // 添加步骤点击事件
    stepNav.querySelectorAll(".step").forEach((stepElement) => {
      stepElement.addEventListener("click", function () {
        const stepIndex = parseInt(this.getAttribute("data-step"));

        // 只允许点击已完成的步骤
        if (stepIndex < currentStep) {
          navigateToStep(stepIndex);
        }
      });
    });
  }

  // 创建按钮区域
  function createButtons() {
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "step-buttons";
    buttonContainer.innerHTML = `
      <button id="prev-button" class="step-button" style="display: none;">前へ</button>
      <button id="next-button" class="step-button primary">次へ</button>
      <button id="submit-button" class="step-button primary" style="display: none;">提出</button>
    `;

    const formElement = document.querySelector(".ant-form");
    if (formElement && formElement.parentNode) {
      // Check if parentNode exists
      formElement.parentNode.insertBefore(
        buttonContainer,
        formElement.nextSibling
      );
    } else {
      console.error(
        "Could not find form element or its parent to insert buttons."
      );
      // Fallback: append to body? Or handle error
      document.body.appendChild(buttonContainer);
    }

    // 添加按钮样式
    const style = document.createElement("style");
    style.textContent = `
      #step-buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        padding: 20px 0;
        border-top: 1px solid #f0f0f0;
        background-color: white;
      }

      .step-button {
        padding: 10px 20px;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid #d9d9d9;
        background-color: white;
        color: rgba(0, 0, 0, 0.65);
      }

      .step-button:hover {
        border-color: #1890ff;
        color: #1890ff;
      }

      .step-button.primary {
        background-color: #1890ff;
        border-color: #1890ff;
        color: white;
        margin-left: auto;
      }

      .step-button.primary:hover {
        background-color: #40a9ff;
        border-color: #40a9ff;
      }

      @media (max-width: 575px) {
        #step-buttons {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          padding: 15px;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000; /* 增加z-index确保在最上层 */
          margin-top: 0;
          border-top: 1px solid #e8e8e8;
          /* Keep the iOS safe area padding */
          padding-bottom: calc(15px + env(safe-area-inset-bottom, 0px));
        }

        .step-button {
          padding: 12px 15px; /* 稍微增大触摸区域 */
          font-size: 16px; /* 移动端字体稍大更易点击 */
          min-width: 100px; /* 确保按钮有足够宽度 */
        }
      }
    `;
    document.head.appendChild(style);

    // 添加按钮事件
    document.getElementById("prev-button").addEventListener("click", () => {
      if (currentStep > 0) {
        navigateToStep(currentStep - 1);
      }
    });

    document.getElementById("next-button").addEventListener("click", () => {
      if (validateCurrentStep()) {
        if (currentStep < steps.length - 1) {
          navigateToStep(currentStep + 1);
        }
      }
    });

    const submitButton = document.getElementById("submit-button");
    if (submitButton) {
      submitButton.addEventListener("click", () => {
        console.log("[TestJS Button] Submit button clicked.");
        if (validateCurrentStep()) {
          console.log(
            "[TestJS Button] Validation passed, calling kinlink.formApi.submit()."
          );
          try {
            kinlink.formApi.submit();
          } catch (error) {
            console.error(
              "[TestJS Button] Error calling kinlink.formApi.submit():",
              error
            );
            if (
              kinlink.formApi &&
              typeof kinlink.formApi.showError === "function"
            ) {
              kinlink.formApi.showError("提交时发生错误，请稍后再试。");
            }
          }
        } else {
          console.log("[TestJS Button] Validation failed.");
        }
      });
    } else {
      console.error(
        "[TestJS Setup] Could not find submit button to attach listener."
      );
    }
  }

  // 创建提交成功画面
  function createSuccessScreen() {
    const successScreen = document.createElement("div");
    successScreen.id = "success-screen";
    successScreen.style.display = "none";

    // 生成唯一的引用号（如果需要保留）
    const referenceNumber = `TRV-${Math.floor(10000 + Math.random() * 90000)}`;
    // 获取当前日期时间（如果需要保留）
    const submissionTime = new Date().toLocaleString("ja-JP");

    successScreen.innerHTML = `
      <div class="success-content">
        <div class="success-icon">✅</div>
        <h2>申込が完了しました！</h2>
        <p>お申し込みいただきありがとうございます。確認メールをお送りしましたのでご確認ください。</p>
        <div class="success-details">
          <div class="success-reference">
            <span>申込番号:</span>
            <strong id="reference-number">${referenceNumber}</strong>
          </div>
          <div class="success-date">
            <span>申込日時:</span>
            <strong>${submissionTime}</strong>
          </div>
        </div>
        <div style="margin-top:24px;">
          <a href='https://example.com/test.pdf' target='_blank' rel='noopener noreferrer'>测试PDF下载</a>
        </div>
      </div>
    `;

    document.body.appendChild(successScreen);

    // 添加成功画面样式
    const style = document.createElement("style");
    style.textContent = `
      #success-screen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff; /* 不透明白色，完全遮住老画面 */
        z-index: 9999; /* 提高层级，确保在最上层 */
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .success-content {
        background-color: white;
        padding: 40px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        max-width: 500px;
        width: 90%;
      }

      .success-icon {
        font-size: 80px;
        margin-bottom: 20px;
        animation: scaleIn 0.5s;
      }

      @keyframes scaleIn {
        0% { transform: scale(0); }
        70% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }

      .success-content h2 {
        color: #52c41a;
        font-size: 28px;
        margin-bottom: 15px;
      }

      .success-content p {
        color: #5A5A5A;
        font-size: 16px;
        margin-bottom: 25px;
      }

      .success-details {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 6px;
        margin-bottom: 20px;
        text-align: left;
      }

      .success-reference, .success-date {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .success-reference span, .success-date span {
        color: #8c8c8c;
      }

      @media (max-width: 575px) {
        .success-content {
          padding: 30px 20px;
        }

        .success-icon {
          font-size: 60px;
        }

        .success-content h2 {
          font-size: 22px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // 显示特定步骤
  function showStep(stepIndex) {
    const form = kinlink.formApi;

    // 隐藏所有字段
    steps.forEach((step) => {
      step.fields.forEach((field) => {
        form.visuallyHideField(field);
      });
    });

    // 如果是最后一步，显示一览页面
    if (stepIndex === steps.length - 1) {
      showSummaryPage();
    } else {
      // 显示当前步骤的字段
      steps[stepIndex].fields.forEach((field) => {
        form.showField(field);
      });
      // 隐藏一览页面（如果存在）
      hideSummaryPage();
    }

    // 更新步骤导航
    updateStepNavigation(stepIndex);

    // 更新按钮状态
    updateButtons(stepIndex);

    // 更新当前步骤
    currentStep = stepIndex;
  }

  // 更新步骤导航
  function updateStepNavigation(stepIndex) {
    const stepElements = document.querySelectorAll(".step");

    stepElements.forEach((step, index) => {
      step.classList.remove("active");

      if (index < stepIndex) {
        step.classList.add("completed");
      } else if (index === stepIndex) {
        step.classList.add("active");
      } else {
        step.classList.remove("completed");
      }
    });
  }

  // 更新按钮状态
  function updateButtons(stepIndex) {
    console.log(
      `[TestJS UI Update] updateButtons called for stepIndex: ${stepIndex}`
    );
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const submitButton = document.getElementById("submit-button");

    if (!prevButton || !nextButton || !submitButton) {
      console.error("[TestJS UI Update] Cannot find step buttons to update.");
      return;
    }

    // 控制"前へ"按钮
    const prevDisplay = stepIndex === 0 ? "none" : "block";
    console.log(
      `[TestJS UI Update] Setting prevButton display to: ${prevDisplay}`
    );
    prevButton.style.display = prevDisplay;

    // 控制"次へ"和"提出"按钮
    const isLastStep = stepIndex === steps.length - 1;
    console.log(
      `[TestJS UI Update] Is last step? ${isLastStep} (steps.length: ${steps.length})`
    );

    if (isLastStep) {
      // 最后一步: 显示"提出"，隐藏"次へ"
      console.log(
        "[TestJS UI Update] Setting nextButton display: none, submitButton display: block"
      );
      nextButton.style.display = "none";
      submitButton.style.display = "block";
    } else {
      // 非最后一步: 显示"次へ"，隐藏"提出"
      console.log(
        "[TestJS UI Update] Setting nextButton display: block, submitButton display: none"
      );
      nextButton.style.display = "block";
      submitButton.style.display = "none";
    }
    // 打印设置后的实际样式值 (用于对比)
    console.log("[TestJS UI Update] Styles after setting:", {
      prev: prevButton.style.display,
      next: nextButton.style.display,
      submit: submitButton.style.display,
    });
  }

  // 导航到指定步骤
  function navigateToStep(stepIndex) {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      showStep(stepIndex);

      // 滚动到页面顶部
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  // 验证当前步骤
  function validateCurrentStep() {
    const form = kinlink.formApi;
    const currentStepFields = steps[currentStep].fields;
    const values = form.getAllValues();
    let isValid = true;

    // 简单验证示例 - 实际项目中应根据业务需求完善
    currentStepFields.forEach((field) => {
      const fieldConfig = kinlink.formFields[field];

      // 验证必填字段
      if (fieldConfig && fieldConfig.required && !values[field]) {
        form.setFieldError(field, `${fieldConfig.label}は必須項目です`);
        isValid = false;
      }
    });

    if (!isValid) {
      kinlink.formApi.showError("必須項目をご入力ください", 3);
    }

    return isValid;
  }

  // 应用全局样式
  function applyGlobalStyles() {
    const style = document.createElement("style");
    style.textContent = `
      body {
        background-color: #f5f5f5;
        // min-height: 100vh; /* 确保页面至少有视口高度 */
        position: relative; /* 用于定位底部元素 */
      }

      .ant-form {
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      }

      .ant-form-item-label > label {
        font-weight: 500;
      }

      .ant-input, .ant-select-selector, .ant-picker {
        border-radius: 6px;
      }

      .ant-input:focus, .ant-picker-focused, .ant-select-focused .ant-select-selector {
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }

      /* 容器样式优化 */
      .ant-form-container {
        display: flex;
        flex-direction: column;
        // min-height: calc(100vh - 100px); /* 减去可能的页头高度 */
      }

       @media (max-width: 575px) {
        .ant-form-container {
           min-height: calc(100vh - 100px); /* 减去可能的页头高度 */
        }
      }

      @media (max-width: 575px) {
        .ant-form {
          padding: 20px 15px;
          border-radius: 0;
          box-shadow: none;
        }

        /* 确保移动设备上的固定元素正确显示 */
        #step-buttons {
          display: flex !important; /* 强制显示 */
        }

        /* 添加iOS底部安全区域支持 */
        #step-buttons {
          padding-bottom: calc(15px + env(safe-area-inset-bottom, 0px));
        }
      }
    `;
    document.head.appendChild(style);

    // 为移动设备添加视口meta标签，确保正确缩放
    const viewportMeta = document.createElement("meta");
    viewportMeta.name = "viewport";
    viewportMeta.content =
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(viewportMeta);

    // 包装表单内容到容器中以便更好控制
    const formElement = document.querySelector(".ant-form");
    if (
      formElement &&
      !formElement.parentElement.classList.contains("ant-form-container")
    ) {
      const formContainer = document.createElement("div");
      formContainer.className = "ant-form-container";
      formElement.parentNode.insertBefore(formContainer, formElement);
      formContainer.appendChild(formElement);
    }
  }

  function showSuccessScreen() {
    const kinlinkFormLayout = document.getElementById("kinlink-form-layout");
    if (kinlinkFormLayout) {
      // 隐藏所有子节点
      Array.from(kinlinkFormLayout.children).forEach(function (child) {
        child.style.display = "none";
      });
      // 显示自定义提交成功画面
      const successScreen = document.getElementById("success-screen");
      if (successScreen) {
        successScreen.style.display = "flex";
        // 如果 successScreen 不是 kinlinkFormLayout 的子节点，插进去
        if (successScreen.parentNode !== kinlinkFormLayout)
          kinlinkFormLayout.appendChild(successScreen);
      }
    }
    // 禁止页面滚动
    document.body.style.overflow = "hidden";
  }

  // 显示一览页面（最后一步）
  function showSummaryPage() {
    // 先移除之前的一览页面
    let summaryDiv = document.getElementById("step-summary-view");
    if (summaryDiv) summaryDiv.remove();

    summaryDiv = document.createElement("div");
    summaryDiv.id = "step-summary-view";
    summaryDiv.style.margin = "32px 0 0 0";
    summaryDiv.style.background = "#fafbfc";
    summaryDiv.style.borderRadius = "8px";
    summaryDiv.style.boxShadow = "0 1px 8px 0 rgba(0,0,0,0.03)";
    summaryDiv.style.padding = "32px 24px";

    // 标题
    const title = document.createElement("h3");
    title.textContent = "请确认以下信息";
    title.style.margin = "0 0 24px 0";
    title.style.color = "#3f51b5";
    summaryDiv.appendChild(title);

    // 分组显示
    steps.slice(0, -1).forEach((step) => {
      const groupTitle = document.createElement("div");
      groupTitle.textContent = step.title;
      groupTitle.style.fontWeight = "bold";
      groupTitle.style.margin = "18px 0 10px 0";
      groupTitle.style.padding = "5px 0";
      groupTitle.style.borderBottom = "1px solid #f0f0f0";
      summaryDiv.appendChild(groupTitle);

      step.fields.forEach((field) => {
        const fieldConfig = kinlink.formFields[field];
        if (!fieldConfig) return;
        const fieldValue = kinlink.formApi.getFieldValue(field);

        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.marginBottom = "8px";
        row.style.padding = "10px 0";
        row.style.borderRadius = "4px";
        row.style.background = "#fff";

        const label = document.createElement("div");
        label.style.fontWeight = "bold";
        label.style.width = "40%";
        label.textContent = fieldConfig.label || field;
        row.appendChild(label);

        const value = document.createElement("div");
        value.style.width = "60%";

        // 附件类型字段，仅显示文件名
        if (
          attachmentFields.includes(field) &&
          Array.isArray(fieldValue) &&
          fieldValue.length > 0
        ) {
          value.style.display = "flex";
          value.style.flexDirection = "column";
          fieldValue.forEach((file) => {
            const fileNameDiv = document.createElement("div");
            fileNameDiv.textContent = file.name || "附件";
            fileNameDiv.style.marginBottom = "4px";
            value.appendChild(fileNameDiv);
          });
        } else {
          value.textContent = fieldValue || "未填写";
        }
        row.appendChild(value);

        summaryDiv.appendChild(row);
      });
    });

    // 提示
    const tip = document.createElement("div");
    tip.style.margin = "24px 0 0 0";
    tip.style.padding = "12px";
    tip.style.background = "rgba(76, 175, 80, 0.08)";
    tip.style.borderRadius = "6px";
    tip.style.color = "#388e3c";
    tip.textContent = '请仔细核对以上信息，确认无误后点击"提出"按钮。';
    summaryDiv.appendChild(tip);

    // 插入到表单前
    const formElement = document.querySelector(".ant-form");
    if (formElement) {
      formElement.parentNode.insertBefore(summaryDiv, formElement);
    }
  }

  // 隐藏一览页面
  function hideSummaryPage() {
    const summaryDiv = document.getElementById("step-summary-view");
    if (summaryDiv) summaryDiv.remove();
  }
})();
