// Discord User Flags (badge types)
export const BADGE_FLAGS = {
  STAFF: 1 << 0, // 1
  PARTNER: 1 << 1, // 2
  HYPESQUAD: 1 << 2, // 4
  BUG_HUNTER_LEVEL_1: 1 << 3, // 8
  HYPESQUAD_ONLINE_HOUSE_1: 1 << 6, // 64 (Bravery)
  HYPESQUAD_ONLINE_HOUSE_2: 1 << 7, // 128 (Brilliance)
  HYPESQUAD_ONLINE_HOUSE_3: 1 << 8, // 256 (Balance)
  PREMIUM_EARLY_SUPPORTER: 1 << 9, // 512
  TEAM_PSEUDO_USER: 1 << 10, // 1024
  BUG_HUNTER_LEVEL_2: 1 << 14, // 16384
  VERIFIED_BOT: 1 << 16, // 65536
  VERIFIED_DEVELOPER: 1 << 17, // 131072
  CERTIFIED_MODERATOR: 1 << 18, // 262144
  BOT_HTTP_INTERACTIONS: 1 << 19, // 524288
  ACTIVE_DEVELOPER: 1 << 22, // 4194304
} as const;

export const BADGE_NAMES: Record<number, string> = {
  [BADGE_FLAGS.STAFF]: "Staff",
  [BADGE_FLAGS.PARTNER]: "Partner",
  [BADGE_FLAGS.HYPESQUAD]: "HypeSquad Events",
  [BADGE_FLAGS.BUG_HUNTER_LEVEL_1]: "Bug Hunter Level 1",
  [BADGE_FLAGS.HYPESQUAD_ONLINE_HOUSE_1]: "HypeSquad Bravery",
  [BADGE_FLAGS.HYPESQUAD_ONLINE_HOUSE_2]: "HypeSquad Brilliance",
  [BADGE_FLAGS.HYPESQUAD_ONLINE_HOUSE_3]: "HypeSquad Balance",
  [BADGE_FLAGS.PREMIUM_EARLY_SUPPORTER]: "Early Supporter",
  [BADGE_FLAGS.TEAM_PSEUDO_USER]: "Team User",
  [BADGE_FLAGS.BUG_HUNTER_LEVEL_2]: "Bug Hunter Level 2",
  [BADGE_FLAGS.VERIFIED_BOT]: "Verified Bot",
  [BADGE_FLAGS.VERIFIED_DEVELOPER]: "Verified Developer",
  [BADGE_FLAGS.CERTIFIED_MODERATOR]: "Certified Moderator",
  [BADGE_FLAGS.BOT_HTTP_INTERACTIONS]: "Bot HTTP Interactions",
  [BADGE_FLAGS.ACTIVE_DEVELOPER]: "Active Developer",
};

export const BADGE_ICONS: Record<number, string> = {
  [BADGE_FLAGS.STAFF]: "ic_badge_staff",
  [BADGE_FLAGS.PARTNER]: "ic_badge_partner",
  [BADGE_FLAGS.HYPESQUAD]: "ic_badge_hypesquad",
  [BADGE_FLAGS.BUG_HUNTER_LEVEL_1]: "ic_badge_bug_hunter",
  [BADGE_FLAGS.HYPESQUAD_ONLINE_HOUSE_1]: "ic_badge_hypesquad_bravery",
  [BADGE_FLAGS.HYPESQUAD_ONLINE_HOUSE_2]: "ic_badge_hypesquad_brilliance",
  [BADGE_FLAGS.HYPESQUAD_ONLINE_HOUSE_3]: "ic_badge_hypesquad_balance",
  [BADGE_FLAGS.PREMIUM_EARLY_SUPPORTER]: "ic_badge_early_supporter",
  [BADGE_FLAGS.TEAM_PSEUDO_USER]: "ic_badge_team",
  [BADGE_FLAGS.BUG_HUNTER_LEVEL_2]: "ic_badge_bug_hunter",
  [BADGE_FLAGS.VERIFIED_BOT]: "ic_badge_verified_bot",
  [BADGE_FLAGS.VERIFIED_DEVELOPER]: "ic_badge_verified_developer",
  [BADGE_FLAGS.CERTIFIED_MODERATOR]: "ic_badge_certified_moderator",
  [BADGE_FLAGS.BOT_HTTP_INTERACTIONS]: "ic_badge_bot",
  [BADGE_FLAGS.ACTIVE_DEVELOPER]: "ic_badge_active_developer",
};

export const BADGE_LIST = Object.entries(BADGE_FLAGS).map(([name, value]) => ({
  name,
  value,
  label: BADGE_NAMES[value],
  icon: BADGE_ICONS[value],
}));
