import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

const memoize = require('lodash/memoize');

export const getSize = memoize(
  size => {
    const result = (size * width) / 414;
    return res;
  },
  size => size,
);
