package com.thespacemanatee.react_native_material_datetime_picker

import android.content.DialogInterface
import android.content.DialogInterface.OnDismissListener
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.common.annotations.VisibleForTesting
import com.google.android.material.datepicker.MaterialDatePicker
import com.google.android.material.datepicker.MaterialDatePicker.INPUT_MODE_CALENDAR
import com.google.android.material.datepicker.MaterialDatePicker.INPUT_MODE_TEXT
import com.google.android.material.datepicker.MaterialPickerOnPositiveButtonClickListener
import com.thespacemanatee.react_native_material_datetime_picker.model.MDPArguments
import com.thespacemanatee.react_native_material_datetime_picker.model.MDPDate
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ACTION_DISMISSED
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ACTION_SET_TIME
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ERROR_NO_ACTIVITY
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_ACTION
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_DAY
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_MONTH
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_YEAR
import com.thespacemanatee.react_native_material_datetime_picker.util.createCalendarConstraints
import com.thespacemanatee.react_native_material_datetime_picker.util.createDialogArguments
import com.thespacemanatee.react_native_material_datetime_picker.util.dismissDialog

class RNMaterialDatePickerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), BaseRNMaterialPicker {
  companion object {
    @VisibleForTesting
    const val TAG = "RNMaterialDatePicker"
  }

  override fun getName() = TAG

  inner class OnPositiveButtonClickListener(private val promise: Promise) :
    MaterialPickerOnPositiveButtonClickListener<Long> {
    private var isPromiseResolved = false

    override fun onPositiveButtonClick(selection: Long) {
      if (!isPromiseResolved && reactApplicationContext.hasActiveReactInstance()) {
        val date = MDPDate().apply { timeInMillis = selection }
        val result = WritableNativeMap().apply {
          putInt(KEY_ACTION, ACTION_SET_TIME)
          putInt(KEY_YEAR, date.year)
          putInt(KEY_MONTH, date.month)
          putInt(KEY_DAY, date.day)
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
    val fragmentManager = activity.supportFragmentManager
    val args = options?.createDialogArguments()
    UiThreadUtil.runOnUiThread {
      createDatePicker(args).run {
        addOnPositiveButtonClickListener(OnPositiveButtonClickListener(promise))
        addOnDismissListener(OnDismissButtonClickListener(promise))
        show(fragmentManager, TAG)
      }
    }
  }

  @ReactMethod
  override fun dismiss(promise: Promise) {
    dismissDialog(currentActivity as FragmentActivity, TAG, promise)
  }

  private fun createDatePicker(args: MDPArguments?) = if (args != null) {
    val date = MDPDate(args)
    val inputMode = if (args.inputMode == "text") INPUT_MODE_TEXT else INPUT_MODE_CALENDAR
    MaterialDatePicker.Builder.datePicker()
      .setSelection(date.timeInMillis)
      .setCalendarConstraints(args.createCalendarConstraints())
      .setTitleText(args.title)
      .setInputMode(inputMode)
      .build()
  } else {
    MaterialDatePicker.Builder.datePicker().build()
  }
}
