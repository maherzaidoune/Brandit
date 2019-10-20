//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { VideoWatermark } = NativeModules

type Props = {
  onCancel?: any => void,
  onDone?: any => void,
  path: string,
  Stickers: [],
  mask: []
};

export default function PhotoEditor(props: Props) {
  const {onCancel = () => {}, onDone = () => {}, path, Stickers, mask} = props;
  ImageEdit.Edit(
    {
      onCancel,
      onDone,
      path,
      Stickers,
      mask,
    },
    onDone,
    onCancel,
  );
}


