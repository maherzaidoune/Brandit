//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { VideoWatermark } = NativeModules

export default {
  exampleMethod () {
    return VideoWatermark.exampleMethod()
  },

  EXAMPLE_CONSTANT: VideoWatermark.EXAMPLE_CONSTANT
}

