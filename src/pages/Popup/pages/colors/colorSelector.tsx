import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';
import { Themes } from '../../../../lib/context/App/types';
import { useColorsContext } from '../../../../lib/context/Colors';
import { useAuthContext } from '../../../../lib/context/Auth';
import services from '../../../../lib/utils/services';
import { ColorsSettings } from '../../../../lib/context/Colors/storage';
import { SketchPicker } from 'react-color';

const ColorSelector = () => {
  const { t } = useTranslation('colors');

  const { colorsSettings, setColorsSettings, state } = useColorsContext();
  const [newColor, setNewColor] = useState(colorsSettings?.selectedColor);
  const [opacity, setNewOpacity] = useState(colorsSettings?.opacity);

  const { api } = services;

  const { appSettings } = useAppContext();

  const isDarkMode = appSettings?.theme === Themes.DARK;

  const { setAuthSettings, authSettings, state: authState } = useAuthContext();

  const [displayPicker, setDisplayPicker] = useState(false);

  const handleTintColors = async (newValue: string) => {
    if (setColorsSettings && authState?.user?.id && colorsSettings) {
      const newSettings: ColorsSettings = {
        ...colorsSettings,
        selectedColor: newValue,
      };
      const newColorSettings = await api.Settings.updateColorsSettings(
        newSettings
      );
      setColorsSettings(() => {
        return newColorSettings;
      });
    }
    if (
      setAuthSettings &&
      colorsSettings?.selectedColor !== newValue &&
      authSettings?.walkThrough !== 6
    ) {
      setAuthSettings((prevState) => ({
        ...prevState,
        walkThrough: 5,
      }));
    }
  };

  const handleOpacity = async () => {
    if (setColorsSettings && authState?.user?.id && colorsSettings && opacity) {
      const newSettings: ColorsSettings = {
        ...colorsSettings,
        opacity,
      };
      const newColorSettings = await api.Settings.updateColorsSettings(
        newSettings
      );
      setColorsSettings(() => {
        return newColorSettings;
      });
    }
  };

  const handleSetNewColor = async () => {
    setDisplayPicker(false);
    if (state?.colors && colorsSettings?.selectedColor && newColor) {
      const colorsIndex = state.colors.indexOf(colorsSettings.selectedColor);
      const newArray = state?.colors;
      newArray[colorsIndex] = newColor;
      await api.Colors.updateColors(newArray);
    }
  };

  return (
    <div className="mb-4">
      <div className="content-center shadow-input bg-white rounded-lg p-4 dark:shadow-input2 dark:bg-grey-800">
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-bold text-rurikon-400 mr-4 dark:text-white">
            {t('color_selector')}
          </p>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {state?.colors.map((color, index) => {
            return (
              <div
                key={index}
                style={{ background: color }}
                className={`h-9 w-9 rounded-full cursor-pointer ${
                  color === colorsSettings?.selectedColor
                    ? 'border-2 border-rurikon-400 dark:border-white'
                    : ''
                }`}
                onClick={() => handleTintColors(color)}
              />
            );
          })}
          <button
            className="h-9 w-9 border text-4xl text-rurikon-400 leading-8 text-center border-rurikon-400 rounded-full cursor-pointer dark:text-white dark:border-white"
            style={{
              rotate: displayPicker ? '45deg' : '0deg',
              backgroundColor: displayPicker ? newColor : '',
              color: displayPicker
                ? isDarkMode
                  ? '#fff'
                  : '#000'
                : isDarkMode
                ? '#fff'
                : '#000',
            }}
            onClick={() =>
              displayPicker
                ? handleSetNewColor()
                : setDisplayPicker(!displayPicker)
            }
          >
            +
          </button>
          {displayPicker && (
            <div className="absolute z-50 top-1/4">
              <SketchPicker
                color={newColor}
                onChange={(value) => {
                  setNewColor(value.hex);
                }}
              />
              <button
                onClick={() =>
                  displayPicker
                    ? handleSetNewColor()
                    : setDisplayPicker(!displayPicker)
                }
                className="bg-pinky-200 text-base font-bold text-grey-600 rounded-xl px-10 py-2 w-full my-2"
              >
                Save
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <label
            htmlFor={isDarkMode ? 'dark-opacity-range' : 'opacity-range'}
            className="block mr-4 text-sm font-bold text-rurikon-400 dark:text-white"
          >
            {t('opacity')}
          </label>
          <input
            id={isDarkMode ? 'dark-opacity-range' : 'opacity-range'}
            type="range"
            min={0}
            max={1}
            value={opacity}
            step={0.1}
            onChange={(e) => setNewOpacity(e.target.value)}
            onMouseUp={() => handleOpacity()}
            className="w-full h-[2px] bg-rurikon-400 rounded-lg appearance-none cursor-pointer range-sm dark:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
