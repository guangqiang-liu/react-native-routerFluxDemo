/**
 * Created by guangqiang on 2017/8/16.
 */

import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";

class HelloWord extends Component {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}>
        <Text>HelloWold</Text>
        <Button onPress={() => Actions.loginModal()}>PageOne</Button>
      </View>
    )
  }
}

module.exports = HelloWord
