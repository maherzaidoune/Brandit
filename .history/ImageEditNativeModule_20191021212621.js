//  Created by react-native-create-bridge

import {NativeModules} from 'react-native';

const {ImageEdit} = NativeModules;

type Props = {
  onCancel?: any => void,
  onDone?: any => void,
  path: string,
  Stickers: [],
  mask: [],
  landmasq: []
};

export default function PhotoEditor(props: Props) {
  const {onCancel = () => {}, onDone = () => {}, path, Stickers, mask, landmasq} = props;
  ImageEdit.Edit(
    {
      onCancel,
      onDone,
      path,
      Stickers,
      mask,
      landmasq
    },
    onDone,
    onCancel,
  );
}

export {PhotoEditor as ImageEdit};
