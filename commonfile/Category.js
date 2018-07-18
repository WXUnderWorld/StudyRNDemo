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


export default class Category extends Component{
    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle:'分类',
        tabBarOnPress: (scene,jumpToIndex) => {
            console.log(scene);
            jumpToIndex(scene.index)
        },
    });


    render(){
        return(
            <View/>
        )
    }
}