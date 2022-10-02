import React, { useState } from 'react';
import type { FunctionComponent } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { subWeeks, addWeeks } from 'date-fns';
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  AndroidTimeInputMode,
  MaterialDateTimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';

const today = new Date();
const start = subWeeks(today, 1);
const end = addWeeks(today, 2);

const App: FunctionComponent = () => {
  const [time, setTime] = useState(today);
  const [currentDate, setCurrentDate] = useState(today);
  const [currentStartDate, setCurrentStartDate] = useState(start);
  const [currentEndDate, setCurrentEndDate] = useState(end);

  const handleLaunchTimePicker = () => {
    MaterialDateTimePickerAndroid.show({
      value: time,
      title: 'Select alarm time',
      mode: AndroidPickerMode.TIME,
      is24Hours: true,
      inputMode: AndroidTimeInputMode.CLOCK,
      onChange: (date) => {
        setTime(date);
      },
    });
  };

  const handleLaunchDatePicker = () => {
    MaterialDateTimePickerAndroid.show({
      value: currentDate,
      title: 'Select date of birth',
      mode: AndroidPickerMode.DATE,
      minDate: subWeeks(today, 3),
      maxDate: addWeeks(today, 4),
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.DEFAULT,
      onChange: (date) => {
        setCurrentDate(date);
      },
    });
  };

  const handleLaunchDateRangePicker = () => {
    MaterialDateTimePickerAndroid.show({
      value: currentDate,
      title: 'Select length of stay',
      mode: AndroidPickerMode.DATE,
      minDate: subWeeks(today, 3),
      maxDate: addWeeks(today, 4),
      startDate: currentStartDate,
      endDate: currentEndDate,
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.RANGE,
      onDateRangeChange: (startDate, endDate) => {
        setCurrentStartDate(startDate);
        setCurrentEndDate(endDate);
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Text style={styles.groupValue}>{time.toLocaleTimeString()}</Text>
        <Button title="Launch Time Picker" onPress={handleLaunchTimePicker} />
      </View>
      <View style={styles.buttonGroup}>
        <Text style={styles.groupValue}>
          {currentDate.toLocaleDateString()}
        </Text>
        <Button title="Launch Date Picker" onPress={handleLaunchDatePicker} />
      </View>
      <View style={styles.buttonGroup}>
        <Text style={styles.groupValue}>
          {`${currentStartDate.toLocaleDateString()} to ${currentEndDate.toLocaleDateString()}`}
        </Text>
        <Button
          title="Launch Date Range Picker"
          onPress={handleLaunchDateRangePicker}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGroup: {
    alignItems: 'center',
  },
  groupValue: {
    marginVertical: 8,
  },
});
