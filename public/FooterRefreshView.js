import React, {
    Component
} from 'react'

import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
} from 'react-native';


export default class FooterRefreshView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loadingText: '正在加载...',
        }
    }


    _createFooterRefresh() {

        let footer;
        switch (this.props.refreshState) {
            case 'noMoreData': {
                this.state.loadingText = '没有更多数据了'
                footer = (
                    <View style={styles.refresh_footer}>
                        <Text style={styles.loadingText}>{this.state.loadingText}</Text>
                    </View>
                )
            }
                break;
            default: {
                this.state.loadingText = '正在加载...'
                footer = (
                    <View style={styles.refresh_footer}>
                        <ActivityIndicator/>
                        <Text style={styles.loadingText}>{this.state.loadingText}</Text>
                    </View>
                )
            }
        }

        return footer;
    }


    render() {
        return (
            <View>
                {this._createFooterRefresh()}
            </View>
        );
    }

}


const styles = StyleSheet.create({
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
    }
})

