import { CodeBlock } from "@/components/code-block";

export default function ProxyApiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Proxy API
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          使用Kinlink代理服务安全地调用外部API。
        </p>
      </div>

      <div className="docs-content">
        <p>
          <code>kinlink.proxy</code>{" "}
          API提供了一种通过Kinlink服务端代理安全地向外部系统发起HTTP请求的方法，实现跨域、隐藏Token等安全集成场景。
          推荐在<code>BEFORE_SUBMIT</code>事件中调用，实现与外部系统的数据交互。
        </p>

        <h2>方法签名</h2>

        <CodeBlock
          code={`kinlink.proxy(url, method, headers, body)`}
          language="javascript"
        />

        <h2>参数</h2>

        <ul>
          <li>
            <code>url</code> <code>{"{string}"}</code>
            <p>目标外部系统的完整URL（如第三方REST API地址）</p>
          </li>
          <li>
            <code>method</code> <code>{"{string}"}</code>
            <p>HTTP方法（如'GET', 'POST', 'PUT', 'DELETE'等）</p>
          </li>
          <li>
            <code>headers</code> <code>{"{object}"}</code>
            <p>
              请求头对象，键值对形式（如
              {" { 'Content-Type': 'application/json' }"}
            </p>
          </li>
          <li>
            <code>body</code> <code>{"{object|string|undefined}"}</code>
            <p>
              请求体内容。对于POST/PUT等方法，通常为对象（会自动序列化为JSON），也可为字符串或undefined
            </p>
          </li>
        </ul>

        <h2>返回值</h2>

        <p>
          返回<code>Promise&lt;any&gt;</code>
          ，解析为外部系统响应的JSON对象或原始数据。
        </p>

        <h2>异常处理</h2>

        <p>
          网络错误、服务端异常、目标系统返回错误码等，均会抛出异常（
          <code>Promise</code> reject）， 需用<code>try-catch</code>或
          <code>.catch()</code>处理。
        </p>

        <h2>示例</h2>

        <CodeBlock
          code={`kinlink.events.on(kinlink.FormEvents.BEFORE_SUBMIT, async (data) => {
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
});`}
          language="javascript"
          filename="proxy-example.js"
        />

        <h2>典型应用场景</h2>

        <ul>
          <li>
            <strong>跨域请求</strong>
            ：通过服务端代理安全访问第三方API，避免浏览器CORS限制。
          </li>
          <li>
            <strong>隐藏敏感信息</strong>：如Token、API
            Key等仅在服务端配置，前端不可见。
          </li>
          <li>
            <strong>表单集成</strong>：在<code>BEFORE_SUBMIT</code>
            阶段校验、同步或补充外部数据。
          </li>
        </ul>

        <h3>关于隐藏Token的原理</h3>

        <p>
          通过<code>kinlink.proxy</code>发起的所有外部请求，实际由kinlink
          plugin的后端服务代理完成。
          后端会根据后台配置的目标URL自动补全所需的认证头（如Token、API
          Key等），前端无需也无法直接获取这些敏感信息。
          所有认证信息的配置和管理均在kinlink plugin后台完成，确保安全合规。
        </p>
      </div>
    </div>
  );
}
