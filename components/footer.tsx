import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">Kinlink</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            为Kintone外部集成而构建。© {new Date().getFullYear()} Kinlink。
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/docs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            文档
          </Link>
        </div>
      </div>
    </footer>
  );
}
