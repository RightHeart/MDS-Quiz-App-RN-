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
  quizContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textGetStart :{
    fontSize: 16,
    color : 'rgba(63,157,204,1)',
    fontWeight: '600',
    marginBottom: 5
  },
  btnStart: {
    backgroundColor:'rgba(63,157,204,1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 20,
    width: windowSize.width - 20,
  },
  btnShowAnswer: {
    backgroundColor:'rgba(63,157,204,1)',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 0,
    marginTop: 10,
    width: windowSize.width - 40,
  },
  btnSaveItLater: {
    backgroundColor:'#CCC',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    width: windowSize.width - 40,
  },
  btnReturnQuestion: {
    backgroundColor:'rgba(63,157,204,1)',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    width: windowSize.width - 40,
  },
  viewBottom: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'rgba(93,102,120,1)',
    alignItems: 'center',
    height: 60,
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 60,
    flexDirection:'row'
  },
  btnNext: {
    height: 60,
    flex: 0.50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20
  },
  btnBack: {
    height: 60,
    flex: 0.50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20
  },
  viewTimer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'white',
    alignItems: 'center',
    height: 60,
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection:'row'
  },
  viewQuizName: {
   marginLeft: 10,
   marginRight: 10,
   width: windowSize.width - 20,
   height: 50,
   justifyContent: 'center',
   alignItems: 'flex-start',
   borderBottomWidth:1,
   borderBottomColor:'#CCC'
  },
  viewQuiz:{
    backgroundColor:'rgba(241,241,241,1)',
    height: 310,
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 15,
    marginBottom: 15,
    marginTop: 10,
    width: windowSize.width - 30,
  },
  viewAnswer:{
    backgroundColor:'rgba(23,57,100,1)',
    height: 310,
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 15,
    marginBottom: 15,
    marginTop: 10,
    width: windowSize.width - 30,
  },
  textQuizName: {
    color: 'rgba(23,57,100,1)',
    fontSize: 14
  },
  textHeaderLine :{
    fontSize: 14,
    color : 'rgba(63,157,204,1)',
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10
  },
  textResult :{
    fontSize: 16,
    color : 'gray',
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 5
  },
  viewNiceWork: {
   marginLeft: 10,
   marginRight: 10,
   width: windowSize.width - 20,
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
   borderBottomWidth:1,
   borderBottomColor:'#CCC',
   marginBottom: 30
  },
  textNiceWork: {
    color: 'rgba(23,57,100,1)',
    fontSize: 24
  },
  p: {
    fontSize: 14,
    color: 'rgba(23,57,100,1)',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;