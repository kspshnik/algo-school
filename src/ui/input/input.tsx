/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React from 'react';
import styles from './input.module.css';
import { InputProps } from '../../types/prop.types';

const Input: React.FC<InputProps> = ({
  placeholder = 'Введите текст',
  extraClass = '',
  type = 'text',
  maxLength,
  max,
  isLimitText = false,
  ...rest
}) => {
  const limitText = type === 'text'
    ? `Максимум — ${maxLength} символа`
    : `Максимальное число — ${max}`;

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text_type_input text_color_input`}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        max={max}
        {...rest} />
      {isLimitText && (
        <span
          className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}>
          {limitText}
        </span>
      )}
    </div>
  );
};

export default Input;
