"use client"

import { useState } from "react"
import { ExamplesSearch } from "@/components/examples-search"
import { ExampleCard } from "@/components/example-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 将示例数据从英文改为中文
const exampleCards = [
  {
    title: "字段联动",
    description: "学习如何使用字段联动和条件逻辑创建动态表单。",
    category: "表单操作",
    features: ["基于下拉选择显示/隐藏字段", "基于数量和价格计算总计", "根据表单状态应用不同的验证规则"],
    href: "/examples/field-linking",
  },
  {
    title: "自定义验证",
    description: "为您的表单实现高级验证规则，并提供视觉反馈。",
    category: "验证",
    features: ["带有视觉指示器的密码强度验证", "异步用户名可用性检查", "年龄限制和条款接受验证"],
    href: "/examples/custom-validation",
  },
  {
    title: "外部集成",
    description: "将您的表单与外部API和服务连接，以增强功能。",
    category: "集成",
    features: ["使用地理编码API验证地址", "从税号查询公司信息", "在CRM系统中检查重复客户"],
    href: "/examples/external-integration",
  },
  {
    title: "移动端适配",
    description: "使用响应式设计技术为移动设备优化您的表单。",
    category: "移动",
    features: ["检测移动设备并调整UI", "创建自定义移动操作栏", "优化输入字段以便触摸交互"],
    href: "/examples/mobile-adaptation",
  },
  {
    title: "表单验证",
    description: "学习验证表单输入和提供反馈的不同技术。",
    category: "验证",
    features: ["电子邮件、电话和日期验证", "基于其他字段的条件验证", "提交前的表单级验证"],
    href: "/examples/form-validation",
  },
  {
    title: "字段操作",
    description: "动态操作表单字段以创建交互式体验。",
    category: "表单操作",
    features: ["基于条件显示/隐藏字段", "动态启用/禁用字段", "为视觉反馈设置字段和标签样式"],
    href: "/examples/field-operations",
  },
  {
    title: "多步骤表单",
    description: "创建具有进度跟踪和每步验证的多步骤表单。",
    category: "表单操作",
    features: ["带有进度指示器的多步骤导航", "逐步验证", "提交前的摘要审核"],
    href: "/examples/multi-step-form",
    isNew: true,
  },
  {
    title: "动态调查",
    description: "构建具有条件问题和分支逻辑的动态调查。",
    category: "高级",
    features: ["基于先前回答的条件问题", "不同调查路径的分支逻辑", "实时响应验证"],
    href: "/examples/dynamic-survey",
    isPopular: true,
  },
  {
    title: "数据仪表板",
    description: "创建用于可视化表单提交数据的交互式仪表板。",
    category: "集成",
    features: ["使用图表和图形进行数据可视化", "实时数据更新", "过滤和排序选项"],
    href: "/examples/data-dashboard",
  },
  {
    title: "表单向导",
    description: "构建带有上下文帮助和工具提示的引导式表单向导。",
    category: "UI/UX",
    features: ["逐步指导", "上下文帮助工具提示", "内联验证和反馈"],
    href: "/examples/form-wizard",
  },
  {
    title: "条件逻辑",
    description: "在您的表单中实现复杂的条件逻辑。",
    category: "高级",
    features: ["基于规则的复杂字段可见性", "嵌套条件和依赖关系", "基于用户输入的动态表单结构"],
    href: "/examples/conditional-logic",
  },
  {
    title: "表单无障碍",
    description: "使用ARIA属性和键盘导航使您的表单对所有用户可访问。",
    category: "无障碍",
    features: ["为屏幕阅读器提供的ARIA属性", "键盘导航支持", "动态内容的焦点管理"],
    href: "/examples/form-accessibility",
  },
]

export function ExamplesClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter examples based on search query and active tab
  const filteredExamples = exampleCards.filter((example) => {
    const matchesSearch =
      example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") {
      return matchesSearch
    } else {
      return matchesSearch && example.category.toLowerCase().includes(activeTab.toLowerCase())
    }
  })

  return (
    <div className="space-y-8">
      <ExamplesSearch onSearch={setSearchQuery} />

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="all">所有示例</TabsTrigger>
          <TabsTrigger value="form-manipulation">表单操作</TabsTrigger>
          <TabsTrigger value="validation">验证</TabsTrigger>
          <TabsTrigger value="integration">集成</TabsTrigger>
          <TabsTrigger value="advanced">高级</TabsTrigger>
          <TabsTrigger value="ui/ux">UI/UX</TabsTrigger>
          <TabsTrigger value="accessibility">无障碍</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExamples.map((example, index) => (
              <ExampleCard key={index} {...example} />
            ))}
          </div>
        </TabsContent>

        {["form-manipulation", "validation", "integration", "advanced", "ui/ux", "accessibility", "mobile"].map(
          (category) => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredExamples
                  .filter((example) => example.category.toLowerCase().includes(category.toLowerCase()))
                  .map((example, index) => (
                    <ExampleCard key={index} {...example} />
                  ))}
              </div>
            </TabsContent>
          ),
        )}
      </Tabs>

      {searchQuery === "" && (
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">精选示例</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exampleCards
              .filter((example) => example.isNew || example.isPopular)
              .map((example, index) => (
                <ExampleCard key={index} {...example} />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
