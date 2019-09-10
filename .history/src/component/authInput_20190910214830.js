import React from 'react'
import { View, Text } from 'react-native'
import { getSize } from '../utils/UiUtils'
import Icon from 'react-native-vector-icons/FontAwesome';


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
                    width: getSize(44),
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Icon 
                    name={'user-o'}
                    size={getSize(32)}
                    color="#fff"
                />
                <Edi
            </View>
        </View>
    )
}

export default authInput