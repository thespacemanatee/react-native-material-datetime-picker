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
    value: Date;
    titleText?: string;
    positiveButtonText?: string;
    negativeButtonText?: string;
    onConfirm?: (date: Date) => void;
    onError?: (error: unknown) => void;
  }
>;

export interface DatePickerOptions extends BaseProps {
  mode?: AndroidPickerMode.DATE;
  minimumDate?: Date;
  maximumDate?: Date;
  startDate?: Date;
  endDate?: Date;
  is24Hours?: never;
  inputMode?: AndroidDateInputMode;
  type?: AndroidDatePickerType;
  onConfirmDateRange?: (startDate: Date, endDate: Date) => void;
}

export interface TimePickerOptions extends BaseProps {
  mode?: AndroidPickerMode.TIME;
  minimumDate?: never;
  maximumDate?: never;
  startDate?: never;
  endDate?: never;
  is24Hour?: boolean;
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
