import React, {Component} from "react";
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {ColorPicker, fromHsv} from 'react-native-color-picker'
import * as firebase from "firebase";


export default class CreateNoteScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            color: "#ff0000"
        }
    }

    buttonPressed = () => {

        firebase.auth().onAuthStateChanged(user => {
            let db = firebase.firestore();

            db.collection("users").doc("id: " + user.uid).collection("boards").doc(this.props.navigation.getParam("id")).collection("notes").doc("id: " + this.state.title).set({
                title: this.state.title,
                color: this.state.color,
                text: ""

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

                <View style={styles.bodyUp}>

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

                <View style={styles.bodyDown}>

                    <View style={styles.bodyPartLeft}>
                        <Text style={styles.flexText}>Color:</Text>
                    </View>

                    <View style={styles.bodyPartRight}>
                        <ColorPicker style={{height: 200, width: 200}}
                                     defaultColor={'#f00'}
                                     onColorChange={(o) => this.setState({color: fromHsv({h: o.h, s: o.s, v: o.v})})}
                        />
                    </View>


                </View>

                <View style={styles.button}>
                    {this.state.title !== "" &&
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
    bodyUp: {
        flex: 2,
        fontSize: 24,
        flexDirection: 'row',
    },
    bodyDown: {
        flex: 4,
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
        flex: 3,
    }
});