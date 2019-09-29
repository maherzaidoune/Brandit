//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const ImageEdit = requireNativeComponent('ImageEdit', ImageEditView)

export default class ImageEditView extends Component {
  render () {
    return <ImageEdit {...this.props} />
  }
}

ImageEditView.propTypes = {
  exampleProp: React.PropTypes.any
}
