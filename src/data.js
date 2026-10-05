const unsplash = (id, width = 1100, quality = 85) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`

const ids = {
  hero: '1593640408182-31c70c8268f5',
  pc: '1587202372775-e229f172b9d7',
  monitor: '1527443224154-c4a3942d3acf',
  keyboard: '1595225476474-87563907a212',
  mouse: '1527814050087-3793815479db',
  headset: '1599669454699-248893623440',
  world: '1593305841991-05c297ba4575',
  station: '1616588589676-62b3c7ea4d00',
  build: '1591488320449-011701bb6704',
}

export const heroImage = {
  src: unsplash(ids.hero, 2200, 90),
  srcSet: `${unsplash(ids.hero, 900)} 900w, ${unsplash(ids.hero, 1500)} 1500w, ${unsplash(ids.hero, 2200, 90)} 2200w`,
  alt: 'A premium gaming setup with a high-performance PC and immersive display',
}

export const navLinks = [
  { label: 'Setup', id: 'setup' },
  { label: 'Specs', id: 'specs' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
]

export const features = [
  { icon: '◈', title: 'RTX GRAPHICS', detail: 'Next-gen ray tracing' },
  { icon: '▣', title: '4K · 144HZ', detail: 'Every frame in focus' },
  { icon: '⌨', title: 'MECHANICAL', detail: 'Precision in every press' },
  { icon: '↗', title: 'PRO PERFORMANCE', detail: 'Built to stay ahead' },
]

export const components = [
  {
    name: 'The Core',
    type: '01 / SYSTEM',
    desc: 'A powerhouse built for uncompromising play and creative flow.',
    image: unsplash(ids.pc),
    imageLarge: unsplash(ids.pc, 1600),
    tall: true,
    story:
      'The heart of the setup. A flagship processor and graphics card paired with fast memory and storage, tuned to stay cool and quiet under long sessions.',
    highlights: ['Intel® Core™ i9-14900K · 24 cores', 'GeForce RTX™ 4080 SUPER · 16 GB', '32 GB DDR5 · 2 TB Gen 4 NVMe'],
  },
  {
    name: 'The View',
    type: '02 / DISPLAY',
    desc: 'Fluid motion. Pin-sharp detail. A world without blur.',
    image: unsplash(ids.monitor),
    imageLarge: unsplash(ids.monitor, 1600),
    story:
      'A 32-inch 4K panel that keeps up with the system behind it — high refresh for competitive play, accurate colour for everything else.',
    highlights: ['32” 4K UHD IPS panel', '144 Hz · 1 ms response', 'Adaptive Sync, no tearing'],
  },
  {
    name: 'The Input',
    type: '03 / KEYBOARD',
    desc: 'Tactile, deliberate, and ready for every command.',
    image: unsplash(ids.keyboard),
    imageLarge: unsplash(ids.keyboard, 1600),
    story: 'A mechanical keyboard that feels as good on the thousandth keystroke as on the first.',
    highlights: ['Hot-swappable mechanical switches', 'Per-key lighting', 'Solid aluminium frame'],
  },
  {
    name: 'The Aim',
    type: '04 / MOUSE',
    desc: 'Weightless precision, tuned to your instincts.',
    image: unsplash(ids.mouse),
    imageLarge: unsplash(ids.mouse, 1600),
    story: 'Light enough to disappear in your hand, accurate enough to trust in the moment that counts.',
    highlights: ['Ultralight shell', 'High-precision optical sensor', 'Low-latency wireless'],
  },
  {
    name: 'The Sound',
    type: '05 / AUDIO',
    desc: 'Hear every detail. Feel every moment.',
    image: unsplash(ids.headset),
    imageLarge: unsplash(ids.headset, 1600),
    story: 'Positional audio that tells you where the footsteps are coming from — and comfort that lasts all night.',
    highlights: ['Spatial surround sound', 'Detachable noise-cancelling mic', 'Memory-foam ear cushions'],
  },
]

export const specs = [
  ['PROCESSOR', 'Intel® Core™ i9-14900K', '24 cores · up to 6.0 GHz'],
  ['GRAPHICS', 'NVIDIA® GeForce RTX™ 4080 SUPER', '16 GB GDDR6X · DLSS 3'],
  ['MEMORY', '32 GB DDR5 · 6,000 MHz', 'Low-latency dual channel'],
  ['STORAGE', '2 TB Gen 4 NVMe SSD', 'Blazing-fast load times'],
  ['DISPLAY', '32” 4K UHD · 144 Hz', 'IPS · 1 ms · Adaptive Sync'],
]

// Every gallery image is unique and different from the hero and setup photos.
export const gallery = [
  {
    src: unsplash(ids.station, 1500),
    full: unsplash(ids.station, 2200, 90),
    alt: 'A carefully arranged high-performance gaming desk',
    label: 'THE COMMAND CENTER',
    layout: 'large',
  },
  {
    src: unsplash(ids.world),
    full: unsplash(ids.world, 2200, 90),
    alt: 'A vivid game world on a high-resolution display',
    label: 'WORLDS, UNBOUND',
    layout: 'wide',
  },
  {
    src: unsplash(ids.build),
    full: unsplash(ids.build, 2200, 90),
    alt: 'Close-up detail of a custom-built gaming PC',
    label: 'MADE TO PERFORM',
    layout: 'wide',
  },
]

export const contactTopics = ['A complete setup', 'A single component', 'Upgrade advice', 'Something else']
