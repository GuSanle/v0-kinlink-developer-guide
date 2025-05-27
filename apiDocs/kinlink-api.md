# kinlink JavaScript API 参考文档

本文档介绍了 kinlink 库提供的公开 JavaScript API。该 API 通过全局对象 `window.kinlink` 访问，允许开发者自定义表单行为、与表单字段和布局元素交互，并监听表单事件。

## 概述

全局 `window.kinlink` 对象包含以下主要属性：

*   `formApi`: 用于与表单字段、验证、样式和消息通知交互的 API。
*   `layoutApi`: 用于控制表单布局元素（页眉、页脚、按钮等）的 API。
*   `events`: 事件处理 API (`on`, `off`)。
*   `FormEvents`: 只读对象，包含可用的表单事件类型常量。
*   `version`: kinlink 库的当前版本字符串。
*   `formFields`: (只读) 初始化时使用的 Kintone 表单字段属性对象。

**注意:** 确保在调用任何 `kinlink` API 之前，表单和 kinlink 库已完全加载。通常建议在 `kinlink.events.on(kinlink.FormEvents.FORM_LOADED, callback)` 的回调函数中执行您的自定义代码。

```javascript
window.kinlink.events.on(window.kinlink.FormEvents.FORM_LOADED, function() {
  console.log('kinlink API is ready!');
  // 在这里开始使用 kinlink.formApi 和 kinlink.layoutApi
  const name = window.kinlink.formApi.getFieldValue('customer_name');
  console.log('Customer Name:', name);
});
```

**另请注意：** 为了优化用户感知加载体验，部分UI元素（如字段标签）在表单结构渲染后，可能会通过CSS动画实现一个短暂的延迟（默认为0.2秒）后才显示。`FORM_LOADED` 事件确保了所有API均可安全调用，即使某些元素的视觉动画仍在等待或进行中。如果您通过 `formApi.hideKintoneLabel()` 等方法隐藏了某个标签，该标签将不会执行其显示动画。

---

## `kinlink.formApi`

提供与表单数据、字段状态、验证、样式和消息通知相关的方法。

### 消息通知 (Messages)

#### `showMessage(type, content, [duration=3])`

显示一个全局消息通知。

*   **参数:**
    *   `type` {`'success'`|`'error'`|`'info'`|`'warning'`}: 消息类型。
    *   `content` {string}: 要显示的消息内容。
    *   `duration` {number} (可选, 默认值: 3): 消息显示时长（秒）。
*   **返回:** `void`
*   **注意:** 消息显示有频率限制，短时间内重复的消息可能会被忽略。
*   **示例:**
    ```javascript
    kinlink.formApi.showMessage('success', '记录保存成功!');
    kinlink.formApi.showMessage('error', '加载数据失败。', 5);
    ```

#### `clearAllMessages()`

清除所有当前显示的消息通知。

*   **返回:** `void`

#### `showSuccess(content, [duration=3])`

显示成功消息 (快捷方式)。

*   **参数:**
    *   `content` {string}: 消息内容。
    *   `duration` {number} (可选, 默认值: 3): 显示时长（秒）。
*   **返回:** `void`

#### `showError(content, [duration=3])`

显示错误消息 (快捷方式)。

*   **参数:** (同上)
*   **返回:** `void`

#### `showInfo(content, [duration=3])`

显示信息消息 (快捷方式)。

*   **参数:** (同上)
*   **返回:** `void`

#### `showWarning(content, [duration=3])`

显示警告消息 (快捷方式)。

*   **参数:** (同上)
*   **返回:** `void`

### 字段值操作 (Field Values)

#### `getFieldValue(fieldCode)`

获取指定表单字段的当前值。

*   **参数:**
    *   `fieldCode` {string}: 字段的唯一代码。
*   **返回:** {any} 字段的当前值，如果字段不存在则为 `undefined`。
*   **示例:**
    ```javascript
    const name = kinlink.formApi.getFieldValue('customer_name');
    ```

#### `setFieldValue(fieldCode, value)`

设置指定表单字段的值。

*   **参数:**
    *   `fieldCode` {string}: 字段的唯一代码。
    *   `value` {any}: 要设置的新值。
*   **返回:** `void`
*   **示例:**
    ```javascript
    kinlink.formApi.setFieldValue('status', 'Processing');
    kinlink.formApi.setFieldValue('due_date', '2024-12-31'); // 日期格式应符合字段类型要求
    ```

#### `getAllValues()`

获取表单中所有字段的当前值。

*   **返回:** {Object.<string, any>} 一个包含所有字段代码及其对应值的对象。
*   **示例:**
    ```javascript
    const allData = kinlink.formApi.getAllValues();
    console.log(allData.customer_name);
    ```

#### `setFieldsValue(values)`

同时设置多个表单字段的值。

*   **参数:**
    *   `values` {Object.<string, any>}: 一个包含字段代码和对应新值的对象。
*   **返回:** `void`
*   **示例:**
    ```javascript
    kinlink.formApi.setFieldsValue({
      contact_person: 'John Doe',
      contact_email: 'john.doe@example.com'
    });
    ```

### 字段状态控制 (Field State)

#### `hideField(fieldCode)`

隐藏一个表单字段（视觉上隐藏，并从提交中排除）。

*   **参数:**
    *   `fieldCode` {string}: 要隐藏的字段代码。
*   **返回:** `void`
*   **注意:** 会触发内部状态变更，由 `FormFieldWrapper` 组件处理实际的显隐。

#### `showField(fieldCode)`

显示一个先前隐藏的表单字段（恢复视觉显示，并包含在提交中）。

*   **参数:**
    *   `fieldCode` {string}: 要显示的字段代码。
*   **返回:** `void`

#### `disableField(fieldCode)`

禁用一个表单字段，使其不可交互。

*   **参数:**
    *   `fieldCode` {string}: 要禁用的字段代码。
*   **返回:** `void`

#### `enableField(fieldCode)`

启用一个先前禁用的表单字段。

*   **参数:**
    *   `fieldCode` {string}: 要启用的字段代码。
*   **返回:** `void`

#### `hideKintoneLabel()`

隐藏kintone的label 标签组件。

*   **返回:** `void`
   
#### `hideKintoneCollapse()`

隐藏kintone的collapse 组合组件。

*   **返回:** `void`

#### `getFieldState(fieldCode)`

获取字段的当前状态（可见性、禁用状态、是否从提交中排除）。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
*   **返回:** {object} 包含以下属性的状态对象：
    *   `visible` {boolean}: 是否可见。
    *   `disabled` {boolean}: 是否禁用。
    *   `excludeFromSubmit` {boolean}: 是否从提交中排除。
    *   (默认值: `{ visible: true, disabled: false, excludeFromSubmit: false }`)

#### `visuallyHideField(fieldCode)`

视觉上隐藏字段，但不一定从提交中排除。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
*   **返回:** `void`
*   **注意:** 将 `visible` 状态设为 `false`，但 `excludeFromSubmit` 状态不变（除非原来就是 `true`）。

### 表单验证 (Validation)

#### `addFieldValidator(fieldCode, validator)`

为指定字段添加自定义验证函数。此验证逻辑将由 Ant Design 表单项根据其触发器（通常是 `onChange` 和 `onBlur`）自动执行。

*   **参数:**
    *   `fieldCode` {string}: 要添加验证器的字段代码。
    *   `validator` {function(value: any): (string | undefined)}: 验证函数。接收字段当前值，如果验证失败则返回错误消息字符串，如果通过则返回 `undefined`。
*   **返回:** `void`
*   **注意:** 此函数也会立即使用当前值验证字段，并可能设置初始错误状态。会触发内部 `field-validator-change` 事件。
*   **示例:**
    ```javascript
    // 确保 'email' 字段包含 '@'
    kinlink.formApi.addFieldValidator('email', (value) => {
      if (value && !value.includes('@')) {
        return '请输入有效的电子邮件地址。';
      }
      return undefined; // 通过验证
    });
    ```

#### `removeFieldValidator(fieldCode)`

移除指定字段上先前添加的自定义验证函数。

*   **参数:**
    *   `fieldCode` {string}: 要移除验证器的字段代码。
*   **返回:** `void`
*   **注意:** 会清除由该验证器设置的错误消息，并触发内部 `field-validator-change` 事件。

#### `getCustomValidator(fieldCode)`

获取已添加到字段的自定义验证函数。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
*   **返回:** {Function | undefined} 验证函数，如果该字段没有自定义验证器则返回 `undefined`。

#### `validateField(fieldCode, value)`

手动使用已注册的自定义验证器验证指定字段的值，并更新 UI 错误状态。

*   **参数:**
    *   `fieldCode` {string}: 要验证的字段代码。
    *   `value` {any}: 用于验证的值。
*   **返回:** {string | undefined} 如果验证失败则返回错误消息，如果通过或无验证器则返回 `undefined`。
*   **示例:**
    ```javascript
    const ageError = kinlink.formApi.validateField('age', kinlink.formApi.getFieldValue('age'));
    if (ageError) console.error('年龄验证失败:', ageError);
    ```

#### `validateForm()`

手动使用已注册的自定义验证器验证所有字段的当前值，并批量更新 UI 错误状态。

*   **返回:** {object} 包含以下属性的结果对象：
    *   `isValid` {boolean}: 如果所有自定义验证都通过则为 `true`，否则为 `false`。
    *   `errors` {Object.<string, string>}: 一个包含验证失败字段代码及其错误消息的对象。
*   **示例:**
    ```javascript
    const result = kinlink.formApi.validateForm();
    if (!result.isValid) {
      kinlink.formApi.showError('表单包含无效数据，请检查。');
      console.error('验证错误:', result.errors);
    }
    ```

#### `setFieldError(fieldCode, errorMsg)`

直接为指定字段设置或清除错误消息，绕过验证逻辑。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
    *   `errorMsg` {string | null | undefined}: 要显示的错误消息字符串，或使用 `null`/`undefined` 清除错误。
*   **返回:** `void`
*   **示例:**
    ```javascript
    kinlink.formApi.setFieldError('zip_code', '邮政编码无效。');
    kinlink.formApi.setFieldError('zip_code', null); // 清除错误
    ```

#### `clearFieldError(fieldCode)`

清除指定字段的错误消息 (快捷方式)。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
*   **返回:** `void`

#### `setFieldsErrors(fieldErrors)`

同时为多个字段设置错误消息。

*   **参数:**
    *   `fieldErrors` {Object.<string, string | null | undefined>}: 一个包含字段代码和对应错误消息（或 `null`/`undefined` 以清除）的对象。
*   **返回:** `void`
*   **示例:**
    ```javascript
    kinlink.formApi.setFieldsErrors({
      'field_a': '字段A错误',
      'field_b': null // 清除字段B错误
    });
    ```

### 字段样式控制 (Field Styles)

#### `setFieldLabelStyle(fieldCode, styleObject)`

设置字段标签的 CSS 样式。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
    *   `styleObject` {object}: CSS 样式对象 (例如: `{ color: 'red', fontWeight: 'bold' }`)。
*   **返回:** `void`
*   **注意:** 会触发内部 `field-style-change` 事件。

#### `getFieldLabelStyle(fieldCode)`

获取字段标签上当前应用的自定义样式对象。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
*   **返回:** {object | null} 应用的 CSS 样式对象，如果未设置则为 `null`。

#### `setFieldComponentStyle(fieldCode, styleObject)`

设置字段主输入组件（如输入框、日期选择器）的 CSS 样式。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
    *   `styleObject` {object}: CSS 样式对象 (例如: `{ backgroundColor: '#eee' }`)。
*   **返回:** `void`
*   **注意:** 会触发内部 `field-style-change` 事件。

#### `getFieldComponentStyle(fieldCode)`

获取字段主输入组件上当前应用的自定义样式对象。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
*   **返回:** {object | null} 应用的 CSS 样式对象，如果未设置则为 `null`。

#### `resetFieldLabelStyle(fieldCode)`

移除字段标签上的所有自定义样式。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
*   **返回:** `void`

#### `resetFieldComponentStyle(fieldCode)`

移除字段主输入组件上的所有自定义样式。

*   **参数:**
    *   `fieldCode` {string}: 字段代码。
*   **返回:** `void`

#### `setFieldsLabelStyles(stylesMap)`

同时设置多个字段标签的样式。

*   **参数:**
    *   `stylesMap` {Object.<string, object>}: 一个包含字段代码和对应 CSS 样式对象的对象。
*   **返回:** `void`

#### `setFieldsComponentStyles(stylesMap)`

同时设置多个字段主输入组件的样式。

*   **参数:**
    *   `stylesMap` {Object.<string, object>}: 一个包含字段代码和对应 CSS 样式对象的对象。
*   **返回:** `void`

### 其他字段操作

#### `hideFormFieldsByContent(textContents)`

根据文本内容（包括标签）查找并隐藏表单字段的外层包裹元素。

*   **参数:**
    *   `textContents` {string[]}: 一个包含要在字段包裹元素内查找的文本字符串数组。
*   **返回:** {number} 成功隐藏的字段包裹元素数量。
*   **注意:** 这是基于 DOM 内容的直接操作，可能不如使用字段代码稳定。目标元素是带有 `form-field-wrapper` class 的元素。
*   **示例:**
    ```javascript
    // 隐藏包含 "机密" 或 "内部使用" 文本的字段
    const hiddenCount = kinlink.formApi.hideFormFieldsByContent(['机密', '内部使用']);
    ```

#### `setFieldLabelText(fieldCode, newText)`

覆盖字段标签的显示文本。

*   **参数:**
    *   `fieldCode` {string}: 要修改标签的字段代码。
    *   `newText` {string}: 新的标签文本。
*   **返回:** `void`
*   **注意:** 会触发内部 `field-label-text-change` 事件。

### 状态与样式监听器 (Listeners)

#### `addFieldStateChangeListener(callback)`

注册一个回调函数，当任何字段的状态（可见性、禁用）改变时执行。

*   **参数:**
    *   `callback` {function(detail: object): void}: 回调函数，接收包含 `fieldCode` 和 `state` 的 `detail` 对象。
*   **返回:** {Function} 用于移除此监听器的函数。
*   **示例:**
    ```javascript
    const removeListener = kinlink.formApi.addFieldStateChangeListener(data => {
      console.log(`字段 ${data.fieldCode} 状态改变:`, data.state);
    });
    // 之后调用 removeListener(); 来停止监听
    ```

#### `addFieldStyleChangeListener(callback)`

注册一个回调函数，当任何字段的样式（标签或组件）改变时执行。

*   **参数:**
    *   `callback` {function(detail: object): void}: 回调函数，接收包含 `fieldCode`, `styleType` ('label' 或 'component'), 和 `styleObject` 的 `detail` 对象。
*   **返回:** {Function} 用于移除此监听器的函数。

#### `addFieldLabelTextChangeListener(callback)`

注册一个回调函数，当任何字段的标签文本被覆盖时执行。

*   **参数:**
    *   `callback` {function(detail: object): void}: 回调函数，接收包含 `fieldCode` 和 `newText` 的 `detail` 对象。
*   **返回:** {Function} 用于移除此监听器的函数。

#### `addFieldValidatorChangeListener(callback)`

注册一个回调函数，当自定义字段验证器被添加或移除时执行。

*   **参数:**
    *   `callback` {function(detail: object): void}: 回调函数，接收包含 `fieldCode` 和 `hasValidator` (boolean) 的 `detail` 对象。
*   **返回:** {Function} 用于移除此监听器的函数。

### 表单提交

#### `submit()`

程序化地触发提交流程。

*   **返回:** `void`
*   **注意:** 会先执行所有自定义验证 (`validateForm`)，验证失败则阻止提交。

---

## `kinlink.layoutApi`

提供控制表单布局元素（如页眉、页脚、操作栏、按钮）显示状态和获取其尺寸的方法。

### 页眉 (Header)

#### `getHeaderHeight()`

获取页眉元素 (`#kinlink-header`) 的当前高度。

*   **返回:** {number} 高度（像素），如果元素不存在或不可见则为 0。

#### `isHeaderVisible()`

检查页眉元素当前是否可见（基于内部状态）。

*   **返回:** {boolean}

#### `hideHeader()`

隐藏页眉元素 (`display: none`)。

*   **返回:** {boolean} 操作是否成功。
*   **注意:** 触发 `layout-change` 事件。

#### `showHeader()`

显示页眉元素（恢复原始 `display` 样式）。

*   **返回:** {boolean} 操作是否成功。
*   **注意:** 触发 `layout-change` 事件。

### 页脚 (Footer - 主要用于桌面端)

#### `getFooterHeight()`

获取页脚元素 (`#kinlink-footer`) 的当前高度。

*   **返回:** {number} 高度（像素），如果元素不存在或不可见则为 0。

#### `isFooterVisible()`

检查页脚元素当前是否可见（基于内部状态）。

*   **返回:** {boolean}

#### `hideFooter()`

隐藏页脚元素 (`display: none`)。

*   **返回:** {boolean} 操作是否成功。
*   **注意:** 触发 `layout-change` 事件。

#### `showFooter()`

显示页脚元素（恢复原始 `display` 样式）。

*   **返回:** {boolean} 操作是否成功。
*   **注意:** 触发 `layout-change` 事件。

### 表单操作栏 (Form Action Bar)

#### `mobileIsFormActionBarVisible()`

检查移动端表单操作栏当前是否可见（基于内部状态/样式）。

*   **返回:** {boolean}
*   **注意:** 专为移动设备设计，与PC端的操作栏独立管理。

#### `hideMobileFormActionBar()`

隐藏移动端专用表单操作栏 (`display: none`)。

*   **返回:** {boolean} 操作是否成功。
*   **注意:** 触发 `layout-change` 事件，即使元素当前不在DOM中也会更新状态。

#### `showMobileFormActionBar()`

显示移动端专用表单操作栏（恢复原始 `display` 样式）。

*   **返回:** {boolean} 操作是否成功。
*   **注意:** 触发 `layout-change` 事件。

#### `toggleFormActionBar()`

切换移动端表单操作栏的显示/隐藏状态。

*   **返回:** {boolean} 实际执行的 `mobileShowFormActionBar` 或 `mobileHideFormActionBar` 操作的结果。
*   **注意:** 专为移动端设计，使用移动端专用的操作栏元素。

### 提交按钮 (Submit Button)

#### `isSubmitButtonVisible()`

检查提交按钮 (`#kinlink-submit-button`) 当前是否可见（基于内部状态/样式）。

*   **返回:** {boolean}

#### `hideSubmitButton()`

隐藏提交按钮 (`display: none`)。

*   **返回:** {boolean} 操作是否成功。
*   **注意:** 触发 `layout-change` 事件。

#### `showSubmitButton()`

显示提交按钮（恢复原始 `display` 样式）。

*   **返回:** {boolean} 操作是否成功。
*   **注意:** 触发 `layout-change` 事件。

### 移动端特定 API (Mobile Specific)

这些 API 主要用于处理小于等于 575px 宽度的屏幕。

#### 移动端操作栏自定义

移动端表单提供了底部固定的操作栏(`#kinlink-mobile-form-action-bar`)，用于放置提交按钮等操作元素。开发者可以隐藏默认操作栏并添加自定义操作栏，实现更丰富的功能。

*   **特点:**
    *   默认操作栏固定在底部，包含标准提交按钮
    *   表单容器已预留底部填充空间，无需额外处理遮挡问题
    *   可隐藏默认操作栏，添加自定义UI，实现更多操作按钮或特殊样式

*   **自定义示例:**
    ```javascript
    // 隐藏默认操作栏
    kinlink.layoutApi.mobileHideFormActionBar();
    
    // 创建并添加自定义操作栏
    const customBar = document.createElement('div');
    customBar.style.position = 'fixed';
    customBar.style.bottom = '0';
    customBar.style.left = '0';
    customBar.style.right = '0';
    customBar.style.height = '70px';
    customBar.style.backgroundColor = '#f0f5ff';
    customBar.style.display = 'flex';
    customBar.style.justifyContent = 'space-between';
    customBar.style.padding = '10px 20px';
    customBar.style.zIndex = '1000';
    
    // 添加自定义按钮
    const saveBtn = document.createElement('button');
    saveBtn.innerText = '保存草稿';
    saveBtn.onclick = () => { /* 保存草稿逻辑 */ };
    customBar.appendChild(saveBtn);
    
    const submitBtn = document.createElement('button');
    submitBtn.innerText = '提交表单';
    submitBtn.onclick = () => kinlink.formApi.submit();
    customBar.appendChild(submitBtn);
    
    document.body.appendChild(customBar);
    ```

#### `checkIsMobileDevice()`

检测当前是否为移动设备宽度（<= 575px）。

*   **返回:** {boolean}
*   **注意:** 使用媒体查询 `(max-width: 575px)` 实现，确保与响应式布局保持一致。

#### `mobileGetFormActionBarHeight()`

获取移动端表单操作栏元素 (`#kinlink-mobile-form-action-bar`) 的当前高度。

*   **返回:** {number} 高度（像素），如果元素不存在或不可见则为 0。
*   **注意:** 专为移动设备UI设计，使用单独的DOM元素。

### 通用布局与事件 (General Layout & Events)

#### `getContentAreaHeight()`

计算视口内可用于内容显示的垂直空间高度。

*   **返回:** {number} 计算出的可用高度（像素）。
*   **注意:** 计算方式在桌面端和移动端不同（考虑页眉、页脚或操作栏的高度）。

#### `onLayoutChange(callback)`

注册一个回调函数，当主要布局元素（页眉、页脚、操作栏）的可见性改变时执行。

*   **参数:**
    *   `callback` {function(detail: object): void}: 回调函数，接收包含 `element` (string), `visible` (boolean), `height` (number, 可选) 的 `detail` 对象。
*   **返回:** {Function} 用于移除此监听器的函数。
*   **示例:**
    ```javascript
    const removeListener = kinlink.layoutApi.onLayoutChange(detail => {
      if (detail.element === 'header') {
        console.log('页眉可见性改变:', detail.visible);
      }
    });
    // 之后调用 removeListener();
    ```

---

## `kinlink.events`

提供标准的事件监听和移除功能。

#### `on(eventType, callback)`

订阅一个 kinlink 表单事件。

*   **参数:**
    *   `eventType` {string}: 事件类型（请使用 `kinlink.FormEvents` 中的常量）。
    *   `callback` {function(detail: object): void | boolean}: 事件触发时执行的回调函数。接收包含事件相关数据的 `detail` 对象。对于 `BEFORE_SUBMIT` 事件，可以返回 `false` 来取消提交。
*   **返回:** {string} 监听器的唯一 ID，用于 `off()` 方法。
*   **示例:**
    ```javascript
    const listenerId = kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, detail => {
      if (detail.fieldName === 'amount') {
        console.log('金额字段改变为:', detail.value);
      }
    });
    ```

#### `off(eventType, listenerId)`

取消订阅一个先前注册的事件监听器。

*   **参数:**
    *   `eventType` {string}: 事件类型。
    *   `listenerId` {string}: `on()` 方法返回的监听器 ID。
*   **返回:** {boolean} 如果成功找到并移除了监听器则为 `true`，否则为 `false`。
*   **示例:**
    ```javascript
    const wasRemoved = kinlink.events.off(kinlink.FormEvents.FIELD_CHANGE, listenerId);
    ```

---

## `kinlink.FormEvents`

一个包含可用事件类型常量的只读对象。请在调用 `kinlink.events.on` 和 `kinlink.events.off` 时使用这些常量。

*   `FORM_LOADED`: `'form:loaded'` - 表单及 API 完全初始化后触发。
*   `FIELD_CHANGE`: `'field:change'` - 字段值改变时触发 (经防抖处理)。 `detail`: `{ fieldName: string, value: any }`
*   `BEFORE_SUBMIT`: `'before:submit'` - 表单提交前触发。回调可返回 `false` 取消提交。 `detail`: `{ values: object }`
*   `AFTER_SUBMIT`: `'after:submit'` - 表单提交完成后触发。 `detail`: `{ result: object, success: boolean }`
*   `VALIDATION`: `'validation'` - Ant Design 表单验证失败时触发。 `detail`: `{ errorInfo: object }`

---

## `kinlink.proxy`

通过 kinlink 服务端代理安全地向外部系统发起 HTTP 请求，实现跨域、隐藏 Token 等安全集成场景。**推荐在 `BEFORE_SUBMIT` 事件中调用，实现与外部系统的数据交互。**

### 方法签名

```javascript
kinlink.proxy(url, method, headers, body)
```

### 参数

- `url` {string}  
  目标外部系统的完整 URL（如第三方 REST API 地址）。
- `method` {string}  
  HTTP 方法（如 `'GET'`, `'POST'`, `'PUT'`, `'DELETE'` 等）。
- `headers` {object}  
  请求头对象，键值对形式（如 `{ 'Content-Type': 'application/json' }`）。
- `body` {object|string|undefined}  
  请求体内容。对于 `POST`/`PUT` 等方法，通常为对象（会自动序列化为 JSON），也可为字符串或 `undefined`。

### 返回值

- 返回 `Promise<any>`，解析为外部系统响应的 JSON 对象或原始数据。

### 异常处理

- 网络错误、服务端异常、目标系统返回错误码等，均会抛出异常（`Promise` reject），需用 `try-catch` 或 `.catch()` 处理。

### 示例

```javascript
kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, async (data) => {
  try {
    const { values } = data;
    // 通过代理安全调用外部API
    const result = await kinlink.proxy(
      'https://api.example.com/endpoint',
      'POST',
      { 'Content-Type': 'application/json' },
      { foo: 'bar', ...values }
    );
    // 可根据result决定是否允许提交
    if (!result.success) {
      kinlink.formApi.showError('外部系统校验失败');
      return false; // 阻止表单提交
    }
  } catch (error) {
    kinlink.formApi.showError('外部系统请求失败');
    return false; // 阻止表单提交
  }
});
```

### 典型应用场景

- **跨域请求**：通过服务端代理安全访问第三方API，避免浏览器CORS限制。
- **隐藏敏感信息**：如Token、API Key等仅在服务端配置，前端不可见。
- **表单集成**：在 `BEFORE_SUBMIT` 阶段校验、同步或补充外部数据。

#### 关于隐藏 Token 的原理

通过 `kinlink.proxy` 发起的所有外部请求，实际由 kinlink plugin 的后端服务代理完成。后端会根据后台配置的目标 URL 自动补全所需的认证头（如 Token、API Key 等），前端无需也无法直接获取这些敏感信息。所有认证信息的配置和管理均在 kinlink plugin 后台完成，确保安全合规。
