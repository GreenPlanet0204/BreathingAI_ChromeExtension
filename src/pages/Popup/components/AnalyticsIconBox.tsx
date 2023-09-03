import React from 'react';

export interface AnalyticsIconBoxModel {
  value: string
  title: string
  copy: string
  image: string  
}

const AnalyticsIconBox:React.FC<AnalyticsIconBoxModel> = (props) => {
  const { title, copy, image, value } = props;
  
  return (
    <div
      className='relative flex p-4 mb-2 rounded-xl shadow-input h-28 dark:shadow-input2 dark:rounded-xl dark:bg-grey-800'
    >
      <div className='absolute top-9 pr-2'>
        <div className='flex items-end mb-1'>
          <p className="text-[40px] leading-[40px] font-bold text-rurikon-400 pr-2 dark:text-white">
            {value}
          </p>
          <p className="text-[15px] leading-[15px] font-bold text-grey-400 dark:text-white">
            {title}
          </p>
        </div>
        <p className="text-[10px] leading-[12px] font-medium text-grey-400 dark:text-white">
          {copy}
        </p>
      </div>
      <div className='w-full flex items-start justify-end mt-2'>
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default AnalyticsIconBox;
