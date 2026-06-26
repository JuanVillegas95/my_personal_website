import experienceImage from '../assets/experience-tile.svg'
import resumePdfImage from '../assets/resume-pdf-tile.svg'
import techStackImage from '../assets/tech-stack-tile.svg'

export const MEDIA_TYPES = {
  GIF: 'gif',
  IMAGE: 'image',
  PLACEHOLDER: 'placeholder',
  SLIDESHOW: 'slideshow',
  VIDEO: 'video',
} as const

export type MediaType = (typeof MEDIA_TYPES)[keyof typeof MEDIA_TYPES]
export type SingleSourceMediaType = Exclude<MediaType, typeof MEDIA_TYPES.SLIDESHOW>

export const SLIDESHOW_EFFECTS = {
  FADE: 'fade',
  SLIDE: 'slide',
  VERTICAL: 'vertical',
} as const

export type SlideshowEffect = (typeof SLIDESHOW_EFFECTS)[keyof typeof SLIDESHOW_EFFECTS]

export const TILE_SIZES = {
  HERO: 'hero',
  SMALL: 'small',
  TALL: 'tall',
  WIDE: 'wide',
} as const

export type TileSize = (typeof TILE_SIZES)[keyof typeof TILE_SIZES]

export const TILE_TONES = {
  BLUE: 'blue',
  CORAL: 'coral',
  GOLD: 'gold',
  GRAPHITE: 'graphite',
  MINT: 'mint',
  VIOLET: 'violet',
} as const

export type TileTone = (typeof TILE_TONES)[keyof typeof TILE_TONES]

interface GalleryItemBase {
  id: string
  title: string
  tileSize: TileSize
  tone: TileTone
  glyph: string
  websiteLink?: string
  githubLink?: string
}

export type GalleryItem =
  | (GalleryItemBase & {
      mediaType: SingleSourceMediaType
      source?: string
    })
  | (GalleryItemBase & {
      mediaType: typeof MEDIA_TYPES.SLIDESHOW
      source: string[]
      slideshowEffect?: SlideshowEffect
      slideshowIntervalSeconds?: number
    })

export interface GallerySection {
  id: string
  label: string
  items: GalleryItem[]
}

// Drop photos, GIFs, or short videos into public/assets/media and reference them as /assets/media/file-name.ext.
export const GALLERY_SECTIONS: GallerySection[] = [
  {
    id: 'profile',
    label: 'Projects',
    items: [
      {
        id: 'bulbasur',
        title: 'Pikachu',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.SMALL,
         source: 'https://i.pinimg.com/originals/e3/71/f9/e371f99d77fd14ade6031dce600dca10.gif',
        tone: TILE_TONES.GOLD,
        glyph: 'PK',
      },
      {
        id: 'resume',
        title: 'Resume',
        source: 'https://cdn-icons-gif.flaticon.com/16664/16664304.gif',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'RM',
        websiteLink: 'https://docs.google.com/document/d/1k9b-5JpFSVCe3Nf_VpzbFy4ojx7QqjZn/edit?usp=sharing&ouid=106965964378759600263&rtpof=true&sd=true',
      },
{
  id: 'my-slideshow',
  title: 'My Slideshow',
  mediaType: MEDIA_TYPES.IMAGE,
  tileSize: TILE_SIZES.TALL,
  tone: TILE_TONES.MINT,
  glyph: 'SS',
  source: 
    '/images/2.jpg',

      },
      {
  id: 'my-slideshow-2',
  title: ':)',
  mediaType: MEDIA_TYPES.SLIDESHOW,
  slideshowEffect: SLIDESHOW_EFFECTS.FADE,
  slideshowIntervalSeconds: 5,
  tileSize: TILE_SIZES.TALL,
  tone: TILE_TONES.VIOLET,
  glyph: 'SS',
  source: [
    '/images/1.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',

  ],
},
      {
        id: 'x-mas',
        title: 'x-mas',
        source: '/images/x-mas.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.BLUE,
        glyph: 'XM',
        websiteLink: 'https://824066e3.honecita-x-mas.pages.dev',
        githubLink: 'https://github.com/JuanVillegas95/honecita-x-mas'
      },
      {
        id: 'music-room',
        title: 'Music Room',
        source: '/music/hikari%20%E5%85%89/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.GOLD,
        glyph: 'MR',
      },
      {
        id: 'valentine',
        title: 'Valentine',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.VIOLET,
        glyph: 'VT',
        websiteLink: 'https://valentine-c5b.pages.dev',
        source: "https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif",
        githubLink: "https://github.com/JuanVillegas95/valentine"
      },
            {
       id: 'muerte-moshe',
        title: 'Muerte Moshe',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.MINT,
        glyph: 'MM',
        websiteLink: 'https://muerte-moshe.pages.dev',
        githubLink: 'https://github.com/JuanVillegas95/muerte-moshe',
        source: "/images/muerte_moshe.jpeg"
      },
{
  id: 'my-slideshow-3',
  title: ':D',
  mediaType: MEDIA_TYPES.SLIDESHOW,
  slideshowEffect: SLIDESHOW_EFFECTS.VERTICAL,
  slideshowIntervalSeconds: 7,
  tileSize: TILE_SIZES.WIDE,
  tone: TILE_TONES.VIOLET,
  glyph: 'SS',
  source: [
    '/images/8.jpg',
    '/images/9.jpg',
    '/images/10.jpg',
    '/images/11.jpg',
  ],
}

    ],
  },
  {
    id: 'work',
    label: 'Home',
    items: [
      {
        id: 'experience',
        title: 'Experience',
        source: experienceImage,
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.HERO,
        tone: TILE_TONES.BLUE,
        glyph: 'EX',
      },
      {
        id: 'tech-stack',
        title: 'Tech Stack',
        source: techStackImage,
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.TALL,
        tone: TILE_TONES.VIOLET,
        glyph: 'TS',
      },
      {
        id: 'resume-pdf',
        title: 'Resume',
        source: resumePdfImage,
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.GOLD,
        glyph: 'CV',
      },
      {
        id: 'open-source',
        title: 'Open Source',
        source: 'https://gifs.org.es/gifs/2014/06/pikachu-gif.gif',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'OS',
        githubLink: 'https://github.com/JuanVillegas95',
      },
      {
        id: 'lilium',
        title: 'Lilium',
        source: '/music/lilium/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.CORAL,
        glyph: 'LI',
      },
      {
        id: 'build-notes',
        title: 'Build Notes',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.MINT,
        glyph: 'BN',
      },
      {
        id: 'ambient-loop',
        title: 'Ambient Loop',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.VIOLET,
        glyph: 'AL',
      },
      {
        id: 'systems',
        title: 'Systems',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'SY',
      },
      {
        id: 'homelab',
        title: 'Homelab',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.MINT,
        glyph: 'HL',
      },
      {
        id: 'toolkit',
        title: 'Toolkit',
        source: techStackImage,
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.TALL,
        tone: TILE_TONES.BLUE,
        glyph: 'TK',
      },
      {
        id: 'ideas',
        title: 'Ideas',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.GOLD,
        glyph: 'ID',
      },
    ],
  },
  {
    id: 'media',
    label: 'Educational Achievements',
    items: [
      {
        id: 'media-drop',
        title: 'Media Drop',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.HERO,
        tone: TILE_TONES.CORAL,
        glyph: 'MD',
      },
      {
        id: 'hikari',
        title: 'Hikari',
        source: '/music/hikari%20%E5%85%89/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GOLD,
        glyph: 'HI',
      },
      {
        id: 'photo-strip',
        title: 'Photo Strip',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.TALL,
        tone: TILE_TONES.BLUE,
        glyph: 'PS',
      },
      {
        id: 'gif-slot',
        title: 'GIF Slot',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.MINT,
        glyph: 'GF',
      },
      {
        id: 'video-slot',
        title: 'Video Slot',
        mediaType: MEDIA_TYPES.VIDEO,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'VD',
      },
      {
        id: 'archive',
        title: 'Archive',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.VIOLET,
        glyph: 'AR',
      },
      {
        id: 'frame-set',
        title: 'Frame Set',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.BLUE,
        glyph: 'FS',
      },
      {
        id: 'audio-log',
        title: 'Audio Log',
        source: '/music/clair-obscure/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GOLD,
        glyph: 'AU',
      },
      {
        id: 'clip-bank',
        title: 'Clip Bank',
        mediaType: MEDIA_TYPES.VIDEO,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'CB',
      },
      {
        id: 'snapshots',
        title: 'Snapshots',
        source: '/music/lilium/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.CORAL,
        glyph: 'SN',
      },
    ],
  },
]

export const GALLERY_PAGE_COUNT = GALLERY_SECTIONS.length
