import { NativeModules } from 'react-native';

import type { DateTimePickerResult, TimePickerOptions } from './types';
import { LINKING_ERROR } from './utils/constants';

const RNMaterialTimePicker = NativeModules.RNMaterialTimePicker
  ? NativeModules.RNMaterialTimePicker
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default class TimePicker {
  /**
   * Shows the Android Material Design time picker dialog.
   */
  static async show(options: TimePickerOptions): Promise<DateTimePickerResult> {
    return RNMaterialTimePicker.show({
      ...options,
      value: options.value.getTime(),
    });
  }

  static async dismiss(): Promise<boolean> {
    return RNMaterialTimePicker.dismiss();
  }
}
