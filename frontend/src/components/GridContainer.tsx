import { useState } from 'react'
import './GridContainer.css'
import './SectionPanel.css'
interface GridItem {
  id: string
  label: string
  image: string
}

const GRID_ITEMS: GridItem[] = [
  { id: '1', label: 'Forest Scene', image: 'https://picsum.photos/seed/grid-1/480/480' },
  { id: '2', label: 'City Lights', image: 'https://picsum.photos/seed/grid-2/480/480' },
  { id: '3', label: 'Ocean View', image: 'https://picsum.photos/seed/grid-3/480/480' },
  { id: '4', label: 'Mountain Trail', image: 'https://picsum.photos/seed/grid-4/480/480' },
  { id: '5', label: 'Orange Cat', image: 'https://picsum.photos/seed/grid-5/480/480' },
  { id: '6', label: 'Retro Car', image: 'https://picsum.photos/seed/grid-6/480/480' },
  { id: '7', label: 'Palm Trees', image: 'https://picsum.photos/seed/grid-7/480/480' },
  { id: '8', label: 'Purple Flowers', image: 'https://picsum.photos/seed/grid-8/480/480' },
  { id: '9', label: 'Night Sky', image: 'https://picsum.photos/seed/grid-9/480/480' },
  { id: '10', label: 'Rain Street', image: 'https://picsum.photos/seed/grid-10/480/480' },
  { id: '11', label: 'Desert Road', image: 'https://picsum.photos/seed/grid-11/480/480' },
  { id: '12', label: 'Blue Lake', image: 'https://picsum.photos/seed/grid-12/480/480' },
  { id: '13', label: 'Neon Signs', image: 'https://picsum.photos/seed/grid-13/480/480' },
  { id: '14', label: 'Snow Peaks', image: 'https://picsum.photos/seed/grid-14/480/480' },
  { id: '15', label: 'Sunset Field', image: 'https://picsum.photos/seed/grid-15/480/480' },
  { id: '16', label: 'Studio Portrait', image: 'https://picsum.photos/seed/grid-16/480/480' },
]

export function GridContainer() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="grid-container glass">
      {GRID_ITEMS.map((item, index) => (
        <button 
          key={item.id}
          type="button"
          className="grid-item"
          aria-label={item.label}
          aria-pressed={selectedIndex === index}
          data-selected={selectedIndex === index ? 'true' : 'false'}
          onMouseEnter={() => setSelectedIndex(index)}
          onFocus={() => setSelectedIndex(index)}
          onClick={() => setSelectedIndex(index)}
        >
          <div className="grid-item__frame">
            <img className="grid-item__image" src={item.image} alt={item.label} loading="lazy" />
          </div>
        </button>
      ))}
    </div>
  )
}
