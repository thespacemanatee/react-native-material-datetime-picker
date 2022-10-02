import RNMaterialDatetimePicker from './datetimepicker';
export { MaterialDatetimePickerAndroid } from './utils/MaterialDatetimePickerAndroid';
export {
  AndroidPickerMode,
  AndroidDateInputMode,
  AndroidTimeInputMode,
  AndroidDatePickerType,
} from './types';

export default RNMaterialDatetimePicker;
// import { NativeModules, Platform } from 'react-native';

// const LINKING_ERROR =
//   `The package 'react-native-material-datetime-picker' doesn't seem to be linked. Make sure: \n\n` +
//   Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
//   '- You rebuilt the app after installing the package\n' +
//   '- You are not using Expo managed workflow\n';

// const RNMaterialTimePicker = NativeModules.RNMaterialTimePicker
//   ? NativeModules.RNMaterialTimePicker
//   : new Proxy(
//       {},
//       {
//         get() {
//           throw new Error(LINKING_ERROR);
//         },
//       }
//     );

// export function show(options: {
//   value: Date;
//   minDate: Date;
//   maxDate: Date;
//   is24Hour: boolean;
//   inputMode: 'clock' | 'keyboard';
// }): Promise<void> {
//   return RNMaterialTimePicker.show(options);
// }
