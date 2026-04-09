'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const isJa = pathname?.startsWith('/ja')
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/launch')

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-sm px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href={isJa ? '/ja' : '/'} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600">
            <span className="text-xs font-bold text-white">AL</span>
          </div>
          <span className="font-bold text-white">AutoLaunch</span>
        </Link>

        <div className="flex items-center gap-6">
          {isDashboard ? (
            <>
              <Link href="/dashboard" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link
                href="/launch/new"
                className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                New Launch
              </Link>
            </>
          ) : isJa ? (
            <>
              <Link href="#features" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">機能</Link>
              <Link href="#pricing" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">料金</Link>
              <Link href="/" className="hidden sm:block text-sm text-gray-500 hover:text-gray-300 transition-colors">English</Link>
              <Link
                href="/dashboard"
                className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                無料で始める
              </Link>
            </>
          ) : (
            <>
              <Link href="#features" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
              <Link href="#pricing" className="hidden sm:block text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/ja" className="hidden sm:block text-sm text-gray-500 hover:text-gray-300 transition-colors">日本語</Link>
              <Link
                href="/dashboard"
                className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Start Free Launch
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
