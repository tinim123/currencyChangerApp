import React, {Component} from 'react';
import {StyleSheet,Text,View} from 'react-native';
export default class Header extends Component{
  render(){
    const{ header, headerText} = styles;
    return(
      <View style={header}>
      <Text style={headerText}>{this.props.headerText}</Text>
      </View>

    );

  }
}
const styles=StyleSheet.create({
  header:{
    height:80,
    paddingTop:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#788B91'
  },
  headerText:{
    height:50,
    fontSize:20,
    color:'white',
    textAlign:'center'
  }
})
