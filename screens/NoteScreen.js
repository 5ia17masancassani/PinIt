import React, {Component} from "react";
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import * as firebase from "firebase";

export default class NoteScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            board: {}
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            let db = firebase.firestore();

            db.collection("users").doc("id: " + user.uid).collection("boards").doc(this.props.navigation.getParam("id")).collection("notes").doc(this.props.navigation.getParam("key")).get().then((querySnapshot) => {
                if (this.state.text !== querySnapshot.data().text) {
                    this.setState({
                        text: querySnapshot.data().text
                    });
                }
            });
        });


        this.setState({
            text: this.props.navigation.getParam("text")
        })

    }

    buttonPressed = () => {

        firebase.auth().onAuthStateChanged(user => {
            let db = firebase.firestore();

            db.collection("users").doc("id: " + user.uid).collection("boards").doc(this.props.navigation.getParam("id")).collection("notes").doc(this.props.navigation.getParam("key")).set({
                title: this.props.navigation.getParam("title"),
                color: this.props.navigation.getParam("color"),
                text: this.state.text

            })
                .then(function () {
                    console.log("Ok");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        });

    };

    addToCalendar = () => {
        

    };

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerPart}>
                    </View>

                    <View style={styles.headerPart}>
                        <Text>{this.props.navigation.getParam("title")}</Text>
                    </View>

                    <View style={styles.headerPart}>
                        <Button
                            title="Edit"
                            onPress={() => {
                                navigate('EditNote', {
                                    id: this.props.navigation.getParam("id"),
                                    title: this.props.navigation.getParam("title"),
                                    color: this.props.navigation.getParam("color"),
                                    text: this.state.text,
                                    key: this.props.navigation.getParam("key")
                                });
                            }}
                        />
                    </View>

                </View>

                <View style={styles.body}>
                    <TextInput style={{marginLeft: 10, marginRight: 10}}
                               multiline={true}
                               numberOfLines={4}
                               placeholder={"Notes..."}
                               borderWidth={1}
                               onChangeText={(text) => this.setState({text})}
                               value={this.state.text}/>
                </View>

                <View style={styles.button}>
                    <View style={{flex: 1}}>
                        <Button
                            title="Save"
                            onPress={() => {
                                this.buttonPressed();
                                navigate(this.props.navigation.getParam("back"));
                            }}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            title="Add to Calendar"
                            onPress={this.addToCalendar}
                        />
                    </View>
                </View>

            </View>
        )
    }
    ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eea',
        alignItems: 'stretch',

    },
    headerText: {
        fontSize: 32
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#eea',
    },
    flexText: {
        fontSize: 24
    },
    body: {
        flex: 10,
        fontSize: 24,
        backgroundColor: '#eea',
        alignItems: 'stretch',


    },
    drag: {
        flex: 9,
        justifyContent: 'center',
        fontSize: 24,
        backgroundColor: '#eea',

    },
    headerBodyLeft: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eea',
    },
    headerBodyRight: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eea',
    },

    headerPart: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eea',

    },
    button: {
        flex: 1,
        backgroundColor: '#eea',
        flexDirection: 'row',
    },
    buttonHeight: {
        height: 50,
    }
});
