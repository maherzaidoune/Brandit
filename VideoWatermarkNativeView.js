//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const VideoWatermark = requireNativeComponent('VideoWatermark', VideoWatermarkView)

export default class VideoWatermarkView extends Component {
  render () {
    return <VideoWatermark {...this.props} />
  }
}

VideoWatermarkView.propTypes = {
  exampleProp: React.PropTypes.any
}
