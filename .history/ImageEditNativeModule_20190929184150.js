//  Created by react-native-create-bridge

import {NativeModules} from 'react-native';

const {ImageEdit} = NativeModules;

type Props = {
  onCancel?: any => void,
  onDone?: any => void,
  path: string,
  Stickers: ["http://admin.brandit.tn/uploade/logo2019_07_30_14_41_52.png"]
};

export default function PhotoEditor(props: Props) {
  const {onCancel = () => {}, onDone = () => {}, path, Stickers} = props;
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
