import { Platform } from 'react-native';

import type { AndroidPickerProps } from './types';

export default function RNMaterialDatetimePicker(props: AndroidPickerProps) {
  props;
  console.warn(`RNMaterialDatetimePicker is not supported on: ${Platform.OS}`);
  return null;
}
