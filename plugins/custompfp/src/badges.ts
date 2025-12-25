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
  {
    value: 1 << 23,
    label: "Nitro Subscriber (1 Month)",
    icon: "4f33c4a9c64ce221936bd256c356f91f",
    id: "premium_tenure_1_month_v2",
  },
  {
    value: 1 << 24,
    label: "Nitro Subscriber (3 Months)",
    icon: "4514fab914bdbfb4ad2fa23df76121a6",
    id: "premium_tenure_3_month_v2",
  },
  {
    value: 1 << 25,
    label: "Nitro Subscriber (6 Months)",
    icon: "2895086c18d5531d499862e41d1155a6",
    id: "premium_tenure_6_month_v2",
  },
  {
    value: 1 << 26,
    label: "Nitro Subscriber (12 Months)",
    icon: "0334688279c8359120922938dcb1d6f8",
    id: "premium_tenure_12_month_v2",
  },
  {
    value: 1 << 27,
    label: "Nitro Subscriber (24 Months)",
    icon: "0d61871f72bb9a33a7ae568c1fb4f20a",
    id: "premium_tenure_24_month_v2",
  },
  {
    value: 1 << 28,
    label: "Nitro Subscriber (36 Months)",
    icon: "11e2d339068b55d3a506cff34d3780f3",
    id: "premium_tenure_36_month_v2",
  },
  {
    value: 1 << 29,
    label: "Nitro Subscriber (60 Months)",
    icon: "cd5e2cfd9d7f27a8cdcd3e8a8d5dc9f4",
    id: "premium_tenure_60_month_v2",
  },
  {
    value: 1 << 30,
    label: "Nitro Subscriber (72 Months)",
    icon: "5b154df19c53dce2af92c9b61e6be5e2",
    id: "premium_tenure_72_month_v2",
  },
] as const;

export const BADGE_NAMES: Record<number, string> = Object.fromEntries(
  BADGES.map((b) => [b.value, b.label])
);

export const BADGE_ICONS: Record<number, string> = Object.fromEntries(
  BADGES.map((b) => [b.value, b.icon])
);

export const BADGE_IDS: Record<number, string> = Object.fromEntries(
  BADGES.map((b) => [b.value, (b as any).id]).filter(
    ([, id]) => id !== undefined
  ) as [number, string][]
);
