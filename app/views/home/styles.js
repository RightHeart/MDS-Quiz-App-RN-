import {
    StyleSheet
} from 'react-native';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewbottom:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'rgba(93,102,120,1)',
    alignItems: 'center',
    height: 60,
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection:'row'
  },
  btnNext: {
    height:60,
    flex:0.30,
    alignItems:'center',
    justifyContent: 'center'
  },
  textGetStart :{
    fontSize: 16,
    color : 'rgba(63,157,204,1)',
    fontWeight: '600'
  },
  btnExam: {
    backgroundColor:'rgba(241,241,241,1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    width: windowSize.width - 20,
 },
 btnExamSelected: {
    backgroundColor:'rgba(157,172,184,1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    width: windowSize.width - 20,
 },
 textExam: {
    color: 'rgba(23,57,100,1)',
    width: 240,
    textAlign: 'center',
    fontWeight: '600'
 },
 textExamSelected: {
    color: 'white',
    width: 240,
    textAlign: 'center',
    fontWeight: '600'
 }
});

export default styles;