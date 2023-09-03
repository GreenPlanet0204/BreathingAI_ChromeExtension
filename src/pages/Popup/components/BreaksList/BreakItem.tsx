import React from 'react';
import PlayIcon from '../../../../assets/images/onboarding/play.svg';
import { ContentfulItem } from '../../../../lib/api/content/contentful';
import { BookmarkSimple } from '@phosphor-icons/react';
import { useUserContext } from '../../../../lib/context/User';

const BreakItem = ({
  lib,
  active,
  onSetActive,
}: {
  lib: ContentfulItem;
  active: boolean;
  onSetActive: (value: string) => void;
}) => {
  const { setUserSettings } = useUserContext();
  const handleVideo = (lib: ContentfulItem) => {
    setUserSettings &&
      setUserSettings((prevState) => ({
        ...prevState,
        selected_video: lib.sys.id,
      }));
    //check if onboarding was done or not
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="flex gap-4">
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        onClick={() => handleVideo(lib)}
        className="relative"
      >
        <img
          src={`/src/assets/thumbnails/all/${lib.fields.title
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')}.png`}
          alt={lib.fields.file.fileName}
          className="cursor-pointer rounded-md w-[100px] h-[100px] max-w-none"
        />
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <img src={PlayIcon} alt="play" className="w-12 h-12" />
        </div>
      </button>
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex mt-2 gap-2">
            {lib.metadata.tags.map((tag) => (
              <div
                key={tag.sys.id}
                className="font-medium text-base text-rurikon-400 uppercase dark:text-white"
              >
                {tag.sys.id}
              </div>
            ))}
          </div>
          <div
            className="flex cursor-pointer"
            onClick={() => onSetActive(lib.sys.id)}
          >
            <BookmarkSimple
              size={40}
              weight={active ? 'fill' : 'light'}
              fill="#C7B3FF"
              color="#C7B3FF"
            />
          </div>
        </div>
        <div className="font-bold text-base text-rurikon-400 mt-1.5 truncate w-[200px] dark:text-white">
          {lib.fields.title}
        </div>
        <div className="font-bold text-sm text-rurikon-400 mt-1.5 dark:text-white">
          {lib.fields.description.match(/[0-9]+:[0-9]+/)!.toString()}
        </div>
      </div>
    </div>
  );
};

export default BreakItem;
