export const pliny = { name: "Pliny the Elder", number: 42 };

const NAMES = [
  "Pliny the Elder",
  "Whispering Angel",
  "Bourbon County Stout",
  "Heady Topper",
  "Cocoa Dungeon",
  "Saison Dupont",
  "Gose Fishgo",
  "Pilsner Urquell",
  "Founders KBS",
  "La Fin du Monde",
];

const TIERS = ["common", "common", "uncommon", "common", "rare", "uncommon", "common", "legendary", "rare"] as const;

/** 150 cards for the grid scroll check. Every 7th is locked; tiers cycle, so rare and legendary carry the beam. */
export const grid = Array.from({ length: 150 }, (_, i) => ({
  id: String(i),
  name: NAMES[i % NAMES.length],
  number: i + 1,
  collected: i % 7 !== 3,
  rarity: TIERS[i % TIERS.length],
}));
