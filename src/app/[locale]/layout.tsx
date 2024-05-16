import "./globals.css"
import React from "react"
import Header from "./header"
import Footer from "./footer"
import { Toaster } from "sonner"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from 'next-intl'
import SessionProvider from "@/components/AuthProvider"
import { ThemeProvider } from "@/components/ThemeProvider"


const inter = Inter({ subsets: ["latin"] })

const locales = ['en', 'ru']

export function generateStaticParams() {
    return locales.map((locale) => ({locale}))
}

export const metadata: Metadata = {
  title: "X Ξ V Ξ X",
  description: "Legendary Module",
  icons: {
    icon: "@/app/favicon.ico"
  }
}

interface RootLayoutProps {
    children: React.ReactNode
    params: {
        locale: string;
    }
}

export default function RootLayout({children, params: { locale }}: Readonly<RootLayoutProps>) {
    const messages = require(`@/messages/${locale}.json`)
    return (
        <html lang={locale}>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <SessionProvider>
                    <div className="flex flex-col justify-between h-full">
                        <Header/>
                        <main className="flex-grow relative container max-w-[1130px] border-x border-border/40 py-4 sm:py-8 px-0">
                            {children}
                        </main>
                        <Toaster richColors/>
                        <Footer/>
                    </div>
                </SessionProvider>    
            </NextIntlClientProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
