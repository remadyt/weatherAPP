import { ButtonViewProps } from '../../types';

import styles from './Primary.module.scss';

export const Primary = ({ children }: ButtonViewProps) => <div className={styles.primary}>{children}</div>;
