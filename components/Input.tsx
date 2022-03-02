import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';  

import { useField } from '@unform/core'; 
import {isIOS} from "react-device-detect"

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  small?:boolean; 
  name: string;
  legend?: string;
  disabled?: boolean;
  icon?: React.ComponentType<IconBaseProps>;
  bg?:boolean;
}

const Input: React.FC<Props> = ({ name, small=false, bg=true, disabled=false, legend,icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  
  const { fieldName, defaultValue, error, clearError, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current, 
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className="flexflex-col w-full mt-2 montserrat-regular text-sm">
    <fieldset className={`${small ? 'px-2 py-1.5' : 'px-2 p-4'} ${bg && "bg-white"} rounded-md flex border   border-gray-300 ${!!error && 'border-vermelho'}  ${disabled && 'border-cinza-claro'}   ${isFocused && 'border-gray-600'}`} >
      {Icon && <Icon className={`text-gray-600 mr-2  ${!!error ? ' text-vermelho':''}`} size={20} />}      
      {!!legend && <legend className={`px-1 text-xxs text-gray-600  ${disabled && 'text-cinza-claro'} ${!!error && 'text-vermelho'}  ${isFilled && ' text-gray-600'} ${isFocused && ' text-gray-600'}`}>{legend}</legend> }
      <input
          className={`w-full text-sm ${isIOS && 'text-input'} ${bg ? "bg-white": "bg-transparent"} placeholder-gray-600 text-gray-600  ${!!error ? 'placeholder-vermelho text-vermelho':''} ${isFilled ? 'placeholder-gray-600 text-gray-600':''} ${isFocused ? 'placeholder-gray-600 text-gray-600':''} ${disabled ? 'text-cinza-claro ':''}`}
          onChange={clearError}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          disabled={disabled}
          ref={inputRef}
          {...rest}
      /> 

    
      
    </fieldset> 

{!!error && <span className={`${!!error && 'flex mt-1 text-left text-xxs text-vermelho'}`}>{error }</span>}
    </div>
  );
};

export default Input;
