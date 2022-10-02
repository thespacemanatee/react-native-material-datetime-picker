import pickers from '../picker';
import {
  AndroidPickerMode,
  AndroidPickerProps,
  DatePickerOptions,
  DateTimePickerResult,
  TimePickerOptions,
} from '../types';

const getPicker = (
  mode: AndroidPickerMode
): ((props: AndroidPickerProps) => Promise<DateTimePickerResult>) => {
  switch (mode) {
    case AndroidPickerMode.TIME: {
      return (props: AndroidPickerProps) =>
        pickers[mode].show(props as TimePickerOptions);
    }
    case AndroidPickerMode.DATE:
    default: {
      return (props: AndroidPickerProps) =>
        pickers.date.show(props as DatePickerOptions);
    }
  }
};

export { getPicker };
