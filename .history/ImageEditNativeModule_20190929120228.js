//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { ImageEdit } = NativeModules


type Props = {
  colors?: Array<string>,
  hiddenControls?: Array<string>,
  onCancel?: any => void,
  onDone?: any => void,
  path: string,
  stickers?: Array<string>
}


export default {
  ImageEdit (props: Props) {
    const {
      hiddenControls = [],
      onCancel = () => {},
      onDone = () => {},
      path,
      stickers = []
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
