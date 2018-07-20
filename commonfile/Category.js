import React, {
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    View,
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
            cateList: [],
            onPressIndex: 0,
        }
    }

    componentWillMount() {
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
            <TouchableOpacity activeOpacity={1} onPress={() => {
                this.setState({
                    onPressIndex: item.index
                })
            }} key={item.index}>

                <Text style={item.index == this.state.onPressIndex
                    ? styles.selectedOneText : styles.oneText}>
                    {_item.title}
                </Text>
            </TouchableOpacity>
        )
    }


    _rowSeparator = () => {
        return (
            <View style={styles.separator}/>
        )
    }

    _renderSectionHeader = (item) => {
        return (
            <Text style={styles.sectionHeader} key={item.index}>{item.section.key}</Text>
        )
    }


    _renderSectionItem = (item) => {

        var _list = item.section.data[0];
        let listItem = [];
        for (var i in _list) {
            let obj = _list[i];
            let sectionItem = (
                <TouchableOpacity key={obj.title} onPress={()=>{
                    this.props.navigation.navigate('ProList',
                        {cid:obj.categoryId,name:obj.title,})
                }}>
                    <Text style={styles.sectionItem} key={i}>{obj.title}</Text>
                </TouchableOpacity>
            )
            listItem.push(sectionItem)
        }

        return (
            <View style={styles.sectionItemBgView}>
                {listItem}
            </View>
        )
    }


    _sections = () => {

        let sections = [];
        if (this.state.cateList.length == 0) {
            return [];
        }
        var twoList = this.state.cateList[this.state.onPressIndex].twolist;
        for (var i in  twoList) {
            var item = twoList[i];
            if (item.threelist !== undefined && item.threelist.length > 0) {
                var obj = {};
                obj.key = item.title;
                obj.data = [item.threelist];
                sections.push(obj);
            }
        }
        return sections;
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
                              extraData={this.state} //为了切换每个cell的状态必须添加该属性
                              ItemSeparatorComponent={this._rowSeparator}
                    />
                    <SectionList style={styles.sectionList}
                                 sections={this._sections()}
                                 renderItem={this._renderSectionItem}
                                 renderSectionHeader={this._renderSectionHeader}
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
        flexDirection: 'row',
        backgroundColor: '#eee'
    },
    flatList: {
        width: '27%',
        backgroundColor: '#fff'
    },
    oneText: {
        height: 44,
        lineHeight: 44,
        textAlign: 'center',
        fontSize: 15,
    },
    selectedOneText: {
        backgroundColor: '#eee',
        color: 'red',
        height: 44,
        lineHeight: 44,
        textAlign: 'center',
        fontSize: 15,
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
        marginLeft: 10
    },
    sectionList: {
        marginLeft: '3%',
        width: '70%',
        backgroundColor: '#fff'
    },
    sectionHeader: {
        height: 44,
        lineHeight: 44,
        fontSize: 15,
        paddingLeft: 10,
        backgroundColor: '#eee',
    },
    sectionItemBgView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
    },
    sectionItem: {
        margin: 8,
        textAlign: 'center',
        padding: 8,
        fontSize: 14,
        backgroundColor: '#eee',
        overflow: 'hidden',
        borderRadius: 4,
        color: '#333'
    }


})


/*
* app性能优化几个方向：
*
* 1、硬件：如地图定位、蓝牙、通知等，尽量避免频繁唤起。
*    如定位，实时定位：导航；
*           延时定位：跑步；
*           区域定位：天气；
*
* 2、UITableView：
*      通过正确的设置 reuseIdentifier 来重用 Cell。
       尽量减少不必要的透明 View。
       尽量避免渐变效果、图片拉伸和离屏渲染。
       当不同的行的高度不一样时，尽量缓存它们的高度值。
       如果 Cell 展示的内容来自网络，确保用异步加载的方式来获取数据，并且缓存服务器的 response。
       使用 shadowPath 来设置阴影效果。
       尽量减少 subview 的数量，对于 subview 较多并且样式多变的 Cell，可以考虑用异步绘制或重写 drawRect。
       尽量优化 - [UITableView tableView:cellForRowAtIndexPath:] 方法中的处理逻辑，
       如果确实要做一些处理，可以考虑做一次，缓存结果。
       选择合适的数据结构来承载数据，不同的数据结构对不同操作的开销是存在差异的。
       对于 rowHeight、sectionFooterHeight、sectionHeaderHeight 尽量使用常量。

*3、合理选择 imageNamed 和 imageWithContentsOfFile

    imageNamed 会对图片进行缓存，适合多次使用某张图片
    imageWithContentsOfFile 从bundle中加载图片文件，
    不会进行缓存，适用于加载一张较大的并且只使用一次的图片，例如引导图等

4、  预处理和延时加载
*
*
*
* */