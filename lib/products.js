export const products = [
  {
    slug: 'wooden-blinds',
    name: 'Wooden Blinds',
    image: '/assets/wooden%20blinds.png',
    subtitle:
      'Natural warmth meets precision engineering. Our Wooden Blinds are crafted from sustainably sourced hardwoods, offering timeless elegance with exceptional light control.',
    features: [
      'Sustainably sourced hardwood slats',
      'Custom sizing from 25cm to 300cm width',
      'Available in 30+ finishes and stains',
      'UV-resistant coating for lasting colour',
      'Easy-clean, warp-resistant construction',
      'Compatible with motorisation / smart home',
    ],
    specs: {
      'Width Range': '25mm – 300mm',
      'Slat Size': '25mm / 50mm',
      Control: 'Cord / Motorised',
      Warranty: '5 Years',
    },
  },
  {
    slug: 'honeycomb-blinds',
    name: 'Honeycomb Blinds',
    image: null,
    subtitle:
      'A marvel of engineering: our Honeycomb Blinds trap air within hexagonal cells, providing superior thermal insulation while maintaining an ultra-clean aesthetic.',
    features: [
      'Triple-cell honeycomb structure for max insulation',
      'Available in light-filtering and blackout options',
      'Energy Star certified fabrics',
      'Top-down / bottom-up operation available',
      'Cordless and motorised options',
      'Available in 120+ colours',
    ],
    specs: {
      'Width Range': '30mm – 280mm',
      Cell: 'Single / Triple',
      Control: 'Cordless / Motorised',
      Warranty: '5 Years',
    },
  },
  {
    slug: 'shangri-la-blinds',
    name: 'Shangri-La Blinds',
    image: '/assets/tripleshadeblinds.png?v=20260425-1751',
    subtitle:
      'The pinnacle of elegance — our Shangri-La collection layers alternating sheer and opaque fabric bands to create a dreamy transition between light and privacy.',
    features: [
      'Alternating sheer and opaque fabric bands',
      'Infinite adjustment for precise light control',
      "Silk-like lustre without silk's fragility",
      'Available in single or dual rollers',
      'Wide-format options up to 3.5m',
      'All fabrics fire-retardant certified',
    ],
    specs: {
      'Width Range': 'Up to 3500mm',
      Fabric: 'Sheer + Opaque',
      Control: 'Cord / Motorised',
      Warranty: '5 Years',
    },
  },
  {
    slug: 'zebra-blinds',
    name: 'Zebra Blinds',
    image: '/assets/zebra-blinds.png',
    subtitle:
      'Bold aesthetics meet flexible function. Zebra Blinds use alternating solid and sheer stripes that can be aligned for privacy or offset for diffused light.',
    features: [
      'Alternating opaque and transparent stripes',
      'Align or offset for instant privacy toggle',
      'Available in 60+ colour combinations',
      'Day & Night vision control',
      'Motorisation compatible',
      'Easy DIY installation kit included',
    ],
    specs: {
      'Width Range': '40mm – 300mm',
      Control: 'Chain / Motorised',
      Style: 'Day & Night',
      Warranty: '5 Years',
    },
    catalogues: {
      'Deco Shade': {
        'Design 1': ['#EBE6DF', '#D7CEC2', '#C0B3A3', '#A89784', '#8C7A65', '#73624D', '#584936'],
        'Design 2': ['#F4F1ED', '#E1D9CD', '#CDBEAB', '#B5A28A', '#9B8569', '#826A50', '#675138'],
      },
      Maple: {
        'Classic Maple': ['#E5DBC5', '#D2C4A7', '#BDAB89', '#A8926C', '#917950', '#7A6237', '#624C24'],
        'Premium Maple': ['#F0E8D7', '#DFD3BB', '#CBB89A', '#B59D7A', '#9F8259', '#896A3D', '#725425'],
      },
      Vibrant: {
        'Solid Series': ['#C2D5D0', '#A3C0BA', '#84ABA4', '#68968E', '#4F8278', '#386D63', '#245950'],
        'Texture Series': ['#E8D7D7', '#D6BDBD', '#C3A2A2', '#B08888', '#9C6E6E', '#895555', '#743E3E'],
      },
      'B70-72 Series': {
        Standard: ['#E8E8E8', '#D1D1D1', '#BABABA', '#A3A3A3', '#8C8C8C', '#757575', '#5E5E5E'],
      },
      Sunshade: {
        'Light Filter': ['#F7F4EE', '#E9E2D4', '#D9CDB7', '#C8B89A', '#B7A27D', '#A58C60', '#937746'],
      },
    },
  },
  {
    slug: 'roller-blinds',
    name: 'Roller Blinds',
    image: '/assets/Roller-blinds.png?v=20260417-2142',
    subtitle:
      'Minimalist design for modern spaces. Our Roller Blinds offer effortless operation and a clean aesthetic with a wide range of performance fabrics.',
    features: [
      'Sleek, low-profile design',
      'Available in blackout, translucent, and sunscreen',
      'Motorised options available',
      'Easy to clean and maintain',
      'Durable mechanism for daily use',
      'Custom printed options',
    ],
    specs: {
      'Width Range': '40mm – 320mm',
      Control: 'Chain / Motorised',
      Fabric: 'Blackout / Sheer',
      Warranty: '5 Years',
    },
    catalogues: {
      'Contract Roller': {
        'Eco Blackout': ['#EAEAEA', '#D4D4D4', '#BDBDBD', '#A6A6A6', '#8F8F8F', '#787878', '#616161'],
        Jute: ['#E0D4C3', '#CBB99F', '#B59E7C', '#9E845A', '#87693A', '#6F5121', '#573D11'],
        'Foam Coated': ['#F0EAE1', '#DFD2C0', '#CDBA9F', '#BCA37F', '#A98B60', '#967443', '#835E28'],
      },
      'FC1 and 2': {
        'Standard Series': ['#E5DFD5', '#CEC4B4', '#B6A993', '#9D8E73', '#837456', '#695A3B', '#504224'],
      },
      'FC 3': {
        'Premium Series': ['#E8D9D0', '#D4BFB1', '#C0A593', '#A98C76', '#92735A', '#7A5B40', '#634529'],
      },
      'FC 4': {
        'Texture Series': ['#DEE3DE', '#C2CACC', '#A5B1B3', '#89989B', '#6D8083', '#53686A', '#3A5053'],
      },
      'FC 5': {
        'Pattern Series': ['#E5E0E5', '#CDCDCD', '#B5B5B5', '#9D9D9D', '#858585', '#6D6D6D', '#555555'],
      },
    },
  },
  {
    slug: 'blackout-blinds',
    name: 'Blackout Blinds',
    image: null,
    subtitle:
      'Total darkness on demand. Our Blackout Blinds are engineered for complete light elimination — perfect for bedrooms, home theatres, and nurseries.',
    features: [
      '99.99% light blockage guaranteed',
      'Side-channel system for zero light gaps',
      'Thermal and acoustic benefits included',
      'Moisture-resistant for bathrooms',
      'Available in 80+ colours',
      'Child-safe cordless operation',
    ],
    specs: {
      'Light Blockage': '99.99%',
      Channels: 'Side + Top',
      Control: 'Cordless',
      Warranty: '5 Years',
    },
  },
  {
    slug: 'translucent-blinds',
    name: 'Translucent Blinds',
    image: null,
    subtitle:
      'Soft, diffused luminosity — our Translucent Blinds transform harsh sunlight into a warm, glowing ambience while maintaining gentle privacy.',
    features: [
      'Soft-filtering fabric transforms harsh light',
      'Maintains privacy without blocking daylight',
      'Available in 45 muted and vibrant tones',
      'Anti-static coating repels dust',
      'Seamless cassette housing option',
      'Eco-certified recyclable fabrics',
    ],
    specs: {
      'Width Range': '40mm – 300mm',
      Opacity: 'Translucent',
      Control: 'Chain / Motorised',
      Warranty: '5 Years',
    },
  },
  {
    slug: 'exterior-blinds',
    name: 'Exterior Blinds',
    image: '/assets/exterior-blinds.png?v=20260425-1738',
    subtitle:
      'Built for the outdoors. Our Exterior Blinds shield patios, balconies, and verandas from sun, wind, and rain — extending your living space while reducing indoor heat gain.',
    features: [
      'Weather-resistant outdoor-grade fabrics',
      'UV protection up to 95% with cooler interiors',
      'Wind-stable side-channel guide systems',
      'Available in mesh, PVC, and acrylic finishes',
      'Manual crank or motorised operation',
      'Custom sizing for large-format openings',
    ],
    specs: {
      'Width Range': 'Up to 6000mm',
      Fabric: 'Mesh / PVC / Acrylic',
      Control: 'Crank / Motorised',
      Warranty: '5 Years',
    },
  },
  {
    slug: 'roman-style-blinds',
    name: 'Roman Style Blinds',
    image: '/assets/Roman.png',
    subtitle:
      'The classic sophistication of Roman Blinds reimagined in premium fabrics — flat-fold elegance that adds depth, warmth, and a tailored finish to any window.',
    features: [
      'Flat-fold, waterfall, and hobbled styles',
      'Wide selection of premium woven fabrics',
      'Bespoke lining options (blackout to interlining)',
      'Hand-finished by master upholsterers',
      'Available with contrasting border trims',
      'Conservation-grade options for period homes',
    ],
    specs: {
      Style: 'Flat-fold / Waterfall',
      Lining: 'Blackout / Interlining',
      Control: 'Cord / Motorised',
      Warranty: '5 Years',
    },
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getAllSlugs() {
  return products.map((p) => p.slug);
}

export function getRelatedProducts(slug, count = 4) {
  return products.filter((p) => p.slug !== slug).slice(0, count);
}
