package com.thespacemanatee.react_native_material_datetime_picker.util

import androidx.fragment.app.DialogFragment
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.google.android.material.datepicker.CalendarConstraints
import com.google.android.material.datepicker.CompositeDateValidator
import com.google.android.material.datepicker.DateValidatorPointBackward
import com.google.android.material.datepicker.DateValidatorPointForward
import com.thespacemanatee.react_native_material_datetime_picker.model.MDPArguments
import com.thespacemanatee.react_native_material_datetime_picker.model.MDPDate
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_INPUT_MODE
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_IS_24_HOUR
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_MAX_DATE
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_MIN_DATE
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_VALUE
import com.thespacemanatee.react_native_material_datetime_picker.util.MDPConstants.KEY_TITLE

fun ReadableMap.createDialogArguments() = MDPArguments().apply {
  if (hasKey(KEY_VALUE) && !isNull(KEY_VALUE)) {
    value = getDouble(KEY_VALUE).toLong()
  }
  if (hasKey(KEY_TITLE) && !isNull(KEY_TITLE)) {
    title = getString(KEY_TITLE)
  }
  if (hasKey(KEY_MIN_DATE) && !isNull(KEY_MIN_DATE)) {
    minDate = getDouble(KEY_MIN_DATE).toLong()
  }
  if (hasKey(KEY_MAX_DATE) && !isNull(KEY_MAX_DATE)) {
    maxDate = getDouble(KEY_MAX_DATE).toLong()
  }
  if (hasKey(KEY_IS_24_HOUR) && !isNull(KEY_IS_24_HOUR)) {
    is24Hour = getBoolean(KEY_IS_24_HOUR)
  }
  if (hasKey(KEY_INPUT_MODE) && !isNull(KEY_INPUT_MODE)) {
    inputMode = getString(KEY_INPUT_MODE)
  }
}

fun MDPArguments.createCalendarConstraints(): CalendarConstraints {
  val date = MDPDate(this)
  val listValidators = mutableListOf<CalendarConstraints.DateValidator>()
  val builder = CalendarConstraints.Builder().apply {
    setOpenAt(date.timeInMillis)
    minDate?.let {
      date.timeInMillis = it
      listValidators.add(DateValidatorPointForward.from(date.timeInMillis))
    }
    maxDate?.let {
      date.timeInMillis = it
      listValidators.add(DateValidatorPointBackward.before(date.timeInMillis))
    }
    setValidator(CompositeDateValidator.allOf(listValidators))
  }
  return builder.build()
}

fun dismissDialog(activity: FragmentActivity?, tag: String, promise: Promise) {
  if (activity == null) {
    promise.reject(
      MDPConstants.ERROR_NO_ACTIVITY,
      "Tried to dismiss dialog while not attached to an Activity"
    )
    return
  }
  (activity.supportFragmentManager.findFragmentByTag(tag) as DialogFragment?)?.let {
    it.dismiss()
    promise.resolve(true)
  } ?: run { promise.resolve(false) }
}
