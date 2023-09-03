import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../../../lib/context/App';

import { AVAILABLE_LANGUAGES } from '../../../../lib/context/App/storage';

import ModalLogo from '../../../../assets/images/onboarding/break_video_logo.svg';
import CloseIcon from '../../../../assets/images/onboarding/white_close_icon.svg';
import BackArrow from '../../../../assets/images/onboarding/leftArrow.svg';

import {
  ContentfulItem,
  ContentfullVideos,
  fetchVideos,
} from '../../../../lib/api/content/contentful';
import i18n from '../../../../lib/config/i18n';
import BreaksModal from '../../../../lib/components/breaksVideoPlayer';
import services from '../../../../lib/utils/services';
import BreakItem from './breakItem';
import { BreakEvent } from '../../../../lib/api/breaks/types';
import { useUserContext } from '../../../../lib/context/User';

const Dashboard = () => {
  const { t } = useTranslation('dashboardMenu');
  const [activeFilter, setActiveFilter] = useState('all');
  const { setAppSettings } = useAppContext();
  const [currentLang, setCurrentLang] = useState<string>(i18n.language);
  const [filteredArray, setFilteredArray] = useState<ContentfullVideos>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [activeBreak, setActiveBreak] = useState<ContentfulItem>();
  const { setUserSettings, userSettings } = useUserContext();
  const { api } = services;

  const Filters = {
    [AVAILABLE_LANGUAGES.EN]: ['movement', 'breathwork', 'meditation'],
    [AVAILABLE_LANGUAGES.ES]: [
      'spanishBreathing',
      'spanishMeditation',
      'spanishMovement',
    ],
  };

  const findAndSetVideo = (videos?: ContentfullVideos) => {
    const videoToPlay = videos?.items.find(
      (item) => item.sys.id === userSettings?.selected_video
    );
    if (videoToPlay) {
      setActiveBreak(videoToPlay);
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (userSettings?.selected_video) {
      findAndSetVideo(filteredArray);
    }
  }, [userSettings?.selected_video]);

  useEffect(() => {
    let isMounted = true;
    const getContent = async () => {
      if (activeFilter !== 'all') {
        const videos = await fetchVideos(activeFilter);
        isMounted && videos && setFilteredArray(videos);
        findAndSetVideo(videos);
      } else {
        const videos = await fetchVideos(
          Filters[i18n.language as AVAILABLE_LANGUAGES][0],
          Filters[i18n.language as AVAILABLE_LANGUAGES][1],
          Filters[i18n.language as AVAILABLE_LANGUAGES][2]
        );
        isMounted && videos && setFilteredArray(videos);
        findAndSetVideo(videos);
      }
    };
    getContent();

    return () => {
      isMounted = false;
    };
  }, [activeFilter, i18n.language]);

  const filterButton = [
    {
      label: t('all'),
      type: 'all',
    },
    {
      label: t('movement'),
      type:
        i18n.language === AVAILABLE_LANGUAGES.ES
          ? 'spanishMovement'
          : 'movement',
    },
    {
      label: t('mindfulness'),
      type:
        i18n.language === AVAILABLE_LANGUAGES.ES
          ? 'spanishMeditation'
          : 'meditation',
    },
    {
      label: t('breathwork'),
      type:
        i18n.language === AVAILABLE_LANGUAGES.ES
          ? 'spanishBreathing'
          : 'breathwork',
    },
  ];

  const chooseLang = (e: ChangeEvent<HTMLSelectElement>) => {
    setAppSettings &&
      setAppSettings((prevState) => ({
        ...prevState,
        language: e.target.value as AVAILABLE_LANGUAGES,
      }));
    setCurrentLang(e.target.value);
    i18n.changeLanguage(e.target.value as AVAILABLE_LANGUAGES);
    setActiveFilter('all');
  };

  const handleFilterButton = (type: string) => {
    setActiveFilter(type);
  };

  const handleVideo = (lib: ContentfulItem) => {
    setOpenModal(true);
    setActiveBreak(lib);
  };

  const handleBreakCompleted = async (eventData: BreakEvent) => {
    setOpenModal(false);
    setUserSettings &&
      setUserSettings((prevSettings) => ({
        ...prevSettings,
        selected_video: undefined,
      }));
    await api.Breaks.breakCompletedEvent({
      contentUrl: eventData.contentUrl ?? '',
      completed: eventData.completed,
      rating: eventData.rating,
      lang: (i18n.language as AVAILABLE_LANGUAGES) ?? 'en',
    });
  };

  const handleBookmarks = async (contentId: string) => {
    if (!userSettings) return;
    const bookmarksToBeSaved = userSettings?.bookmarks.includes(contentId)
      ? [...userSettings?.bookmarks.filter((id) => contentId !== id)]
      : [...(userSettings?.bookmarks ?? []), contentId];

    await api.User.updateBookmarks({
      bookmarks: bookmarksToBeSaved,
    });

    setUserSettings &&
      setUserSettings((prevState) => {
        return {
          ...prevState,
          bookmarks: bookmarksToBeSaved,
        };
      });
  };

  return (
    <div className="flex">
      <div className="w-full min-h-screen">
        <div className="text-black text-3xl font-bold w-full mx-auto mt-9 text-center">
          {t('breaksLibrary')}
        </div>
        <div className="text-black text-base max-w-[690px] mx-auto mt-3">
          {t('quick_wellness_description')}
        </div>
        <div className="min-w-[320px] mx-4 lg:mx-20">
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              {filterButton.map((button, index) => {
                return (
                  <button
                    onClick={() => handleFilterButton(button.type)}
                    className={`border text-pinky-700 mr-4 rounded-2xl px-4 py-1 text-sm font-bold leading-4 h-[32px] 
                      ${
                        activeFilter === button.type
                          ? 'bg-pinky-200 border-white'
                          : 'border-pinky-700'
                      }`}
                    key={index}
                  >
                    {button.label}
                  </button>
                );
              })}
            </div>
            <div>
              <select
                id="localeSelector4Dashboard"
                defaultValue={currentLang}
                className="block w-[100px] h-[28px] text-xs text-grey-700 font-bold bg-transparent rounded-xl border border-grey-700 focus:border-grey-700 focus:outline-none focus:ring-0  "
                onChange={chooseLang}
              >
                <option className="text-black" value={AVAILABLE_LANGUAGES.EN}>
                  English
                </option>
                <option className="text-black" value={AVAILABLE_LANGUAGES.ES}>
                  Española
                </option>
              </select>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {filteredArray?.items &&
              filteredArray.items.map((lib) => {
                return (
                  <BreakItem
                    handlePlay={() => handleVideo(lib)}
                    lib={lib}
                    key={lib.sys.id}
                    active={
                      userSettings?.bookmarks.includes(lib.sys.id) ?? false
                    }
                    onSetActive={(value) => handleBookmarks(value)}
                  />
                );
              })}
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
            openModal ? '' : 'hidden'
          }`}
          id="defaultModal"
          onClick={() => setOpenModal(false)}
        >
          <div className="relative top-0 h-full mx-auto py-5 max-w-[400px]  flex items-center">
            <div
              className="h-[570px] w-full shadow-lg rounded-md bg-white"
              onClick={(e) => {
                // do not close modal if anything inside modal content is clicked
                e.stopPropagation();
              }}
            >
              <div className="bg-rurikon-300 h-12 px-5 flex items-center justify-between">
                <img src={ModalLogo} alt="logo" />
                <img
                  src={CloseIcon}
                  alt="close"
                  className="cursor-pointer"
                  onClick={() => setOpenModal(false)}
                />
              </div>
              <div className="p-5">
                <button
                  className="flex items-center justify-center relative w-full"
                  onClick={() => setOpenModal(false)}
                >
                  <img
                    src={BackArrow}
                    alt="left arrow"
                    className="absolute left-0"
                  />
                  <div className="text-center font-bold text-black text-2xl">
                    {t('break_time')}
                  </div>
                </button>

                <div className="text-center font-medium text-black text-base my-2">
                  {activeBreak?.fields.title}
                </div>

                <BreaksModal
                  title={t('break_time')}
                  videoFile={{
                    url: `https:${activeBreak?.fields.file.url}`,
                    name: activeBreak?.fields.title ?? '',
                    description: activeBreak?.fields.description ?? '',
                  }}
                  open={openModal}
                  breakCompleted={(event) => handleBreakCompleted(event)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
