// app/providers.tsx
'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider attribute="class">
        <main className=' text-foreground bg-background'>
            {children}
        </main>
      </NextThemesProvider>
    </NextUIProvider>
    </QueryClientProvider>
    
  )
}