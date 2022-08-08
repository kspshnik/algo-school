/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './return-button.module.css';
import { ReturnIcon } from '../icons';
import { ReturnButtonProps } from '../../types/prop.types';

const ReturnButton: React.FC<ReturnButtonProps> = ({
  extraClass = '',
  ...rest
}) => (
  <button
    className={`${styles.button} ${extraClass}`}
    type='button'
    {...rest}>
    <ReturnIcon />
    <p className='text text_type_button text_color_link ml-4'>К оглавлению</p>
  </button>
);

export default ReturnButton;
