import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';

import { useLazyGetWeatherByNameQuery } from '../../../api/weatherApi';
import { weatherSelectors } from '../../../redux/weather/weatherSelectors';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../../helpers/helpers';
import { Button } from '../../common/Button/Button';

import styles from '../CreateWeatherCard.module.scss';

type Props = {
  handleModal: (event: boolean) => void;
};

type ErrorType = {
  cityName?: string;
};

export const Form = ({ handleModal }: Props) => {
  const [fetchWeather] = useLazyGetWeatherByNameQuery();
  const weatherCards = useSelector(weatherSelectors.selectWeatherCards);

  const formik = useFormik({
    initialValues: {
      cityName: '',
    },

    validate: (values) => {
      const errors: ErrorType = {};

      if (!/^[a-zA-Z\s]*$/g.test(values.cityName)) {
        errors.cityName = 'Use only english letters';
      }
      const isCityAdded = weatherCards.find((card) => card.name === values.cityName);

      if (isCityAdded) {
        errors.cityName = 'This city already exists.';
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        await fetchWeather(values.cityName).unwrap();
        formik.resetForm();
        handleModal(false);
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg = 'data' in error && error.data;
          // @ts-ignore
          toast.error(errMsg?.message, { position: 'top-center' });
          formik.resetForm();
        } else if (isErrorWithMessage(error)) {
          toast.error(error.message, { position: 'top-center' });
        }
      }
    },
  });

  const validateError = formik.errors.cityName;
  const isDisabled = !formik.values.cityName;

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        id="cityName"
        className={classNames(styles.input, { [styles.inputWithError]: validateError })}
        type="text"
        placeholder="Search city"
        onChange={formik.handleChange}
        value={formik.values.cityName}
        autoFocus
      />
      {validateError && <span className={styles.errorMessage}>{validateError}</span>}
      <div className={styles.buttons}>
        <Button onClick={() => formik.resetForm()} isDisabled={isDisabled}>
          CLEAR
        </Button>
        <div>
          <Button className={styles.cancelButton} onClick={() => handleModal(false)}>
            CANCEL
          </Button>
          <Button buttonAction="submit" isDisabled={isDisabled}>
            ADD
          </Button>
        </div>
      </div>
    </form>
  );
};
