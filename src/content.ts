/** Edit this file — all text for the card lives here. */

export type Lang = 'en' | 'hi'

export const content = {
  herName: 'Nidhi',
  yourName: 'Shubhaseesh',

  intro: {
    line: 'Nidhi…',
    sub: 'Sirf tumhare liye',
    button: 'Padho ♥',
  },

  hero: {
    title: 'For Nidhi',
    tagline: 'Sirf tum',
    subtitle: 'Shubhaseesh — tumse bahut pyaar karta hoon',
    scrollLabel: 'Scroll karo ↓',
  },

  heroWhispers: [
    'Har saans tumhare naam ki hai…',
    'Bina tumhare dil adhura hai…',
  ],

  ticker: ['♥ Nidhi', 'pyaar', 'Shubhaseesh', 'hamesha tumhara'],

  sections: {
    sorry: 'Ek maafi',
    love: 'Dil ki baat',
    quotes: 'Tumhare liye',
    photos: 'Tum',
    closing: 'Aakhir mein',
  },

  sorryEn: ['Choti si galati — maafi.'],

  sorryHi: ['Jo hua, maafi. Ab sirf yeh kehna tha — main tumse bahut pyaar karta hoon.'],

  loveEn: ['You are my first thought and my last. No one will love you like I do, Nidhi.'],

  loveHi: [
    'Tum meri rooh ka thikana ho. Shabd chhote hain, pyaar bahut bada hai.',
    'Bhopal, Bihar — door map par, paas dil mein. Hamesha tumhari.',
  ],

  impactMoments: [] as { lang: Lang; text: string }[],

  quotes: [
    {
      lang: 'hi' as Lang,
      text: 'Tum jahan sab theek lagta hai — sirf tum.',
      author: 'Shubhaseesh',
      featured: true,
    },
    {
      lang: 'hi' as Lang,
      text: 'Tumhari muskaan — meri poori duniya.',
      author: '',
      featured: true,
    },
    {
      lang: 'hi' as Lang,
      text: 'Dil tumhara hai, hamesha.',
      author: 'Shubhaseesh',
      featured: false,
    },
    {
      lang: 'en' as Lang,
      text: 'My heart chose you — again and again.',
      author: '',
      featured: false,
    },
  ],

  photos: [
    {
      src: 'photos/nidhi-1.png',
      alt: 'Nidhi smiling',
      caption: 'Yeh muskaan — dil tumhara',
      hero: true,
    },
    {
      src: 'photos/nidhi-2.png',
      alt: 'Nidhi outdoors',
      caption: 'Tum = khushi',
    },
    {
      src: 'photos/nidhi-3.png',
      alt: 'Nidhi dressed up',
      caption: 'Fida hoon tum par',
    },
    {
      src: 'photos/nidhi-4.png',
      alt: 'Nidhi',
      caption: 'Sirf tum',
    },
  ],

  closing: {
    lineHi: 'Nidhi, main tumse be-intehaan pyaar karta hoon.',
    lineEn: 'Always yours in heart.',
    signature: 'Tumhara,',
    signatory: 'Shubhaseesh',
    pulse: '♥',
  },

  footer: 'For Nidhi — Shubhaseesh',
} as const
