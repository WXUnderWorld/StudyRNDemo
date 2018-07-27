import React, {
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Animated,
    LayoutAnimation
} from 'react-native';

import CustomNavigation from '../public/CustomNavigation'
import MaskView from "./MaskView";
import PresentView from "./PresentView";


const screenWidth = Dimensions.get('window').width;
var _scroll: ScrollView;
var _mainScroll: ScrollView;


export default class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '详情',
            pid: this.props.navigation.state.params.pid,
            detailData: {},
            loopImages: [],
            currentPage: 0,
            imgSize: screenWidth,
            show: false,
        }

    }


    componentWillMount() {
        this.loadDetailData();

    }

    loadDetailData() {
        let formData = new FormData();
        formData.append("appAuth", "mw/53y8j1v/DYGfCaiE7RzcuOtyD4vZ2");
        formData.append("device_type", "3");
        formData.append("id", this.state.pid);
        fetch('https://xcx.chaoshi.dqccc.net/DqcccXCXV/v1/Product.asmx/ProductDetail', {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body: formData
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    detailData: responseJson,
                    loopImages: responseJson.imglist,
                })
                _scroll.scrollTo({
                    x: this.state.loopImages.length > 1 ? screenWidth : 0,
                    animated: false
                });

            }).catch((error) => {
        })
    }


    _renderLoopImageView = (imgs) => {
        var imgArr = [];
        var list_v = [];
        if (imgs.length > 1) {
            imgArr.push(imgs[imgs.length - 1]);
            imgArr = imgArr.concat(imgs);
            imgArr.push(imgs[0]);
        } else {
            imgArr = imgs;
        }

        for (var i in  imgArr) {
            let item = imgArr[i];
            let item_v = (
                <Image source={{uri: item.imgurl}}
                       style={{
                           width: this.state.currentPage == i - 1
                               ? this.state.imgSize : screenWidth,
                           height: this.state.currentPage == i - 1
                               ? this.state.imgSize : screenWidth,
                       }}
                       key={i}/>
            )
            list_v.push(item_v);
        }

        return list_v;
    }


    _renderPageControl = () => {
        var pageCongtrols = [];
        for (var i in this.state.loopImages) {
            var pageControl = (
                <View style={this.state.currentPage == i
                    ? styles.currentPageControl
                    : styles.pageControl} key={i}/>
            )
            pageCongtrols.push(pageControl);
        }
        return pageCongtrols;
    }

    _onScrollViewPageChange = (e: Object) => {

        let count = this.state.loopImages.length;
        if (count <= 1) {
            return;
        }
        let _offet_X = e.nativeEvent.contentOffset.x;
        let index = _offet_X / screenWidth - 1;
        console.log(_offet_X)
        if (_offet_X <= 0) {
            _scroll.scrollTo({x: screenWidth * count, animated: false});
            index = count - 1;
        } else if (_offet_X >= (count + 1) * screenWidth) {
            _scroll.scrollTo({x: screenWidth, animated: false});
            index = 0;
        }
        this.setState({
            currentPage: index
        })

    }

    _scrollViewDidScroll = (e) => {
        console.log(e.nativeEvent.contentOffset.y)
        let _offset_Y = e.nativeEvent.contentOffset.y;
        if (_offset_Y <= 0) {
            this.setState({
                imgSize: screenWidth - _offset_Y
            })

        }
    }

    _changeMaskViewState = () => {
        this.state.show = !this.state.show;
        this.refs.maskView._startShowMaskView(this.state.show);
        this.refs.presentView._startShowPresentView(this.state.show);
    }

    render() {

        return (
            <View style={styles.contrainer_V}>
                <CustomNavigation navigation={this.props.navigation}
                                  nav_title={this.state.title}
                                  showBack={true}/>
                <ScrollView style={styles.scroll_2}
                            ref={(scroll) => {
                                _mainScroll = scroll
                            }}
                            scrollEventThrottle={1}
                            onScroll={this._scrollViewDidScroll}>
                    <View style={styles.swiperView}>
                        <ScrollView ref={(scroll) => {
                            _scroll = scroll
                        }}
                                    style={styles.scroll_3}
                                    horizontal={true}
                                    pagingEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    onMomentumScrollEnd={this._onScrollViewPageChange}
                                    scrollEventThrottle={2}>
                            {this._renderLoopImageView(this.state.loopImages)}
                        </ScrollView>
                        <View style={styles.pageControlBg}>
                            {this.state.loopImages.length > 1 ? this._renderPageControl() : ''}
                        </View>
                    </View>
                    <View style={styles.pro_bgv}>
                        <Text style={styles.proName} numberOfLines={2}>
                            {this.state.detailData.proname}
                        </Text>
                        <Text style={styles.proPrice}>
                            ￥{this.state.detailData.saleprice}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={this._changeMaskViewState}>
                        <View style={styles.pickInfoV}>
                            <Text style={styles.pickText}>选择{''}</Text>
                            <Text style={{lineHeight: 44, height: 44, marginRight: 10}}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._changeMaskViewState}>
                        <View style={styles.pickInfoV}>
                            <Text style={styles.pickText}>送至{''}</Text>
                            <Text style={{lineHeight: 44, height: 44, marginRight: 10}}>{'>'}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.recommendV}>
                        <Text style={styles.recommendTitle}>推荐商品</Text>
                    </View>


                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.servicer}>
                        <Text style={styles.servicerText}>客服</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shop}>
                        <Text style={styles.shopText}>店铺</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addCart}
                                      onPress={this._changeMaskViewState}>
                        <Text style={styles.addCartText}>加入购物车</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nowBuy}
                                      onPress={this._changeMaskViewState}>
                        <Text style={styles.nowBuyText}>立即购买</Text>
                    </TouchableOpacity>
                </View>

                {/*遮罩层*/}
                <MaskView ref='maskView' callback={this._changeMaskViewState}/>
                <PresentView ref='presentView'>
                    <Text>hahahhahahah</Text>
                </PresentView>

            </View>

        )
    }
}


const styles = StyleSheet.create({
    contrainer_V: {
        flex: 1,
        position: 'relative'
    },
    scroll_2: {
        flex: 1,
        marginBottom:49
    },
    scroll_3: {
        width: screenWidth,
        height: screenWidth,
        backgroundColor: '#fff',
    },
    swiperView: {
        backgroundColor: '#eee',
        position: 'relative'
    },
    loopImage: {},
    pageControlBg: {
        height: 44,
        width: screenWidth,
        zIndex: 100,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    pageControl: {
        backgroundColor: '#eee',
        width: 20,
        height: 3,
        marginLeft: 8
    },
    currentPageControl: {
        backgroundColor: 'blue',
        width: 20,
        height: 3,
        marginLeft: 8
    },
    pro_bgv: {
        backgroundColor: '#fff'
    },
    proName: {
        padding: 12,
        fontSize: 15,
    },
    proPrice: {
        color: 'red',
        fontSize: 18,
        paddingLeft: 10,
        paddingBottom: 12
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 49,
        borderTopWidth: 1,
        borderTopColor: '#e4e4e4',
        backgroundColor: '#fff',
        left: 0,
        zIndex: 99,
    },
    servicer: {
        width: '20%',
    },
    servicerText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 49,
        marginLeft: 0
    },
    shop: {
        width: '20%',
        borderLeftWidth: 1,
        borderLeftColor: '#eee'
    },
    shopText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 49,

    },
    addCart: {
        width: '30%',
    },
    addCartText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 49,
        backgroundColor: '#FFB81A',
        color: '#fff',
    },
    nowBuy: {
        width: '30%',
    },
    nowBuyText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 49,
        backgroundColor: 'red',
        color: '#fff',
    },
    pickInfoV: {
        backgroundColor: '#fff',
        height: 44,
        lineHeight: 44,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pickText: {
        lineHeight: 44,
        fontSize: 15,
        marginLeft: 10,
        height: 44
    },
    recommendV:{
        marginTop: 10,
        height: 440,
        backgroundColor:'#fff',
        justifyContent:'center'
    },

    recommendTitle:{
        textAlign:'center',
        lineHeight:44,
        height:44,
        fontSize:16
    }

})



