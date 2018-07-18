import React, {
    Component
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    PixelRatio
} from 'react-native';


const scale = PixelRatio.get();

export default class CustomNavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBack: false
        }

    }

    componentWillMount() {
        this.setState({
            showBack: this.props.showBack
        })
    }

    _navigationBar = () => {
        let nav;
        if (this.state.showBack == true) {
            nav = (
                <View style={styles.navigation}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Image source={{uri: 'fanhui', scale: scale}} style={styles.backImage}/>
                    </TouchableOpacity>
                    <Text style={styles.nav_title}>{this.props.nav_title}</Text>
                </View>
            )
        } else {
            nav = (
                <View style={styles.navigation}>
                    <Text style={styles.nav_title}>{this.props.nav_title}</Text>
                </View>
            )
        }

        return nav;
    }


    render() {
        return (
            this._navigationBar()
        )
    }

}


const styles = StyleSheet.create({
    navigation: {
        flexDirection: 'row',
        width: '100%',
        height: 64,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'center',
    },
    nav_title: {
        fontSize: 17,
        color: '#000',
        height: 44,
        marginTop: 20,
        lineHeight: 44
    },
    backBtn: {
        position: 'absolute',
        left: 0,
        top: 20,
        width: 80,
        height: 44
    },
    backImage: {
        marginLeft: 12,
        marginTop: 13,
        width: 12,
        height: 18,
    },
})
