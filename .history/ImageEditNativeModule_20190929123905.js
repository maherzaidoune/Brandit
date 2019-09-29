//  Created by react-native-create-bridge

import {NativeModules} from 'react-native';

const {ImageEdit} = NativeModules;

type Props = {
  onCancel?: any => void,
  onDone?: any => void,
  path: string,
};

ImageEdit =(props: Props) {
  const {onCancel = () => {}, onDone = () => {}, path} = props;
  return ImageEdit.Edit(
    {
      onCancel,
      onDone,
      path,
    },
    onDone,
    onCancel,
  );
}

export { ImageEdit as ImageEdit }
