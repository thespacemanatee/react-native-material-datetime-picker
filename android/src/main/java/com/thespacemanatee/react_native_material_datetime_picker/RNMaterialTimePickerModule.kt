package com.thespacemanatee.react_native_material_datetime_picker

import android.content.DialogInterface
import android.content.DialogInterface.OnDismissListener
import android.text.format.DateFormat.is24HourFormat
import android.view.View
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.common.annotations.VisibleForTesting
import com.google.android.material.timepicker.MaterialTimePicker
import com.google.android.material.timepicker.MaterialTimePicker.INPUT_MODE_CLOCK
import com.google.android.material.timepicker.MaterialTimePicker.INPUT_MODE_KEYBOARD
import com.google.android.material.timepicker.TimeFormat
import com.thespacemanatee.react_native_material_datetime_picker.model.MDPArguments
import com.thespacemanatee.react_native_material_datetime_picker.model.MDPDate
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ACTION_DISMISSED
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ACTION_SET_TIME
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ERROR_NO_ACTIVITY
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_ACTION
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_HOUR
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_MINUTE
import com.thespacemanatee.react_native_material_datetime_picker.util.createDialogArguments
import com.thespacemanatee.react_native_material_datetime_picker.util.dismissDialog

class RNMaterialTimePickerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), BaseRNMaterialPicker {
  companion object {
    @VisibleForTesting
    const val TAG = "RNMaterialTimePicker"

    private const val INPUT_KEYBOARD = "keyboard"
  }

  override fun getName() = TAG

  inner class OnPositiveButtonClickListener(
    private val picker: MaterialTimePicker,
    private val promise: Promise
  ) : View.OnClickListener {
    private var isPromiseResolved = false

    override fun onClick(p0: View?) {
      if (!isPromiseResolved && reactApplicationContext.hasActiveReactInstance()) {
        val result = WritableNativeMap().apply {
          putInt(KEY_ACTION, ACTION_SET_TIME)
          putInt(KEY_HOUR, picker.hour)
          putInt(KEY_MINUTE, picker.minute)
        }
        promise.resolve(result)
        isPromiseResolved = true
      }
    }
  }

  inner class OnDismissButtonClickListener(private val promise: Promise) : OnDismissListener {
    private var isPromiseResolved = false

    override fun onDismiss(p0: DialogInterface?) {
      if (!isPromiseResolved && reactApplicationContext.hasActiveReactInstance()) {
        val result = WritableNativeMap().apply {
          putInt(KEY_ACTION, ACTION_DISMISSED)
        }
        promise.resolve(result)
        isPromiseResolved = true
      }
    }
  }

  @ReactMethod
  override fun show(options: ReadableMap?, promise: Promise) {
    val activity = currentActivity as FragmentActivity?
    if (activity == null) {
      promise.reject(ERROR_NO_ACTIVITY, "Current activity not found")
      return
    }
    activity.setTheme(R.style.Theme_Material3_DayNight_NoActionBar)
    val fragmentManager = activity.supportFragmentManager
    val args = options?.createDialogArguments()
    UiThreadUtil.runOnUiThread {
      (fragmentManager.findFragmentByTag(TAG) as MaterialTimePicker?) ?: run {
        createTimePicker(args, promise).show(fragmentManager, TAG)
      }
    }
  }

  @ReactMethod
  override fun dismiss(promise: Promise) {
    dismissDialog(currentActivity as FragmentActivity, TAG, promise)
  }

  private fun createTimePicker(args: MDPArguments?, promise: Promise) = if (args != null) {
    val date = MDPDate(args.value)
    val timeFormat = if (args.is24Hour == true || is24HourFormat(reactApplicationContext)) {
      TimeFormat.CLOCK_24H
    } else {
      TimeFormat.CLOCK_12H
    }
    val inputMode = if (args.inputMode == INPUT_KEYBOARD) INPUT_MODE_KEYBOARD else INPUT_MODE_CLOCK
    MaterialTimePicker.Builder()
      .setTimeFormat(timeFormat)
      .setHour(date.hour)
      .setMinute(date.minute)
      .setTitleText(args.title)
      .setPositiveButtonText(args.positiveButtonText)
      .setNegativeButtonText(args.negativeButtonText)
      .setInputMode(inputMode)
      .build().apply {
        addOnPositiveButtonClickListener(OnPositiveButtonClickListener(this, promise))
        addOnDismissListener(OnDismissButtonClickListener(promise))
      }
  } else {
    MaterialTimePicker()
  }
}
