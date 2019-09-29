//  Created by react-native-create-bridge

import {NativeModules} from 'react-native';

const {ImageEdit} = NativeModules;

type Props = {
  onCancel?: any => void,
  onDone?: any => void,
  path: string,
};

export default function PhotoEditor(props: Props) {
  const {onCancel = () => {}, onDone = () => {}, path} = props;
  ImageEdit.Edit(
    {
      onCancel,
      onDone,
      path,
      Stickers,
    },
    onDone,
    onCancel,
  );
}

export {PhotoEditor as ImageEdit};