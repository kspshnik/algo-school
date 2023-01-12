/* eslint-disable @typescript-eslint/restrict-template-expressions */

import React from 'react';
import styles from './button.module.css';
import loaderIcon from '../../assets/images/icons/loader.svg';
import { AscendingIcon, DescendingIcon } from '../icons';
import { Direction } from '../../types/direction';
import { ButtonProps } from '../../types/prop.types';

const Button: React.FC<ButtonProps> = ({
  text,
  extraClass = '',
  type = 'button',
  isLoader = false,
  sorting,
  linkedList,
  disabled,
  ...rest
}) => {
  const currentIcon = sorting === Direction.Ascending ? <AscendingIcon /> : <DescendingIcon />;
  const className = `text text_type_button text_color_primary ${
    styles.button
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  } ${linkedList && styles[linkedList]} ${
    isLoader && styles.loader
  } ${extraClass}`;

  return (
    <button
      className={className}
      /*  eslint-disable-next-line react/button-has-type */
      type={type}
      disabled={isLoader || disabled}
      data-testid='ui-regular-button'
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...rest}>
      {isLoader ? (
        <img className={styles.loader_icon} src={loaderIcon} alt='Загрузка.' />
      ) : (
        <>
          {sorting && currentIcon}
          <p className={`text ${sorting && 'ml-5'}`}>{text}</p>
        </>
      )}
    </button>
  );
};

export default Button;
