export const zebraFamilies = [
  {
    slug: 'deco-shade',
    name: 'Deco Shade',
    kicker: 'Designer finish',
    subtitle:
      'Architectural texture with a soft designer finish. Great for living rooms where the blind should read like part of the interior palette.',
    room: 'Living rooms',
    light: 'Balanced glow',
    texture: 'Woven matte',
    colors: ['#efe9df', '#d7cbbb', '#b7a58d', '#8f7b62'],
  },
  {
    slug: 'sun-shade',
    name: 'Sun Shade',
    kicker: 'Heat and glare control',
    subtitle:
      'A brighter zebra family for sun-facing windows, softening glare while keeping rooms open and usable through the day.',
    room: 'Balconies and offices',
    light: 'Filtered daylight',
    texture: 'Fine screen',
    colors: ['#f6f1e8', '#e4dccf', '#c7b99f', '#9f8d6e'],
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
  },
  {
    slug: 'vibrant-zebra',
    name: 'Vibrant Zebra',
    kicker: 'Colour-forward option',
    subtitle:
      'A bolder range for statement rooms, creative studios, and interiors that need an accent instead of a quiet background.',
    room: 'Creative spaces',
    light: 'Dynamic accent',
    texture: 'Colour weave',
    colors: ['#d8e2dd', '#89aaa1', '#9d6f6f', '#355f58'],
  },
  {
    slug: 'b70-72-series',
    name: 'B70-72 Series',
    kicker: 'Commercial neutral',
    subtitle:
      'A practical, durable series with crisp neutral colourways for offices, rental properties, and repeatable project specifications.',
    room: 'Commercial projects',
    light: 'Clean control',
    texture: 'Tight technical',
    colors: ['#ededed', '#cdcdcd', '#9e9e9e', '#656565'],
  },
  {
    slug: 'blackout-zebra',
    name: 'Blackout Zebra',
    kicker: 'Maximum privacy',
    subtitle:
      'A darker zebra route for bedrooms and media spaces where the alternating stripe still matters, but privacy leads the decision.',
    room: 'Bedrooms and media rooms',
    light: 'Deep privacy',
    texture: 'Dense coated',
    colors: ['#d9d7d1', '#a8a49a', '#706a61', '#35322e'],
  },
  {
    slug: 'sheer-linen-zebra',
    name: 'Sheer Linen Zebra',
    kicker: 'Airy linen look',
    subtitle:
      'A relaxed, sheer-forward family for soft daylight and elegant layering in calm living spaces.',
    room: 'Lounges',
    light: 'Airy daylight',
    texture: 'Open linen',
    colors: ['#faf6ee', '#e5d9c4', '#c8b693', '#a08b66'],
  },
];

export function getZebraFamilyBySlug(slug) {
  return zebraFamilies.find((family) => family.slug === slug) || null;
}
