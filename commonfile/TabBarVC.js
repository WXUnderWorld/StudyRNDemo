import React, {
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Image
} from 'react-native';

import {StackNavigator, TabNavigator} from 'react-navigation'

import Ionicons from 'react-native-vector-icons/Ionicons'


//导入外部文件
import Home from '../commonfile/Home';
import Category from '../commonfile/Category'
import Cart from '../commonfile/Cart'
import My from '../commonfile/My'
import ProList from '../commonfile/ProductList'
import ProDetail from '../commonfile/ProductDetail'



const Tab = TabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: '首页',
                tabBarIcon: (
                    ({tintColor}) => <Image
                        style={[styles.tabBarImage, {tintColor: tintColor}]}
                        source={{uri: 'tab_home'}}
                    />
                ),

                tabBarOnPress: (obj) => {
                    console.log(obj);
                    obj.jumpToIndex(obj.scene.index)
                },
            }
        },
        Category: {
            screen: Category,
            navigationOptions: {
                tabBarLabel: '分类',
                tabBarIcon: (
                    ({tintColor}) => <Image
                        style={[styles.tabBarImage, {tintColor: tintColor}]}
                        source={{uri: 'tab_category'}}/>
                ),
                tabBarOnPress: (obj) => {
                    console.log(obj);
                    obj.jumpToIndex(obj.scene.index)
                },
            }
        },
        Cart: {
            screen: Cart,
            navigationOptions: {
                tabBarLabel: '购物车',
                tabBarIcon: (
                    ({tintColor}) => <Image
                        style={[styles.tabBarImage, {tintColor: tintColor}]}
                        source={{uri: 'tab_shopcart'}}/>
                ),
                tabBarOnPress: (obj) => {
                    console.log(obj);
                    obj.jumpToIndex(obj.scene.index)
                },

            }
        },
        My: {
            screen: My,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: (
                    ({tintColor}) => <Image
                        style={[styles.tabBarImage, {tintColor: tintColor}]}
                        source={{uri: 'tab_center'}}/>
                ),
                tabBarOnPress: (obj) => {
                    console.log(obj);
                    obj.jumpToIndex(obj.scene.index)
                },


            }
        },
    },
    {
        initialRouteName: 'Home',
        lazy: true,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#432ae3',
            inactiveTintColor: '#999',
            showIcon: true,
        },

    });


const RootNavigator = StackNavigator(
    {
        Tab: {screen: Tab},
        ProList: {screen: ProList},
        ProDetail: {screen: ProDetail},
        Category:{screen: Category}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            title: '',
            headerStyle: {backgroundColor: '#fff'},
            headerTitleStyle: {color: '#333333'},
        },
        onTransitionStart: (() => {
            console.log('页面跳转动画开始');
        }),
        onTransitionEnd: (() => {
            console.log('页面跳转动画结束');
        }),
    });


export default class Main extends Component {
    render() {
        return (
            <RootNavigator/>
        )
    }
};


const styles = StyleSheet.create({
    tabBarImage: {
        width: 24,
        height: 24,
    },
    tab_bar: {
        width: '100%',
        height: 49,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'red'
    }
})