import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ExampleCardProps {
  title: string
  description: string
  category: string
  features: string[]
  href: string
  difficulty?: string
  isNew?: boolean
  isPopular?: boolean
}

export function ExampleCard({
  title,
  description,
  category,
  features,
  href,
  difficulty = "Intermediate",
  isNew,
  isPopular,
}: ExampleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden border shadow-sm h-full">
      <CardHeader className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="line-clamp-1 text-xl">{title}</CardTitle>
          <div className="flex gap-2">
            {isNew && <Badge className="bg-blue-500">新</Badge>}
            {isPopular && <Badge className="bg-green-500">热门</Badge>}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline">{category}</Badge>
          <Badge variant="secondary" className="bg-slate-100">
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 text-sm flex-grow">
        <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={href} className="w-full">
          <Button className="w-full" variant="outline">
            查看示例
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
