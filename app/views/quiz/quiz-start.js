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

export default class QuizStartPage extends Component {

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
                                        <Text style={{color:'white',fontWeight:'600',fontSize:18}}> WELCOME, {self.props.data.userData.first_name.toUpperCase()} </Text>
                                    </TouchableOpacity>
                                );
                            }
                    }} />
            } />
        );
    }

    onPressMenu() {

    }

    onPressBtnStart() {
        let sendData = {
            examIds: this.props.data.examIds,
            exams: this.props.data.exams,
            userData: this.props.data.userData
        };
        this.props.navigator.push({
            id: 'QuizPage',
            name: 'Quiz',
            data: sendData
        });
    }

    renderExamDetails(){
        let exams = this.props.data.exams;
        let examIds = this.props.data.examIds;
        let examTypes = ["Random Questions"];

        let returnVals = [];
        for (var i = 0; i < examIds.length; i++) {
            let exam = exams.filter((data)=>{
                return data.id == examIds[i];
            });
            returnVals.push(
                <Text key={i} style={{fontWeight:'600', marginBottom: 10}}>
                    {exam[0].name}
                </Text>
            );
        }
        returnVals.push(
            <Text key={examIds.length + 1} style={{fontWeight:'600', marginBottom: 10}}>
                ***
            </Text>
        );
        for (var i = 0; i < examTypes.length; i++) {
            returnVals.push(
                <Text key={examIds.length + examTypes.length + i + 1} style={{fontWeight:'600', marginBottom: 10}}>
                    {examTypes[i]}
                </Text>
            );
        }
        return returnVals;
    }

    renderScene(route, navigator) {
        var self = this;
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.animating} textContent={'Loading ...'} textStyle={{ color: '#FFF' }} />
                <ScrollView contentContainerStyle={{marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={styles.textGetStart}>IN THIS SESSION, YOU'LL BE</Text>
                    <Text style={styles.textGetStart}>TESTED ON :</Text>
                    <View style={{marginTop: 30,marginBottom: 40, justifyContent:'center', alignItems:'center'}}>
                        {this.renderExamDetails()}
                    </View>
                    <Text style={styles.textGetStart}>ARE YOU READY ?</Text>
                    <TouchableHighlight underlayColor='transparent' style={styles.btnStart}
                    onPress={()=>this.onPressBtnStart()}>
                        <Text style={{color: 'white', fontWeight:'600'}}>
                            START
                        </Text>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}