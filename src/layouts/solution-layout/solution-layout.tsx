import React from 'react';
import styles from './solution-layout.module.css';
import { LayoutProps } from '../../types/prop.types';

const SolutionLayout : React.FC<LayoutProps> = ({ children, extraClass }) => (
  <div className={`${styles.solution} ${(!extraClass ? '' : extraClass)}`}>
    {children}
  </div>
);

export default SolutionLayout;
