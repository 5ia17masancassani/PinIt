import React, {Component} from "react";
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {ColorPicker, fromHsv} from 'react-native-color-picker'
import * as firebase from "firebase";


export default class EditNoteScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            color: ""
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.navigation.getParam("title"),
        })
    }

    buttonPressed = () => {

        firebase.auth().onAuthStateChanged(user => {
            let db = firebase.firestore();

            db.collection("users").doc("id: " + user.uid).collection("boards").doc(this.props.navigation.getParam("id")).collection("notes").doc(this.props.navigation.getParam("key")).set({
                title: this.state.title,
                color: this.state.color,
                text: this.props.navigation.getParam("text")

            })
                .then(function () {
                    console.log("Ok");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        });

    };

    deleteNote() {
        let db = firebase.firestore();
        const {navigate} = this.props.navigation;

        firebase.auth().onAuthStateChanged(user => {
            db.collection("users").doc("id: " + user.uid).collection("boards").doc(this.props.navigation.getParam("id")).collection("notes").doc(this.props.navigation.getParam("key")).delete().then(function () {
                console.log("Note successfully deleted!");
                navigate('Boards')
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        })
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>

                <View style={styles.bodyTitle}>

                    <View style={styles.bodyPartLeft}>
                        <Text style={styles.flexText}>Title:</Text>
                    </View>

                    <View style={styles.bodyPartRight}>
                        <TextInput
                            style={{height: 40, width: 150, marginTop: 20, borderColor: 'gray', borderBottomWidth: 2}}
                            maxLength={10}
                            onChangeText={title => this.setState({title})}
                            value={this.state.title}
                        />
                    </View>

                </View>

                <View style={styles.bodyColor}>

                    <View style={styles.bodyPartLeft}>
                        <Text style={styles.flexText}>Color:</Text>
                    </View>

                    <View style={styles.bodyPartRight}>
                        <ColorPicker style={{height: 200, width: 200}}
                                     defaultColor={this.props.navigation.getParam("color")}
                                     onColorChange={(o) => this.setState({color: fromHsv({h: o.h, s: o.s, v: o.v})})}
                        />
                    </View>


                </View>

                <View style={styles.button}>
                    <Button
                        title="Save"
                        onPress={() => {
                            this.buttonPressed();
                            navigate('Note', {
                                title: this.state.title,
                                color: this.state.color,
                                text: this.props.navigation.getParam("text")
                            });
                        }}
                    />
                    <Button
                        title="Delete"
                        onPress={() => {
                            this.deleteNote()
                        }}
                    />
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
    bodyTitle: {
        flex: 1,
        fontSize: 24,
        flexDirection: 'row',
        paddingBottom: 50,
    },
    bodyColor: {
        flex: 6,
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
