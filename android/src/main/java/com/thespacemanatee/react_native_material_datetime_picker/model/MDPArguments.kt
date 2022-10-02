package com.thespacemanatee.react_native_material_datetime_picker.model


data class MDPArguments(
  var value: Long? = null,
  var minDate: Long? = null,
  var maxDate: Long? = null,
  var title: String? = null,
  var is24Hour: Boolean? = null,
  var inputMode: String? = null
)
