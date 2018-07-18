/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

//es6 以这种方式导入外部组件
// import Main from './commonfile/Main';
import TabBarVC from './commonfile/TabBarVC'

//es5 是用require导入外部组件
// var Main = require('./commonfile/Main');

export default class App extends Component {
    render() {
        return (
            <TabBarVC/>
        )
    }
}


