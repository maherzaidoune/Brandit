import React from 'react'
import { View, Text } from 'react-native'
import { getSize } from '../utils/UiUtils'

const authInput = (props) => {
    return (
        <View
            style={{
                borderRadius: 5,
                borderWidth : 0.8,
                borderColor: '#fff',
                height: getSize(44),
                flexDirection: 'row'
            }}
        >
            <View
                style={{
                    width: getSize(44)
                }}
            >
                    
            </View>
        </View>
    )
}

export default authInput
