import React, {
    Component
} from 'react'

import {
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';



const ScreenHeight = Dimensions.get('window').height;


export default class PresentView extends Component{
    constructor(props){
        super(props)
        this.state={
            height:new Animated.Value(0),
        }
    }

    _startShowPresentView =(show)=>{
        Animated.timing(
            this.state.height,
            {
                toValue: show ? ScreenHeight * 0.6 : 0,
                duration: 250,
            }
        ).start();
    }

    render(){
        return(
            <Animated.View style={{
                ...this.props.style,
                height: this.state.height,
                width:'100%',
                backgroundColor:'#fff',
                position:'absolute',
                bottom:0,
                left:0,
                zIndex: 10001,
            }}/>
        )
    }
}