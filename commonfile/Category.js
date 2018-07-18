import React, {
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    SectionList
} from 'react-native';


import CustomNavigation from '../public/CustomNavigation'
import LoadingHUD from '../public/LoadingHUD'


export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '分类',
            cateList: []
        }
    }

    componentDidMount() {
        this._loadCategoryData();
    }

    _loadCategoryData() {
        this.setState({
            showHUD: true
        })
        let formData = new FormData();
        formData.append("appAuth", "mw/53y8j1v/DYGfCaiE7RzcuOtyD4vZ2");
        formData.append("device_type", "3");
        fetch('https://xcx.chaoshi.dqccc.net/Controls/Category.asmx/ThreeCategory', {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: formData
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('======')
                console.log(responseJson)
                this.setState({
                    showHUD: false,
                    cateList: responseJson.onelist
                })
            }).catch((error) => {
        })
    }


    _renderItem = (item) => {
        let _item = item.item;
        return (
            <TouchableOpacity activeOpacity={1}>
                <Text style={styles.oneText}>
                    {_item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles._screen}>
                <CustomNavigation navigation={this.props.navigation}
                                  nav_title={this.state.title}/>
                <View style={styles.container_v}>
                    <FlatList style={styles.flatList}
                              data={this.state.cateList}
                              renderItem={this._renderItem}
                    />
                </View>
                <LoadingHUD show={this.state.showHUD}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    _screen: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container_v: {
        flex: 1,
        backgroundColor: '#eee'
    },
    flatList: {
        width: '27%',
        flex: 1,
        backgroundColor:'#fff'
    },
    oneText:{
        height:44,
        lineHeight:44,
        textAlign:'center',
        fontSize:15,
        borderBottomWidth:1,
        borderBottomColor:'#444'
    }
})