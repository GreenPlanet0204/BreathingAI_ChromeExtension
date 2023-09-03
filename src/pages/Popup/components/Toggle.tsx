import React from 'react';

export interface ToggleModel {
  id: string;
  checked: boolean;
  label: string;
  disabled: boolean;
  size?: 'small' | 'medium' | 'large';
  align?: 'left' | 'between' | 'center';
  onChange?: () => void;
}

export const Toggle: React.FC<ToggleModel> = (props) => {
  const {
    id,
    checked = false,
    disabled = false,
    label = '',
    size = 'medium',
    align = 'left',
    onChange,
  } = props;

  const getAlignStyle = (mode: string) => {
    if (mode === 'between') {
      return 'justify-between';
    } else if (mode === 'center') {
      return 'justify-center';
    } else {
      return 'justify-start';
    }
  };
  return (
    <div className={`flex items-center mb-4 ${getAlignStyle(align)}`}>
      <p
        className={`${
          size === 'small' ? 'text-base font-medium' : 'text-xl font-bold'
        } text-rurikon-400 dark:text-white mr-4`}
      >
        {label}
      </p>
      <label htmlFor={id} className="relative items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          checked={checked}
          id={id}
          disabled={disabled}
          className="sr-only peer"
          onChange={() => (onChange ? onChange() : () => {})}
        />
        <div
          className={`w-11 h-[22px]
              rounded-full 
              shadow-inset-1    
            bg-grey-200
              peer 
              peer-focus:outline-none
              peer-checked:after:translate-x-full 
              after:content-['']
              after:absolute 
              after:top-[2px]
              after:left-[5px] 
              after:border
              after:rounded-full
              after:h-[18px]
              after:w-[18px]
              after:transition-all 
              after:shadow-circle 
            dark:bg-gray-700
            dark:border-gray-600 ${
              checked
                ? 'bg-gray-200 peer-checked:after:border-lavender-800 peer-checked:bg-caro-300 after:bg-lavender-800'
                : 'bg-gray-100 peer-checked:after:border-white peer-checked:bg-blue-600 after:bg-gray-400 after:border-gray-300'
            } `}
        />
      </label>
    </div>
  );
};

export default Toggle;
