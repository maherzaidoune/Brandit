//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { ImageEdit } = NativeModules

export default {
  Edit () {
    return ImageEdit.exampleMethod()
  },

  EXAMPLE_CONSTANT: ImageEdit.EXAMPLE_CONSTANT
}