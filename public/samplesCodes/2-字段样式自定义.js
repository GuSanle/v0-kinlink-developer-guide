/**
 * 示例2: 字段样式自定义
 * 功能：修改表单字段标签和组件的样式
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 设置字段标签样式
      kinlink.formApi.setFieldLabelStyle('单行文本框_0', {
        color: '#e74c3c',
        fontWeight: 'bold',
        fontSize: '16px',
      });

      // 设置输入组件样式
      kinlink.formApi.setFieldComponentStyle('单行文本框_0', {
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        padding: '8px',
      });

      // 批量设置必填字段标签样式
      const requiredFields = [
        '文字列__1行__0',
        '文字列__1行__1',
        '单行文本框_8',
        '单行文本框_9',
      ];
      requiredFields.forEach((field) => {
        kinlink.formApi.setFieldLabelStyle(field, {
          color: '#e74c3c',
          position: 'relative',
        });
      });

      // 批量设置日期字段组件样式
      kinlink.formApi.setFieldsComponentStyles({
        日期_1: { width: '180px' },
        日期_2: { width: '180px' },
      });
    } catch (error) {
      console.error('设置字段样式失败:', error);
    }
  });
})();
