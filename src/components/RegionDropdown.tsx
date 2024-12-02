import React from 'react';
import DropdownSelector from './DropdownSelector';

interface RegionDropdownProps {
    options: Array<{ value: string; label: string }>;
    defaultValue: string;
    onChange: (selected: string) => void;
  }

const RegionDropdown = ({ options, defaultValue, onChange }: RegionDropdownProps) => {
    
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