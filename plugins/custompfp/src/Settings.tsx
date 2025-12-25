import { React, ReactNative as RN } from "@vendetta/metro/common";
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
  const [globalName, setGlobalName] = React.useState(storage.globalName ?? "");
  const [username, setUsername] = React.useState(storage.username ?? "");
  const [bot, setBot] = React.useState(
    storage.bot !== undefined ? storage.bot : false
  );
  const [system, setSystem] = React.useState(
    storage.system !== undefined ? storage.system : false
  );
  const [botTouched, setBotTouched] = React.useState(storage.bot !== undefined);
  const [systemTouched, setSystemTouched] = React.useState(
    storage.system !== undefined
  );
  const [nitro, setNitro] = React.useState(
    storage.nitro !== undefined ? storage.nitro : false
  );
  const [nitroTouched, setNitroTouched] = React.useState(
    storage.nitro !== undefined
  );

  React.useEffect(() => {
    setStorage({
      staticPFP: staticPFP.trim() || undefined,
      animatedPFP: animatedPFP.trim() || undefined,
      banner: banner.trim() || undefined,
      badges: selectedBadges.length > 0 ? selectedBadges : undefined,
      globalName: globalName.trim() || undefined,
      username: username.trim() || undefined,
      bot: botTouched ? bot : undefined,
      system: systemTouched ? system : undefined,
      nitro: nitroTouched ? nitro : undefined,
    });
  }, [
    staticPFP,
    animatedPFP,
    banner,
    selectedBadges,
    globalName,
    username,
    botTouched,
    bot,
    systemTouched,
    system,
    nitroTouched,
    nitro,
  ]);

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
    <RN.ScrollView>
      <FormSection title="User Info Settings">
        <FormInput
          title="Display Name (globalName)"
          value={globalName}
          onChange={(v) => setGlobalName(v)}
          placeholder="Custom Display Name"
          helperText="Optional: Custom display name"
        />
        <FormDivider />
        <FormInput
          title="Username"
          value={username}
          onChange={(v) => setUsername(v)}
          placeholder="customusername"
          helperText="Optional: Custom username"
        />
        <FormDivider />
        <FormRow
          label={<FormText>Bot Account</FormText>}
          trailing={
            <FormSwitch
              value={bot}
              onValueChange={(v) => {
                setBotTouched(true);
                setBot(v);
              }}
            />
          }
        />
        <FormDivider />
        <FormRow
          label={<FormText>System Account</FormText>}
          trailing={
            <FormSwitch
              value={system}
              onValueChange={(v) => {
                setSystemTouched(true);
                setSystem(v);
              }}
            />
          }
        />
        <FormDivider />
        <FormRow
          label={<FormText>Nitro</FormText>}
          trailing={
            <FormSwitch
              value={nitro}
              onValueChange={(v) => {
                setNitroTouched(true);
                setNitro(v);
              }}
            />
          }
        />
      </FormSection>
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
    </RN.ScrollView>
  );
};
