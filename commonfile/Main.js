

import React,{
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS,
    PixelRatio,
} from 'react-native';


//导入外部文件
import Home from '../commonfile/Home';
import Category from '../commonfile/Category'
import Cart from '../commonfile/Cart'
import My from '../commonfile/My'


//屏幕缩放比
const scale = PixelRatio.get();
export default class Main extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedItem: '0',
        };
    }

    didSelectedItem(item){
        this.setState({
            selectedItem:item,
        })
    }

    render(){
        return(
            <TabBarIOS>
                <TabBarIOS.Item title={'首页'}
                                icon={{uri:'tab_home',scale:scale}}
                                selectedIcon={{uri:'tab_home_select',scale:scale}}
                                selected={this.state.selectedItem==='0'}
                                onPress= {this.didSelectedItem.bind(this,'0')}>

                    <NavigatorIOS
                        initialRoute={{
                            component: Home,
                            title: '首页',
                        }}
                        style={{flex: 1}}
                    />

                </TabBarIOS.Item>
                <TabBarIOS.Item title={'分类'}
                                icon={{uri:'tab_category',scale:scale}}
                                selectedIcon={{uri:'tab_category_select',scale:scale}}
                                selected={this.state.selectedItem==='1'}
                                onPress={this.didSelectedItem.bind(this,'1')}>
                    <View></View>
                </TabBarIOS.Item>
                <TabBarIOS.Item title={'购物车'}
                                icon={{uri:'tab_shopcart',scale:scale}}
                                selectedIcon={{uri:'tab_shopcart_select',scale:scale}}
                                selected={this.state.selectedItem==='2'}
                                onPress={this.didSelectedItem.bind(this,'2')}>
                    <View></View>
                </TabBarIOS.Item>
                <TabBarIOS.Item title={'我的'}
                                icon={{uri:'tab_center',scale:scale}}
                                selectedIcon = {{uri:'tab_center_select',scale:scale}}
                                selected={this.state.selectedItem==='3'}
                                onPress={()=> this.setState({
                                    selectedItem:'3'
                                })}>
                    <View></View>
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}






