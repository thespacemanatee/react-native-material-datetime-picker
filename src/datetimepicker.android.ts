import { useEffect } from 'react';

import { AndroidPickerMode, AndroidPickerProps } from './types';
import { MaterialDateTimePickerAndroid } from './utils/MaterialDateTimePickerAndroid';

const RNDateTimePickerAndroid = (props: AndroidPickerProps) => {
  const { mode = AndroidPickerMode.DATE, onChange } = props;

  useEffect(() => {
    return () => {
      MaterialDateTimePickerAndroid.dismiss(mode);
    };
  }, []);

  useEffect(() => {
    MaterialDateTimePickerAndroid.show(props);
  }, [onChange, mode]);

  return null;
};

export default RNDateTimePickerAndroid;
