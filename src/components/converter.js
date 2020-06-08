import React, {Component} from 'react';
import axios from 'axios'; //bu kütüphane ile apıleri çekeceğiz
import {StyleSheet, Text, View, TextInput} from 'react-native';


class Converter extends Component{
  constructor(props){
    super(props);
    this.state={
      tl:'',
      usd:'',
      cad:'',
      jpy:'',
      eur:'',
      input:'',
      //gelen her bir değeri diziye atıyoruz
      rates:[]
    }
    //başka yerlerde kullanabilmek için bağlamak işlemi yaptm
    this.getRates=this.getRates.bind(this);
  }
  getRates(){
    axios.get('http://data.fixer.io/api/latest?access_key=3933a738299e3bb2856c80bba3c9697a&symbols=TRY,USD,CAD,JPY,EUR')
      .then(response=>{
        console.log(response);
        const rates = response.data.rates;
        this.setState({
          rates
        })
      })
  }
  //api isteği yollarken kullanacağımız yapı için bu kod
  //değerleri çekip stateye atıp daha sonra kullanabiliriz
  //response ile datayı alıyoruz
  componentDidMount(){
    console.log('componentDidMount');
   this.getRates();

  }
  render(){
    //değerleri const içine açıp kullanım kolaylığı sağlıyorum
    const {converterWrapper, inputStyle, textStyle}=styles;
    const{input, tl, usd, cad, jpy, eur, rates}=this.state;
    return(

//placeholder input alanına yazı yazmak için kullanılıre
      <View style={converterWrapper}>
      <TextInput placeholder='EURO cinsinden değer girin.'
                 style={inputStyle}
                 //girilen değeri sadece numara olarak belirliyoruz
                 keyboardType='numeric'
                 onChangeText={(text)=>{
                   //girilen değeri float değere çeviriyoruz
                   const i=parseFloat(text) || 0;
                   this.setState({
                     input:text,
                     /*
                 altta yazdıklarım sayedinde girilen değeri gelen değerleri
                 çarpıp anlık ekrana yazdırdım
                 toFixed ile kaç basamak olacak onu belirttim
                     */
                     tl:(i*rates['TRY']).toFixed(5),
                     usd:(i*rates['USD']).toFixed(5),
                     cad:(i*rates['CAD']).toFixed(5),
                     jpy:(i*rates['JPY']).toFixed(5),
                     eur:(i*rates['EUR']).toFixed(5),
                   })
                 }}
                 value={input}/>

      <Text style={textStyle}>TRY : {tl}</Text>
      <Text style={textStyle}>USD : {usd}</Text>
      <Text style={textStyle}>CAD : {cad}</Text>
      <Text style={textStyle}>JPY : {jpy}</Text>
      <Text style={textStyle}>EUR : {eur}</Text>

      </View>
    )
  }
}
const styles=StyleSheet.create({
  converterWrapper:{
paddingTop:25,
justifyContent:'center',
alignItems:'center'
  },
  inputStyle:{
    width:230,
    height:40,
    opacity:0.3, //bu kod ile silik hale getiriyoruz
    paddingBottom:17
  },
  textStyle:{
    paddingTop:30,
    width:250,
    height:60,
    fontWeight :'bold'
  }
});
export default Converter;
