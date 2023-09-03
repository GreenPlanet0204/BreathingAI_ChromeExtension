import React, { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/navigationBar';
import { TopBar } from '../components/topBar';
import { useAppContext } from '../../../lib/context/App';
import { useAuthContext } from '../../../lib/context/Auth';
import GuidePopup from '../components/GuidePopup';
import PauseScreen from '../components/PauseScreen';
import { AppSettings } from '../../../lib/context/App/storage';
import services from '../../../lib/utils/services';
import { useSoundsContext } from '../../../lib/context/Sounds';
import { RadioMessage, RADIO_ACTIONS } from '../../Offscreen/Radio/types';
import { radio_stations } from '../pages/sound/stations';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { authSettings, setAuthSettings, state } = useAuthContext();
  const { setAppSettings, routerSettings, appSettings } = useAppContext();
  const [openGuideModal, setOpenGuideModal] = useState<boolean>(true);
  const [openPauseScreen, setOpenPauseScreen] = useState(appSettings?.paused);
  const { api } = services;

  const navigate = useNavigate();

  useEffect(() => {
    setOpenPauseScreen(appSettings?.paused);
  }, [appSettings?.paused]);

  useEffect(() => {
    if (routerSettings) navigate(routerSettings?.currentPopupTab);
  }, [routerSettings?.currentPopupTab]);
  const { soundsSettings, setSoundsSettings } = useSoundsContext();
  const handlePauseMusic = async (pause: boolean) => {
    if (soundsSettings) {
      const message: RadioMessage = {
        type: RADIO_ACTIONS.TOGGLE,
        payload: {
          play: !pause,
          track: radio_stations[soundsSettings.station][soundsSettings.track],
          volume: soundsSettings.volume,
          station: soundsSettings.station,
        },
      };
      if (setSoundsSettings && state?.user?.id && soundsSettings) {
        setSoundsSettings((prevState) => {
          return { ...prevState, play: !pause };
        });
      }
      await chrome.runtime.sendMessage(message);
    }
  };
  const CloseGuideModal = () => {
    setAuthSettings &&
      setAuthSettings((prevState) => ({
        ...prevState,
        walkThrough: 6,
      }));
    setOpenGuideModal(false);
  };

  const TogglePauseScreen = () => {
    setOpenPauseScreen(!openPauseScreen);
  };

  // set settings.pause value as true,
  // parameter type is string value for pause type like 15 mins, 1 hour and etc
  const setPauseSetting = async (pauseTimer?: number) => {
    if (setAppSettings && state?.user?.id && appSettings) {
      handlePauseMusic(true);
      const newSettings: AppSettings = {
        ...appSettings,
        paused: true,
        pauseDuration: pauseTimer,
      };
      const newAppSettings = await api.Settings.updateAppSettings(newSettings);

      setAppSettings(() => {
        return newAppSettings;
      });
    }
  };

  return (
    <div className="relative">
      <div className="fixed w-full z-50">
        <TopBar togglePauseModal={TogglePauseScreen} />
      </div>

      <div className="container w-full px-4 pb-2 pt-32 h-modal bg-white dark:bg-[#1D2B49]">
        {authSettings?.authenticated && <NavigationBar />}
        {children}
      </div>

      {authSettings?.authenticated && authSettings?.walkThrough !== 6 && (
        <GuidePopup handleClose={CloseGuideModal} openModal={openGuideModal} />
      )}

      {openPauseScreen && <PauseScreen setPauseTimer={setPauseSetting} />}
    </div>
  );
};

export default Layout;
