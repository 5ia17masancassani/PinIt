import React, {Component} from "react";
import {Button, StyleSheet, View} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'PinIt' : 'SignUp')
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Button
                    title="Sign Up"
                    onPress={() => {
                        navigate('SignUp');
                    }}
                />
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });