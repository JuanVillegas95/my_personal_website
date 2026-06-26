import type { ReactNode } from 'react'
import { TopBar } from './TopBar'
import { BackgroundDrawer, type BackgroundOption } from './BackgroundDrawer'
import { BottomBar } from './BottomBar'
import { ChatDrawer } from './ChatDrawer'
import './AppLayout.css'

export function AppLayout({
  backgroundOptions,
  children,
  currentPage,
  isBackgroundPickerOpen,
  isChatOpen,
  now,
  onBackgroundPickerClose,
  onBackgroundPickerOpen,
  onBackgroundSelect,
  onChatClose,
  onChatOpen,
  onPageChange,
  pageCount,
  selectedBackground,
}: {
  backgroundOptions: BackgroundOption[]
  children: ReactNode
  currentPage: number
  isBackgroundPickerOpen: boolean
  isChatOpen: boolean
  now: Date
  onBackgroundPickerClose: () => void
  onBackgroundPickerOpen: () => void
  onBackgroundSelect: (source: string) => void
  onChatClose: () => void
  onChatOpen: () => void
  onPageChange: (page: number) => void
  pageCount: number
  selectedBackground: string
}) {
  return (
    <div className="shell">
      <TopBar currentPage={currentPage} now={now} pageCount={pageCount} onOpenChat={onChatOpen} />
      <main className="main-area">{children}</main>
      <BottomBar
        currentPage={currentPage}
        pageCount={pageCount}
        onOpenBackgroundPicker={onBackgroundPickerOpen}
        onPageChange={onPageChange}
      />
      <ChatDrawer isOpen={isChatOpen} onClose={onChatClose} />
      <BackgroundDrawer
        isOpen={isBackgroundPickerOpen}
        options={backgroundOptions}
        selectedSource={selectedBackground}
        onClose={onBackgroundPickerClose}
        onSelect={onBackgroundSelect}
      />
    </div>
  )
}
