//  Created by react-native-create-bridge

import { NativeModules } from 'react-native'

const { VideoWatermark } = NativeModules

type Props = {
  onCancel?: any => void,
  onDone?: any => void,
  mask: [],
  landmasq: []
};

export default function VideoEditor(props: Props) {
  const {onCancel = () => {}, onDone = () => {}, mask, landmasq} = props;
  VideoWatermark.Edit(
    {
      onCancel,
      onDone,
      mask,
    },
    onDone,
    onCancel,
  );
}
export {VideoEditor as VideoWatermark};


