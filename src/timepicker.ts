import { Platform } from 'react-native';

import type { DateTimePickerResult, TimePickerOptions } from './types';

export default class TimePicker {
  static async show(options: TimePickerOptions): Promise<DateTimePickerResult> {
    options;
    throw new Error(`DatePicker is not supported on: ${Platform.OS}`);
  }

  static async dismiss(): Promise<boolean> {
    throw new Error(`DatePicker is not supported on: ${Platform.OS}`);
  }
}
