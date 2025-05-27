(function () {
  // 监听表单加载完成事件
  kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, async (data) => {
    try {
      const { values } = data;
      const res = await kinlink.proxy(
        'https://pokemon36.cybozu.cn/k/v1/record.json',
        'POST',
        { 'Content-Type': 'application/json' },
        {
          app: 187,
          record: {
            单行文本框: { value: 'kinlink' },
          },
        },
      );
      console.log(res, 'res');
    } catch (error) {
      console.error('表单提交前处理失败:', error);
    }
  });
})();
