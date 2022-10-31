import React from 'react';
import { nanoid } from 'nanoid';
import styles from './radio-input.module.css';
import { RadioInputProps } from '../../types/prop.types';

const RadioInput: React.FC<RadioInputProps> = ({
  label = 'Введите текст',
  extraClass = '',
  ...rest
}) => {
  const id = nanoid();

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input className={styles.input} type='radio' id={id} {...rest} />
      <label className={`text text_type_button ${styles.label}`} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
