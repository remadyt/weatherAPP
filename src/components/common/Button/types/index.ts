import { ReactNode } from 'react';

export type ButtonViewProps = {
  isDisabled: boolean;
  children: ReactNode;
};

export enum ButtonType {
  Transparent,
  Primary,
}
