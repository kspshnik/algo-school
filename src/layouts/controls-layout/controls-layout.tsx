import React from 'react';
import styles from './controls-layout.module.css';
import { LayoutProps } from '../../types/prop.types';

const ControlsLayout : React.FC<LayoutProps> = ({ children, extraClass }) => (
  <div className={`${styles.controls} ${(!extraClass ? '' : extraClass)} `}>
    {children}
  </div>
);

export default ControlsLayout;
