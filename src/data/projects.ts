import { unsplash } from "../lib/unsplash";

export const categories = ["Living Room", "Bedroom", "Dining", "Outdoor"] as const;
export type Category = (typeof categories)[number];
export type Filter = "All" | Category;
export const filters: Filter[] = ["All", ...categories];

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  kind: string;
  image: string;
  alt: string;
  location: string;
  year: string;
  area: string;
  duration: string;
  summary: string;
  challenge: string;
  approach: string;
  gallery: string[];
};

const u = (id: string, w = 1600): string => unsplash(id, w);
const g = (...ids: string[]): string[] => ids.map((id) => u(id, 1400));

export const projects: Project[] = [
  {
    id: "p1",
    slug: "modern-living-room",
    title: "Modern Living Room",
    category: "Living Room",
    kind: "Residential Project",
    image: u("photo-1600210492486-724fe5c67fb0"),
    alt: "Cream sectional sofa with a round wooden coffee table and large windows",
    location: "Hillcrest Heights",
    year: "2025",
    area: "68 sqm",
    duration: "10 weeks",
    summary:
      "An open living space rebuilt around a deep cream sectional and a hand-finished oak coffee table.",
    challenge:
      "The room was bright but felt flat. The family wanted somewhere to host friends and still feel calm on a quiet weeknight.",
    approach:
      "We layered warm neutrals, natural oak and linen, then added floor lamps and large plants to soften the edges and bring the garden indoors.",
    gallery: g("photo-1586023492125-27b2c045efd7", "photo-1493663284031-b7e3aefcae8e", "photo-1616486338812-3dadae4b4ace"),
  },
  {
    id: "p2",
    slug: "quiet-reading-lounge",
    title: "Quiet Reading Lounge",
    category: "Living Room",
    kind: "Residential Project",
    image: u("photo-1502672260266-1c1ef2d93688"),
    alt: "Light-filled living room with neutral furniture and plants",
    location: "Willow Park",
    year: "2025",
    area: "42 sqm",
    duration: "8 weeks",
    summary:
      "A light-filled corner turned into a slow, bookish lounge with layered textures and soft evening light.",
    challenge:
      "A narrow room with one big window and nowhere comfortable to sit with a book. Storage was scattered and the layout fought the light.",
    approach:
      "We rebuilt the plan around a window seat and built-in shelving, then chose low-slung furniture and warm lamps so the room glows after dark.",
    gallery: g("photo-1600210492486-724fe5c67fb0", "photo-1493663284031-b7e3aefcae8e", "photo-1586023492125-27b2c045efd7"),
  },
  {
    id: "p3",
    slug: "linen-bedroom-retreat",
    title: "Linen Bedroom Retreat",
    category: "Bedroom",
    kind: "Residential Project",
    image: u("photo-1505693416388-ac5ce068fe85"),
    alt: "Bedroom with a wooden headboard and soft linen bedding",
    location: "Cedar Row",
    year: "2024",
    area: "28 sqm",
    duration: "6 weeks",
    summary:
      "A calm, hotel-quiet bedroom in washed linen, pale oak and a single statement headboard.",
    challenge:
      "The client slept badly in a busy, cluttered room and wanted a space that felt restful the moment they walked in.",
    approach:
      "We cut the palette back to three tones, hid storage behind clean joinery and layered bedding in natural linen for texture without noise.",
    gallery: g("photo-1616594039964-ae9021a400a0", "photo-1540518614846-7eded433c457", "photo-1505693416388-ac5ce068fe85"),
  },
  {
    id: "p4",
    slug: "sage-master-suite",
    title: "Sage Master Suite",
    category: "Bedroom",
    kind: "Residential Project",
    image: u("photo-1616594039964-ae9021a400a0"),
    alt: "Master bedroom with sage green walls and warm lighting",
    location: "Birchwood Estate",
    year: "2025",
    area: "46 sqm",
    duration: "9 weeks",
    summary:
      "A full master suite wrapped in sage green, with warm brass lighting and a quiet dressing area.",
    challenge:
      "A large room that felt cold and under-used. The couple wanted colour, but nothing loud.",
    approach:
      "We chose a deep sage for the walls, balanced it with cream textiles and walnut furniture, and zoned the room into sleeping, dressing and reading corners.",
    gallery: g("photo-1505693416388-ac5ce068fe85", "photo-1540518614846-7eded433c457", "photo-1616594039964-ae9021a400a0"),
  },
  {
    id: "p5",
    slug: "oak-table-dining-room",
    title: "Oak Table Dining Room",
    category: "Dining",
    kind: "Residential Project",
    image: u("photo-1617806118233-18e1de247200"),
    alt: "Dining room with an oak table and statement pendant light",
    location: "Stonebridge",
    year: "2024",
    area: "34 sqm",
    duration: "7 weeks",
    summary:
      "A dining room built around one long oak table, a statement pendant and plenty of green.",
    challenge:
      "The family ate in front of the TV because the dining area felt like a corridor. They wanted a room people would actually linger in.",
    approach:
      "We anchored the space with a made-to-order oak table, hung a sculptural pendant at the right height and added plants and soft upholstery for warmth.",
    gallery: g("photo-1556909114-f6e7ad7d3136", "photo-1484154218962-a197022b5858", "photo-1617806118233-18e1de247200"),
  },
  {
    id: "p6",
    slug: "open-kitchen-and-dining",
    title: "Open Kitchen and Dining",
    category: "Dining",
    kind: "Renovation",
    image: u("photo-1556909114-f6e7ad7d3136"),
    alt: "Open plan kitchen with a wooden island and dining area",
    location: "Marlowe Lane",
    year: "2025",
    area: "72 sqm",
    duration: "14 weeks",
    summary:
      "Two cramped rooms opened into one social kitchen and dining space with a generous timber island.",
    challenge:
      "A closed-off kitchen kept the cook away from guests, and storage ran out long before the weekend did.",
    approach:
      "We removed a wall, centred the plan on a timber island and used full-height cabinetry to hide clutter so the room always looks ready for company.",
    gallery: g("photo-1484154218962-a197022b5858", "photo-1617806118233-18e1de247200", "photo-1556909114-f6e7ad7d3136"),
  },
  {
    id: "p7",
    slug: "garden-terrace",
    title: "Garden Terrace",
    category: "Outdoor",
    kind: "Landscape and Furnishing",
    image: u("photo-1564013799919-ab600027ffc6"),
    alt: "Terrace with rattan lounge chairs surrounded by greenery",
    location: "Fernhill",
    year: "2024",
    area: "55 sqm",
    duration: "8 weeks",
    summary:
      "A bare terrace turned into an outdoor living room with rattan seating, shade and layered planting.",
    challenge:
      "The terrace was hot, exposed and almost never used, even though it was the biggest space in the house.",
    approach:
      "We added shade, weatherproof rattan seating and tall planting for privacy, then lit it softly so it works from morning coffee to late dinners.",
    gallery: g("photo-1523217582562-09d0def993a6", "photo-1600585154340-be6161a56a0c", "photo-1564013799919-ab600027ffc6"),
  },
  {
    id: "p8",
    slug: "courtyard-escape",
    title: "Courtyard Escape",
    category: "Outdoor",
    kind: "Landscape and Furnishing",
    image: u("photo-1523217582562-09d0def993a6"),
    alt: "Courtyard with outdoor seating and a mature tree",
    location: "Alder Court",
    year: "2025",
    area: "38 sqm",
    duration: "7 weeks",
    summary:
      "A small courtyard reworked into a private retreat built around one mature tree.",
    challenge:
      "A cramped, shaded courtyard used mostly for storage. The owners wanted a calm place to unwind that felt part of the house.",
    approach:
      "We kept the existing tree as the centrepiece, laid warm stone underfoot and added compact seating and lanterns for an intimate, evening-friendly space.",
    gallery: g("photo-1564013799919-ab600027ffc6", "photo-1600585154340-be6161a56a0c", "photo-1523217582562-09d0def993a6"),
  },
];
