import { useState } from 'react'
import aboutMeImage from '../assets/about-me-tile.svg'
import contactImage from '../assets/contact-tile.svg'
import experienceImage from '../assets/experience-tile.svg'
import openSourceImage from '../assets/open-source-tile.svg'
import resumePdfImage from '../assets/resume-pdf-tile.svg'
import techStackImage from '../assets/tech-stack-tile.svg'
import writingBlogImage from '../assets/writing-blog-tile.svg'
import './GridContainer.css'

interface GridItem {
  id: string
  label: string
  image: string
  link: string
}

// Replace `#` with the real project, LinkedIn, or page URL for each card.
const GRID_ITEMS: GridItem[] = [
  { id: '1', label: 'About Me', image: aboutMeImage, link: '#' },
  { id: '2', label: 'Bulbasaur', image: 'https://media.tenor.com/u7Di77AeSXAAAAAj/bulbasaur-rolling.gif', link: '#' },
  { id: '3', label: 'Linkedin', image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png?_=20140125013055', link: 'https://www.linkedin.com/in/juan-villegas97/' },
  { id: '4', label: 'Git', image: 'https://cdn.creazilla.com/icons/7915997/github-icon-lg.png', link: 'https://github.com/JuanVillegas95' },
  { id: '5', label: 'Writing / Blog', image: writingBlogImage, link: '#' },
  { id: '6', label: 'Resume PDF', image: resumePdfImage, link: '#' },
  { id: '7', label: 'Contact', image: contactImage, link: '#' },
  { id: '8', label: 'Purple Flowers', image: 'https://picsum.photos/seed/grid-8/480/480', link: '#' },
  { id: '9', label: 'Night Sky', image: 'https://picsum.photos/seed/grid-9/480/480', link: '#' },
  { id: '10', label: 'Rain Street', image: 'https://picsum.photos/seed/grid-10/480/480', link: '#' },
  { id: '11', label: 'Desert Road', image: 'https://picsum.photos/seed/grid-11/480/480', link: '#' },
  { id: '12', label: 'Blue Lake', image: 'https://picsum.photos/seed/grid-12/480/480', link: '#' },
  { id: '13', label: 'Neon Signs', image: 'https://picsum.photos/seed/grid-13/480/480', link: '#' },
  { id: '14', label: 'Snow Peaks', image: 'https://picsum.photos/seed/grid-14/480/480', link: '#' },
  { id: '15', label: 'Sunset Field', image: 'https://picsum.photos/seed/grid-15/480/480', link: '#' },
  { id: '16', label: 'Studio Portrait', image: 'https://picsum.photos/seed/grid-16/480/480', link: '#' },
  { id: '17', label: 'Experience', image: experienceImage, link: '#' },
  { id: '18', label: 'Tech Stack', image: techStackImage, link: '#' },
  { id: '19', label: 'Open Source', image: openSourceImage, link: '#' },
]

const isExternalLink = (link: string) => /^https?:\/\//.test(link)
const isPlaceholderLink = (link: string) => link === '#'

export function GridContainer() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="grid-container">
      {GRID_ITEMS.map((item, index) => {
        const isExternal = isExternalLink(item.link)

        return (
          <a
            key={item.id}
            className="grid-item"
            href={item.link}
            aria-label={item.label}
            data-selected={selectedIndex === index ? 'true' : 'false'}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => setSelectedIndex(index)}
            onFocus={() => setSelectedIndex(index)}
            onClick={(event) => {
              setSelectedIndex(index)

              if (isPlaceholderLink(item.link)) {
                event.preventDefault()
              }
            }}
          >
            <div className="grid-item__frame">
              <img className="grid-item__image" src={item.image} alt={item.label} loading="lazy" />
            </div>
          </a>
        )
      })}
    </div>
  )
}
