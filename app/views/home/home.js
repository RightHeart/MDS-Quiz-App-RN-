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
    AsyncStorage,
    StatusBar
} from 'react-native';

import IconF from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        StatusBar.setBarStyle('light-content');
        let exams = [
            {
                id: 1,
                name: "Auditing and attestation",
                type: "aud"
            },
            {
                id: 2,
                name: "Business environments and concepts",
                type: "bec"
            },
            {
                id: 3,
                name:"Regulations",
                type: "reg"
            },
            {
                id: 4,
                name:"Financial accouting and reporting",
                type: "far"
            }
        ];
        let examStyles = {
            1: {
               btnStyle: styles.btnExam,
               txtStyle: styles.textExam,
               type: 1
            },
            2: {
               btnStyle: styles.btnExam,
               txtStyle: styles.textExam,
               type: 1
            },
            3: {
               btnStyle: styles.btnExam,
               txtStyle: styles.textExam,
               type: 1
            },
            4: {
               btnStyle: styles.btnExam,
               txtStyle: styles.textExam,
               type: 1
            }
        };
        this.state = {
            animating: false,
            exams: exams,
            examStyles: examStyles,
            colorBtnNext : 'rgba(153,153,153,1)'
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
                                        <Text style={{color:'white',fontWeight:'600',fontSize:18}}> WELCOME, {self.props.data.first_name.toUpperCase()} </Text>
                                    </TouchableOpacity>
                                );
                            }
                    }} />
            } />
        );
    }

    onPressMenu() {

    }

    onPressBtnExam(id){
        let examStyles = this.state.examStyles;
        let selectedExamStyle = examStyles[id];
        if (selectedExamStyle.type == 1) {
            selectedExamStyle.type = 2;
            selectedExamStyle.btnStyle = styles.btnExamSelected;
            selectedExamStyle.txtStyle = styles.textExamSelected;
        } else {
            selectedExamStyle.type = 1;
            selectedExamStyle.btnStyle = styles.btnExam;
            selectedExamStyle.txtStyle = styles.textExam;
        }
        examStyles[id] = selectedExamStyle;
        let arrTypes = [];
        for (var key in examStyles) {
            if (examStyles.hasOwnProperty(key)) {
                var examStyle = examStyles[key];
                if(examStyle.type == 2) {
                    arrTypes.push(2);
                }
            }
        }
        if(arrTypes.length > 0){
            this.setState({colorBtnNext: 'white'});
        } else {
            this.setState({colorBtnNext: 'rgba(153,153,153,1)'});
        }
        this.setState({examStyles: examStyles});
    }

    renderExamView() {
        let exams = this.state.exams;
        let returnVals = [];
        for (var i = 0; i < exams.length; i++) {
            let exam = exams[i];
            let examStyle = this.state.examStyles[exam.id];
            returnVals.push(
                <TouchableHighlight
                    style={examStyle.btnStyle}
                    key={i}
                    underlayColor='transparent'
                    onPress={this.onPressBtnExam.bind(this, exam.id)}
                >
                    <Text numberOfLines={2} style={examStyle.txtStyle}>
                        {examStyle.type == 2 &&
                            <IconF name="check" size={16} style={{ color: 'white', marginRight:10 }} />
                        }
                        {' ' + exam.name.toUpperCase()}
                    </Text>
                </TouchableHighlight>
            );
        }
        return returnVals;
    }

    onPressBtnNext(){
        let examStyles = this.state.examStyles;
        let examIds = [];
        for (var key in examStyles) {
            if (examStyles.hasOwnProperty(key)) {
                var examStyle = examStyles[key];
                if(examStyle.type == 2) {
                    examIds.push(key);
                }
            }
        }
        if(examIds.length > 0){
            let sendData = {
                examIds: examIds,
                exams: this.state.exams,
                userData: this.props.data
            };
            this.props.navigator.push({
                id: 'QuizStartPage',
                name: 'QuizStart',
                data : sendData
            });
        }
    }

    renderScene(route, navigator) {
        var self = this;
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.animating} textContent={'Loading ...'} textStyle={{ color: '#FFF' }} />
                <ScrollView contentContainerStyle={{marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={styles.textGetStart}>LET'S GET STARTED.</Text>
                    <Text style={{marginTop: 25, color:'rgba(93,102,120,1)'}}>
                        Choose from your available courses to begin a
                    </Text>
                    <Text style={{marginTop: 5, color:'rgba(93,102,120,1)'}}>
                        new flashed session.
                    </Text>
                    <Text style={{marginTop: 15, fontStyle:'italic', color:'rgba(93,102,120,1)'}}>
                        Hint: If you are felling bold, you can choose
                    </Text>
                    <Text style={{marginTop: 5, fontStyle:'italic', color:'rgba(93,102,120,1)'}}>
                        more than one area of the exam.
                    </Text>
                    <View style={{marginTop: 30, marginBottom: 90}}>
                        {this.renderExamView()}
                    </View>
                </ScrollView>
                <View style={styles.viewbottom}>
                    <View style={{flex:0.70}}></View>
                    <TouchableHighlight underlayColor='transparent' style={styles.btnNext}
                    onPress={()=>this.onPressBtnNext()}>
                        <Text style={{color: this.state.colorBtnNext, fontWeight:'600'}}>
                            NEXT <IconF name='arrow-right' size={16} style={{color: this.state.colorBtnNext}}/>
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}