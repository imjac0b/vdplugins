import { React } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { getStorage, setStorage } from "./storage";
import { BADGES } from "./badges";

const { FormSection, FormInput, FormDivider, FormSwitch, FormRow, FormText } =
  Forms;

export default () => {
  const storage = getStorage();
  const [staticPFP, setStaticPFP] = React.useState(storage.staticPFP ?? "");
  const [animatedPFP, setAnimatedPFP] = React.useState(
    storage.animatedPFP ?? ""
  );
  const [banner, setBanner] = React.useState(storage.banner ?? "");
  const [selectedBadges, setSelectedBadges] = React.useState<number[]>(
    storage.badges ?? []
  );

  React.useEffect(() => {
    setStorage({
      staticPFP: staticPFP.trim() || undefined,
      animatedPFP: animatedPFP.trim() || undefined,
      banner: banner.trim() || undefined,
      badges: selectedBadges.length > 0 ? selectedBadges : undefined,
    });
  }, [staticPFP, animatedPFP, banner, selectedBadges]);

  const toggleBadge = (badgeValue: number) => {
    setSelectedBadges((prev) => {
      if (prev.includes(badgeValue)) {
        return prev.filter((v) => v !== badgeValue);
      } else {
        return [...prev, badgeValue];
      }
    });
  };

  return (
    <>
      <FormSection title="Profile Picture Settings">
        <FormInput
          title="Static Profile Picture URL"
          value={staticPFP}
          onChange={(v) => setStaticPFP(v)}
          placeholder="https://example.com/avatar.png"
          helperText="Optional: URL for static profile picture"
        />
        <FormDivider />
        <FormInput
          title="Animated Profile Picture URL"
          value={animatedPFP}
          onChange={(v) => setAnimatedPFP(v)}
          placeholder="https://example.com/avatar.gif"
          helperText="Optional: URL for animated profile picture (GIF)"
        />
      </FormSection>
      <FormSection title="Banner Settings">
        <FormInput
          title="Banner URL"
          value={banner}
          onChange={(v) => setBanner(v)}
          placeholder="https://example.com/banner.png"
          helperText="Optional: URL for profile banner"
        />
      </FormSection>
      <FormSection title="Badge Settings">
        {BADGES.map((badge) => (
          <FormRow
            key={badge.value}
            label={<FormText>{badge.label}</FormText>}
            trailing={
              <FormSwitch
                value={selectedBadges.includes(badge.value)}
                onValueChange={() => toggleBadge(badge.value)}
              />
            }
          />
        ))}
      </FormSection>
    </>
  );
};
