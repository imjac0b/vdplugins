// Discord badge definitions
export const BADGES = [
  {
    value: 1 << 0,
    label: "Discord Staff",
    icon: "5e74e9b61934fc1f67c65515d1f7e60d",
  },
  {
    value: 1 << 1,
    label: "Partnered Server Owner",
    icon: "3f9748e53446a137a052f3454e2de41e",
  },
  {
    value: 1 << 2,
    label: "HypeSquad Events",
    icon: "bf01d1073931f921909045f3a39fd264",
  },
  {
    value: 1 << 3,
    label: "Discord Bug Hunter",
    icon: "2717692c7dca7289b35297368a940dd0",
  },
  {
    value: 1 << 6,
    label: "HypeSquad Bravery",
    icon: "8a88d63823d8a71cd5e390baa45efa02",
  },
  {
    value: 1 << 7,
    label: "HypeSquad Brilliance",
    icon: "011940fd013da3f7fb926e4a1cd2e618",
  },
  {
    value: 1 << 8,
    label: "HypeSquad Balance",
    icon: "3aa41de486fa12454c3761e8e223442e",
  },
  {
    value: 1 << 9,
    label: "Early Supporter",
    icon: "7060786766c9c840eb3019e725d2b358",
  },
  {
    value: 1 << 14,
    label: "Discord Bug Hunter",
    icon: "848f79194d4be5ff5f81505cbd0ce1e6",
  },
  {
    value: 1 << 17,
    label: "Early Verified Bot Developer",
    icon: "6df5892e0f35b051f8b61eace34f4967",
  },
  {
    value: 1 << 18,
    label: "Moderator Programmes Alumni",
    icon: "fee1624003e2fee35cb398e125dc479b",
  },
  {
    value: 1 << 22,
    label: "Active Developer",
    icon: "6bdc42827a38498929a4920da12695d9",
  },
] as const;

export const BADGE_NAMES: Record<number, string> = Object.fromEntries(
  BADGES.map((b) => [b.value, b.label])
);

export const BADGE_ICONS: Record<number, string> = Object.fromEntries(
  BADGES.map((b) => [b.value, b.icon])
);
