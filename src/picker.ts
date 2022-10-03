import DatePicker from './datepicker';
import TimePicker from './timepicker';
import { AndroidPickerMode } from './types';

const pickers = {
  [AndroidPickerMode.DATE]: DatePicker,
  [AndroidPickerMode.TIME]: TimePicker,
};

export default pickers;
