import { Platform } from 'react-native';

import type { DateTimePickerResult, TimePickerOptions } from './types';

export default class TimePickerAndroid {
  static async show(
    _options: TimePickerOptions
  ): Promise<DateTimePickerResult> {
    throw new Error(`DatePicker is not supported on: ${Platform.OS}`);
  }

  static async dismiss(): Promise<boolean> {
    throw new Error(`DatePicker is not supported on: ${Platform.OS}`);
  }
}
