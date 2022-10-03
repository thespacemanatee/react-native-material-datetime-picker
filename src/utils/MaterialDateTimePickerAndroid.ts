import { Platform } from 'react-native';

import type { AndroidPickerMode, AndroidPickerProps } from '../types';

const warn = () => {
  throw new Error(
    `MaterialDatetimePickerAndroid is not supported on: ${Platform.OS}`
  );
};

export const MaterialDatetimePickerAndroid: {
  /**
   * Opens the picker dialog
   *
   * @example
   * Here is an example of how to open the time picker:
   * ```
   * MaterialDatetimePickerAndroid.show({
   *   value: currentTime,
   *   mode: AndroidPickerMode.TIME,
   *   onConfirm: (date) => {
   *     setCurrentTime(date);
   *   },
   * });
   * ```
   *
   * @example
   * Here is an example of how to open the date picker:
   * ```
   * MaterialDatetimePickerAndroid.show({
   *   value: currentDate,
   *   mode: AndroidPickerMode.DATE,
   *   onConfirm: (date) => {
   *     setCurrentDate(date);
   *   },
   * });
   * ```
   *
   * @param props The options to be passed to the picker dialog.
   */
  show: (props: AndroidPickerProps) => void;
  /**
   * Dismisses the picker dialog
   *
   * @param mode The mode of picker to dismiss. If not provided, all pickers will be dismissed.
   */
  dismiss: (mode?: AndroidPickerMode) => Promise<boolean>;
} = { show: warn, dismiss: warn };
