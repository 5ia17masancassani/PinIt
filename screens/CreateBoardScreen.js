import React, {Component} from "react";
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import * as firebase from 'firebase';

export default class CreateBoardScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            size: "",
        }
    }

    buttonPressed = () => {

        firebase.auth().onAuthStateChanged(user => {
            let db = firebase.firestore();

            db.collection("users").doc("id: " + user.uid).collection("boards").doc("id: " + this.state.title).set({
                title: this.state.title,
                size: this.state.size,

            })
                .then(function () {
                    console.log("Ok");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        });

    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>

                <View style={styles.body}>

                    <View style={styles.bodyPartLeft}>
                        <Text style={styles.flexText}>Title:</Text>
                    </View>

                    <View style={styles.bodyPartRight}>
                        <TextInput
                            style={{height: 40, width: 150, marginTop: 20, borderColor: 'gray', borderBottomWidth: 2}}
                            maxLength={16}
                            onChangeText={title => this.setState({title})}
                            value={this.state.title}
                        />
                    </View>


                </View>

                <View style={styles.body}>

                    <View style={styles.bodyPartLeft}>
                        <Text style={styles.flexText}>Size:</Text>
                    </View>

                    <View style={styles.bodyPartRight}>
                        <TextInput
                            style={{height: 40, width: 150, marginTop: 20, borderColor: 'gray', borderBottomWidth: 2}}
                            keyboardType={'numeric'}
                            maxLength={1}
                            onChangeText={size => this.setState({size})}
                            value={this.state.size}
                        />
                    </View>


                </View>

                <View style={styles.button}>
                    {this.state.title !== "" && this.state.size !== "" && this.state.size !== "0" &&
                    <Button
                        title="Save"
                        onPress={() => {
                            this.buttonPressed();
                            navigate(this.props.navigation.getParam("back"));
                        }}
                    />
                    }

                </View>
            </View>
        )
    }
    ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffa',
        alignItems: 'center',

    },
    headerText: {
        fontSize: 32
    },
    header: {
        flex: 1,
    },
    flexText: {
        fontSize: 24
    },
    body: {
        flex: 3,
        fontSize: 24,
        flexDirection: 'row',
    },
    bodyPartLeft: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        justifyContent: 'center',

    },
    bodyPartRight: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,

    },
    button: {
        flex: 4,
    }
});
