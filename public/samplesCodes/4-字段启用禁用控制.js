/**
 * 示例4: 字段启用/禁用控制
 * 功能：控制表单字段的启用和禁用状态
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 禁用特定字段
      kinlink.formApi.disableField('单行文本框_10'); // 会社名
      kinlink.formApi.disableField('单行文本框_8'); // ローマ字姓

      // 创建控制按钮进行交互测试
      const controlPanel = document.createElement('div');
      controlPanel.style.margin = '10px 0';
      controlPanel.style.padding = '10px';
      controlPanel.style.backgroundColor = '#f8f9fa';
      controlPanel.style.border = '1px solid #dee2e6';
      controlPanel.style.borderRadius = '4px';

      // 添加控制按钮到面板
      const buttonStyles = 'margin-right: 10px; padding: 5px 10px;';

      // 创建启用/禁用护照字段的按钮
      const passportBtn = document.createElement('button');
      passportBtn.textContent = '启用/禁用护照字段';
      passportBtn.type = 'button';
      passportBtn.style = buttonStyles;
      passportBtn.addEventListener('click', () => {
        const isDisabled =
          kinlink.formApi.getFieldState('单行文本框_11').disabled;
        if (isDisabled) {
          kinlink.formApi.enableField('单行文本框_11');
          kinlink.formApi.enableField('日期_2');
          passportBtn.textContent = '禁用护照字段';
          kinlink.formApi.showSuccess('护照字段已启用');
        } else {
          kinlink.formApi.disableField('单行文本框_11');
          kinlink.formApi.disableField('日期_2');
          passportBtn.textContent = '启用护照字段';
          kinlink.formApi.showInfo('护照字段已禁用');
        }
      });

      controlPanel.appendChild(passportBtn);

      // 获取表单元素并添加控制面板
      const formElement = document.querySelector('.ant-form') || document.body;
      formElement.insertBefore(controlPanel, formElement.firstChild);
    } catch (error) {
      console.error('控制字段启用/禁用失败:', error);
    }
  });
})();
