import type { ViewProps } from 'react-native';

export enum AndroidPickerMode {
  DATE = 'date',
  TIME = 'time',
}

export enum AndroidTimeInputMode {
  DEFAULT = 'default',
  KEYBOARD = 'keyboard',
  CLOCK = 'clock',
}

export enum AndroidDateInputMode {
  DEFAULT = 'default',
  TEXT = 'text',
  CALENDAR = 'calendar',
}

export enum AndroidDatePickerType {
  DEFAULT = 'default',
  RANGE = 'range',
}

export enum ActionType {
  SET_DATE,
  SET_DATE_RANGE,
  SET_TIME,
  DISMISSED,
}

type BaseProps = Readonly<
  ViewProps & {
    /**
     * The current value of the picker
     */
    value: Date;
    /**
     * The title to be shown on the top left
     */
    titleText?: string;
    /**
     * The text used in the positive action button
     */
    positiveButtonText?: string;
    /**
     * The text used in the negative action button
     */
    negativeButtonText?: string;
    /**
     * The callback invoked when a new date or time is selected
     */
    onConfirm?: (date: Date) => void;
    /**
     * The callback invoked when an error occured while selecting a new value
     */
    onError?: (error: unknown) => void;
  }
>;

export interface DatePickerOptions extends BaseProps {
  /**
   * The mode of picker to show. Can be either `AndroidPickerMode.DATE` or `AndroidPickerMode.TIME`.
   */
  mode?: AndroidPickerMode.DATE;
  /**
   * The minimum date allowed to be selected
   */
  minimumDate?: Date;
  /**
   * The maximum date allowed to be selected
   */
  maximumDate?: Date;
  /**
   * The start date when using a date range picker
   */
  startDate?: Date;
  /**
   * The end date when using a date range picker
   */
  endDate?: Date;
  is24Hours?: never;
  /**
   * The input mode to launch the date picker in
   */
  inputMode?: AndroidDateInputMode;
  /**
   * Whether to show the date picker in fullscreen mode
   */
  fullscreen?: boolean;
  /**
   * The type of date picker to launch. Can be either `AndroidDatePickerType.DEFAULT`
   * for the regular date picker or `AndroidDatePickerType.RANGE` for the date range picker
   */
  type?: AndroidDatePickerType;
  /**
   * The callback invoked when a date range is selected
   */
  onConfirmDateRange?: (startDate: Date, endDate: Date) => void;
}

export interface TimePickerOptions extends BaseProps {
  /**
   * The mode of picker to show. Can be either `AndroidPickerMode.DATE` or `AndroidPickerMode.TIME`.
   */
  mode?: AndroidPickerMode.TIME;
  minimumDate?: never;
  maximumDate?: never;
  startDate?: never;
  endDate?: never;
  /**
   * The time format to launch the time picker in
   */
  is24Hour?: boolean;
  /**
   * The input mode to launch the time picker in
   */
  inputMode?: AndroidTimeInputMode;
  type?: never;
  onConfirmDateRange?: never;
}

export type AndroidPickerProps = DatePickerOptions | TimePickerOptions;

export type DateTimePickerResult = Readonly<{
  action: ActionType;
  year: number;
  month: number;
  day: number;
  startYear: number;
  startMonth: number;
  startDay: number;
  endYear: number;
  endMonth: number;
  endDay: number;
  hour: number;
  minute: number;
}>;
