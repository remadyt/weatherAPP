import { useState } from 'react';

import { Button } from '../common/Button/Button';
import { ButtonType } from '../common/Button/types';
import { ModalContainer } from '../common/ModalContainer/ModalContainer';
import { Form } from './Form/Form';

import styles from './CreateWeatherCard.module.scss';

export const CreateWeatherCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <ModalContainer isOpen={isOpen}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Choose a city</h2>
          <span className={styles.description}>To find city start typing and pick one from the suggestions</span>
          <Form handleModal={setIsOpen} />
        </div>
      </ModalContainer>
      <Button className={styles.createButton} type={ButtonType.Primary} onClick={() => setIsOpen(true)} />
    </div>
  );
};
