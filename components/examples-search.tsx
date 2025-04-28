"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ExamplesSearchProps {
  onSearch: (query: string) => void
}

export function ExamplesSearch({ onSearch }: ExamplesSearchProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearch(newQuery)
  }

  return (
    <div className="flex w-full items-center gap-2">
      <Search className="h-5 w-5 text-muted-foreground" />
      <Input placeholder="搜索示例..." className="h-10 lg:h-12 w-full" value={query} onChange={handleSearch} />
    </div>
  )
}
