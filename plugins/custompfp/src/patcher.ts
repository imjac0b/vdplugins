import { findByProps, findByStoreName, findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { getStorage } from "./storage";
import { BADGE_NAMES, BADGE_ICONS } from "./badges";

const avatarStuff = findByProps("getUserAvatarURL", "getUserAvatarSource");
const getUserBannerURL = findByProps("default", "getUserBannerURL");
const useBadgesModule = findByName("useBadges", false);

const UserStore = findByStoreName("UserStore");

const getCustomAvatar = (isStatic?: boolean) => {
  const storage = getStorage();

  if (isStatic) {
    return storage.staticPFP;
  } else {
    // Prefer animated, fallback to static
    return storage.animatedPFP || storage.staticPFP;
  }
};

const urlExt = (url: string) => {
  try {
    return new URL(url).pathname.split(".").slice(-1)[0];
  } catch {
    return "";
  }
};

export default async () => {
  const patches: (() => void)[] = [];

  const storage = getStorage();
  if (
    !storage.staticPFP &&
    !storage.animatedPFP &&
    !storage.banner &&
    !storage.badges?.length
  ) {
    return () => void 0;
  }

  const getCurrentUserId = () => UserStore.getCurrentUser()?.id;

  patches.push(
    after("getUser", UserStore, ([id], ret) => {
      const currentUserId = getCurrentUserId();
      if (id !== currentUserId) return;

      const animatedPFP = getCustomAvatar(false);
      const ext = animatedPFP && urlExt(animatedPFP);
      if (ext === "gif" && ret) {
        const avatar = ret.avatar ?? "0";
        ret.avatar = !avatar.startsWith("a_") ? `a_${avatar}` : avatar;
      }
    })
  );

  patches.push(
    after("getUserAvatarURL", avatarStuff, ([{ id }, animate]) => {
      const currentUserId = getCurrentUserId();
      if (id !== currentUserId) return;

      const custom = getCustomAvatar(!animate);
      if (!custom) return;

      // If requesting static and we have an animated GIF, return static version
      if (!animate && custom && urlExt(custom) === "gif") {
        const staticPFP = getStorage().staticPFP;
        return staticPFP || custom.replace(".gif", ".png");
      }
      return custom;
    })
  );

  patches.push(
    after("getUserAvatarSource", avatarStuff, ([{ id }, animate], ret) => {
      const currentUserId = getCurrentUserId();
      if (id !== currentUserId) return;

      const custom = getCustomAvatar(!animate);
      if (!custom) return;

      // If requesting static and we have an animated GIF, return static version
      if (!animate && custom && urlExt(custom) === "gif") {
        const staticPFP = getStorage().staticPFP;
        return { uri: staticPFP || custom.replace(".gif", ".png") };
      }

      return { uri: custom };
    })
  );

  patches.push(
    after("getUserBannerURL", getUserBannerURL, ([user]) => {
      const currentUserId = getCurrentUserId();
      if (user?.id !== currentUserId) return;

      const currentStorage = getStorage();
      // Only apply custom banner if user doesn't have a banner
      if (user?.banner === undefined && currentStorage.banner) {
        return currentStorage.banner;
      }
    })
  );

  if (useBadgesModule) {
    patches.push(
      after("default", useBadgesModule, ([user], ret) => {
        const currentStorage = getStorage();
        if (!currentStorage.badges?.length) return ret;

        const currentUserId = getCurrentUserId();
        const userId = user?.userId || user?.id;
        if (userId !== currentUserId) return ret;

        const badges = currentStorage.badges || [];

        return [
          ...badges
            .map((badgeFlag, i) => {
              const badgeName = BADGE_NAMES[badgeFlag];
              const badgeIcon = BADGE_ICONS[badgeFlag];
              if (!badgeName || !badgeIcon) return null;

              return {
                id: `custompfp-${userId}-${badgeFlag}-${i}`,
                icon: badgeIcon,
                description: badgeName,
              };
            })
            .filter((b): b is NonNullable<typeof b> => b !== null),
          ...(Array.isArray(ret) ? ret : []),
        ];
      })
    );
  }

  return () => {
    for (const x of patches) {
      x();
    }
  };
};
