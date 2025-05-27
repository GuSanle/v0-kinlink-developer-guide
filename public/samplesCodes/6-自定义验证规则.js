/**
 * 示例6: 自定义验证规则
 * 功能：为表单字段添加自定义验证规则
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      const form = kinlink.formApi;

      // 为邮箱字段添加格式验证
      form.addFieldValidator('文字列__1行__3', (value) => {
        if (!value) return; // 非必填，空值不验证

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          return '请输入有效的邮箱地址';
        }
        return undefined; // 验证通过
      });

      // 为手机号字段添加格式验证
      form.addFieldValidator('文字列__1行__2', (value) => {
        if (!value) return; // 非必填，空值不验证

        // 简单的手机号验证规则（不限制国家/地区前缀）
        const phoneRegex = /^\+?[0-9]{7,15}$/;
        if (!phoneRegex.test(value)) {
          return '请输入有效的手机号码（7-15位数字，可以包含+号前缀）';
        }
        return undefined; // 验证通过
      });

      // 为护照有效期添加未过期验证
      form.addFieldValidator('日期_2', (value) => {
        if (!value) return; // 非必填，空值不验证

        const today = new Date();
        const expiryDate = new Date(value);

        // 确保日期有效
        if (isNaN(expiryDate.getTime())) {
          return '请输入有效的日期';
        }

        // 检查是否已过期
        if (expiryDate < today) {
          return '护照/证件已过期，请提供有效期内的证件';
        }

        // 检查是否即将过期（小于6个月）
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(today.getMonth() + 6);

        if (expiryDate < sixMonthsLater) {
          // 这是警告而非错误，需手动显示
          form.showWarning(
            '您的护照/证件将在6个月内过期，可能影响某些国家/地区的入境要求',
          );
        }

        return undefined; // 验证通过
      });

      // 添加手动触发验证的按钮
      const validateButton = document.createElement('button');
      validateButton.textContent = '验证表单';
      validateButton.style.margin = '10px 0';
      validateButton.style.padding = '5px 10px';

      validateButton.addEventListener('click', () => {
        const result = form.validateForm();
        console.log('验证结果:', result);

        if (result.isValid) {
          form.showSuccess('表单验证通过');
        } else {
          form.showError('表单验证失败，请检查输入');
        }
      });

      // 添加按钮到表单
      const formElement = document.querySelector('.ant-form') || document.body;
      formElement.insertBefore(validateButton, formElement.firstChild);
    } catch (error) {
      console.error('添加自定义验证规则失败:', error);
    }
  });
})();
