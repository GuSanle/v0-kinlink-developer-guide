"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  const pathname = usePathname();

  const navigation = [
    { name: "首页", href: "/" },
    { name: "文档", href: "/docs" },
    { name: "API参考", href: "/docs/api-reference" },
    { name: "示例", href: "/examples" },
  ];

  function getActiveHref({
    pathname,
    navigation,
  }: {
    pathname: string | null;
    navigation: { name: string; href: string }[];
  }): string {
    if (!pathname || !navigation) return "";
    let activeHref = "";
    let maxLength = 0;
    for (const item of navigation)
      if (
        pathname === item.href ||
        pathname.startsWith(item.href + "/") ||
        pathname === item.href + "/"
      )
        if (item.href.length > maxLength) {
          activeHref = item.href;
          maxLength = item.href.length;
        }
    return activeHref;
  }

  const activeHref = getActiveHref({ pathname, navigation });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">kinlink</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeHref === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeHref === item.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
