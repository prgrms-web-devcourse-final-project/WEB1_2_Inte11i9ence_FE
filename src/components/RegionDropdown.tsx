import React from 'react';
import DropdownSelector from './DropdownSelector';

interface DetailDropdownProps {
    isVisible: boolean;
    options: Array<{ value: string; label: string }>;
    defaultValue: string;
    onChange: (selected: string) => void;
  }

const RegionDropdown = ({ isVisible, options, defaultValue, onChange }: DetailDropdownProps) => {
    if (!isVisible) {return null};
    
    return (
        <div className='h-[40px] relative z-1000'>
      <DropdownSelector
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
    );
};

export default RegionDropdown;