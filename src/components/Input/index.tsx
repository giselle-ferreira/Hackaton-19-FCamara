import React, {InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> 
{
  label: string; 
  id: string;
  value: string;
  setValue: (value: string) => void;
}

export const Input = ({label, id, setValue,value, ...props}: InputProps ) => {

  return (
    <label>
      {label}
      <input type="text" id={id} name={id} value={value} onChange={({target}) => setValue(target.value)} {...props} />
  
    </label>
  )
}