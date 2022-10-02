import pickers from '../picker';
import { ActionType, AndroidPickerMode, AndroidPickerProps } from '../types';
import { getPicker } from './android';

const show = (props: AndroidPickerProps) => {
  const {
    mode = AndroidPickerMode.DATE,
    value: originalValue,
    onChange,
    onDateRangeChange,
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
          const date = new Date(originalValue);
          date.setFullYear(year, month, day);
          onChange?.(date);
          break;
        }
        case ActionType.SET_DATE_RANGE: {
          const startDate = new Date(originalValue);
          const endDate = new Date(originalValue);
          startDate.setFullYear(startYear, startMonth, startDay);
          endDate.setFullYear(endYear, endMonth, endDay);
          onDateRangeChange?.(startDate, endDate);
          break;
        }
        case ActionType.SET_TIME: {
          const time = new Date(originalValue);
          time.setHours(hour, minute);
          onChange?.(time);
          break;
        }
        case ActionType.DISMISSED:
        default: {
          onChange?.(new Date(originalValue));
        }
      }
    } catch (err) {
      onError?.(err);
    }
  })();
};

const dismiss = (mode: AndroidPickerMode): Promise<boolean> => {
  return pickers[mode].dismiss();
};

export const MaterialDateTimePickerAndroid = { show, dismiss };
