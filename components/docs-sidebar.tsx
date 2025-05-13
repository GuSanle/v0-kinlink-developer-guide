"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  // 将侧边栏项目从英文改为中文
  const sidebarItems = [
    {
      title: "入门指南",
      items: [
        {
          title: "介绍",
          href: "/docs",
        },
        {
          title: "安装",
          href: "/docs/installation",
        },
      ],
    },
    {
      title: "API参考",
      items: [
        {
          title: "概述",
          href: "/docs/api-reference",
        },
        {
          title: "表单API",
          href: "/docs/api-reference/form-api",
        },
        {
          title: "布局API",
          href: "/docs/api-reference/layout-api",
        },
        {
          title: "事件",
          href: "/docs/api-reference/events",
        },
        {
          title: "代理API",
          href: "/docs/api-reference/proxy",
        },
      ],
    },
    {
      title: "指南",
      items: [
        {
          title: "字段操作",
          href: "/docs/guides/field-operations",
        },
        {
          title: "表单验证",
          href: "/docs/guides/form-validation",
        },
        {
          title: "移动端适配",
          href: "/docs/guides/mobile-adaptation",
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      {sidebarItems.map((section, i) => (
        <div key={i} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {section.title}
          </h4>
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-2 py-1 text-sm hover:bg-accent ${
                pathname === item.href
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
