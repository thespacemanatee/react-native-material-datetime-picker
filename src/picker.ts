import DatePickerAndroid from './datepicker';
import TimePickerAndroid from './timepicker';
import { AndroidPickerMode } from './types';

const pickers = {
  [AndroidPickerMode.DATE]: DatePickerAndroid,
  [AndroidPickerMode.TIME]: TimePickerAndroid,
};

export default pickers;
