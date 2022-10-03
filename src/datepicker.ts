import { Platform } from 'react-native';

import type { DateTimePickerResult, DatePickerOptions } from './types';

export default class DatePicker {
  static async show(options: DatePickerOptions): Promise<DateTimePickerResult> {
    options;
    throw new Error(`DatePicker is not supported on: ${Platform.OS}`);
  }

  static async dismiss(): Promise<boolean> {
    throw new Error(`DatePicker is not supported on: ${Platform.OS}`);
  }
}
