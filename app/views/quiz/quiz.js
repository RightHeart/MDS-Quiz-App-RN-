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
    StatusBar,
    StyleSheet,
    WebView
} from 'react-native';

import IconF from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Card,
  CardContent
} from 'react-native-card-view';

import styles from './styles';
import flashCards from '../../services/flash-cards-service';
import config from '../../helpers/config';

export default class QuizPage extends Component {

    constructor(props) {
        super(props);
        StatusBar.setBarStyle('default');
        const examIds = this.props.data.examIds;
        const currentExam = examIds[0];
        this.state = {
            animating: false,
            currentExamIndex: 0,
            currentExam: currentExam,
            currentPage: 1,
            currentExamName: 'Quiz Name',
            currentFlashCard: {
                id: 0,
                question_field: '',
                flash_card_answer: '',
                card_number: 1
            },
            isAnswerView: false
        }
    }

    componentDidMount(){
        this.callFlashCardAPI(this.state.currentExam, this.state.currentPage);
    }

    callFlashCardAPI(examId, page){
        var self = this;
        const exams = this.props.data.exams;
        const examData = exams.filter((data)=>{
            return data.id == examId;
        });
        this.setState({currentExamName: examData[0].name});

        const data = {
            'part': examData[0].type,
            'page': page,
            'per_page': 1,
            'offset': 1,
            'access_token': this.props.data.userData.access_token
        };

        self.setState({animating: true});

        flashCards.getFlashCard(data).then(function(resJson) {
            desc = ""
            self.setState({animating: false});
            if(resJson['success']){
                const flashCard = resJson['flash_cards'][0];
                self.setState({currentFlashCard: {
                    id: flashCard.id,
                    question_field: flashCard.question_field,
                    card_number: flashCard.card_number
                }});
            }else{
                setTimeout(function() {
                    Alert.alert(
                        'MDS',
                        resJson['message'],
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')}
                        ]
                    )
                }, 100);
            }
        });
    }

    render() {
        var self = this;
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
            />
        );
    }

    onPressBtnNext() {
        let page = this.state.currentPage + 1;
        this.setState({currentPage: page});
        this.setState({isAnswerView: false});
        this.callFlashCardAPI(this.state.currentExam, page);
        // let sendData = {examIds: this.props.data.examIds, exams: this.props.data.exams};
        // this.props.navigator.push({
        //     id: 'QuizEndPage',
        //     name: 'Quiz',
        //     data: sendData
        // });
    }

    onPressBtnBack() {
        this.setState({isAnswerView: false});
        if(this.state.currentPage > 1){
            let page = this.state.currentPage - 1;
            this.setState({currentPage: page});
            this.callFlashCardAPI(this.state.currentExam, page);
        }
    }

    onPressShowAnswer() {
        var self = this;
        const data = {
            'id': this.state.currentFlashCard.id,
            'access_token': this.props.data.userData.access_token
        };
        self.setState({animating: true});
        flashCards.getFlashCardAnswer(data).then(function(resJson) {
            desc = ""
            self.setState({animating: false});
            if(resJson['success']){
                let currentCard = self.state.currentFlashCard;
                currentCard.flash_card_answer = resJson['flash_card_answer'];
                console.log(resJson['flash_card_answer']);
                self.setState({currentFlashCard: currentCard, isAnswerView: true});
            }else{
                setTimeout(function() {
                    Alert.alert(
                        'MDS',
                        resJson['message'],
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')}
                        ]
                    )
                }, 100);
            }
        });
    }

    onPressSaveItLater() {

    }

    onPressShowAllAnswers() {

    }

    renderBackButton(){
        if(this.state.currentPage > 1) {
            return (
                <TouchableHighlight underlayColor='transparent' style={styles.btnBack}
                onPress={()=>this.onPressBtnBack()}>
                    <Text style={{color: 'white', fontWeight:'600'}}>
                        <IconF name='arrow-left' size={16} style={{color: 'white'}}/> BACK
                    </Text>
                </TouchableHighlight>
            );
        } else {
            return(
                <View style={styles.btnBack}></View>
            );
        }
    }

    onPressReturnQuestion(){
        this.setState({isAnswerView: false});
    }

    renderViewQuiz(){
        if(!this.state.isAnswerView) {
            let questionStyle = "<style>html *{font-weight:bold; margin-top: 20px !important; margin-left:10px !important; font-size: 14px !important;color: #173964 !important;}</style>";
            return(
                <View style={styles.viewQuiz}>
                    <View style={{backgroundColor: 'orange', height: 5, alignSelf:'stretch'}}></View>
                    <Text style={{marginTop:10, fontWeight:'600', alignSelf:'center'}}>AUDIT {this.state.currentExamIndex + 1} / CARD {this.state.currentFlashCard.card_number}</Text>
                    <ScrollView>
                        <WebView
                            source={{html: this.state.currentFlashCard.question_field.toUpperCase() + questionStyle}}
                            style={{height: 150, flex:1, backgroundColor:'transparent'}}
                        />
                    </ScrollView>
                    <TouchableHighlight underlayColor='transparent' style={styles.btnShowAnswer}
                        onPress={()=>this.onPressShowAnswer()}>
                        <Text style={{color: 'white', fontWeight:'600'}}>
                            SHOW ANSWER
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' style={styles.btnSaveItLater}
                        onPress={()=>this.onPressSaveItLater()}>
                        <Text style={{color: 'white', fontWeight:'600'}}>
                            SAVE FOR LATER
                        </Text>
                    </TouchableHighlight>
                </View>
            );
        } else {
            let answerStyle = "<style>html *{font-weight:bold; margin-top: 20px !important; margin-left:10px !important; font-size: 14px !important;color: #FFF !important;}</style>";
            return(
                <View style={styles.viewAnswer}>
                    <View style={{backgroundColor: 'rgba(23,57,100,1)', height: 5, alignSelf:'stretch'}}></View>
                    <Text style={{marginTop:10, color: 'white', fontWeight:'600', alignSelf:'center'}}>AUDIT {this.state.currentExamIndex + 1} / CARD {this.state.currentFlashCard.card_number}</Text>
                    <ScrollView>
                        <WebView
                            source={{html: this.state.currentFlashCard.flash_card_answer + answerStyle}}
                            style={{height: 200, flex:1, backgroundColor:'transparent'}}
                        />
                    </ScrollView>
                    <TouchableHighlight underlayColor='transparent' style={styles.btnReturnQuestion}
                        onPress={()=>this.onPressReturnQuestion()}>
                        <Text style={{color: 'white', fontWeight:'600'}}>
                            RETURN TO QUESTION
                        </Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    renderScene(route, navigator) {
        var self = this;
        return (
            <View style={styles.quizContainer}>
                <Spinner visible={this.state.animating} textContent={'Loading ...'} textStyle={{ color: '#FFF' }} />
                <View style={styles.viewQuizName}>
                    <Text numberOfLines={2} style={styles.textQuizName}>{this.state.currentExamName.toUpperCase()}</Text>
                </View>
                <ScrollView contentContainerStyle={{marginTop: 5, justifyContent: 'center', alignItems:'center'}}>
                    {self.renderViewQuiz()}
                    <View>
                        <TouchableHighlight underlayColor='transparent' style={{}}
                            onPress={()=>this.onPressShowAllAnswers()}>
                            <Text style={{color: 'rgba(63,157,204,1)', fontWeight:'600', fontSize: 16, textDecorationLine:'underline'}}>
                               SHOW ALL ANSWERS >>
                            </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <View style={styles.viewBottom}>
                    {self.renderBackButton()}
                    <TouchableHighlight underlayColor='transparent' style={styles.btnNext}
                    onPress={()=>this.onPressBtnNext()}>
                        <Text style={{color: 'white', fontWeight:'600'}}>
                            NEXT <IconF name='arrow-right' size={16} style={{color: 'white'}}/>
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.viewTimer}>
                </View>
            </View>
        );
    }
}