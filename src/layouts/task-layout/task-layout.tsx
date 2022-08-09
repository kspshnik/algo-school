import React from 'react';
import styles from './task-layout.module.css';
import { LayoutProps } from '../../types/prop.types';

const TaskLayout : React.FC<LayoutProps> = ({ children, extraClass }) => (
  <div className={`${styles.task} ${(!extraClass ? '' : extraClass)}`}>
    {children}
  </div>
);

export default TaskLayout;
