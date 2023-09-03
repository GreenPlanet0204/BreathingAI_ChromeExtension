import React from 'react';
import PlayIcon from '../../../../assets/images/onboarding/play.svg';
import { ContentfulItem } from '../../../../lib/api/content/contentful';
import { BookmarkSimple } from '@phosphor-icons/react';

const BreakItem = ({
  lib,
  active,
  onSetActive,
  handlePlay,
}: {
  lib: ContentfulItem;
  active: boolean;
  onSetActive: (value: string) => void;
  handlePlay: () => void;
}) => {
  const handleVideo = (lib: ContentfulItem) => {
    handlePlay();
    //check if onboarding was done or not
    chrome.runtime.openOptionsPage();
  };
  return (
    <div key={lib.sys.id} className="w-[206px]">
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
          className="cursor-pointer rounded-md w-[206px] h-[196px]"
        />
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <img src={PlayIcon} alt="play" className="w-12 h-12" />
        </div>
      </button>
      <div className="flex justify-between w-full">
        <div>
          <div className="font-medium text-base text-grey-800 uppercase mt-2">
            {lib.fields.title}
          </div>
          <div className="font-bold text-sm text-grey-800 mt-1">
            {lib.fields.description.match(/[0-9]+:[0-9]+/)}
          </div>
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
    </div>
  );
};

export default BreakItem;
