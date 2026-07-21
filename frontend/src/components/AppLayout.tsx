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
  isGridBackgroundPickerOpen,
  now,
  onBackgroundPickerClose,
  onBackgroundPickerOpen,
  onBackgroundSelect,
  onChatClose,
  onChatOpen,
  onGridBackgroundPickerClose,
  onGridBackgroundPickerOpen,
  onGridBackgroundSelect,
  onPageChange,
  pageCount,
  selectedBackground,
  selectedGridBackground,
}: {
  backgroundOptions: BackgroundOption[]
  children: ReactNode
  currentPage: number
  isBackgroundPickerOpen: boolean
  isChatOpen: boolean
  isGridBackgroundPickerOpen: boolean
  now: Date
  onBackgroundPickerClose: () => void
  onBackgroundPickerOpen: () => void
  onBackgroundSelect: (source: string) => void
  onChatClose: () => void
  onChatOpen: () => void
  onGridBackgroundPickerClose: () => void
  onGridBackgroundPickerOpen: () => void
  onGridBackgroundSelect: (source: string) => void
  onPageChange: (page: number) => void
  pageCount: number
  selectedBackground: string
  selectedGridBackground: string
}) {
  return (
    <div className="shell">
      <TopBar currentPage={currentPage} now={now} pageCount={pageCount} onOpenChat={onChatOpen} />
      <main className="main-area">{children}</main>
      <BottomBar
        currentPage={currentPage}
        pageCount={pageCount}
        onOpenBackgroundPicker={onBackgroundPickerOpen}
        onOpenGridBackgroundPicker={onGridBackgroundPickerOpen}
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
      <BackgroundDrawer
        ariaLabel="Grid background picker"
        eyebrow="Current grid"
        isOpen={isGridBackgroundPickerOpen}
        options={backgroundOptions}
        selectedSource={selectedGridBackground}
        title="Grid background"
        onClose={onGridBackgroundPickerClose}
        onSelect={onGridBackgroundSelect}
      />
    </div>
  )
}
