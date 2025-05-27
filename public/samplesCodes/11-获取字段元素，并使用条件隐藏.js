/**
 * 示例：在指定字段后面插入按钮，实现条件隐藏/显示字段 并且实现视觉隐藏和真实隐藏
 * 视觉隐藏为被隐藏的内容最终还是会被提交，而真实隐藏为被隐藏的内容不会被提交
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // ========== 携帯電話字段后面插入按钮，控制会社名隐藏/显示 ==========
      const targetFieldCode = '文字列__1行__2'; // 携帯電話
      const controlFieldCode = '单行文本框_10'; // 会社名

      const input = document.querySelector(`[id$='${targetFieldCode}']`);
      if (input) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = '隐藏/显示会社名';
        btn.style.marginLeft = '8px';
        input.parentNode.insertBefore(btn, input.nextSibling);
        let isHidden = false;
        btn.onclick = function () {
          if (isHidden) {
            kinlink.formApi.showField(controlFieldCode);
            btn.textContent = '隐藏会社名';
          } else {
            kinlink.formApi.hideField(controlFieldCode);
            btn.textContent = '显示会社名';
          }
          isHidden = !isHidden;
        };
      }

      // ========== Eメールアドレス字段后面插入按钮，视觉隐藏/显示身分証番号 ==========
      const emailFieldCode = '文字列__1行__3'; // Eメールアドレス
      const idFieldCode = '单行文本框_11'; // パスポート番号／身分証番号
      const emailInput = document.querySelector(`[id$='${emailFieldCode}']`);
      if (emailInput) {
        const btn2 = document.createElement('button');
        btn2.type = 'button';
        btn2.textContent = '视觉隐藏/显示身分証番号';
        btn2.style.marginLeft = '8px';
        emailInput.parentNode.insertBefore(btn2, emailInput.nextSibling);
        let isVisuallyHidden = false;
        btn2.onclick = function () {
          if (isVisuallyHidden) {
            kinlink.formApi.showField(idFieldCode);
            btn2.textContent = '视觉隐藏身分証番号';
          } else {
            kinlink.formApi.visuallyHideField(idFieldCode);
            btn2.textContent = '显示身分証番号';
          }
          isVisuallyHidden = !isVisuallyHidden;
        };
      }
    } catch (error) {
      console.error('插入按钮并控制字段显示失败:', error);
    }
  });
})();
