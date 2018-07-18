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
    FlatList,
    Button,
    PixelRatio,
} from 'react-native';


import FooterRefreshView from '../public/FooterRefreshView';
import LoadingHUD from '../public/LoadingHUD'
import CustomNavigation from '../public/CustomNavigation';


//第一种方式
class BackBtn extends Component {
    render() {
        return (
            <Button title="back" color="#000" onPress={() => {
                this.props.navigation.goBack();
            }}/>
        )
    }
}

//第2种方式
// const BackNavItem = (navigation) => {
//     return (
//         <Button title="back" color="#000" onPress={() => {
//             navigation.goBack();
//         }}/>
//     )
// }


export default class ProductList extends Component {

    static navigationOptions = ({navigation}) => ({
        title: '列表',
        headerBackTitle: 'back',
        // headerLeft: <BackBtn navigation={navigation}/>
    })

    constructor(props) {
        super(props);
        this.state = {
            callback: '',
            proList: [],
            isRefreshing: false,
            isFooterRefreshing: false,
            cid: this.props.navigation.state.params.cid,
            title: this.props.navigation.state.params.name,
            type: this.props.navigation.state.params.type,
        }
    }

    componentWillMount() {
        this._loadProductListData();
    }

    _loadProductListData() {
        this.setState({
            showHUD: true
        })
        fetch('https://xcx.chaoshi.dqccc.net/Revision201703/Activity.asmx/ProductsRec', {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: "appAuth=mw/53y8j1v/DYGfCaiE7RzcuOtyD4vZ2&device_type=3&cid=" + this.state.cid +
            "&type=0" + this.state.type + "&callback=" + this.state.callback,
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                if (this.state.callback == '') {
                    this.state.proList = [];
                }
                var listArr = this.state.proList;
                listArr = listArr.concat(responseJson.prolist);
                this.setState({
                    proList: listArr,
                    callback: responseJson.callback,
                    isRefreshing: false,
                    isFooterRefreshing: false,
                    has_more: responseJson.has_more,
                    showHUD: false,
                    footerRefreshState: responseJson.has_more =='0'?'noMoreData':'refreshing'
                })

            }).catch((error) => {
        })
    }

    //相当于cell
    _renderItem = (item) => {
        let _item = item.item;
        return (
            <TouchableOpacity activeOpacity={1} onPress={this._onPressItem}>
                <View style={styles.cell}>
                    <Image source={{uri: _item.proimg}} style={styles.cellImage}/>
                    <View style={styles.cellRight}>
                        <Text style={styles.cellTitle} numberOfLines={2}>{_item.proname}</Text>
                        <Text style={styles.cellPrice}>￥{_item.lowestsaleprice}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _onPressItem = (item)=>{
        this.props.navigation.navigate('ProDetail',item);
    }

    //分割线
    _separator = () => {
        return (
            <View style={styles.separator}>
                <View style={styles.separator2}/>
            </View>
        )
    }


    //下拉刷新
    _onRefresh = () => {
        this.setState({
            footerRefreshState: true
        })
        this.state.callback = '';
        this.state.proList = [];
        this._loadProductListData();
    }

    //上拉加载
    _onEndReached = () => {
        if (this.state.isFooterRefreshing) {
            return;
        }
        if (this.state.has_more == 0) {
            this.setState({footerRefreshState: 'noMoreData'})
            return;
        }
        this.setState({
            footerRefreshState: 'refreshing',
        })
        this._loadProductListData();
    }

    render() {
        return (
            <View style={styles.contrainer_V}>
                <CustomNavigation navigation={this.props.navigation} nav_title={this.state.title}/>
                <FlatList style={styles.flatList} data={this.state.proList}
                          renderItem={this._renderItem}
                          ItemSeparatorComponent={this._separator}
                          onRefresh={this._onRefresh} refreshing={this.state.isRefreshing}
                          ListFooterComponent = {()=>{
                              return (
                                  <FooterRefreshView refreshState={this.state.footerRefreshState}/>
                              )
                          }} onEndReached={this._onEndReached} onEndReachedThreshold={20}>
                </FlatList>
                <LoadingHUD show={this.state.showHUD}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    change:{
        position:'absolute',
        right:10,

    },
    contrainer_V: {
        flex: 1,
        width: '100%',
    },
    flatList: {
        flex: 1,
    },
    cell: {
        backgroundColor: '#fff',
        height: 120,
        flexDirection: 'row',
        width: '100%'
    },
    separator: {
        height: 1,
        backgroundColor: '#fff',
    },
    separator2: {
        height: 1,
        backgroundColor: '#ddd',
        marginLeft: 10
    },
    cellImage: {
        backgroundColor: '#f4f4f4',
        marginLeft: 10,
        marginTop: 10,
        width: 100,
        height: 100,
    },
    cellRight: {
        flexDirection: 'column',
        flex: 1
    },
    cellTitle: {
        fontSize: 14,
        padding: 10
    },
    cellPrice: {
        position: 'absolute',
        color: 'red',
        fontSize: 16,
        padding: 10,
        left: 5,
        bottom: 0,
    }
})