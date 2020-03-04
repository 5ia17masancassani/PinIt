import React, {Component} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import * as firebase from "firebase";

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    signUp = () => {
        firebase
            .auth() // create new user
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => console.log("user created in"))
            .catch(error => console.error("could not create user: ", error))

    };

    render() {

        const {navigate} = this.props.navigation;

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
                    title="Sign Up"
                    onPress={this.signUp}
                />

                <Button
                    title="Already have an account?"
                    onPress={() => {
                        navigate('Login');
                    }}
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