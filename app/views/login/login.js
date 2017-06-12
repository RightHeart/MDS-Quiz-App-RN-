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
    TextInput
} from 'react-native';

import IconF from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modalbox';

import styles from './styles';
import login from '../../services/login-service';
import config from '../../helpers/config';

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        StatusBar.setBarStyle('default');
        this.state = {
            animating: false,
            email: '',
            password: '',
            signUpEmail: '',
            isSignUpModalOpen: false
        }
    }

    render() {
        var self = this;
        return (
            <Navigator
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                    <Navigator.NavigationBar style={{ backgroundColor: 'transparent' }}
                        routeMapper={{
                            LeftButton(route, navigator, index, navState) {
                                return (
                                    <TouchableOpacity style={{ marginLeft: 15, flex:1, justifyContent: 'center', alignItems:'center' }}
                                        onPress={() => self.onPressMenu()}>
                                        <View style={{justifyContent: 'center', alignItems:'center'}}>
                                            <IconF name="bars" size={22} style={{ color: 'rgba(23,57,100,1)' }} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            },
                            RightButton(route, navigator, index, navState) {
                                return null;
                            },
                            Title(route, navigator, index, navState) {
                                return null;
                            }
                    }} />
            } />
        );
    }

    onPressLogin() {
        var self = this;

        this.setState({isSignUpModalOpen: false});

        const email = this.state.email;
        const password = this.state.password;

        // const email = 'jigarmistry24@zoho.com';
        // const password = 'jigar786';

        const data = JSON.stringify({
            'email': email,
            'password': password,
            'app_id': config.app_id
        });
        self.setState({animating: true});

        login.doLogin(data).then(function(resJson) {
            desc = ""
            self.setState({animating: false});
            if(resJson['success']){
                AsyncStorage.setItem("userData", JSON.stringify(resJson));
                const sendData = {
                    first_name: resJson['user']['first_name'],
                    access_token: resJson['access_token']
                };
                self.props.navigator.push({
                    id: 'HomePage',
                    name: 'Home',
                    data: sendData
                });
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

    onPressForgotPassword() {
        this.setState({isSignUpModalOpen: false});
    }

    onPressEnrollNow() {
        this.setState({isSignUpModalOpen: true});
    }

    renderSignUpModal() {
        return (
            <Modal style={styles.modal} swipeToClose={false} isOpen={this.state.isSignUpModalOpen} position={"center"}>
                <Text style={{color: 'orange', fontSize: 14, textAlign: 'center', fontWeight:'700', marginTop: 20}}>
                    SIGN UP <Text style={{color:'white'}}>FOR A FREE TRIAL</Text>
                </Text>
                <View style={{flexDirection: 'row', marginTop: 15, marginRight:10, marginLeft: 10 }}>
                    <View style={{flex: 0.80}}>
                        <View style={styles.viewTextInput}>
                            <TextInput
                                style={[styles.input, styles.blackFont]}
                                placeholder="(enter your email address)"
                                returnKeyType={"next"}
                                autoCapitalize="none"
                                keyboardType={"default"}
                                placeholderTextColor="#CCC"                                
                                value={this.state.signUpEmail}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({ signUpEmail: text })}
                                editable={true}
                            />
                        </View>
                    </View>
                    <View style={{flex:0.02}}>
                    </View>
                    <TouchableHighlight underlayColor='transparent' style={{flex: 0.15, backgroundColor:'rgba(63,157,204,1)', justifyContent:'center', alignItems:'center'}}>
                        <IconF name='arrow-right' size={16} style={{color: 'white'}}/>
                    </TouchableHighlight>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop: 30}}>
                    <TouchableHighlight underlayColor='transparent' style={{justifyContent:'center', alignItems:'center'}}>
                        <Image source={{uri: 'facebook'}} style={{width: 30, height: 30}} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' style={{marginLeft:10, justifyContent:'center', alignItems:'center'}}>
                        <Image source={{uri: 'linkedin'}} style={{width: 30, height: 30}} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' style={{marginLeft:10, justifyContent:'center', alignItems:'center'}}>
                        <Image source={{uri: 'twitter'}} style={{width: 30, height: 30}} />
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' style={{marginLeft:10, justifyContent:'center', alignItems:'center'}}>
                        <Image source={{uri: 'google'}} style={{width: 30, height: 30}} />
                    </TouchableHighlight>
                </View>
                <View style={{marginTop: 25, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color: 'white', fontSize: 14, fontWeight:'600'}}>
                        PRIVACY POLICY
                    </Text>
                    <Text style={{color: 'white', fontSize: 14, fontWeight:'600'}}>
                        FAQS
                    </Text>
                    <Text style={{color: 'white', fontSize: 14, fontWeight:'600'}}>
                        2017 MDS CPA REVIEW.
                    </Text>
                    <Text style={{color: 'white', fontSize: 14, fontWeight:'600'}}>
                        ALL RIGHTS RESERVED.
                    </Text>
                </View>
            </Modal>
        );
    }

    onPressMenu() {

    }

    renderScene(route, navigator) {
        var self = this;
        return (
            <View style={styles.container}>
                <Spinner visible={this.state.animating} textContent={'Loading ...'} textStyle={{ color: '#FFF' }} />
                <ScrollView contentContainerStyle={{}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image style={styles.bg} resizeMode={'stretch'} source={{ uri: "login", isStatic: true }} />
                        <Image source={{uri: 'logo'}} resizeMode={'contain'} style={{width: 60, height: 60, marginTop: 20}} />
                        <Text style={{color:'rgba(23,57,100,1)', fontWeight:'700', fontSize: 20, marginTop: 20}}>TEST YOUR KNOWLEDGE</Text>
                        <Text style={{color:'white', fontSize:13, marginTop: 20, fontWeight:'700'}}>START A TIMED FLASHCARD REVIEW</Text>
                        <Text style={{color:'white', fontSize:13, marginTop: 5, fontWeight:'700'}}>SESSION TO SEE HOW FAR YOU'VE</Text>
                        <Text style={{color:'white', fontSize:13, marginTop: 5, fontWeight:'700'}}>COME - AND WHAT YOU STILL NEED</Text>
                        <Text style={{color:'white', fontSize:13, marginTop: 5, fontWeight:'700'}}>TO WORK ON.</Text>
                        <View style={{height: 80}}>
                        </View>
                    </View>
                    <View style={styles.viewExtra}>
                    </View>
                    <View style={{marginLeft: 20, marginRight: 20, position:'absolute', right:0, left:0, top: 240, backgroundColor: 'white', borderWidth:1, borderColor:'#EEE', padding: 20}}>
                        <Text style={{color: 'orange', fontSize: 14, textAlign: 'center', fontWeight:'700'}}>
                            SIGN IN TO GET STARTED
                        </Text>
                        <View style={{marginTop:20,alignSelf:'stretch'}}>
                            <Text style={{color:'gray', fontSize:12, marginBottom: 8}}>
                                Email Address
                                <Text style={{color:'red'}}>*</Text>
                            </Text>
                            <View style={styles.viewTextInput}>
                                <TextInput
                                    style={[styles.input, styles.blackFont]}
                                    placeholder=""
                                    returnKeyType={"next"}
                                    autoCapitalize="none"
                                    keyboardType={"default"}
                                    placeholderTextColor="#000"
                                    onFocus={()=>this.setState({isSignUpModalOpen: false})}
                                    value={this.state.email}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ email: text })}
                                    editable={true}
                                />
                            </View>
                        </View>
                        <View style={{marginTop:20,alignSelf:'stretch'}}>
                            <Text style={{color:'gray', fontSize:12, marginBottom: 8}}>
                                Password
                                <Text style={{color:'red'}}>*</Text>
                            </Text>
                            <View style={styles.viewTextInput}>
                                <TextInput
                                    style={[styles.input, styles.blackFont]}
                                    placeholder=""
                                    secureTextEntry={true}
                                    returnKeyType={"next"}
                                    autoCapitalize="none"
                                    keyboardType={"default"}
                                    placeholderTextColor="#000"
                                    onFocus={()=>this.setState({isSignUpModalOpen: false})}
                                    value={this.state.password}
                                    underlineColorAndroid='transparent'
                                    onChangeText={(text) => this.setState({ password: text })}
                                    editable={true}
                                />
                            </View>
                        </View>
                        <Text style={{fontStyle:'italic', color: 'red', fontSize: 11, marginTop: 10}}>
                            * Required fields.
                        </Text>
                        <TouchableHighlight underlayColor='transparent' style={{marginTop: 20}}
                            onPress={()=>this.onPressForgotPassword()}>
                            <Text style={{color: 'rgba(63,157,204,1)', fontWeight:'600', fontSize: 14}}>
                               Forgot your password ?
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='transparent' style={styles.btnLogin}
                            onPress={()=>this.onPressLogin()}>
                            <Text style={{color: 'white', fontWeight:'700'}}>
                                LOGIN
                            </Text>
                        </TouchableHighlight>
                        <View style={{justifyContent:'center', alignItems:'center', marginTop: 20}}>
                            <Text style={{color: 'gray', fontWeight:'600'}}>
                                NOT A STUDENT ?
                            </Text>
                            <TouchableHighlight underlayColor='transparent' style={{marginTop: 10}}
                                onPress={()=>this.onPressEnrollNow()}>
                                <Text style={{color: 'rgba(63,157,204,1)', fontWeight:'900', fontSize: 14, textDecorationLine:'underline'}}>
                                    ENROLL NOW >>
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
                {this.renderSignUpModal()}
            </View>
        );
    }
}