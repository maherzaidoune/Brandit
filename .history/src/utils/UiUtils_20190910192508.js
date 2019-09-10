
import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const memoize = require('lodash/memoize');
export const getSize = memoize((size) => 
  {
    const result =
    (size * width) / 414;
    return Platform.isPad ? 0.6 * result : result * 1.2;
}, size => size);