import { MouseEvent, ReactNode } from 'react';
import { Audio } from 'react-loader-spinner';

import styles from './LoaderContainer.module.scss';

type Props = {
  isLoading: boolean;
  children: ReactNode;
};

export const LoaderContainer = ({ isLoading, children }: Props) => {
  const onContentClick = (event: MouseEvent) => event.preventDefault();

  if (isLoading) {
    return (
      <div className={styles.container} onClick={onContentClick}>
        <Audio width="50" color="#9B51E0" />
      </div>
    );
  }

  return <>{children}</>;
};