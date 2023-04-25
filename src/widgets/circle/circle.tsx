import React from 'react';
import styles from './circle.module.css';
import { ElementStates } from '../../types/element-states';
import { CircleProps } from '../../types/prop.types';

const Circle : React.FC<CircleProps> = ({
  state = ElementStates.Default,
  letter,
  head,
  index,
  tail,
  extraClass = '',
  isSmall,
}) => (
  <div className={`${styles.content} ${extraClass}`}>
    <div
      className={`text text_type_input text_color_input mb-4 ${
        styles.absolute
      } ${styles.head} ${
        styles[typeof head === 'string' ? 'string' : 'element']
      }`}>
      {head}
    </div>
    <div
      data-testid={`widget-circle-${(!letter ? 'default-no-letter' : letter)}`}
      className={`${styles.circle}  ${isSmall ? styles.small : ''} ${
        styles[state]
      }`}>
      <p
        className={`text text_type_circle text_color_input ${styles.letter}`}>
        {letter}
      </p>
    </div>
    <p
      className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}>
      {index?.toString()}
    </p>
    <div
      className={`text text_type_input text_color_input mt-4 ${
        styles.absolute
      } ${index?.toString() ? styles.tail60 : styles.tail30} ${
        styles[typeof tail === 'string' ? 'string' : 'element']
      }`}>
      {tail}
    </div>
  </div>
);

export default Circle;
