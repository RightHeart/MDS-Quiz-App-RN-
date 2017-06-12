import React, { Component } from 'react';
import {
    Text,
    View,
    Navigator,
    Image,
    Alert,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import IconF from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';

export default class QuizEndPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animating: false
        }
    }

    render() {
        var self = this;
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={{ backgroundColor: 'rgba(23,57,100,1)' }}
                        routeMapper={{
                            LeftButton(route, navigator, index, navState) {
                                return (
                                    <TouchableOpacity style={{ marginLeft: 15, flex:1, justifyContent: 'center', alignItems:'center' }}
                                        onPress={() => self.onPressMenu()}>
                                        <View style={{justifyContent: 'center', alignItems:'center'}}>
                                            <IconF name="bars" size={22} style={{ color: 'white' }} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            },
                            RightButton(route, navigator, index, navState) {
                                return null;
                            },
                            Title(route, navigator, index, navState) {
                                return (
                                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
                                        <Text style={{color:'white',fontWeight:'600',fontSize:18}}> WELCOME, JUSTIN </Text>
                                    </TouchableOpacity>
                                );
                            }
                    }} />
            } />
        );
    }

    onPressMenu() {

    }

    onPressShowAllAnswers() {

    }

    onPressStartSession() {

    }

    onPressRepeatSession() {

    }

    renderScene(route, navigator) {
        var self = this;
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.animating} textContent={'Loading ...'} textStyle={{ color: '#FFF' }} />
                <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems:'center'}}>
                    <View style={styles.viewNiceWork}>
                        <Text style={styles.textNiceWork}>NICE WORK !</Text>
                    </View>
                    <Text style={styles.textHeaderLine}>You finished this session in :</Text>
                    <Text style={styles.textResult}>00:00:00</Text>
                    <Text style={styles.textHeaderLine}>Here are your results :</Text>
                    <Text style={styles.textResult}>XX/XX CORRECT</Text>
                    <View style={{marginTop: 20, marginBottom: 20}}>
                        <TouchableHighlight underlayColor='transparent' style={{}}
                            onPress={()=>this.onPressShowAllAnswers()}>
                            <Text style={{color: 'rgba(63,157,204,1)', fontWeight:'600', fontSize: 16, textDecorationLine:'underline'}}>
                               SHOW ALL ANSWERS >>
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight underlayColor='transparent' style={styles.btnShowAnswer}
                    onPress={()=>this.onPressStartSession()}>
                        <Text style={{color: 'white', fontWeight:'600'}}>
                            START A NEW SESSION
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' style={styles.btnSaveItLater}
                    onPress={()=>this.onPressRepeatSession()}>
                        <Text style={{color: 'white', fontWeight:'600'}}>
                            REPEAT THIS SESSION
                        </Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}