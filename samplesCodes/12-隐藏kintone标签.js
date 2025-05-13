(function () {
  // 监听表单加载完成事件
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      const formApi = kinlink.formApi;
      formApi.hideKintoneLabel();
    } catch (error) {}
  });
})();
