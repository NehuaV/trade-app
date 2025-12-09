import React from "react";
import {
  GiMagicSwirl,
  GiSwordman,
  GiWizardStaff,
  GiCrystalWand,
  GiWingedSword,
  GiBroadsword,
  GiSwordClash,
  GiCrossedSwords,
  GiSwordBrandish,
  GiSwordHilt,
  GiCrystalBars,
  GiGemPendant,
  GiCrystalCluster,
  GiDiamonds,
  GiEmerald,
  GiSaphir,
  GiAmethyst,
  GiTopaz,
  GiPearlNecklace,
  GiCrown,
  GiHelmet,
  GiArmorVest,
  GiCape,
  GiCloak,
  GiBoots,
  GiGloves,
  GiGauntlet,
  GiRing,
  GiGemini,
  GiShield,
  GiBowArrow,
  GiCrossbow,
  GiAce,
  GiBattleAxe,
  GiAce as GiMace,
  Gi3dHammer,
  GiWarhammer,
  GiSpears,
  GiSpellBook,
  GiCrystalBall,
  GiOrbWand,
  GiOrbit,
  GiStairs,
  GiStarsStack,
  GiPoison,
  GiHealthPotion,
  GiTroll,
  GiBo,
  GiGems,
} from "react-icons/gi";

// Map icon names to their components
export const iconMap: Record<string, React.ComponentType<any>> = {
  // Weapons
  sword: GiMagicSwirl,
  broadsword: GiBroadsword,
  swordman: GiSwordman,
  wizardStaff: GiWizardStaff,
  crystalWand: GiCrystalWand,
  wingedSword: GiWingedSword,
  swordClash: GiSwordClash,
  crossedSwords: GiCrossedSwords,
  swordBrandish: GiSwordBrandish,
  swordHilt: GiSwordHilt,
  bowArrow: GiBowArrow,
  crossbow: GiCrossbow,
  axe: GiAce,
  battleAxe: GiBattleAxe,
  mace: GiMace,
  hammer: Gi3dHammer,
  warHammer: GiWarhammer,
  spear: GiSpears,
  staff: GiWizardStaff, // fallback to GiWizardStaff
  wand: GiCrystalWand,
  magicWand: GiCrystalWand, // fallback

  // Armor & Equipment
  helmet: GiHelmet,
  armor: GiArmorVest,
  cape: GiCape,
  cloak: GiCloak,
  boots: GiBoots,
  gloves: GiGloves,
  gauntlet: GiGauntlet,
  shield: GiShield,

  // Accessories
  ring: GiRing,
  gemRing: GiGemini,
  magicRing: GiGemini, // fallback
  crown: GiCrown,
  royalCrown: GiCrown, // fallback to GiCrown
  pendant: GiGemPendant,
  necklace: GiPearlNecklace,

  // Gems & Crystals
  crystal: GiCrystalBars,
  crystalCluster: GiCrystalCluster,
  gem: GiGems,
  diamond: GiDiamonds,
  emerald: GiEmerald,
  ruby: GiGemini, // closest available
  sapphire: GiSaphir,
  amethyst: GiAmethyst,
  topaz: GiTopaz,
  crystalBall: GiCrystalBall,

  // Magical Items
  orb: GiOrbit,
  orbWand: GiOrbWand,
  potion: GiPoison, // fallback
  healthPotion: GiHealthPotion,
  scroll: GiTroll, // fallback
  spellBook: GiSpellBook,
  book: GiBo,

  // Stars & Cosmic
  star: GiStairs, // fallback
  starsStack: GiStarsStack,

  // Specific items
  elementalist: GiWizardStaff,
  lux: GiWizardStaff,
  ahri: GiGemPendant,
  yasuo: GiSwordBrandish,
  pegasus: GiStairs, // fallback
  whistle: GiTroll, // fallback
  bustier: GiGemPendant,
  fallenHero: GiCape,
  blackstar: GiMagicSwirl,
  diluc: GiSwordBrandish,
  jean: GiWingedSword,
  outfit: GiCrown,
  pixel: GiOrbit,

  // Default fallback
  default: GiGems,
};

// Helper function to get icon component by name
export const getIcon = (iconName: string): React.ComponentType<any> => {
  return iconMap[iconName] || iconMap.default;
};

// Component to render item icon
interface ItemIconProps {
  iconName: string;
  className?: string;
  size?: number | string;
}

export const ItemIcon: React.FC<ItemIconProps> = ({
  iconName,
  className = "",
  size = "1em",
}) => {
  const IconComponent = getIcon(iconName);
  return <IconComponent className={className} size={size} />;
};
