import React, {
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';



export default class Cart extends Component{
    static navigationOptions = ({navigation}) => ({
        title: '购物车'
    })

    render(){
        return(
            <View/>
        )
    }
}