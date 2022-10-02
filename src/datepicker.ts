import { Platform } from 'react-native';

import type { DateTimePickerResult, DatePickerOptions } from './types';

export default class DatePickerAndroid {
  static async show(
    _options: DatePickerOptions
  ): Promise<DateTimePickerResult> {
    _options;
    throw new Error(`DatePicker is not supported on: ${Platform.OS}`);
  }

  static async dismiss(): Promise<boolean> {
    throw new Error(`DatePicker is not supported on: ${Platform.OS}`);
  }
}
