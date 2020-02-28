import React, {Component} from "react";
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    login = () => {
        firebase
            .auth() // create new user
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => console.log("user signed in"))
            .catch(error => console.error("could not sign in user: ", error))
    };

    render() {
        return (
            <View style={styles.container}>

                <Text>E-Mail:</Text>
                <TextInput
                    style={{height: 40, width: 150, marginTop: 20, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />
                <Text>Password:</Text>
                <TextInput
                    style={{height: 40, width: 150, marginTop: 20, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={password => this.setState({password})}
                    value={this.state.password} secureTextEntry={true}
                />
                <Button
                    title="Login"
                    onPress={this.login}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});