//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { ImageEdit } = NativeModules


type Props = {
  onCancel?: any => void,
  onDone?: any => void,
  path: string,
}


export default {
  ImageEdit (props: Props) {
    const {
      onCancel = () => {},
      onDone = () => {},
      path,
  } = props
    return ImageEdit.Edit(
      {
          colors,
          hiddenControls,
          onCancel,
          onDone,
          path,
          stickers
      },
      onDone,
      onCancel
  )
  },

  EXAMPLE_CONSTANT: ImageEdit.EXAMPLE_CONSTANT
}
