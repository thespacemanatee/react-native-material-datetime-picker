import React, { useState } from 'react';
import type { FunctionComponent } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { subWeeks, addWeeks, format } from 'date-fns';
import RNMaterialDatetimePicker, {
  AndroidDateInputMode,
  AndroidPickerMode,
  AndroidTimeInputMode,
  MaterialDatetimePickerAndroid,
  AndroidDatePickerType,
} from 'react-native-material-datetime-picker';

const today = new Date();
const start = subWeeks(today, 1);
const end = addWeeks(today, 2);

const App: FunctionComponent = () => {
  const [currentTime, setCurrentTime] = useState(today);
  const [currentDate, setCurrentDate] = useState(today);
  const [currentStartDate, setCurrentStartDate] = useState(start);
  const [currentEndDate, setCurrentEndDate] = useState(end);
  const [isVisible, setIsVisible] = useState(false);

  const handleLaunchTimePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: currentTime,
      title: 'Select alarm time',
      mode: AndroidPickerMode.TIME,
      is24Hours: true,
      inputMode: AndroidTimeInputMode.CLOCK,
      onChange: (date) => {
        setCurrentTime(date);
      },
    });
  };

  const handleLaunchDatePicker = () => {
    MaterialDatetimePickerAndroid.show({
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
    MaterialDatetimePickerAndroid.show({
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
        <Text style={styles.groupValue}>{format(currentTime, 'pp')}</Text>
        <Button title="Launch Time Picker" onPress={handleLaunchTimePicker} />
      </View>
      <View style={styles.buttonGroup}>
        <Text style={styles.groupValue}>{format(currentDate, 'PPP')}</Text>
        <Button title="Launch Date Picker" onPress={handleLaunchDatePicker} />
      </View>
      <View style={styles.buttonGroup}>
        <Text style={styles.groupValue}>
          {`${format(currentStartDate, 'PPP')} to ${format(
            currentEndDate,
            'PPP'
          )}`}
        </Text>
        <Button
          title="Launch Date Range Picker"
          onPress={handleLaunchDateRangePicker}
        />
      </View>
      <Button
        title="Launch Time Picker Declaratively"
        onPress={() => {
          setIsVisible(true);
        }}
      />
      {isVisible && (
        <RNMaterialDatetimePicker
          value={currentTime}
          onChange={(time) => {
            setCurrentTime(time);
            setIsVisible(false);
          }}
          mode={AndroidPickerMode.DATE}
          // is24Hours={false}
        />
      )}
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
    marginBottom: 16,
  },
  groupValue: {
    marginBottom: 8,
  },
});
