import React, {
    Component
} from 'react';
import {
    AppRegistry,
    Navigator,
    StatusBar,
    Platform
} from 'react-native';

import LoginPage from './views/login/login';
import HomePage from './views/home/home';
import QuizStartPage from './views/quiz/quiz-start';
import QuizPage from './views/quiz/quiz';
import QuizEndPage from './views/quiz/quiz-end';

export default class mdsapp extends Component {

  constructor(props){
      super(props);
      if(Platform.OS == "android"){
          StatusBar.setBackgroundColor("rgba(23,57,100,1)");
      }else{
          StatusBar.setBarStyle('light-content');
      }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'LoginPage', name: 'Login' }}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return {
            ...Navigator.SceneConfigs.PushFromRight,
            gestures:false
          };
        } } />
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;

    if (routeId === 'LoginPage') {
      return (
        <LoginPage
          navigator={navigator} route={route} data={route.data} {...route.passProps} />
      );
    }

    if (routeId === 'HomePage') {
      return (
        <HomePage
          navigator={navigator} route={route} data={route.data} {...route.passProps} />
      );
    }

    if (routeId === 'QuizStartPage') {
      return (
        <QuizStartPage
          navigator={navigator} route={route} data={route.data} {...route.passProps} />
      );
    }

    if (routeId === 'QuizPage') {
      return (
        <QuizPage
          navigator={navigator} route={route} data={route.data} {...route.passProps} />
      );
    }

    if (routeId === 'QuizEndPage') {
      return (
        <QuizEndPage
          navigator={navigator} route={route} data={route.data} {...route.passProps} />
      );
    }
  }
}