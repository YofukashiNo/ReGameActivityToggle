import { toast as Toasts } from "replugged/common";
import { CurrentlyPressed, SettingValues } from "../index";
import { defaultSettings } from "../lib/consts";
import Modules from "../lib/requiredModules";
import UserSettingStore from "../lib/UserSettingStore";
import Utils from "../lib/utils";
import Types from "../types";
export default (e: Types.KeybindEvent): void => {
  const keybindEvents = Modules.KeybindUtils.toBrowserEvents(
    SettingValues.get("keybind", defaultSettings.keybind),
  ) as Types.KeybindEvents;
  if (
    e.type === "keyup" &&
    keybindEvents.length &&
    keybindEvents.every(
      (ev) =>
        Object.keys(ev)
          .filter((k) => k !== "keyCode")
          .every((k) => ev[k] === e[k]) && CurrentlyPressed.get(ev.keyCode),
    )
  ) {
    const enabled = UserSettingStore.getSetting("status", "showCurrentGame");
    if (SettingValues.get("showToast", defaultSettings.showToast))
      Toasts.toast(`${enabled ? "Disabled" : "Enabled"} Game Activity`, Toasts.Kind.SUCCESS);
    Utils.toggleGameActivity(enabled);
  }
  CurrentlyPressed.set(e.keyCode, e.type === "keydown");
};
