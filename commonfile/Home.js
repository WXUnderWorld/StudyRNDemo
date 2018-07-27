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
    TouchableOpacity,
    Button
} from 'react-native';

import Banners from '../public/SwiperCircle';
import FooterRefreshView from '../public/FooterRefreshView';
import LoadingHUD from '../public/LoadingHUD'


export default class Home extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '首页',
    })


    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            headerRefreshText: '下拉可以刷新',
            isFooterRefreshing: false,
            footerRefreshState: '',
            callback: '',
            has_more: '1',
            imageList: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
                'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'],
            proList: [],
            showHUD: false,

        }
    }

    componentDidMount() {
        this._loadSwiperImagesData();
        this._loadCategoryData();
        this._loadProductListData();
    }


//分类数据
    _loadCategoryData() {
        fetch('https://xcx.chaoshi.dqccc.net/DqcccXCXV/v1/Index.asmx/TopCategory', {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: 'appAuth=mw/53y8j1v/DYGfCaiE7RzcuOtyD4vZ2&device_type=3',
        }).then((response) => response.json())
            .then((responseJson) => {
                const list = [];
                for (var i in responseJson.staticicolist) {
                    var item = responseJson.staticicolist[i];
                    if (i < 8) {
                        list.push(item);
                    }
                }
                this.setState({
                    cateList: list
                })
            }).catch((error) => {
        })
    }

//轮播图数据
    _loadSwiperImagesData() {
        fetch('https://xcx.chaoshi.dqccc.net/Revision201703/Index.asmx/AdDetail', {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: 'appAuth=mw/53y8j1v/DYGfCaiE7RzcuOtyD4vZ2&device_type=3'
        }).then((response) => response.json())
            .then((responseJson) => {
                let array = [];
                for (var i in responseJson.lunbo) {
                    array.push(responseJson.lunbo[i].fileurl)
                }
                this.setState({
                    imageList: array,
                })
            }).catch((error) => {
            console.log(error)
            alert(error)
        })
    }

//列表数据
    _loadProductListData() {
        this.setState({
            showHUD: true
        })
        fetch('https://xcx.chaoshi.dqccc.net/Revision201703/Activity.asmx/ProductsRec', {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: "appAuth=mw/53y8j1v/DYGfCaiE7RzcuOtyD4vZ2&device_type=3&cid=&type=0&callback="
            + this.state.callback,
        }).then((response) => response.json())
            .then((responseJson) => {
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
                    headerRefreshText: '下拉可以刷新'
                })

            }).catch((error) => {
            console.log(error)
            alert(error)
        })
    }


    _createCateListView() {
        const list_v = [];
        for (var i in this.state.cateList) {
            var item = this.state.cateList[i];
            var item_v = (
                <TouchableOpacity activeOpacity={1} style={styles.cate_item_t} key={'a' + i}
                                  onPress={this._onPressCateListItem.bind(this, item)}>
                    <View style={styles.cate_item_v} key={i}>
                        <Image source={{uri: item.ico}} style={styles.cate_img}/>
                        <Text style={styles.cate_text}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )
            list_v.push(item_v);
        }
        return list_v;
    }


    _createProListView() {
        const list_v = [];
        for (var i in this.state.proList) {
            var item = this.state.proList[i];
            var item_v = (
                <TouchableOpacity activeOpacity={1} key={'b' + i}
                                  onPress={this._onPressProListItem.bind(this, item)}>
                    <View style={styles.proItem_v} key={i}>
                        <Image source={{uri: item.proimg}} style={styles.proImage}/>
                        <Text style={styles.proName} numberOfLines={2}>{item.proname}</Text>
                        <Text style={styles.proPrice}>￥{item.marketprice}</Text>
                    </View>
                </TouchableOpacity>
            )
            list_v.push(item_v)
        }
        return list_v;
    }

    _onPressCateListItem(e: Object) {
        if (e.name == '全部分类'){
            this.props.navigation.navigate('Category')
        } else {
            this.props.navigation.navigate('ProList',{cid:e.id,name:e.name,type:e.type})
        }
    }

    _onPressProListItem(e: Object) {
        this.props.navigation.navigate('ProDetail',{pid:e.proid})
    }

    _onRefreshing() {
        this.setState({
            isRefreshing: true,
            headerRefreshText: '正在刷新...'
        });
        this.state.proList = [];
        this.state.callback = '';
        this._loadSwiperImagesData();
        this._loadCategoryData();
        this._loadProductListData();
    }

    _contentViewScroll(e: Object) {

        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            if (this.state.isFooterRefreshing) {
                return;
            }
            if (this.state.has_more == 0) {
                this.setState({footerRefreshState: 'noMoreData'})
                return;
            }
            this.setState({
                isFooterRefreshing: true,
                footerRefreshState: 'refreshing',
            })
            this._loadProductListData();
        }


    }


    render() {
        return (
            <View style={{flex: 1, }}>
                <View style={styles.navigation}>
                    <Text style={styles.nav_title}>首页</Text>
                </View>
                <ScrollView style={styles.container} refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefreshing.bind(this)}
                        tintColor="#000"
                        title={this.state.headerRefreshText}
                        titleColor="#000"
                    />}
                            scrollEventThrottle={2}
                            onScroll={this._contentViewScroll.bind(this)}>
                    <Banners imageList={this.state.imageList}
                             callback={(index) => {
                             }} tapImageAtIndex={(e) => {
                    }}>
                    </Banners>
                    <View style={styles.cate_bgv}>
                        {this._createCateListView()}
                    </View>
                    <View style={styles.hot_header}>
                        <View style={styles.linev}>''</View>
                        <Text style={styles.hot_title}>热卖产品</Text>
                        <Text style={styles.arrow}>></Text>
                    </View>
                    <View style={styles.pro_bgv}>
                        {this._createProListView()}
                    </View>

                    <FooterRefreshView refreshState={this.state.footerRefreshState}/>
                </ScrollView>
                <LoadingHUD show={this.state.showHUD}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    navigation: {
        width: '100%',
        height: 64,
        backgroundColor: '#fff',
        borderBottomWidth:1,
        borderBottomColor:'#e0e0e0',
    },
    nav_title:{
        fontSize:17,
        color:'#000',
        textAlign:'center',
        justifyContent:'center',
        height:44,
        marginTop:20,
        lineHeight:44
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eee',
    },
    cate_bgv: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    cate_item_t: {
        width: '25%',
    },
    cate_item_v: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        alignItems: 'center'
    },
    cate_img: {
        width: 40,
        height: 40,
    },
    cate_text: {
        fontSize: 14,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        color: '#000',
    },
    hot_header: {
        flexDirection: 'row',
        height: 44,
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 10,
        position: 'relative'
    },
    linev: {
        backgroundColor: 'red',
        marginLeft: 10,
        marginTop: 10,
        height: 24,
        width: 3,
    },
    hot_title: {
        height: 44,
        lineHeight: 44,
        paddingLeft: 5,
        fontSize: 15
    },
    arrow: {
        position: 'absolute',
        right: 10,
        lineHeight: 44,
        height: 44
    },
    pro_bgv: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        paddingBottom: 5
    },

    proItem_v: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 5,
        marginLeft: 2,
        marginRight: 2,
        width: 183.5,
        position: 'relative',
        paddingBottom: 30
    },
    proImage: {
        width: 183.5,
        height: 183.5
    },
    proName: {
        padding: 5,
        fontSize: 14,
    },
    proPrice: {
        color: 'red',
        fontSize: 15,
        padding: 5,
        position: 'absolute',
        bottom: 0
    },
    refresh_footer: {
        flexDirection: 'row',
        width: '100%',
        height: 44,
        justifyContent: 'center',
    },
    refresh_footer2: {
        display: 'none'
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 44,
        height: 44,
        marginLeft: 10,
        color: '#666'
    },


});



