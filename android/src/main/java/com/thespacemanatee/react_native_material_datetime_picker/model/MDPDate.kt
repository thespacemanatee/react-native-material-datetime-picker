package com.thespacemanatee.react_native_material_datetime_picker.model

import java.util.Calendar

class MDPDate(timeInMillis: Long? = null) {
  private val calendar by lazy { Calendar.getInstance() }
  var timeInMillis: Long
    get() = calendar.timeInMillis
    set(value) {
      calendar.timeInMillis = value
    }
  var year: Int
    get() = calendar.get(Calendar.YEAR)
    set(value) {
      calendar.set(Calendar.YEAR, value)
    }
  var month: Int
    get() = calendar.get(Calendar.MONTH)
    set(value) {
      calendar.set(Calendar.MONTH, value)
    }
  var day: Int
    get() = calendar.get(Calendar.DAY_OF_MONTH)
    set(value) {
      calendar.set(Calendar.DAY_OF_MONTH, value)
    }
  var hour: Int
    get() = calendar.get(Calendar.HOUR_OF_DAY)
    set(value) {
      calendar.set(Calendar.HOUR_OF_DAY, value)
    }
  var minute: Int
    get() = calendar.get(Calendar.MINUTE)
    set(value) {
      calendar.set(Calendar.MINUTE, value)
    }
  var second: Int
    get() = calendar.get(Calendar.SECOND)
    set(value) {
      calendar.set(Calendar.SECOND, value)
    }
  var millisecond: Int
    get() = calendar.get(Calendar.MILLISECOND)
    set(value) {
      calendar.set(Calendar.MILLISECOND, value)
    }

  init {
    timeInMillis?.let { calendar.timeInMillis = it }
  }
}
