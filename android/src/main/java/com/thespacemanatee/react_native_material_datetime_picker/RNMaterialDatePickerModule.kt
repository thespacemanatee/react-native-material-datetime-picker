package com.thespacemanatee.react_native_material_datetime_picker

import android.content.DialogInterface
import android.content.DialogInterface.OnDismissListener
import androidx.core.util.Pair
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
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ACTION_SET_DATE
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ACTION_SET_DATE_RANGE
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.ERROR_NO_ACTIVITY
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_ACTION
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_DAY
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_END_DAY
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_END_MONTH
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_END_YEAR
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_MONTH
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_START_DAY
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_START_MONTH
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_START_YEAR
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_YEAR
import com.thespacemanatee.react_native_material_datetime_picker.util.createCalendarConstraints
import com.thespacemanatee.react_native_material_datetime_picker.util.createDialogArguments
import com.thespacemanatee.react_native_material_datetime_picker.util.dismissDialog
import com.thespacemanatee.react_native_material_datetime_picker.util.fixDate

class RNMaterialDatePickerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext), BaseRNMaterialPicker {
  companion object {
    @VisibleForTesting
    const val TAG = "RNMaterialDatePicker"

    private const val TYPE_RANGE = "range"
    private const val INPUT_TEXT = "text"
  }

  override fun getName() = TAG

  inner class OnPositiveDateButtonClickListener(private val promise: Promise) :
    MaterialPickerOnPositiveButtonClickListener<Long> {
    private var isPromiseResolved = false

    override fun onPositiveButtonClick(selection: Long) {
      if (!isPromiseResolved && reactApplicationContext.hasActiveReactInstance()) {
        val date = MDPDate().apply { timeInMillis = selection }
        val result = WritableNativeMap().apply {
          putInt(KEY_ACTION, ACTION_SET_DATE)
          putInt(KEY_YEAR, date.year)
          putInt(KEY_MONTH, date.month)
          putInt(KEY_DAY, date.day)
        }
        promise.resolve(result)
        isPromiseResolved = true
      }
    }
  }

  inner class OnPositiveDateRangeButtonClickListener(private val promise: Promise) :
    MaterialPickerOnPositiveButtonClickListener<Pair<Long, Long>> {
    private var isPromiseResolved = false

    override fun onPositiveButtonClick(selection: Pair<Long, Long>?) {
      if (!isPromiseResolved && reactApplicationContext.hasActiveReactInstance()) {
        selection?.let {
          val date = MDPDate().apply { timeInMillis = it.first }
          val result = WritableNativeMap().apply {
            putInt(KEY_ACTION, ACTION_SET_DATE_RANGE)
            putInt(KEY_START_YEAR, date.year)
            putInt(KEY_START_MONTH, date.month)
            putInt(KEY_START_DAY, date.day)
            date.timeInMillis = it.second
            putInt(KEY_END_YEAR, date.year)
            putInt(KEY_END_MONTH, date.month)
            putInt(KEY_END_DAY, date.day)
          }
          promise.resolve(result)
          isPromiseResolved = true
        }
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
      (fragmentManager.findFragmentByTag(TAG) as MaterialDatePicker<*>?) ?: run {
        createDatePicker(args, promise).show(fragmentManager, TAG)
      }
    }
  }

  @ReactMethod
  override fun dismiss(promise: Promise) {
    dismissDialog(currentActivity as FragmentActivity, TAG, promise)
  }

  private fun createDatePicker(args: MDPArguments?, promise: Promise) = if (args != null) {
    val inputMode = if (args.inputMode == INPUT_TEXT) INPUT_MODE_TEXT else INPUT_MODE_CALENDAR
    if (args.type == TYPE_RANGE) {
      val startDate = MDPDate(args.startDate).fixDate()
      val endDate = MDPDate(args.endDate).fixDate()
      MaterialDatePicker.Builder.dateRangePicker()
        .setSelection(Pair(startDate.timeInMillis, endDate.timeInMillis))
        .setCalendarConstraints(args.createCalendarConstraints())
        .setTitleText(args.title)
        .setPositiveButtonText(args.positiveButtonText)
        .setNegativeButtonText(args.negativeButtonText)
        .setInputMode(inputMode)
        .build()
        .apply {
          addOnPositiveButtonClickListener(OnPositiveDateRangeButtonClickListener(promise))
          addOnDismissListener(OnDismissButtonClickListener(promise))
        }
    } else {
      val date = MDPDate(args.value).fixDate()
      val theme = if (args.fullscreen == true) R.style.ThemeOverlay_Material3_MaterialCalendar_Fullscreen else R.style.ThemeOverlay_Material3_MaterialCalendar
      MaterialDatePicker.Builder.datePicker()
        .setSelection(date.timeInMillis)
        .setCalendarConstraints(args.createCalendarConstraints())
        .setTitleText(args.title)
        .setPositiveButtonText(args.positiveButtonText)
        .setNegativeButtonText(args.negativeButtonText)
        .setInputMode(inputMode)
        .setTheme(theme)
        .build()
        .apply {
          addOnPositiveButtonClickListener(OnPositiveDateButtonClickListener(promise))
          addOnDismissListener(OnDismissButtonClickListener(promise))
        }
    }
  } else {
    MaterialDatePicker.Builder.datePicker().build()
  }
}
