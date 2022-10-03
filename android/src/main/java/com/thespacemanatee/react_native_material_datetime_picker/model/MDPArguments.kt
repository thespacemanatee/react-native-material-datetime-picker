package com.thespacemanatee.react_native_material_datetime_picker.model


data class MDPArguments(
  var value: Long? = null,
  var title: String? = null,
  var minDate: Long? = null,
  var maxDate: Long? = null,
  var startDate: Long? = null,
  var endDate: Long? = null,
  var is24Hour: Boolean? = null,
  var positiveButtonText: String? = null,
  var negativeButtonText: String? = null,
  var inputMode: String? = null,
  var fullscreen: Boolean? = null,
  var type: String? = null
)
