"use client"

import { useState } from "react"
import { Box } from "lucide-react"
import { MenuBar } from "@/components/ui/glow-menu"

const menuItems = [
  {
    icon: Box,
    label: "PROJECTS",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
  },
]

export default function MenuBarDemo() {
  const [activeItem, setActiveItem] = useState<string>("Home")

  return (
    <MenuBar
      items={menuItems}
      activeItem={activeItem}
      onItemClick={setActiveItem}
    />
  )
}
