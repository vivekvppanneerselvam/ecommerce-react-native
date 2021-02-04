import React, { useEffect, useState } from 'react';
import {
    StyleSheet, Text, View, TextInput,
    Button, TouchableOpacity, Image, Alert
} from 'react-native';
import { AuthContext } from '../helpers/index'
//import { Map, fromJS } from 'immutable'
import { connect } from 'react-redux';
import { validateExistence, validateEmail, validateLength, validateLowerCase, validateUpperCase } from '../utils/validation'
import { postToken } from '../redux/action/tokenAction'

function SignIn(props) {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const { signIn } = React.useContext(AuthContext);

    function handleOnChange(id, value) {
        setState((prevState) => {
            prevState[id] = value
            return ({ ...prevState })
        })
    }
    useEffect(() => {
        console.log("props.token", props.token)
        if (props.token) {
            signIn(props.token)
        }
    }, [props.token])

    const onClickListener = (viewId) => {
        if (viewId === 'login') {
            props.postToken(state.email, state.password).then(res => {
                console.log(res)
                signIn(res.data)
                //props.navigation.navigate("Home");
            }).catch(error => {
                Alert.alert('Error', error, [{ text: 'Okay' }]);
            })
        } else if (viewId === 'register') {
            props.navigation.navigate("Register");
        } else {

        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/2/" }} />
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(val) => handleOnChange('email', val)} />
                <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/email.png' }} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(val) => handleOnChange('password', val)} />
                <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/key.png' }} />
            </View>
            <TouchableOpacity style={styles.btnForgotPassword} onPress={() => onClickListener('restore_password')}>
                <Text style={styles.btnText}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener('login')}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => onClickListener('register')}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
        </View>
    );

}

const mapStateToProps = (state) => {
    return {
        token: state.token.user_token
    }
}
export default connect(mapStateToProps, { postToken })(SignIn)

const resizeMode = 'center';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#00b5ec",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        resizeMode,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    }
});

