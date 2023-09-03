import React, { useEffect, useState } from 'react';
import Anticipant from '../../../../assets/icons/whale.svg';
import { useTranslation } from 'react-i18next';
import {
  ContentfulItem,
  fetchVideos,
} from '../../../../lib/api/content/contentful';
import BreakItem from './BreakItem';
import { AVAILABLE_LANGUAGES } from '../../../../lib/context/App/storage';
import i18n from '../../../../lib/config/i18n';
import { useUserSettings } from '../../../../lib/context/User/storage';
import services from '../../../../lib/utils/services';
import { useUserContext } from '../../../../lib/context/User';

export interface BreakList {
  savedView?: boolean;
}

const BreaksList: React.FC<BreakList> = ({ savedView }) => {
  const { t } = useTranslation('breaks');
  const [filteredArray, setFilteredArray] = useState<ContentfulItem[]>([]);
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

  useEffect(() => {
    let isMounted = true;
    const getContent = async () => {
      const videos = await fetchVideos(
        Filters[i18n.language as AVAILABLE_LANGUAGES][0],
        Filters[i18n.language as AVAILABLE_LANGUAGES][1],
        Filters[i18n.language as AVAILABLE_LANGUAGES][2]
      );

      if (savedView) {
        const bookmarkedVideos = videos?.items.filter((item) => {
          return userSettings?.bookmarks.includes(item.sys.id);
        });
        if (bookmarkedVideos) setFilteredArray(bookmarkedVideos);
      } else {
        isMounted &&
          videos &&
          setFilteredArray([videos.items[0], videos.items[1], videos.items[3]]);
      }
    };

    getContent();
    return () => {
      isMounted = false;
    };
  }, [i18n.language, userSettings?.bookmarks]);

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

  return filteredArray?.length ? (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
      {filteredArray &&
        filteredArray.map((lib) => (
          <BreakItem
            lib={lib}
            key={lib.sys.id}
            active={userSettings?.bookmarks.includes(lib.sys.id) ?? false}
            onSetActive={(value) => handleBookmarks(value)}
          />
        ))}
    </div>
  ) : (
    <>
      <img src={Anticipant} alt="recent" className="mx-auto mb-4" />
      <p className="text-sm font-bold text-center dark:text-white">
        {savedView
          ? t('no_saved_breaks_message')
          : t('no_breaks_taken_message')}
      </p>
    </>
  );
};

export default BreaksList;
