<a name="readme-top"></a>
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">React Native Material Datetime Picker</h3>

  <p align="center">
    React Native date & time picker component for Android, using Google's latest Material Design components
    <br />
    <a href="https://github.com/thespacemanatee/react-native-material-datetime-picker"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/thespacemanatee/react-native-material-datetime-picker/issues">Report Bug</a>
    ·
    <a href="https://github.com/thespacemanatee/react-native-material-datetime-picker/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screen Shot][product-screenshot]](https://example.com)

This library is a React Native date & time picker component for Android, using Google's latest Material Design components. It only works on Android, as iOS has its own native date & time picker components. For iOS, you can use the [RNDateTimePicker](https://github.com/react-native-datetimepicker/datetimepicker) or [DatePickerIOS (deprecated)](https://reactnative.dev/docs/datepickerios).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- Material Design Components for Android
  1. Make sure that the repositories section includes Google's Maven Repository `google()`
    ```gradle
    allprojects {
      repositories {
        google()
        mavenCentral()
      }
    }
    ```
  2. Add the following to your `android/app/build.gradle` file:
    ```gradle
    dependencies {
      // ...
      implementation 'com.google.android.material:material:<version>'
      // ...
    }
    ```
  3. Update your theme in `styles.xml` to inherit from `Theme.Material3.DayNight.NoActionBar`:
    ```xml
    <resources>
      <!-- Base application theme. -->
      <style name="AppTheme" parent="Theme.Material3.DayNight.NoActionBar">
        <!-- Customize your theme here. -->
      </style>
    </resources>
    ```


### Installation

```sh
yarn add react-native-material-datetime-picker
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Expo Support

This library should work with the EAS development client library, but it has not been tested. For managed projects, a config plugin is probably needed. If you would like to contribute a config plugin, please open an issue.

<!-- USAGE EXAMPLES -->
## Usage (Android)

### Imperative API

```tsx
import { MaterialDatetimePickerAndroid } from 'react-native-material-datetime-picker';

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const showTimePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: time,
      titleText: 'Select flight time',
      mode: AndroidPickerMode.TIME,
      is24Hours: true,
      inputMode: AndroidTimeInputMode.CLOCK,
      onChange: (time) => {
        setTime(time);
      },
    });
  };

  const showTimePicker = () => {
    MaterialDatetimePickerAndroid.show({
      value: date,
      titleText: 'Select booking date',
      mode: AndroidPickerMode.DATE,
      minimumDate: subWeeks(today, 3),
      maximumDate: addWeeks(today, 4),
      inputMode: AndroidDateInputMode.CALENDAR,
      type: AndroidDatePickerType.DEFAULT,
      onChange: (date) => {
        setDate(date);
      },
    });
  };


  return (
    <View>
      <Button onPress={showDatepicker} title="Show date picker" />
      <Button onPress={showTimepicker} title="Show time picker" />
      <Text>Date: {date.toLocaleString()}</Text>
      <Text>Time: {time.toLocaleString()}</Text>
    </View>
  );
};
```

### Declarative API

```tsx
import RNMaterialDatetimePicker from 'react-native-material-datetime-picker';

export const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false)

  return (
    <View>
      {isVisible &&
        <RNMaterialDatetimePicker
          mode={AndroidPickerMode.DATE}
          value={currentDate}
          minimumDate={subWeeks(today, 3)}
          maximumDate={addWeeks(today, 4)}
          onChange={(date) => {
            setCurrentDate(date);
            setIsVisible(false);
          }}
        />
      }
    </View>
  );
};
```

### Props

#### Common Options

| Name                 | Type                       | Default                  | Required | Description                                                            |
| -------------------- | -------------------------- | ------------------------ | -------- | ---------------------------------------------------------------------- |
| `mode`               | `AndroidPickerMode`        | `AndroidPickerMode.DATE` | ❌        | The mode of picker to show                                             |
| `value`              | `Date`                     |                          | ✅        | The current value of the picker                                        |
| `titleText`          | `string`                   |                          | ❌        | The title to be shown on the top left                                  |
| `positiveButtonText` | `string`                   |                          | ❌        | The text used in the positive action button                            |
| `negativeButtonText` | `string`                   |                          | ❌        | The text used in the negative action button                            |
| `onChange`           | `(date: Date) => string`   |                          | ❌        | The callback invoked when a new date or time is selected               |
| `onError`            | `(error: unknown) => void` |                          | ❌        | The callback invoked when an error occured while selecting a new value |

#### Date Picker Options

| Name                | Type                                       | Default | Required | Description                                        |
| ------------------- | ------------------------------------------ | ------- | -------- | -------------------------------------------------- |
| `minimumDate`       | `Date`                                     |         | ❌        | The minimum date allowed to be selected            |
| `maximumDate`       | `Date`                                     |         | ❌        | The maximum date allowed to be selected            |
| `startDate`         | `Date`                                     |         | ❌        | The start date when using a date range picker      |
| `endDate`           | `Date`                                     |         | ❌        | The end date when using a date range picker        |
| `inputMode`         | `AndroidDateInputMode`                     |         | ❌        | The input mode to launch the date picker in        |
| `type`              | `AndroidDatePickerType`                    |         | ❌        | The type of date picker to launch                  |
| `onDateRangeChange` | `(startDate: Date, endDate: Date) => void` |         | ❌        | The callback invoked when a date range is selected |

#### Time Picker Options

| Name        | Type                   | Default | Required | Description                                  |
| ----------- | ---------------------- | ------- | -------- | -------------------------------------------- |
| `is24Hours` | `boolean`              |         | ❌        | The time format to launch the time picker in |
| `inputMode` | `AndroidTimeInputMode` |         | ❌        | The input mode to launch the time picker in  |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Polyfill for iOS and Web
- [ ] Theme support

See the [open issues](https://github.com/thespacemanatee/react-native-material-datetime-picker/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [@react-native-datetimepicker/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker) - inspiration for the declarative API

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/thespacemanatee/react-native-material-datetime-picker.svg?style=for-the-badge
[contributors-url]: https://github.com/thespacemanatee/react-native-material-datetime-picker/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/thespacemanatee/react-native-material-datetime-picker.svg?style=for-the-badge
[forks-url]: https://github.com/thespacemanatee/react-native-material-datetime-picker/network/members
[stars-shield]: https://img.shields.io/github/stars/thespacemanatee/react-native-material-datetime-picker.svg?style=for-the-badge
[stars-url]: https://github.com/thespacemanatee/react-native-material-datetime-picker/stargazers
[issues-shield]: https://img.shields.io/github/issues/thespacemanatee/react-native-material-datetime-picker.svg?style=for-the-badge
[issues-url]: https://github.com/thespacemanatee/react-native-material-datetime-picker/issues
[license-shield]: https://img.shields.io/github/license/thespacemanatee/react-native-material-datetime-picker.svg?style=for-the-badge
[license-url]: https://github.com/thespacemanatee/react-native-material-datetime-picker/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/chee-kit
[product-screenshot]: images/product-screenshot.png
