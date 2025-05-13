/**
 * 示例10: 消息提示演示
 * 功能：展示各类消息提示功能
 */
(function () {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    try {
      // 创建消息演示控制面板
      const demoPanel = document.createElement('div');
      demoPanel.style.margin = '15px 0';
      demoPanel.style.padding = '15px';
      demoPanel.style.backgroundColor = '#f8f9fa';
      demoPanel.style.border = '1px solid #dee2e6';
      demoPanel.style.borderRadius = '8px';

      // 标题
      const title = document.createElement('h3');
      title.textContent = '消息提示演示';
      title.style.marginTop = '0';
      title.style.marginBottom = '15px';
      demoPanel.appendChild(title);

      // 消息类型数组
      const messageTypes = [
        { type: 'success', label: '成功消息', color: '#27ae60' },
        { type: 'error', label: '错误消息', color: '#e74c3c' },
        { type: 'info', label: '信息提示', color: '#3498db' },
        { type: 'warning', label: '警告消息', color: '#f39c12' },
      ];

      // 为每种消息类型创建按钮
      messageTypes.forEach((item) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = item.label;
        button.style.marginRight = '10px';
        button.style.marginBottom = '10px';
        button.style.padding = '8px 16px';
        button.style.backgroundColor = item.color;
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';

        // 点击按钮显示对应类型的消息
        button.addEventListener('click', () => {
          const message = `这是一条${item.label}（${new Date().toLocaleTimeString()}）`;

          // 根据消息类型调用不同的方法
          switch (item.type) {
            case 'success':
              kinlink.formApi.showSuccess(message);
              break;
            case 'error':
              kinlink.formApi.showError(message);
              break;
            case 'info':
              kinlink.formApi.showInfo(message);
              break;
            case 'warning':
              kinlink.formApi.showWarning(message);
              break;
            default:
              // 使用通用方法
              kinlink.formApi.showMessage(item.type, message);
          }
        });

        demoPanel.appendChild(button);
      });

      // 创建持续时间控制
      const durationControl = document.createElement('div');
      durationControl.style.marginTop = '15px';

      const durationLabel = document.createElement('label');
      durationLabel.textContent = '显示时间(秒): ';
      durationControl.appendChild(durationLabel);

      const durationInput = document.createElement('input');
      durationInput.type = 'number';
      durationInput.min = '1';
      durationInput.max = '10';
      durationInput.value = '3';
      durationInput.style.width = '50px';
      durationInput.style.marginRight = '15px';
      durationControl.appendChild(durationInput);

      // 创建自定义消息按钮
      const customButton = document.createElement('button');
      customButton.type = 'button';
      customButton.textContent = '显示自定义时长消息';
      customButton.style.padding = '8px 16px';
      customButton.style.backgroundColor = '#9b59b6';
      customButton.style.color = 'white';
      customButton.style.border = 'none';
      customButton.style.borderRadius = '4px';
      customButton.style.cursor = 'pointer';

      customButton.addEventListener('click', () => {
        const duration = parseInt(durationInput.value, 10);
        const message = `此消息将显示${duration}秒钟`;
        kinlink.formApi.showInfo(message, duration);
      });

      durationControl.appendChild(customButton);
      demoPanel.appendChild(durationControl);

      // 创建清除所有消息的按钮
      const clearButton = document.createElement('button');
      clearButton.type = 'button';
      clearButton.textContent = '清除所有消息';
      clearButton.style.marginTop = '15px';
      clearButton.style.padding = '8px 16px';
      clearButton.style.backgroundColor = '#7f8c8d';
      clearButton.style.color = 'white';
      clearButton.style.border = 'none';
      clearButton.style.borderRadius = '4px';
      clearButton.style.cursor = 'pointer';

      clearButton.addEventListener('click', () => {
        kinlink.formApi.clearAllMessages();
      });

      demoPanel.appendChild(clearButton);

      // 将演示面板添加到页面
      const formElement = document.querySelector('.ant-form') || document.body;
      formElement.insertBefore(demoPanel, formElement.firstChild);
    } catch (error) {
      console.error('初始化消息提示演示失败:', error);
    }
  });
})();
