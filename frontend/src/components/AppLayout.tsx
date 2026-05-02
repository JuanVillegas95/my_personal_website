import type { ReactNode } from 'react'
import { TopBar } from './TopBar'
import { BottomBar } from './BottomBar'
import './AppLayout.css'

export function AppLayout({
  children,
  currentPage,
  now,
  pageCount,
}: {
  children: ReactNode
  currentPage: number
  now: Date
  pageCount: number
}) {
  return (
    <div className="shell">
      <TopBar currentPage={currentPage} now={now} pageCount={pageCount} />
      <main className="main-area">{children}</main>
      <BottomBar />
    </div>
  )
}
