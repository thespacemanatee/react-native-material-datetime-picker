import { NativeModules } from 'react-native';

import type { DateTimePickerResult, DatePickerOptions } from './types';
import { LINKING_ERROR } from './utils/constants';

const RNMaterialDatePicker = NativeModules.RNMaterialTimePicker
  ? NativeModules.RNMaterialDatePicker
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default class DatePicker {
  /**
   * Shows the Android Material Design time picker dialog.
   */
  static async show(options: DatePickerOptions): Promise<DateTimePickerResult> {
    return RNMaterialDatePicker.show({
      ...options,
      value: options.value.getTime(),
      minimumDate: options.minimumDate?.getTime(),
      maximumDate: options.maximumDate?.getTime(),
      startDate: options.startDate?.getTime(),
      endDate: options.endDate?.getTime(),
    });
  }

  static async dismiss(): Promise<boolean> {
    return RNMaterialDatePicker.dismiss();
  }
}
