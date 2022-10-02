package com.thespacemanatee.react_native_material_datetime_picker.model

import java.util.Calendar

class MDPDate(args: MDPArguments? = null) {
  private val calendar by lazy { Calendar.getInstance() }
  var timeInMillis: Long
    get() = calendar.timeInMillis
    set(value) {
      calendar.timeInMillis = value
    }
  val year: Int
    get() = calendar.get(Calendar.YEAR)
  val month: Int
    get() = calendar.get(Calendar.MONTH)
  val day: Int
    get() = calendar.get(Calendar.DAY_OF_MONTH)
  val hour: Int
    get() = calendar.get(Calendar.HOUR_OF_DAY)
  val minute: Int
    get() = calendar.get(Calendar.MINUTE)

  init {
    args?.value?.let { calendar.timeInMillis = it }
  }
}
