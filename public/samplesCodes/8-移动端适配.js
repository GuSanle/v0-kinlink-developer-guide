/**
 * 示例8: 移动端适配
 * 功能：根据设备类型提供不同的UI和交互体验
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 检测是否是移动端设备
      const isMobile = kinlink.layoutApi.checkIsMobileDevice();
      console.log('是否移动端:', isMobile);

      if (isMobile) {
        // === 移动端优化 ===
        applyMobileOptimization();
      } else {
        // === PC端优化 ===
        applyDesktopOptimization();
      }

      // 添加状态指示器
      addDeviceIndicator(isMobile);
    } catch (error) {
      console.error('移动端适配失败:', error);
    }
  });

  // 移动端优化函数
  function applyMobileOptimization() {
    const form = kinlink.formApi;

    // 隐藏复杂的同行者表格，简化移动端体验
    form.hideField('表格_13');

    // 增大触控区域，提高易用性
    const fieldsToEnlarge = [
      '文字列__1行__0',
      '文字列__1行__1',
      '单行文本框_8',
      '单行文本框_9',
      '文字列__1行__2',
      '文字列__1行__3',
    ];

    fieldsToEnlarge.forEach((field) => {
      form.setFieldComponentStyle(field, {
        fontSize: '16px',
        padding: '12px 8px',
        borderRadius: '8px',
        marginBottom: '16px',
      });
    });

    // 避免使用多列布局
    document.querySelectorAll('.ant-row').forEach((row) => {
      row.style.flexDirection = 'column';
    });

    // 修改提交按钮样式
    const submitButtonStyles = {
      width: '100%',
      height: '44px',
      fontSize: '16px',
      borderRadius: '8px',
    };

    // 假设有一个辅助函数来设置按钮样式（实际实现可能不同）
    const submitButton = document.querySelector(
      '#kinlink-mobile-submit-button',
    );
    if (submitButton) {
      Object.assign(submitButton.style, submitButtonStyles);
    }

    // 显示定制的移动端消息
    form.showInfo('正在使用移动端视图');
  }

  // PC端优化函数
  function applyDesktopOptimization() {
    // 使用更高级的表单布局
    // 显示所有高级功能

    // 显示定制的桌面端消息
    kinlink.formApi.showInfo('正在使用桌面端视图');
  }

  // 添加设备类型指示器
  function addDeviceIndicator(isMobile) {
    const indicator = document.createElement('div');

    // 设置样式
    Object.assign(indicator.style, {
      position: 'fixed',
      top: '10px',
      right: '10px',
      padding: '5px 10px',
      backgroundColor: isMobile ? '#3498db' : '#27ae60',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: '1000',
    });

    indicator.textContent = isMobile ? '移动端模式' : '桌面端模式';
    document.body.appendChild(indicator);
  }
})();
