/**
 * 示例7: 字段联动
 * 功能：根据某个字段的值变化自动控制其他字段的状态
 */
(function () {
  // 表单加载时的初始设置
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 性别字段联动初始化
      updateFieldsByGender(kinlink.formApi.getFieldValue('单选框_0'));
    } catch (error) {
      console.error('字段联动初始化失败:', error);
    }
  });

  // 监听字段变化事件
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
    try {
      const { fieldName, value } = data;

      // 根据性别字段变化联动其他字段
      if (fieldName === '单选框_0') {
        updateFieldsByGender(value);
      }

      // 根据集合场所的选择联动其他信息
      if (fieldName === '下拉菜单') {
        updateByMeetingPlace(value);
      }

      // 联动设置案件编号与案件名称
      if (fieldName === 'Lookup_0' && value) {
        // 假设这里会自动通过Lookup功能填充关联字段
        // 如果没有自动填充，可以手动设置相关值
        console.log('案件编号已更新:', value);
      }
    } catch (error) {
      console.error('字段联动处理失败:', error);
    }
  });

  // 性别联动函数
  function updateFieldsByGender(gender) {
    const form = kinlink.formApi;

    if (gender === '男') {
      // 对于男性，修改标签样式
      form.setFieldLabelStyle('单行文本框_8', {
        color: '#3498db',
      });
      form.setFieldLabelStyle('单行文本框_9', {
        color: '#3498db',
      });
    } else if (gender === '女') {
      // 对于女性，修改标签样式
      form.setFieldLabelStyle('单行文本框_8', {
        color: '#e74c3c',
      });
      form.setFieldLabelStyle('单行文本框_9', {
        color: '#e74c3c',
      });
    }

    // 可以在这里添加其他基于性别的联动逻辑
    console.log('性别联动已处理:', gender);
  }

  // 集合场所联动函数
  function updateByMeetingPlace(place) {
    const form = kinlink.formApi;

    // 根据不同集合场所设置不同信息
    if (place === 'A') {
      form.showInfo('A场所的集合时间为上午9:00');

      // 显示A场所特定字段（如果有）
      // form.showField('A场所注意事项');
    } else if (place === 'B') {
      form.showInfo('B场所的集合时间为上午10:30');

      // 显示B场所特定字段（如果有）
      // form.showField('B场所注意事项');
    }

    console.log('集合场所联动已处理:', place);
  }
})();
