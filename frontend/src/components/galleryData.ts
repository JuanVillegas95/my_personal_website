import aboutMeImage from '../assets/about-me-tile.svg'
import contactImage from '../assets/contact-tile.svg'
import experienceImage from '../assets/experience-tile.svg'
import openSourceImage from '../assets/open-source-tile.svg'
import resumePdfImage from '../assets/resume-pdf-tile.svg'
import techStackImage from '../assets/tech-stack-tile.svg'
import writingBlogImage from '../assets/writing-blog-tile.svg'

export type MediaType = 'gif' | 'image' | 'placeholder' | 'video'
export type TileSize = 'hero' | 'small' | 'tall' | 'wide'
export type TileTone = 'blue' | 'coral' | 'gold' | 'graphite' | 'mint' | 'violet'

export interface GalleryItem {
  id: string
  title: string
  source?: string
  mediaType: MediaType
  tileSize: TileSize
  tone: TileTone
  glyph: string
  link?: string
}

export interface GallerySection {
  id: string
  label: string
  items: GalleryItem[]
}

// Drop photos, GIFs, or short videos into public/assets/media and reference them as /assets/media/file-name.ext.
export const GALLERY_SECTIONS: GallerySection[] = [
  {
    id: 'profile',
    label: 'Profile',
    items: [
      {
        id: 'about',
        title: 'About Me',
        source: aboutMeImage,
        mediaType: 'image',
        tileSize: 'hero',
        tone: 'mint',
        glyph: 'JV',
        link: '#',
      },
      {
        id: 'motion-loop',
        title: 'Motion Loop',
        mediaType: 'gif',
        tileSize: 'small',
        tone: 'violet',
        glyph: 'M',
        link: '#',
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        source: contactImage,
        mediaType: 'image',
        tileSize: 'small',
        tone: 'blue',
        glyph: 'IN',
        link: 'https://www.linkedin.com/in/juan-villegas97/',
      },
      {
        id: 'github',
        title: 'GitHub',
        source: openSourceImage,
        mediaType: 'image',
        tileSize: 'small',
        tone: 'graphite',
        glyph: 'GH',
        link: 'https://github.com/JuanVillegas95',
      },
      {
        id: 'now-playing',
        title: 'Now Playing',
        source: '/music/clair-obscure/img.jpeg',
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'gold',
        glyph: 'NP',
        link: '#',
      },
      {
        id: 'writing',
        title: 'Writing',
        source: writingBlogImage,
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'coral',
        glyph: 'W',
        link: '#',
      },
      {
        id: 'contact',
        title: 'Contact',
        source: contactImage,
        mediaType: 'image',
        tileSize: 'small',
        tone: 'blue',
        glyph: 'C',
        link: '#',
      },
      {
        id: 'projects',
        title: 'Projects',
        source: experienceImage,
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'blue',
        glyph: 'PR',
        link: '#',
      },
      {
        id: 'music-room',
        title: 'Music Room',
        source: '/music/hikari%20%E5%85%89/img.jpeg',
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'gold',
        glyph: 'MR',
        link: '#',
      },
      {
        id: 'lab',
        title: 'Lab',
        mediaType: 'placeholder',
        tileSize: 'wide',
        tone: 'violet',
        glyph: 'LB',
        link: '#',
      },
      {
        id: 'notes',
        title: 'Notes',
        source: writingBlogImage,
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'coral',
        glyph: 'NT',
        link: '#',
      },
    ],
  },
  {
    id: 'work',
    label: 'Work',
    items: [
      {
        id: 'experience',
        title: 'Experience',
        source: experienceImage,
        mediaType: 'image',
        tileSize: 'hero',
        tone: 'blue',
        glyph: 'EX',
        link: '#',
      },
      {
        id: 'tech-stack',
        title: 'Tech Stack',
        source: techStackImage,
        mediaType: 'image',
        tileSize: 'tall',
        tone: 'violet',
        glyph: 'TS',
        link: '#',
      },
      {
        id: 'resume',
        title: 'Resume',
        source: resumePdfImage,
        mediaType: 'image',
        tileSize: 'small',
        tone: 'gold',
        glyph: 'CV',
        link: '#',
      },
      {
        id: 'open-source',
        title: 'Open Source',
        source: openSourceImage,
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'graphite',
        glyph: 'OS',
        link: 'https://github.com/JuanVillegas95',
      },
      {
        id: 'lilium',
        title: 'Lilium',
        source: '/music/lilium/img.jpeg',
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'coral',
        glyph: 'LI',
        link: '#',
      },
      {
        id: 'build-notes',
        title: 'Build Notes',
        mediaType: 'placeholder',
        tileSize: 'small',
        tone: 'mint',
        glyph: 'BN',
        link: '#',
      },
      {
        id: 'ambient-loop',
        title: 'Ambient Loop',
        mediaType: 'gif',
        tileSize: 'small',
        tone: 'violet',
        glyph: 'AL',
        link: '#',
      },
      {
        id: 'systems',
        title: 'Systems',
        mediaType: 'placeholder',
        tileSize: 'wide',
        tone: 'graphite',
        glyph: 'SY',
        link: '#',
      },
      {
        id: 'homelab',
        title: 'Homelab',
        mediaType: 'placeholder',
        tileSize: 'wide',
        tone: 'mint',
        glyph: 'HL',
        link: '#',
      },
      {
        id: 'toolkit',
        title: 'Toolkit',
        source: techStackImage,
        mediaType: 'image',
        tileSize: 'tall',
        tone: 'blue',
        glyph: 'TK',
        link: '#',
      },
      {
        id: 'ideas',
        title: 'Ideas',
        mediaType: 'placeholder',
        tileSize: 'small',
        tone: 'gold',
        glyph: 'ID',
        link: '#',
      },
    ],
  },
  {
    id: 'media',
    label: 'Media',
    items: [
      {
        id: 'media-drop',
        title: 'Media Drop',
        mediaType: 'placeholder',
        tileSize: 'hero',
        tone: 'coral',
        glyph: 'MD',
        link: '#',
      },
      {
        id: 'hikari',
        title: 'Hikari',
        source: '/music/hikari%20%E5%85%89/img.jpeg',
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'gold',
        glyph: 'HI',
        link: '#',
      },
      {
        id: 'photo-strip',
        title: 'Photo Strip',
        mediaType: 'placeholder',
        tileSize: 'tall',
        tone: 'blue',
        glyph: 'PS',
        link: '#',
      },
      {
        id: 'gif-slot',
        title: 'GIF Slot',
        mediaType: 'gif',
        tileSize: 'small',
        tone: 'mint',
        glyph: 'GF',
        link: '#',
      },
      {
        id: 'video-slot',
        title: 'Video Slot',
        mediaType: 'video',
        tileSize: 'wide',
        tone: 'graphite',
        glyph: 'VD',
        link: '#',
      },
      {
        id: 'archive',
        title: 'Archive',
        mediaType: 'placeholder',
        tileSize: 'small',
        tone: 'violet',
        glyph: 'AR',
        link: '#',
      },
      {
        id: 'frame-set',
        title: 'Frame Set',
        mediaType: 'placeholder',
        tileSize: 'wide',
        tone: 'blue',
        glyph: 'FS',
        link: '#',
      },
      {
        id: 'audio-log',
        title: 'Audio Log',
        source: '/music/clair-obscure/img.jpeg',
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'gold',
        glyph: 'AU',
        link: '#',
      },
      {
        id: 'clip-bank',
        title: 'Clip Bank',
        mediaType: 'video',
        tileSize: 'wide',
        tone: 'graphite',
        glyph: 'CB',
        link: '#',
      },
      {
        id: 'snapshots',
        title: 'Snapshots',
        source: '/music/lilium/img.jpeg',
        mediaType: 'image',
        tileSize: 'wide',
        tone: 'coral',
        glyph: 'SN',
        link: '#',
      },
    ],
  },
]

export const GALLERY_PAGE_COUNT = GALLERY_SECTIONS.length
