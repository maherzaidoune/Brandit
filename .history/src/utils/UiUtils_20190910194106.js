import {Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

const memoize = require('lodash/memoize');

export const getSize = memoize(
  size => {
    const result = (size * width) / 375;
    return result;
  },
  size => size,
);
