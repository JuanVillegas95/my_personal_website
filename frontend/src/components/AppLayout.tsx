import type { ReactNode } from 'react'
import { TopBar } from './TopBar'
import './AppLayout.css'
import { BottomBar } from './BottomBar'


export function AppLayout({
  children,
  now,
  title,
}: {
  children: ReactNode
  now: Date
  title: string
}) {
  return (
    <div className="shell">
      <TopBar title={title} now={now} />
      <main className="main-area">{children}</main>
      <BottomBar />
    </div>
  )
}