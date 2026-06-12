export const zebraFamilies = [
  {
    slug: 'deco-shade',
    name: 'Deco Shade',
    kicker: 'Designer finish',
    subtitle:
      'The Deco Shades Collection is a refined range of zebra blinds featuring timeless textures, elegant neutral tones, and versatile designs that complement every interior style. Crafted from premium polyester fabrics, each series offers the perfect balance of light control, privacy, and durability, making it ideal for both residential and commercial spaces. With its sophisticated aesthetics and practical functionality, Deco Shades is designed to bring effortless elegance to modern living.',
    room: 'Living rooms',
    light: 'Balanced glow',
    texture: 'Woven matte',
    colors: ['#efe9df', '#d7cbbb', '#b7a58d', '#8f7b62'],
    catalog: '/catalogs/DECOSHADES CATALOUGE.pdf',
    images: ['/assets/DecoCarosel1.jpeg', '/assets/DecoCarosel2.jpeg'],
  },
  {
    slug: 'sun-shade',
    name: 'Window Shade',
    kicker: 'Heat and glare control',
    subtitle:
      'The Window Shade Collection represents the pinnacle of luxury zebra blinds, featuring designer-inspired patterns, rich textures, and sophisticated color palettes that transform windows into statement pieces. Inspired by contemporary art and premium interior trends, each design blends elegance, innovation, and exceptional craftsmanship. Created for discerning homeowners and designers, this exclusive collection delivers unmatched style, refinement, and visual impact.',
    room: 'Balconies and offices',
    light: 'Filtered daylight',
    texture: 'Fine screen',
    colors: ['#f6f1e8', '#e4dccf', '#c7b99f', '#9f8d6e'],
    image: '/assets/windowshade.jpeg',
    catalog: '/catalogs/Viento Window shade zebra 2022.pdf',
  },
  {
    slug: 'cello-zebra-shade',
    name: 'Cello Zebra Shade',
    kicker: 'Soft premium stripe',
    subtitle:
      'A refined, quieter stripe with a layered fabric feel, suited for bedrooms, lounges, and spaces that need gentle privacy.',
    room: 'Bedrooms',
    light: 'Soft privacy',
    texture: 'Satin woven',
    colors: ['#f0ece7', '#d8d0ca', '#b7aaa0', '#806f65'],
    image: '/assets/Cello zebra.png',
    catalog: '/catalogs/Cello Zebra.pdf',
  },
  {
    slug: 'maple-zebra',
    name: 'Maple Zebra',
    kicker: 'Warm natural tones',
    subtitle:
      'Maple Zebra brings wood-inspired warmth into the zebra format, pairing especially well with neutral interiors and timber furniture.',
    room: 'Dining rooms',
    light: 'Warm diffusion',
    texture: 'Natural grain',
    colors: ['#eadbc2', '#d3bc92', '#aa8554', '#765331'],
    image: '/assets/Maple.jpeg',
    catalog: '/catalogs/Maple Zebra.pdf',
  },
  {
    slug: 'customized-zebra',
    name: 'Customized Zebra',
    kicker: 'Colour-forward option',
    subtitle:
      'Our Customized Zebra Blinds are designed to bring together style, comfort, and functionality in one elegant window solution. Featuring alternating sheer and opaque fabric bands, they offer effortless control over natural light and privacy. Available in a wide range of colors, textures, and exclusive patterns, each blind can be tailored to match your unique interior décor. Crafted from premium-quality materials, they ensure durability, smooth operation, and a sophisticated finish. Perfect for homes, offices, and commercial spaces, Viento Zebra Blinds add a modern touch while enhancing the overall ambiance of any room.',
    room: 'Creative spaces',
    light: 'Dynamic accent',
    texture: 'Colour weave',
    colors: ['#d8e2dd', '#89aaa1', '#9d6f6f', '#355f58'],
    images: ['/assets/Customized zebra 1.png', '/assets/customized2.jpeg'],
    catalog: '/catalogs/CUSTOMIZED BLINDS .pdf',
  },
  {
    slug: 'b70-72-series',
    name: 'B70-72 Series',
    kicker: 'Commercial neutral',
    subtitle:
      'B70, 71 and 72 Series is our most versatile and affordable zebra blind collection, featuring a carefully curated range of timeless, everyday colors that suit any interior style. Designed to be the foundation of every project, it offers the perfect balance of quality, functionality, and value. The series is the dependable, go-to collection that forms the heart of the Viento range.',
    room: 'Commercial projects',
    light: 'Clean control',
    texture: 'Tight technical',
    colors: ['#ededed', '#cdcdcd', '#9e9e9e', '#656565'],
    image: '/assets/B70 series .png',
    catalog: '/catalogs/70.pdf',
  },
  {
    slug: 'vibrant-zebra',
    name: 'Vibrant Zebra',
    kicker: 'Bright and energetic',
    subtitle: 'A vibrant, energetic zebra family to bring a splash of color to modern interiors.',
    room: 'Playrooms and living spaces',
    light: 'Vibrant glow',
    texture: 'Smooth weave',
    colors: ['#f2e6d9', '#e6cca3', '#d9b36c', '#cc9933'],
    catalog: '/catalogs/Vibrant E-Catlouge Zebra.pdf',
    image: '/assets/Vibrant.jpeg',
  },
];

export function getZebraFamilyBySlug(slug) {
  return zebraFamilies.find((family) => family.slug === slug) || null;
}
