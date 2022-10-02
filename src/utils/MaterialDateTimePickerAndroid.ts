import { Platform } from 'react-native';

import type { AndroidPickerMode, AndroidPickerProps } from '../types';

const warn = () => {
  console.warn(
    `MaterialDatetimePickerAndroid is not supported on: ${Platform.OS}`
  );
};

export const MaterialDatetimePickerAndroid: {
  show: (props: AndroidPickerProps) => void;
  dismiss: (mode: AndroidPickerMode) => void;
} = { show: warn, dismiss: warn };
