// based off nexpid's userpfp
import { logger } from "@vendetta";
import Settings from "./Settings";
import { stopPlugin } from "@vendetta/plugins";
import { id } from "@vendetta/plugin";
import patcher from "./patcher";

let unpatch: () => void;

export default {
  onLoad: async () => {
    try {
      unpatch = await patcher();
    } catch (e) {
      logger.error("patch error", e);

      stopPlugin(id);
    }
  },
  onUnload: () => {
    unpatch();
  },
  settings: Settings,
};
