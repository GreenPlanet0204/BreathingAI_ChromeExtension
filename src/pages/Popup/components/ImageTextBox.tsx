import React from 'react';

export interface ImageTextBoxModel {
  title: string
  copy: string
  image: string
  id: string
  selected?: string
  onClick: any
}

const ImageTextBox:React.FC<ImageTextBoxModel> = (props) => {
  const { title, copy, image, id, selected = null, onClick } = props;
  
  return (
    <div
      className={`flex p-4 mb-2 border-2 ${id === selected ? 'border-lavender-800' : 'border-grey-200'} rounded-xl cursor-pointer`}
      onClick={() => onClick(id)}
    >
      <div className='pr-2'>
        <p className="text-xl font-bold text-rurikon-400 mb-2 dark:text-white">
          {title}
        </p>
        <p className="text-sm font-medium text-rurikon-400 dark:text-white">
          {copy}
        </p>
      </div>
      <div className='w-[100px] flex items-center'>
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default ImageTextBox;
