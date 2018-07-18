import React, {
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    RefreshControl,
    TouchableOpacity,
    Button,
    FlatList
} from 'react-native';

import CustomNavigation from '../public/CustomNavigation'



export default class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'详情'
        }

    }


    render() {
        return (
            <View style={styles.contrainer_V}>
                <CustomNavigation navigation={this.props.navigation} nav_title={this.state.title}/>
            </View>
        )
    }
}



const  styles = StyleSheet.create({
    contrainer_V:{
        flex:1
    }
})