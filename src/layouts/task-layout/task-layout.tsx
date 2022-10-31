import React from 'react';
import styles from './task-layout.module.css';
import { LayoutProps } from '../../types/prop.types';

const TaskLayout : React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.task}>
    {children}
  </div>
);

export default TaskLayout;
