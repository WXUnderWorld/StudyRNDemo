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



import CustomNavigation from '../public/CustomNavigation'


export default class Cart extends Component{
    static navigationOptions = ({navigation}) => ({
        title: '购物车'
    })

    render(){
        return(
            <View>
                <View style={{flex:1}}>
                    <CustomNavigation navigation={this.props.navigation}
                                      nav_title='购物车'/>
                </View>
            </View>
        )
    }
}