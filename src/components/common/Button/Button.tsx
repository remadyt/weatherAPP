import { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

import { Primary, Transparent } from './views';
import { ButtonType, ButtonViewProps } from './types';

import styles from './Button.module.scss';

export const BUTTON_VIEWS: Record<ButtonType, (props: ButtonViewProps) => ReactElement> = {
  [ButtonType.Transparent]: Transparent,
  [ButtonType.Primary]: Primary,
};

type Props = {
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  type?: ButtonType;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  buttonAction?: ButtonAction;
};

type ButtonAction = 'button' | 'reset' | 'submit';

export const Button = ({
  onClick,
  isDisabled = false,
  type = ButtonType.Transparent,
  className,
  children,
  buttonAction = 'button',
}: Props) => {
  const ViewComponent = BUTTON_VIEWS[type];

  return (
    <button
      type={buttonAction}
      className={classnames(styles.button, className)}
      onClick={onClick}
      disabled={isDisabled}
    >
      <ViewComponent isDisabled={isDisabled}>{children}</ViewComponent>
    </button>
  );
};