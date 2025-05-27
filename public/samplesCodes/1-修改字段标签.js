/**
 * 示例1: 修改字段标签
 * 功能：修改表单字段的标签显示文本
 */
(function () {
  // 监听表单加载完成事件
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 修改字段标签文本
      kinlink.formApi.setFieldLabelText('文字列__1行__0', '姓（中文）');
      kinlink.formApi.setFieldLabelText('文字列__1行__1', '名（中文）');
      kinlink.formApi.setFieldLabelText('单行文本框_8', '姓（英文）');
      kinlink.formApi.setFieldLabelText('单行文本框_9', '名（英文）');
    } catch (error) {
      console.error('修改字段标签失败:', error);
    }
  });
})();
