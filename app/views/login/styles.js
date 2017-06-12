import {
    StyleSheet
} from 'react-native';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewTextInput:{
    justifyContent:'center',
    alignItems:'flex-start',
    height:35,
    backgroundColor:'white',
    alignSelf:'stretch',
    borderWidth:1,
    borderColor:'#ccc',
  },
  input: {
    position: 'absolute',
    left: 10,
    top: 0,
    right: 0,
    height: 35,
    fontSize: 14,
    paddingBottom: 0,
    paddingTop: 0
  },
  blackFont: {
    textAlign:'left',
    color: '#000',
    fontSize: 14,
    fontStyle: 'italic'
  },
  btnLogin: {
    backgroundColor:'rgba(63,157,204,1)',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
    marginTop: 30,
    alignSelf:'stretch'
  },
  modal: {
    alignItems: 'center',
    borderRadius: 10,
    width: windowSize.width - 50,
    height: windowSize.height/2,
    backgroundColor: 'rgba(23,57,100,1)'
  },
  viewExtra: {
    height: windowSize.height - windowSize.width/2
  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: 340
  },
});

export default styles;