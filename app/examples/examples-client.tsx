"use client";

import { useState } from "react";
import { ExamplesSearch } from "@/components/examples-search";
import { ExampleCard } from "@/components/example-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 与实际14个示例目录匹配的示例卡片数据
const exampleCards = [
  {
    title: "修改字段标签",
    description: "学习如何动态修改表单中的字段标签文本。",
    category: "表单操作",
    features: [
      "动态修改字段标签",
      "根据条件更新标签内容",
      "添加帮助信息到标签",
    ],
    href: "/examples/field-label-modification",
  },
  {
    title: "字段样式自定义",
    description: "为表单字段添加自定义样式，改善用户体验。",
    category: "UI/UX",
    features: [
      "自定义字段边框和背景",
      "更改字段标签样式",
      "添加悬停和聚焦效果",
    ],
    href: "/examples/field-style-customization",
  },
  {
    title: "字段显示隐藏控制",
    description: "学习如何控制表单字段的可见性和显示状态。",
    category: "表单操作",
    features: [
      "真实隐藏字段（不提交）",
      "视觉隐藏字段（仍提交）",
      "基于条件显示隐藏",
    ],
    href: "/examples/field-visibility-control",
  },
  {
    title: "字段启用禁用控制",
    description: "根据业务逻辑动态启用或禁用表单字段。",
    category: "表单操作",
    features: ["动态禁用字段", "根据其他字段值控制状态", "提供视觉反馈"],
    href: "/examples/field-enable-disable",
  },
  {
    title: "字段值读取与设置",
    description: "学习如何获取和设置表单字段的值。",
    category: "表单操作",
    features: ["读取字段当前值", "设置字段值", "监听值变化"],
    href: "/examples/field-value-operations",
  },
  {
    title: "自定义验证规则",
    description: "为表单字段实现高级自定义验证规则。",
    category: "验证",
    features: ["创建自定义验证函数", "显示验证错误信息", "条件验证逻辑"],
    href: "/examples/custom-validation",
  },
  {
    title: "字段联动",
    description: "学习如何使用字段联动和条件逻辑创建动态表单。",
    category: "表单操作",
    features: ["基于字段值显示/隐藏其他字段", "联动更新字段值", "实现级联选择"],
    href: "/examples/field-linking",
  },
  {
    title: "移动端适配",
    description: "使用响应式设计技术为移动设备优化表单。",
    category: "移动",
    features: ["检测移动设备并调整UI", "优化移动端布局", "改善触摸交互体验"],
    href: "/examples/mobile-adaptation",
  },
  {
    title: "表单提交处理",
    description: "学习如何控制表单提交流程和处理提交数据。",
    category: "表单操作",
    features: ["提交前验证数据", "自定义提交处理", "提交后回调"],
    href: "/examples/form-submission",
  },
  {
    title: "消息提示演示",
    description: "展示不同类型的用户消息提示和通知。",
    category: "UI/UX",
    features: ["成功、警告、错误提示", "定制消息内容和样式", "定时自动关闭"],
    href: "/examples/message-notification",
  },
  {
    title: "获取字段元素并条件隐藏",
    description: "学习如何获取字段DOM元素并实现条件隐藏功能。",
    category: "高级",
    features: ["获取字段DOM元素", "添加自定义UI控件", "实现交互式显示控制"],
    href: "/examples/get-field-element",
  },
  {
    title: "隐藏kintone标签",
    description: "学习如何隐藏平台原生UI元素以自定义界面。",
    category: "UI/UX",
    features: ["隐藏原生标签", "替换平台界面元素", "保持功能完整性"],
    href: "/examples/hide-kintone-label",
  },
  {
    title: "多步骤表单",
    description: "创建具有进度跟踪和分步验证的多步骤表单。",
    category: "高级",
    features: ["多页面表单导航", "逐步验证", "进度指示"],
    href: "/examples/multi-step-form",
  },
  {
    title: "kinlink代理",
    description: "学习如何使用API代理功能调用外部服务。",
    category: "集成",
    features: ["安全调用外部API", "处理认证和授权", "数据转换和处理"],
    href: "/examples/kinlink-proxy",
  },
  {
    title: "动态调查",
    description: "构建具有条件问题和分支逻辑的动态调查表单。",
    category: "高级",
    features: ["基于先前回答的条件问题", "分支逻辑", "实时验证"],
    href: "/examples/dynamic-survey",
  },
];

export function ExamplesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter examples based on search query and active tab
  const filteredExamples = exampleCards.filter((example) => {
    const matchesSearch =
      example.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      example.features.some((feature) =>
        feature.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (activeTab === "all") {
      return matchesSearch;
    } else {
      return (
        matchesSearch &&
        example.category.toLowerCase().includes(activeTab.toLowerCase())
      );
    }
  });

  return (
    <div className="space-y-8 mt-4">
      <ExamplesSearch onSearch={setSearchQuery} />

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="all">所有示例</TabsTrigger>
          <TabsTrigger value="表单操作">表单操作</TabsTrigger>
          <TabsTrigger value="验证">验证</TabsTrigger>
          <TabsTrigger value="集成">集成</TabsTrigger>
          <TabsTrigger value="高级">高级</TabsTrigger>
          <TabsTrigger value="ui/ux">UI/UX</TabsTrigger>
          <TabsTrigger value="移动">移动</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExamples.map((example, index) => (
              <ExampleCard key={index} {...example} />
            ))}
          </div>
        </TabsContent>

        {["表单操作", "验证", "集成", "高级", "ui/ux", "移动"].map(
          (category) => (
            <TabsContent key={category} value={category} className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredExamples
                  .filter(
                    (example) =>
                      example.category.toLowerCase() === category.toLowerCase()
                  )
                  .map((example, index) => (
                    <ExampleCard key={index} {...example} />
                  ))}
              </div>
            </TabsContent>
          )
        )}
      </Tabs>

      {searchQuery === "" && (
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">最近添加的示例</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exampleCards.slice(0, 3).map((example, index) => (
              <ExampleCard key={index} {...example} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
