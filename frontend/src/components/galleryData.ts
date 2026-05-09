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
  link?: string
}

export type GalleryItem =
  | (GalleryItemBase & {
      mediaType: SingleSourceMediaType
      source?: string
    })
  | (GalleryItemBase & {
      mediaType: typeof MEDIA_TYPES.SLIDESHOW
      source: string[]
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
    label: 'Profile',
    items: [
      {
        id: 'about',
        title: 'About Me',
        source: '/images/about-me.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.HERO,
        tone: TILE_TONES.MINT,
        glyph: 'JV',
        link: 'https://about-me-azo.pages.dev',
      },
      {
        id: 'github',
        title: 'GitHub',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'GH',
        link: 'https://github.com/JuanVillegas95',
        source: 'https://camo.githubusercontent.com/e7e2e4c44e3f14bea8123598db8f7dc62fa0c77193e2e7b962bf871777cba717/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f706e672f6769746875622e706e67'
      },
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
        link: 'https://docs.google.com/document/d/1k9b-5JpFSVCe3Nf_VpzbFy4ojx7QqjZn/edit?usp=sharing&ouid=106965964378759600263&rtpof=true&sd=true',
      },
{
  id: 'my-slideshow',
  title: 'My Slideshow',
  mediaType: MEDIA_TYPES.SLIDESHOW,
  tileSize: TILE_SIZES.TALL,
  tone: TILE_TONES.BLUE,
  glyph: 'SS',
  source: [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',

  ],
},
      {
        id: 'linkedin',
        title: 'LinkedIn',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.TALL,
         source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1280px-LinkedIn_icon.svg.png',
        tone: TILE_TONES.BLUE,
        glyph: 'IN',
        link: 'https://www.linkedin.com/in/juan-villegas97/',
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
         source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1280px-LinkedIn_icon.svg.png',
        tone: TILE_TONES.BLUE,
        glyph: 'IN',
        link: 'https://www.linkedin.com/in/juan-villegas97/',
      },
      {
        id: 'x-mas',
        title: 'x-mas',
        source: '/images/x-mas.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.BLUE,
        glyph: 'XM',
        link: 'https://824066e3.honecita-x-mas.pages.dev',
      },
      {
        id: 'music-room',
        title: 'Music Room',
        source: '/music/hikari%20%E5%85%89/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.GOLD,
        glyph: 'MR',
        link: '#',
      },
      {
        id: 'muerte_moshe',
        title: 'Valentine',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.VIOLET,
        glyph: 'VT',
        link: 'https://valentine-c5b.pages.dev',
        source: "https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif"
      },
            {
        id: 'mail',
        title: 'Send mail',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.BLUE,
        source: 'https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2022/10/apple_mail_logo_2.jpg',
        glyph: 'ML',
        link: 'mailto:juanemail2001@gmail.com?subject=Contact%20from%20portfolio%20website&body=Hello%20Juan%2C%0A%0AI%27m%20contacting%20you%20from%20your%20personal%20portfolio%20website.%0A%0A',
      },
            {
       id: 'muerte_moshe',
        title: 'Muerte Moshe',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.MINT,
        glyph: 'MM',
        link: 'https://muerte-moshe.pages.dev',
        source: "/images/muerte_moshe.jpeg"
      },
      {
        id: 'notes',
        title: 'Notes',
        source: '/music/hikari%20%E5%85%89/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.CORAL,
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
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.HERO,
        tone: TILE_TONES.BLUE,
        glyph: 'EX',
        link: '#',
      },
      {
        id: 'tech-stack',
        title: 'Tech Stack',
        source: techStackImage,
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.TALL,
        tone: TILE_TONES.VIOLET,
        glyph: 'TS',
        link: '#',
      },
      {
        id: 'resume',
        title: 'Resume',
        source: resumePdfImage,
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.GOLD,
        glyph: 'CV',
        link: '#',
      },
      {
        id: 'open-source',
        title: 'Open Source',
        source: 'https://gifs.org.es/gifs/2014/06/pikachu-gif.gif',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'OS',
        link: 'https://github.com/JuanVillegas95',
      },
      {
        id: 'lilium',
        title: 'Lilium',
        source: '/music/lilium/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.CORAL,
        glyph: 'LI',
        link: '#',
      },
      {
        id: 'build-notes',
        title: 'Build Notes',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.MINT,
        glyph: 'BN',
        link: '#',
      },
      {
        id: 'ambient-loop',
        title: 'Ambient Loop',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.VIOLET,
        glyph: 'AL',
        link: '#',
      },
      {
        id: 'systems',
        title: 'Systems',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'SY',
        link: '#',
      },
      {
        id: 'homelab',
        title: 'Homelab',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.MINT,
        glyph: 'HL',
        link: '#',
      },
      {
        id: 'toolkit',
        title: 'Toolkit',
        source: techStackImage,
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.TALL,
        tone: TILE_TONES.BLUE,
        glyph: 'TK',
        link: '#',
      },
      {
        id: 'ideas',
        title: 'Ideas',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.GOLD,
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
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.HERO,
        tone: TILE_TONES.CORAL,
        glyph: 'MD',
        link: '#',
      },
      {
        id: 'hikari',
        title: 'Hikari',
        source: '/music/hikari%20%E5%85%89/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GOLD,
        glyph: 'HI',
        link: '#',
      },
      {
        id: 'photo-strip',
        title: 'Photo Strip',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.TALL,
        tone: TILE_TONES.BLUE,
        glyph: 'PS',
        link: '#',
      },
      {
        id: 'gif-slot',
        title: 'GIF Slot',
        mediaType: MEDIA_TYPES.GIF,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.MINT,
        glyph: 'GF',
        link: '#',
      },
      {
        id: 'video-slot',
        title: 'Video Slot',
        mediaType: MEDIA_TYPES.VIDEO,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'VD',
        link: '#',
      },
      {
        id: 'archive',
        title: 'Archive',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.SMALL,
        tone: TILE_TONES.VIOLET,
        glyph: 'AR',
        link: '#',
      },
      {
        id: 'frame-set',
        title: 'Frame Set',
        mediaType: MEDIA_TYPES.PLACEHOLDER,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.BLUE,
        glyph: 'FS',
        link: '#',
      },
      {
        id: 'audio-log',
        title: 'Audio Log',
        source: '/music/clair-obscure/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GOLD,
        glyph: 'AU',
        link: '#',
      },
      {
        id: 'clip-bank',
        title: 'Clip Bank',
        mediaType: MEDIA_TYPES.VIDEO,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.GRAPHITE,
        glyph: 'CB',
        link: '#',
      },
      {
        id: 'snapshots',
        title: 'Snapshots',
        source: '/music/lilium/img.jpeg',
        mediaType: MEDIA_TYPES.IMAGE,
        tileSize: TILE_SIZES.WIDE,
        tone: TILE_TONES.CORAL,
        glyph: 'SN',
        link: '#',
      },
    ],
  },
]

export const GALLERY_PAGE_COUNT = GALLERY_SECTIONS.length
