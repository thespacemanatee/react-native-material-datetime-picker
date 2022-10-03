import pickers from '../picker';
import { ActionType, AndroidPickerMode, AndroidPickerProps } from '../types';
import { getPicker } from './android';

const show = (props: AndroidPickerProps) => {
  const {
    mode = AndroidPickerMode.DATE,
    value,
    onConfirm,
    onConfirmDateRange,
    onError,
  } = props;
  const picker = getPicker(mode);

  (async () => {
    try {
      const {
        action,
        day,
        month,
        year,
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear,
        minute,
        hour,
      } = await picker(props);
      switch (action) {
        case ActionType.SET_DATE: {
          const date = new Date(value);
          date.setFullYear(year, month, day);
          onConfirm?.(date);
          break;
        }
        case ActionType.SET_DATE_RANGE: {
          const startDate = new Date(value);
          const endDate = new Date(value);
          startDate.setFullYear(startYear, startMonth, startDay);
          endDate.setFullYear(endYear, endMonth, endDay);
          onConfirmDateRange?.(startDate, endDate);
          break;
        }
        case ActionType.SET_TIME: {
          const time = new Date(value);
          time.setHours(hour, minute);
          onConfirm?.(time);
          break;
        }
        case ActionType.DISMISSED:
        default: {
          onConfirm?.(new Date(value));
        }
      }
    } catch (err) {
      onError?.(err);
    }
  })();
};

const dismiss = (mode?: AndroidPickerMode): Promise<boolean> => {
  if (mode) {
    return pickers[mode].dismiss();
  }
  return pickers.date.dismiss() || pickers.time.dismiss();
};

export const MaterialDatetimePickerAndroid = { show, dismiss };
