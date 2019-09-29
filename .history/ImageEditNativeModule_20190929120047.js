//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { ImageEdit } = NativeModules

export default {
  ImageEdit (props: Props) {
    return ImageEdit.exampleMethod()
  },

  EXAMPLE_CONSTANT: ImageEdit.EXAMPLE_CONSTANT
}
