import React, {
    Component
} from 'react'

import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
    Dimensions,

} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default class LoadingHUD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '正在加载',
        }
    }

    render() {
        console.log(Dimensions.get('window'))
        return (
            <View style={this.props.show?styles.loadingView:styles.loadingView2} >
                <ActivityIndicator style={styles.activityInd} color='#fff' size='large'/>
                <Text style={styles.loadingText}>{this.state.text}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({

    loadingView: {
        zIndex: 100000,
        backgroundColor: '#000',
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 20,
        width:100,
        height:100,
        left:screenWidth/2-50,
        top:screenHeight/2-50,
    },
    loadingView2:{
      display:'none'
    },
    activityInd: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        padding: 5
    }

})