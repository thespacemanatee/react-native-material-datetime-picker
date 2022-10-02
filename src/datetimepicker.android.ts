import { useEffect } from 'react';

import { AndroidPickerMode, AndroidPickerProps } from './types';
import { MaterialDatetimePickerAndroid } from './utils/MaterialDatetimePickerAndroid';

const RNMaterialDatetimePicker = (props: AndroidPickerProps) => {
  const { mode = AndroidPickerMode.DATE, onChange } = props;

  useEffect(() => {
    return () => {
      MaterialDatetimePickerAndroid.dismiss(mode);
    };
  }, [mode]);

  useEffect(() => {
    MaterialDatetimePickerAndroid.show(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, mode]);

  return null;
};

export default RNMaterialDatetimePicker;
