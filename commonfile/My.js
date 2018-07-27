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

export default class My extends Component{

    render() {
        return (
            <View style={{flex:1}}>
                <CustomNavigation navigation={this.props.navigation}
                                  nav_title='我的'/>
            </View>
        )
    }
}


