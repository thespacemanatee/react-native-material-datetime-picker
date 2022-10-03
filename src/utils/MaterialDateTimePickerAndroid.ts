import { Platform } from 'react-native';

import type { AndroidPickerMode, AndroidPickerProps } from '../types';

const warn = () => {
  throw new Error(
    `MaterialDatetimePickerAndroid is not supported on: ${Platform.OS}`
  );
};

export const MaterialDatetimePickerAndroid: {
  show: (props: AndroidPickerProps) => void;
  dismiss: (mode?: AndroidPickerMode) => Promise<boolean>;
} = { show: warn, dismiss: warn };
