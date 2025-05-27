/**
 * 示例5: 字段值读取与设置
 * 功能：获取和设置表单字段的值
 */
(function () {
  // 初始化表单
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 设置单个字段值
      kinlink.formApi.setFieldValue('单行文本框_0', '测试案件');

      // 批量设置多个字段值
      kinlink.formApi.setFieldsValue({
        文字列__1行__0: '山田',
        文字列__1行__1: '太郎',
        单行文本框_8: 'YAMADA',
        单行文本框_9: 'TARO',
        单选框_0: '男',
        日期_1: '1990-01-01',
      });

      // 创建测试按钮，显示当前表单值
      const showValuesButton = document.createElement('button');
      showValuesButton.type = 'button';
      showValuesButton.textContent = '显示当前表单值';
      showValuesButton.style.margin = '10px 0';
      showValuesButton.style.padding = '5px 10px';

      showValuesButton.addEventListener('click', () => {
        // 获取单个字段值
        const name = kinlink.formApi.getFieldValue('文字列__1行__0');
        console.log('姓氏:', name);

        // 获取所有字段值
        const allValues = kinlink.formApi.getAllValues();
        console.log('所有字段值:', allValues);

        // 显示提示信息
        kinlink.formApi.showInfo(
          `当前姓名: ${name} ${kinlink.formApi.getFieldValue('文字列__1行__1')}`,
        );
      });

      // 添加按钮到表单
      const formElement = document.querySelector('.ant-form') || document.body;
      formElement.insertBefore(showValuesButton, formElement.firstChild);

      // 创建自动填充测试数据的按钮
      const fillDataButton = document.createElement('button');
      fillDataButton.type = 'button';
      fillDataButton.textContent = '填充测试数据';
      fillDataButton.style.margin = '10px 5px';
      fillDataButton.style.padding = '5px 10px';

      fillDataButton.addEventListener('click', () => {
        kinlink.formApi.setFieldsValue({
          文字列__1行__0: '李',
          文字列__1行__1: '小明',
          单行文本框_8: 'LI',
          单行文本框_9: 'XIAOMING',
          单行文本框_10: 'ABC株式会社',
          单行文本框_11: 'P12345678',
          单选框_0: '男',
          日期_1: '1995-05-15',
          日期_2: '2030-12-31',
          文字列__1行__2: '13800138000',
          文字列__1行__3: 'test@example.com',
          下拉菜单: 'A',
        });
        kinlink.formApi.showSuccess('测试数据已填充');
      });

      formElement.insertBefore(fillDataButton, formElement.firstChild);
    } catch (error) {
      console.error('字段值操作失败:', error);
    }
  });
})();
