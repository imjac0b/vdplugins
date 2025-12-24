import { React } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { getStorage, setStorage } from "./storage";

const { FormSection, FormInput, FormDivider } = Forms;

export default () => {
  const storage = getStorage();
  const [staticPFP, setStaticPFP] = React.useState(storage.staticPFP ?? "");
  const [animatedPFP, setAnimatedPFP] = React.useState(storage.animatedPFP ?? "");
  const [banner, setBanner] = React.useState(storage.banner ?? "");

  React.useEffect(() => {
    setStorage({
      staticPFP: staticPFP.trim() || undefined,
      animatedPFP: animatedPFP.trim() || undefined,
      banner: banner.trim() || undefined,
    });
  }, [staticPFP, animatedPFP, banner]);

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
    </>
  );
};