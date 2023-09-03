import {
  AppSettings,
  APP_SETTINGS_STORAGE_KEY,
} from '../../../../lib/context/App/storage';
import {
  ColorsSettings,
  COLORS_SETTINGS_STORAGE_KEY,
} from '../../../../lib/context/Colors/storage';
import {
  addListenerChromeStorageSettingsValues,
  getStorageSettingsKeysValue,
} from '../../../../lib/utils/chrome-storage';

export const COLOR_SHADER_ID = 'bai-color-shader';

export const InjectColorShader = () => {
  getStorageSettingsKeysValue(
    [COLORS_SETTINGS_STORAGE_KEY, APP_SETTINGS_STORAGE_KEY],
    (settings) => {
      const shader = createShader(settings?.colors, settings?.app);
      addListenerChromeStorageSettingsValues(
        [APP_SETTINGS_STORAGE_KEY, COLORS_SETTINGS_STORAGE_KEY],
        ({ colors, app }) => {
          if (colors) {
            shader.style.display =
              !settings?.app?.paused && colors?.enabled ? 'inherit' : 'none';
            shader.style.background = colors?.selectedColor;
            shader.style.opacity = colors?.opacity;
          }
          if (app) {
            shader.style.display =
              !app.paused && settings.colors.enabled ? 'inherit' : 'none';
            if (app.pauseDuration !== undefined) {
              setTimeout(() => {
                shader.style.display = settings.colors.enabled
                  ? 'inherit'
                  : 'none';
              }, app.pauseDuration);
            }
          }
        }
      );
    }
  );
};

const createShader = (settings?: ColorsSettings, appSettings?: AppSettings) => {
  let shader = document.getElementById(COLOR_SHADER_ID);
  if (!shader) {
    shader = document.createElement('div');
    shader.setAttribute('id', COLOR_SHADER_ID);
    shader.style.display =
      !appSettings?.paused && settings?.enabled
        ? 'inherit'
        : 'none' ?? 'inherit';
    shader.style.background = settings?.selectedColor ?? '';
    shader.style.opacity = settings?.opacity ?? '0';
    shader.style.mixBlendMode = 'multiply';
    shader.style.position = 'fixed';
    shader.style.top = '0';
    shader.style.left = '0';
    shader.style.width = '100%';
    shader.style.height = '100%';
    shader.style.margin = '0';
    shader.style.borderRadius = '0';
    shader.style.pointerEvents = 'none';
    shader.style.zIndex = '2147483646'; // MAX z-index -1
    document.body.appendChild(shader);
    return shader;
  }
  shader.style.display = settings?.enabled ? 'inherit' : 'none';
  shader.style.background = settings?.selectedColor ?? '';
  shader.style.opacity = settings?.opacity ?? '0';

  return shader;
};
export default InjectColorShader;
