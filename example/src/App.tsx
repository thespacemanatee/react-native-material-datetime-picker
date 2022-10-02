import React, { useState } from 'react';
import type { FunctionComponent } from 'react';
import { StyleSheet, View, Button, Text, SafeAreaView } from 'react-native';
import { subWeeks, addWeeks, format, subDays } from 'date-fns';
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

  const handleShowTimePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: currentTime,
      title: 'Select flight time',
      mode: AndroidPickerMode.TIME,
      is24Hours: true,
      inputMode: AndroidTimeInputMode.CLOCK,
      onChange: (date) => {
        setCurrentTime(date);
      },
    });
  };

  const handleShowDatePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: currentDate,
      title: 'Select booking date',
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

  const handleShowDateRangePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: currentDate,
      title: 'Select duration of trip',
      mode: AndroidPickerMode.DATE,
      minDate: subDays(currentDate, 1),
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
    <>
      {isVisible && (
        <RNMaterialDatetimePicker
          mode={AndroidPickerMode.DATE}
          value={currentDate}
          minDate={subWeeks(today, 3)}
          maxDate={addWeeks(today, 4)}
          onChange={(date) => {
            setCurrentDate(date);
            setIsVisible(false);
          }}
        />
      )}
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          {`React Native\nMaterial Datetime Picker`}
        </Text>
        <View>
          <Text style={styles.flight}>SIN ✈ JAP</Text>
          <Text style={styles.detail}>
            <Text style={styles.detailLabel}>Booked on: </Text>
            {format(currentDate, 'PP')}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.detailLabel}>Flight time: </Text>
            {format(currentTime, 'p')}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.detailLabel}>Duration: </Text>
            {format(currentStartDate, 'PP')} ✈ {format(currentEndDate, 'PP')}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Show Time Picker" onPress={handleShowTimePicker} />
          </View>
          <View style={styles.button}>
            <Button title="Show Date Picker" onPress={handleShowDatePicker} />
          </View>
          <View style={styles.button}>
            <Button
              title="Show Date Range Picker"
              onPress={handleShowDateRangePicker}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Show Time Picker Declaratively"
              onPress={() => {
                setIsVisible(true);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 16,
  },
  flight: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 16,
  },
  detail: {
    fontSize: 20,
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 16,
  },
  button: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
