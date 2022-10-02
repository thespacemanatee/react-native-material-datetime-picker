package com.thespacemanatee.react_native_material_datetime_picker

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap

interface BaseRNMaterialPicker {
  fun show(options: ReadableMap?, promise: Promise)
  fun dismiss(promise: Promise)
}
