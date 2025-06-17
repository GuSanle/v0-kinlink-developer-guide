import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
            连接 <span className="text-primary">kintone</span> 与外部世界
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Kinlink 是基于 kintone 构建的强大外部集成系统，让您轻松将 kintone
            数据分享给外部用户， 提供完整的表单自定义能力和丰富的 JavaScript
            API。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs">
              <Button size="lg" className="px-8 py-3">
                开始使用
              </Button>
            </Link>
            <Link href="/examples">
              <Button variant="outline" size="lg" className="px-8 py-3">
                查看示例
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <ChevronDown className="w-8 h-8 text-muted-foreground animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            为什么选择 Kinlink？
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            专为 kintone 设计的外部集成解决方案，提供完整的开发工具和文档支持
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">🔗 外部数据分享</CardTitle>
              <CardDescription className="text-muted-foreground">
                将 kintone 应用数据安全地分享给外部用户，支持细粒度权限控制
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              通过 Kinlink，您可以创建独立的外部表单，让外部用户提交数据到您的
              kintone 应用中， 无需给予他们 kintone 系统的访问权限。
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">⚡ 强大的 API</CardTitle>
              <CardDescription className="text-muted-foreground">
                丰富的 JavaScript API，支持表单字段操作、验证、样式定制等
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              提供完整的 formApi、layoutApi
              和事件系统，让您可以构建复杂的业务逻辑和用户交互。
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">📱 移动端优化</CardTitle>
              <CardDescription className="text-muted-foreground">
                专门的移动端 API 和响应式设计，确保完美的移动体验
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              内置移动端检测和专用
              API，让您的表单在各种设备上都能提供最佳用户体验。
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">🎨 自定义样式</CardTitle>
              <CardDescription className="text-muted-foreground">
                灵活的样式定制系统，支持字段标签和组件的样式控制
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              通过 API 轻松定制表单外观，支持批量样式设置和响应式布局调整。
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">✅ 智能验证</CardTitle>
              <CardDescription className="text-muted-foreground">
                内置验证系统和自定义验证器，确保数据质量和用户体验
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              支持字段级别的自定义验证规则，实时错误提示，让用户快速修正输入错误。
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">🔧 事件驱动</CardTitle>
              <CardDescription className="text-muted-foreground">
                完整的事件系统，支持表单生命周期和字段变化监听
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              通过事件监听实现复杂的字段联动、数据同步和业务逻辑处理。
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
            快速开始
          </h2>
          <div className="bg-card border border-border rounded-lg p-8 text-left">
            <pre className="text-sm overflow-x-auto text-card-foreground">
              <code className="text-green-600 dark:text-green-400">
                {`// 基础用法示例
(function() {
  kinlink.events.on(kinlink.FormEvents.FORM_LOADED, () => {
    const form = kinlink.formApi;
    
    // 隐藏某个字段
    form.hideField('额外信息');
    
    // 添加自定义验证
    form.addFieldValidator('邮箱', (value) => {
      if (!value) return;
      if (!/^\\w+@\\w+\\.\\w+$/.test(value)) {
        return '请输入有效邮箱地址';
      }
      return undefined;
    });
  });
  
  // 字段联动
  kinlink.events.on(kinlink.FormEvents.FIELD_CHANGE, (data) => {
    const { fieldName, value } = data;
    const form = kinlink.formApi;
    
    if (fieldName === '类型' && value === '高级') {
      form.showField('额外信息');
    }
  });
})();`}
              </code>
            </pre>
          </div>
          <div className="mt-8">
            <Link href="/docs">
              <Button size="lg">查看完整文档</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
