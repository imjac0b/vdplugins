import { React } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { getStorage, setStorage } from "./storage";

const { FormSection, FormInput, FormDivider } = Forms;

export default () => {
  const storage = getStorage();
  const [staticPFP, setStaticPFP] = React.useState(storage.staticPFP ?? "");
  const [animatedPFP, setAnimatedPFP] = React.useState(storage.animatedPFP ?? "");

  React.useEffect(() => {
    setStorage({
      staticPFP: staticPFP.trim() || undefined,
      animatedPFP: animatedPFP.trim() || undefined,
    });
  }, [staticPFP, animatedPFP]);

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
    </>
  );
};