// app/components/ThemeSwitcher.tsx
"use client";

import {useTheme} from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      <div className=" text-7xl p-5 rounded-lg shadow-xl">
      <h1>Login Modal</h1>
      <button  onClick={() => router.back()}>Close modal</button>
    </div>
      <p>The current theme is: {theme}</p>
      <button className="bg-red-500" onClick={() => setTheme('light')}>Light Mode</button>
      <button className="bg-blue-500" onClick={() => setTheme('dark')}>Dark Mode</button>
      
    </div>
  )
};