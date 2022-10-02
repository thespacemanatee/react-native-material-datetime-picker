import React, { useState } from 'react';
import type { FunctionComponent } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { subWeeks, addWeeks } from 'date-fns';
import {
  AndroidDateInputMode,
  AndroidPickerMode,
  AndroidTimeInputMode,
  MaterialDateTimePickerAndroid,
} from 'react-native-material-datetime-picker';

const App: FunctionComponent = () => {
  const [time, setTime] = useState(new Date());

  const handleLaunchTimePicker = () => {
    MaterialDateTimePickerAndroid.show({
      value: time,
      title: 'hell naw',
      mode: AndroidPickerMode.TIME,
      is24Hours: true,
      inputMode: AndroidTimeInputMode.CLOCK,
      onChange: (date) => {
        setTime(date);
      },
    });
  };

  const handleLaunchDatePicker = () => {
    const today = new Date();
    MaterialDateTimePickerAndroid.show({
      value: today,
      title: 'hell naw',
      mode: AndroidPickerMode.DATE,
      minDate: subWeeks(today, 1),
      maxDate: addWeeks(today, 2),
      inputMode: AndroidDateInputMode.CALENDAR,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Launch Time Picker" onPress={handleLaunchTimePicker} />
        <Text>{time.toISOString()}</Text>
      </View>
      <View style={styles.button}>
        <Button title="Launch Date Picker" onPress={handleLaunchDatePicker} />
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
  button: {
    marginVertical: 16,
  },
});
