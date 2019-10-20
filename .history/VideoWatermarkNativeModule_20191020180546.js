//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { VideoWatermark } = NativeModules

type Props = {
  onCancel?: any => void,
  onDone?: any => void,
  path: string,
  mask: []
};

export default function PhotoEditor(props: Props) {
  const {onCancel = () => {}, onDone = () => {}, path, mask} = props;
  VideoWatermark.Edit(
    {
      onCancel,
      onDone,
      path,
      mask,
    },
    onDone,
    onCancel,
  );
}


