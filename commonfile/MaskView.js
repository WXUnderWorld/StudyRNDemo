import React, {
    Component
} from 'react'

import {
    TouchableOpacity,
    Animated
} from 'react-native';


export default class MaskView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opacity: new Animated.Value(0),
            hiden: true
        }
    }


    _startShowMaskView = (show) => {
        Animated.timing(
            this.state.opacity,
            {
                toValue: show ? 0.55 : 0,
                duration: 250,
            }
        ).start();

        this.setState({
            hiden: !show
        })
    }

    render() {
        return (
            <Animated.View style={{
                ...this.props.style,
                opacity: this.state.opacity,
                zIndex: 1000,
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                display: this.state.hiden ? 'none':'flex'
            }}>
                <TouchableOpacity style={{flex: 1}} onPress={this.props.callback}/>

            </Animated.View>

        )
    }
}




