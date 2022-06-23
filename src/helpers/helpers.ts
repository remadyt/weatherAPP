import moment from 'moment';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getLastUpdateText = (lastUpdate: string) => {
  const duration = moment.duration(moment().diff(moment(lastUpdate)));
  const minutes = Math.round(duration.asMinutes());
  const hours = Math.round(duration.asHours());

  let text = `${minutes} minutes ago`;

  if (minutes <= 0) {
    text = 'last update just now';
  }
  if (minutes >= 60) {
    text = `${hours} hours ago`;
  }
  if (hours >= 24) {
    const days = Math.round(duration.asDays());
    text = `${days} days ago`;
  }

  return text;
};

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string'
  );
}
