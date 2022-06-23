import classNames from 'classnames';

import {ButtonViewProps} from '../../types';

import styles from './Transparent.module.scss';

export const Transparent = ({children, isDisabled}: ButtonViewProps) => (
    <div className={classNames(styles.transparent, {[styles.disabled]: isDisabled})}>
        {children}
    </div>
);