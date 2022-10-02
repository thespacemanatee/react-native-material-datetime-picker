import { Platform } from 'react-native';

import type { AndroidPickerProps } from './types';

export default function RNMaterialDateTimePicker(_props: AndroidPickerProps) {
  console.warn(`RNMaterialDateTimePicker is not supported on: ${Platform.OS}`);
  return null;
}
