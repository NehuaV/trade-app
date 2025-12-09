import {
  Game,
  ItemTemplate,
  ItemInstance,
  MarketListing,
  PricePoint,
} from "../types";

export const GAMES: Game[] = [
  {
    id: "g1",
    name: "League of Legends",
    slug: "lol",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1276790/header.jpg",
    description:
      "The world's most popular MOBA with a vast collection of champions.",
  },
  {
    id: "g2",
    name: "Final Fantasy XIV",
    slug: "ff14",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/39210/header.jpg",
    description:
      "A critically acclaimed MMORPG with a rich story and immersive world.",
  },
  {
    id: "g3",
    name: "Helldivers 2",
    slug: "helldivers2",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg",
    description:
      "Spread managed democracy across the galaxy in this co-op shooter.",
  },
  {
    id: "g4",
    name: "Black Desert Online",
    slug: "bdo",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/582660/header.jpg",
    description:
      "An open-world MMORPG with intense action combat and stunning graphics.",
  },
  {
    id: "g5",
    name: "Genshin Impact",
    slug: "genshin",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/1676180/header.jpg",
    description:
      "An open-world action RPG featuring elemental magic and character switching.",
  },
  {
    id: "g6",
    name: "Stellar Drifters",
    slug: "indie1",
    image: "https://cdn.akamai.steamstatic.com/steam/apps/107410/header.jpg",
    description: "A procedurally generated space rogue-lite indie sensation.",
  },
];

const MANUAL_TEMPLATES: ItemTemplate[] = [
  // LoL
  {
    id: "t1",
    gameId: "g1",
    name: "Elementalist Lux",
    image: "https://picsum.photos/seed/elementalist_lux/300/300",
    rarity: "Mythical",
    description: "An ultimate skin that transforms throughout the match.",
    basePrice: 2500,
  },
  {
    id: "t2",
    gameId: "g1",
    name: "K/DA All Out Ahri",
    image: "https://picsum.photos/seed/kda_ahri/300/300",
    rarity: "Legendary",
    description: "Pop star sensation skin from the K/DA group.",
    basePrice: 1500,
  },
  {
    id: "t3",
    gameId: "g1",
    name: "Yasuo Nightbringer",
    image: "https://picsum.photos/seed/yasuo_nightbringer/300/300",
    rarity: "Legendary",
    description: "Embrace the chaos within.",
    basePrice: 1800,
  },
  // FF14
  {
    id: "t4",
    gameId: "g2",
    name: "Night Pegasus Whistle",
    image: "https://picsum.photos/seed/night_pegasus/300/300",
    rarity: "Ancient",
    description: "Summons the rare Night Pegasus mount.",
    basePrice: 15000,
  },
  {
    id: "t5",
    gameId: "g2",
    name: "Thavnairian Bustier",
    image: "https://picsum.photos/seed/thavnairian_bustier/300/300",
    rarity: "Rare",
    description: "A beautiful silk bustier from the near east.",
    basePrice: 500,
  },
  // Helldivers 2
  {
    id: "t6",
    gameId: "g3",
    name: "Fallen Hero's Vengeance Cape",
    image: "https://picsum.photos/seed/fallen_hero_cape/300/300",
    rarity: "Legendary",
    description: "A cape issued only to veterans of Malevelon Creek.",
    basePrice: 4000,
  },
  {
    id: "t7",
    gameId: "g3",
    name: "DP-40 Hero of the Federation",
    image: "https://picsum.photos/seed/dp40_armor/300/300",
    rarity: "Rare",
    description: "Standard issue armor with extra padding for democracy.",
    basePrice: 1200,
  },
  // BDO
  {
    id: "t8",
    gameId: "g4",
    name: "Blackstar Weapon Skin",
    image: "https://picsum.photos/seed/blackstar_weapon/300/300",
    rarity: "Mythical",
    description: "A skin radiating dark energy from the abyss.",
    basePrice: 8500,
  },
  // Genshin
  {
    id: "t9",
    gameId: "g5",
    name: "Diluc: Red Dead of Night",
    image: "https://picsum.photos/seed/diluc_outfit/300/300",
    rarity: "Legendary",
    description: "A formal outfit for the Darknight Hero.",
    basePrice: 3000,
  },
  {
    id: "t10",
    gameId: "g5",
    name: "Jean: Sea Breeze Dandelion",
    image: "https://picsum.photos/seed/jean_outfit/300/300",
    rarity: "Rare",
    description: "Light summer wear for the Acting Grand Master.",
    basePrice: 2000,
  },
  // Indie
  {
    id: "t11",
    gameId: "g6",
    name: "Golden Pixel Engine",
    image: "https://picsum.photos/seed/golden_pixel_engine/300/300",
    rarity: "Ancient",
    description: "The rarest ship component in the galaxy.",
    basePrice: 50000,
  },
];

// Data assets for generating diverse items
const GAME_ASSETS = {
  g1: {
    // LoL
    prefixes: [
      "Crystal",
      "Infernal",
      "Project",
      "Star Guardian",
      "Blood Moon",
      "High Noon",
      "Pool Party",
      "Arcade",
      "Dark Star",
      "Spirit Blossom",
      "Sentinel",
      "Ruined",
      "Battle Academia",
      "Odyssey",
      "Winterblessed",
      "Coven",
    ],
    nouns: [
      "Lux",
      "Ahri",
      "Yasuo",
      "Zed",
      "Jinx",
      "Thresh",
      "Ezreal",
      "Lee Sin",
      "Akali",
      "Vayne",
      "Riven",
      "Kai'Sa",
      "Teemo",
      "Yone",
      "Irelia",
      "Sett",
    ],
    rarities: ["Common", "Uncommon", "Rare", "Mythical", "Legendary"],
  },
  g2: {
    // FF14
    prefixes: [
      "Heavy",
      "Light",
      "Dark",
      "Ancient",
      "Allagan",
      "Chocobo",
      "Moogle",
      "Bahamut",
      "Shiva",
      "Ifrit",
      "Garlean",
      "Eorzean",
      "Ishgardian",
      "Ala Mhigan",
      "Doman",
      "Crystal",
    ],
    nouns: [
      "Coat",
      "Helm",
      "Boots",
      "Gloves",
      "Sword",
      "Staff",
      "Grimoire",
      "Whistle",
      "Mount",
      "Barding",
      "Minion",
      "Crystal",
      "Earrings",
      "Necklace",
      "Ring",
    ],
    rarities: ["Common", "Uncommon", "Rare", "Legendary", "Ancient"],
  },
  g3: {
    // Helldivers 2
    prefixes: [
      "Tactical",
      "Heavy",
      "Light",
      "Scout",
      "Medic",
      "Engineer",
      "Democracy",
      "Freedom",
      "Liberty",
      "Veteran",
      "Heroic",
      "Super Earth",
      "Automaton",
      "Terminid",
      "Orbital",
    ],
    nouns: [
      "Cape",
      "Helmet",
      "Armor",
      "Vest",
      "Boots",
      "Insignia",
      "Badge",
      "Rifle",
      "Shotgun",
      "Pistol",
      "Grenade",
      "Stim",
    ],
    rarities: ["Common", "Uncommon", "Rare", "Legendary"],
  },
  g4: {
    // BDO
    prefixes: [
      "Blackstar",
      "Kzarka",
      "Dandelion",
      "Nouver",
      "Kutum",
      "Dim Tree",
      "Griffon",
      "Urugon",
      "Bheg",
      "Leebur",
      "Muskan",
      "Oogway",
      "Tuvala",
      "Naru",
    ],
    nouns: [
      "Longsword",
      "Bow",
      "Axe",
      "Staff",
      "Blade",
      "Gauntlet",
      "Vambrace",
      "Kriegsmesser",
      "Cestus",
      "Scythe",
      "Greatsword",
      "Lancia",
      "Shortsword",
    ],
    rarities: ["Rare", "Mythical", "Legendary", "Ancient"],
  },
  g5: {
    // Genshin
    prefixes: [
      "Favonius",
      "Sacrificial",
      "Royal",
      "Blackcliff",
      "Prototype",
      "Iron Sting",
      "Whiteblind",
      "Mappa Mare",
      "Crescent",
      "Compound",
      "Skyward",
      "Amos",
      "Wolf's",
      "Lost Prayer",
    ],
    nouns: [
      "Sword",
      "Claymore",
      "Polearm",
      "Bow",
      "Catalyst",
      "Wing Glider",
      "Namecard",
      "Outfit",
      "Vision",
      "Sigil",
    ],
    rarities: ["Common", "Uncommon", "Rare", "Mythical", "Legendary"],
  },
  g6: {
    // Indie
    prefixes: [
      "Quantum",
      "Plasma",
      "Laser",
      "Void",
      "Nebula",
      "Galactic",
      "Stellar",
      "Cosmic",
      "Hyper",
      "Warp",
      "Dark Matter",
      "Antimatter",
      "Photon",
      "Ion",
    ],
    nouns: [
      "Engine",
      "Thruster",
      "Shield",
      "Cannon",
      "Reactor",
      "Hull",
      "Sensor",
      "Scanner",
      "Droid",
      "Module",
      "Capacitor",
      "Battery",
      "Antenna",
    ],
    rarities: [
      "Common",
      "Uncommon",
      "Rare",
      "Mythical",
      "Legendary",
      "Ancient",
    ],
  },
};

// Procedurally generate items to ensure at least 30 per game
const generateGameItems = () => {
  const generatedTemplates: ItemTemplate[] = [];
  const TARGET_COUNT = 30;

  GAMES.forEach((game) => {
    const existing = MANUAL_TEMPLATES.filter((t) => t.gameId === game.id);
    const needed = Math.max(0, TARGET_COUNT - existing.length);
    const assets = GAME_ASSETS[game.id as keyof typeof GAME_ASSETS];

    if (!assets) return;

    for (let i = 0; i < needed; i++) {
      // Randomly combine prefix and noun
      const prefix =
        assets.prefixes[Math.floor(Math.random() * assets.prefixes.length)];
      const noun =
        assets.nouns[Math.floor(Math.random() * assets.nouns.length)];
      const rarity = assets.rarities[
        Math.floor(Math.random() * assets.rarities.length)
      ] as any;

      const name = `${prefix} ${noun}`;
      // Generate a seed based on name to get consistent images for the same name
      const seed = name.replace(/[^a-zA-Z0-9]/g, "");
      const basePrice =
        (Math.floor(Math.random() * 150) +
          5 +
          (rarity === "Ancient" ? 200 : 0)) *
        100;

      generatedTemplates.push({
        id: `gen_${game.id}_${i}`,
        gameId: game.id,
        name: name,
        image: `https://picsum.photos/seed/${seed}/300/300`,
        rarity: rarity,
        description: `A highly sought-after ${rarity.toLowerCase()} ${noun.toLowerCase()} from the ${prefix} collection.`,
        basePrice: basePrice,
      });
    }
  });
  return generatedTemplates;
};

export const ITEM_TEMPLATES: ItemTemplate[] = [
  ...MANUAL_TEMPLATES,
  ...generateGameItems(),
];

export const INITIAL_INVENTORY: ItemInstance[] = [
  {
    id: "i1",
    templateId: "t1", // Elementalist Lux
    ownerId: "me",
    acquiredDate: "2023-11-10",
    traits: { form: "Light", unlockDate: "2023-11-10", mastery: 7 },
  },
  {
    id: "i2",
    templateId: "t6", // Helldivers Cape
    ownerId: "me",
    acquiredDate: "2024-02-28",
    traits: { battleScarred: true, toursCompleted: 50 },
  },
  {
    id: "i3",
    templateId: "t5", // Thavnairian Bustier
    ownerId: "me",
    acquiredDate: "2024-01-15",
    traits: { dye: "Pure White", crafter: "Lady Yuna" },
  },
];

export const INITIAL_LISTINGS: MarketListing[] = [
  {
    id: "l1",
    itemInstanceId: "i101",
    sellerId: "Summoner_99",
    price: 145.0, // Stored as decimal, displayed as 14500 NP (*100)
    listedDate: "2024-03-01",
  },
  {
    id: "l2",
    itemInstanceId: "i102",
    sellerId: "Traveler_Aether",
    price: 32.5, // Stored as decimal, displayed as 3250 NP (*100)
    listedDate: "2024-03-02",
  },
  {
    id: "l3",
    itemInstanceId: "i103",
    sellerId: "Space_Cowboy",
    price: 490.0, // Stored as decimal, displayed as 49000 NP (*100)
    listedDate: "2024-03-03",
  },
];

// Helper to generate some other items for the market that aren't ours
export const MARKET_ITEMS_INSTANCES: ItemInstance[] = [
  {
    id: "i101",
    templateId: "t4", // Night Pegasus
    ownerId: "Summoner_99",
    acquiredDate: "2023-12-01",
    traits: { source: "Palace of the Dead", server: "Odin" },
  },
  {
    id: "i102",
    templateId: "t9", // Diluc Skin
    ownerId: "Traveler_Aether",
    acquiredDate: "2024-01-20",
    traits: { edition: "Launch", signature: "Dawn Winery" },
  },
  {
    id: "i103",
    templateId: "t11", // Golden Pixel Engine
    ownerId: "Space_Cowboy",
    acquiredDate: "2024-02-14",
    traits: { seed: 882144, generation: 1, quality: "Pristine" },
  },
  // Add some stock for other items
  {
    id: "i104",
    templateId: "t2", // K/DA Ahri
    ownerId: "KPopFan",
    acquiredDate: "2023-10-10",
    traits: { chroma: "Baddest", border: true },
  },
  {
    id: "i105",
    templateId: "t8", // Blackstar Weapon
    ownerId: "Grinder_One",
    acquiredDate: "2024-01-05",
    traits: { enhancement: "+20", durability: 100 },
  },
];

// Add listing for the extra items
INITIAL_LISTINGS.push({
  id: "l4",
  itemInstanceId: "i104",
  sellerId: "KPopFan",
  price: 16.5, // Stored as decimal, displayed as 1650 NP (*100)
  listedDate: "2024-03-04",
});

INITIAL_LISTINGS.push({
  id: "l5",
  itemInstanceId: "i105",
  sellerId: "Grinder_One",
  price: 82.0, // Stored as decimal, displayed as 8200 NP (*100)
  listedDate: "2024-03-04",
});

export const generatePriceHistory = (basePrice: number): PricePoint[] => {
  const points: PricePoint[] = [];
  let currentPrice = basePrice;
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const fluctuation = (Math.random() - 0.5) * (basePrice * 0.15); // Slightly higher volatility
    currentPrice += fluctuation;
    // Ensure price doesn't go below 10% of base
    if (currentPrice < basePrice * 0.1) currentPrice = basePrice * 0.1;

    points.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(currentPrice),
    });
  }
  return points;
};

// New Helper to mass populate the market
export const generateMockMarketData = () => {
  const items: ItemInstance[] = [];
  const listings: MarketListing[] = [];

  // existing manual items
  items.push(...MARKET_ITEMS_INSTANCES);
  listings.push(...INITIAL_LISTINGS);

  ITEM_TEMPLATES.forEach((template) => {
    // Generate 3-8 additional listings per item to populate market
    const count = Math.floor(Math.random() * 6) + 3;
    for (let i = 0; i < count; i++) {
      const itemId = `gen_i_${template.id}_${i}`;
      // Random price between 0.8 and 1.2 of base price
      // Prices stored as decimals (divide by 100), displayed as integers (*100)
      const price = (template.basePrice * (0.8 + Math.random() * 0.4)) / 100;

      items.push({
        id: itemId,
        templateId: template.id,
        ownerId: `User_${Math.floor(Math.random() * 10000)}`,
        acquiredDate: new Date().toISOString(),
        traits: {
          float: Math.random().toFixed(4),
          seed: Math.floor(Math.random() * 1000),
          origin: "Drop",
        },
      });

      listings.push({
        id: `gen_l_${template.id}_${i}`,
        itemInstanceId: itemId,
        sellerId: `User_${Math.floor(Math.random() * 10000)}`,
        price: price,
        listedDate: new Date().toISOString(),
      });
    }
  });

  return { items, listings };
};
