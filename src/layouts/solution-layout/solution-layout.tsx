import React from 'react';
import { LayoutProps } from '../../types/prop.types';
import styles from './solution-layout.module.css';

const SolutionLayout : React.FC<LayoutProps> = ({ children }) => (
  <div className={styles.solution}>
    {children}
  </div>
);

export default SolutionLayout;
