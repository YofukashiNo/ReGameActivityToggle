import { PluginInjector } from "../index";
import Modules from "../lib/requiredModules";
import { Sounds } from "../lib/consts";

export default async (): Promise<void> => {
  const AudioResolver = await Modules.AudioResolverPromise;
  PluginInjector.instead(AudioResolver, "exports", ([sound]: [string], res) => {
    switch (sound) {
      case `./${Sounds.GameEnable}.mp3`: {
        return Sounds.GameEnableURL;
      }
      case `./${Sounds.GameDisable}.mp3`: {
        return Sounds.GameDisableURL;
      }
      case `./${Sounds.SpotifyEnable}.mp3`: {
        return Sounds.SpotifyEnableURL;
      }
      case `./${Sounds.SpotifyDisable}.mp3`: {
        return Sounds.SpotifyDisableURL;
      }
      case `./${Sounds.SpotifyToogle}.mp3`: {
        return Sounds.SpotifyToogleURL;
      }
      default:
        if (AudioResolver.exports.keys().includes(sound)) {
          return res(sound);
        }
    }
  });
};
