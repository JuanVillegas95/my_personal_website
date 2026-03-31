import './GridContainer.css'

type GridVariant = 'rabbids' | 'wii' | 'mii'

interface GridItem {
  id: string
  label: string
  variant: GridVariant
}

const GRID_ITEMS: GridItem[] = [
  { id: 'rabbids-1', label: 'Rabbids Channel', variant: 'rabbids' },
  { id: 'wii-1', label: 'Wii Channel', variant: 'wii' },
  { id: 'mii-1', label: 'Mii Channel', variant: 'mii' },
  { id: 'rabbids-2', label: 'Rabbids Channel', variant: 'rabbids' },
  { id: 'wii-2', label: 'Wii Channel', variant: 'wii' },
  { id: 'mii-2', label: 'Mii Channel', variant: 'mii' },
  { id: 'rabbids-3', label: 'Rabbids Channel', variant: 'rabbids' },
  { id: 'wii-3', label: 'Wii Channel', variant: 'wii' },
  { id: 'mii-3', label: 'Mii Channel', variant: 'mii' },
  { id: 'rabbids-4', label: 'Rabbids Channel', variant: 'rabbids' },
  { id: 'wii-4', label: 'Wii Channel', variant: 'wii' },
  { id: 'mii-4', label: 'Mii Channel', variant: 'mii' },
  { id: 'rabbids-5', label: 'Rabbids Channel', variant: 'rabbids' },
  { id: 'wii-5', label: 'Wii Channel', variant: 'wii' },
  { id: 'mii-5', label: 'Mii Channel', variant: 'mii' },
  { id: 'rabbids-6', label: 'Rabbids Channel', variant: 'rabbids' },
]



export function GridContainer() {
  return (
    <div className="grid-container glass">
      {GRID_ITEMS.map(item => (
        <button key={item.id} type="button" className={`grid-item grid-item--${item.variant}`} aria-label={item.label}>
          <div className="grid-item__frame">
          </div>
        </button>
      ))}
    </div>
  )
}
