import React from 'react';
import { ElementStates } from './element-states';
import { Direction } from './direction';

export interface PageLayoutProps {
  title : string;
  extraClass? : string;
}

export interface MainPageProps {
  extraClass? : string;
}

export interface CircleProps {
  state? : ElementStates,
  letter? : string,
  head? : string | React.ReactElement | null,
  index? : number,
  tail? : string | React.ReactElement | null,
  tailType? : 'string' | 'element',
  extraClass? : string,
  isSmall? : boolean,
  onAnimationEnd : React.AnimationEventHandler,
}

export interface ColumnProps {
  index : number;
  state? : ElementStates;
  extraClass? : string;
}

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text? : string;
  type? : 'button' | 'submit' | 'reset';
  sorting? : Direction;
  linkedList? : 'small' | 'big';
  isLoader? : boolean;
  extraClass? : string;
}

export interface ArrowIconProps {
  fill? : string;
}

export interface ReturnButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type? : 'button' | 'submit' | 'reset';
  extraClass? : string;
}

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder? : string;
  extraClass? : string;
  isLimitText? : boolean;
}

export interface RadioInputProps extends React.HTMLProps<HTMLInputElement> {
  label : string;
  extraClass? : string;
}

export interface LayoutProps {
  children : React.ReactNode | Array<React.ReactNode>,
}
