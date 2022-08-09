import React from 'react';
import { LayoutProps } from '../../types/prop.types';

const ControlsLayout : React.FC<LayoutProps> = ({ children }) => (
  <div>
    {children}
  </div>
);

export default ControlsLayout;
