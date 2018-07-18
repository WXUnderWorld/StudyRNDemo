import React, {
    Component
} from 'react'

import {
    StyleSheet,
    ScrollView,
    Image,
    Text,
    View,
    PixelRatio,
} from 'react-native';

import Swiper from 'react-native-swiper';

const scale = PixelRatio.get() / 2;


export default class Banner extends Component {
    constructor(props) {
        super(props);
        this.looImageView.bind(this);
    }


    looImageView() {
        var list = [];
        for (var i in this.props.imageList) {
            var item = this.props.imageList[i];
            var itemV = (
                <View style={styles.slide} key={i}>
                    <Image source={{uri: item}} style={styles.image}/>
                </View>

            )
            list.push(itemV);
        }

        return (
            <Swiper style={styles.loopV} showsButtons={false} autoplay={true}
                    dotStyle={styles.dotStyle} activeDotStyle={styles.activeDotStyle}
                    paginationStyle={styles.paginationStyle} onIndexChanged={this.props.callback}
                    onTouchEnd={this.props.tapImageAtIndex}>
                {list}
            </Swiper>
        )
    }

    render() {
        return (
            this.looImageView()
        )
    }


}


const styles = StyleSheet.create({
    loopV: {
        height: 375 / 2 * scale
    },
    paginationStyle: {
        bottom: 5,
    },
    dotStyle: {
        backgroundColor: '#fff',
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    activeDotStyle: {
        backgroundColor: '#007aff',
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    slide: {
        height: 375 / 2 * scale,
        backgroundColor: '#eee',
    },
    image: {
        flex: 1
    },


})