import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Anticipant from '../../../../assets/icons/whale.svg';
import { Content } from '../../../../lib/api/content/types';
import { useBreaksContext } from '../../../../lib/context/Breaks';
import getBookmarkedContent from '../../../../lib/utils/helpers/getBookmarkedContent';
import BreaksList from '../../components/BreaksList/BreaksList';

enum AVAILABLE_TABS {
  RECENT = 'recent',
  BOOKMARKS = 'bookmarks',
}

export const Tabs: React.FC = () => {
  const { t } = useTranslation('breaks');
  const [activeTab, setActiveTab] = useState<AVAILABLE_TABS>(
    AVAILABLE_TABS.RECENT
  );

  const { state } = useBreaksContext();

  if (!state) return null;

  const { content } = state;

  const bookmarks = content && getBookmarkedContent(content);

  const onClickTab = (tab: AVAILABLE_TABS) => {
    setActiveTab(tab);
  };

  const videoContent = (content: Content) => (
    <>
      <video src={content.file.url} poster={content.file.image} />
      <h4>{content.name}</h4>
      <p>{content.method}</p>
      {/* content.bookmarked */}
    </>
  );

  return (
    <div className="shadow-input rounded-b-xl mt-6 dark:shadow-input2">
      <ul className="text-xs font-bold text-center text-gray-500 flex dark:text-gray-400">
        <li className="w-1/5">
          <button
            onClick={() => onClickTab(AVAILABLE_TABS.RECENT)}
            className={`relative inline-block h-[25px] rounded-t-2xl w-full text-xs font-bold text-rurikon-400 
              dark:bg-gray-700 dark:text-white ${
                activeTab === AVAILABLE_TABS.RECENT
                  ? 'bg-grey-200 dark:bg-grey-800'
                  : ''
              } focus:ring-blue-300 hover:bg-gray-50 active focus:outline-none `}
          >
            <div className={`w-full`}>{t('recent')}</div>
          </button>
        </li>
        <li className="w-1/5">
          <button
            onClick={() => onClickTab(AVAILABLE_TABS.BOOKMARKS)}
            className={`relative inline-block h-[25px] rounded-t-2xl w-full text-xs font-bold text-rurikon-400 
            dark:bg-gray-700 dark:text-white ${
              activeTab === AVAILABLE_TABS.BOOKMARKS
                ? 'bg-grey-200 dark:bg-grey-800'
                : ''
            } focus:ring-blue-300 hover:bg-gray-50 active focus:outline-none `}
          >
            <div className={`w-full`}>{t('saved')}</div>
          </button>
        </li>
      </ul>
      <div className="p-4 dark:bg-grey-800 rounded-2xl rounded-tl-none">
        {activeTab === AVAILABLE_TABS.RECENT && <BreaksList />}
        {activeTab === AVAILABLE_TABS.BOOKMARKS && (
          <BreaksList savedView={true} />
        )}
      </div>
    </div>
  );
};

export default Tabs;
