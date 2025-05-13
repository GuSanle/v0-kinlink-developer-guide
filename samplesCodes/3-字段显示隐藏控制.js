/**
 * 示例3: 字段显示/隐藏控制
 * 功能：控制表单字段的显示和隐藏状态
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 完全隐藏字段（值不会被提交）
      kinlink.formApi.hideField('多选_0');

      // 仅视觉上隐藏字段（值仍会被提交）
      kinlink.formApi.visuallyHideField('选择组织');

      // 通过按钮控制显示/隐藏同行者表格
      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.textContent = '显示/隐藏同行者信息';
      toggleButton.style.margin = '10px 0';
      toggleButton.style.padding = '5px 10px';

      // 获取表单元素并添加按钮
      const formElement = document.querySelector('.ant-form') || document.body;
      formElement.insertBefore(toggleButton, formElement.firstChild);

      // 初始隐藏同行者表格
      kinlink.formApi.hideField('表格_13');
      let isVisible = false;

      // 设置点击事件切换显示状态
      toggleButton.addEventListener('click', () => {
        if (isVisible) {
          kinlink.formApi.hideField('表格_13');
          toggleButton.textContent = '显示同行者信息';
        } else {
          kinlink.formApi.showField('表格_13');
          toggleButton.textContent = '隐藏同行者信息';
        }
        isVisible = !isVisible;
      });
    } catch (error) {
      console.error('控制字段显示/隐藏失败:', error);
    }
  });
})();
