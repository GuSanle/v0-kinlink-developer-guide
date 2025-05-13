/**
 * 示例9: 表单提交前后处理（自动修改数据示例）
 * 功能：在表单提交前自动修改数据，如自动补全、格式化、添加新字段
 * 所有提示统一用 showMessage
 */
(function () {
  // 表单加载时初始化
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 创建提交按钮
      const submitButton = document.createElement('button');
      submitButton.type = 'button';
      submitButton.textContent = '测试提交表单';
      submitButton.style.margin = '10px 0';
      submitButton.style.padding = '8px 16px';
      submitButton.style.backgroundColor = '#3498db';
      submitButton.style.color = 'white';
      submitButton.style.border = 'none';
      submitButton.style.borderRadius = '4px';
      submitButton.style.cursor = 'pointer';

      submitButton.addEventListener('click', () => {
        // 触发表单提交
        kinlink.formApi.submit();
      });

      // 添加按钮到表单
      const formElement = document.querySelector('.ant-form') || document.body;
      formElement.insertBefore(submitButton, formElement.firstChild);
    } catch (error) {
      console.error('初始化提交按钮失败:', error);
    }
  });

  // 表单提交前处理（自动修改数据）
  kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, (data) => {
    try {
      const { values } = data;
      // 自动补全：如果没有填写公司名，自动补全为"未填写"
      if (!values['单行文本框_10']) {
        values['单行文本框_10'] = '未填写';
        kinlink.formApi.showMessage(
          'info',
          '公司名未填写，已自动补全为"未填写"',
          3,
        );
      }
      // 自动格式化：手机号去除空格
      if (values['文字列__1行__2']) {
        values['文字列__1行__2'] = values['文字列__1行__2'].replace(/\s+/g, '');
        kinlink.formApi.showMessage('info', '手机号已自动去除空格', 3);
      }
      // 添加新字段：提交时间戳
      values['_autoSubmitTime'] = new Date().toISOString();
      kinlink.formApi.showMessage('info', '已自动添加提交时间戳', 3);
      // 允许提交
      return true;
    } catch (error) {
      console.error('表单提交前处理失败:', error);
      kinlink.formApi.showMessage('error', '提交前处理发生错误', 3);
      return false;
    }
  });

  // 表单提交后处理
  kinlink.events.on(kinlink.FormEvents.AFTER_SUBMIT, (data) => {
    try {
      const { success, result } = data;
      console.log('表单提交结果:', success, result);
      if (success) {
        kinlink.formApi.showMessage('success', '表单提交成功!', 3);
      } else {
        kinlink.formApi.showMessage('error', '表单提交失败，请稍后重试', 5);
        console.error('提交失败原因:', result);
      }
    } catch (error) {
      console.error('表单提交后处理失败:', error);
      kinlink.formApi.showMessage('error', '提交后处理发生错误', 3);
    }
  });
})();
