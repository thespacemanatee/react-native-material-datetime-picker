import { Platform } from 'react-native';

import type { AndroidPickerMode, AndroidPickerProps } from '../types';

const warn = () => {
  console.warn(
    `MaterialDateTimePickerAndroid is not supported on: ${Platform.OS}`
  );
};

export const MaterialDateTimePickerAndroid: {
  show: (props: AndroidPickerProps) => void;
  dismiss: (mode: AndroidPickerMode) => void;
} = { show: warn, dismiss: warn };
