import React, {Component} from "react";
import {Button, StyleSheet, Text, View} from 'react-native';
import * as firebase from "firebase";


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardsSize: 0,
            countNotes: 0
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (playload) => {
            this.getBoards()
        })

    }

    getBoards() {
        firebase.auth().onAuthStateChanged(user => {
            let db = firebase.firestore();
            let countNotes = 0;

            db.collection("users").doc("id: " + user.uid).collection("boards").get().then((querySnapshot) => {

                this.setState({
                    boardsSize: querySnapshot.size
                });
                querySnapshot.forEach((doc) => {
                    db.collection("users").doc("id: " + user.uid).collection("boards").doc(doc.id).collection("notes").get().then((querySnapshot) => {

                        querySnapshot.forEach((doc) => {
                            countNotes++
                        })
                        this.setState({
                            countNotes: countNotes,
                        });

                    });
                })


            });
        });
    }


    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.bodyPart}>
                        <Text style={styles.flexText}>Boards</Text>
                        <Text style={styles.flexText}>{this.state.boardsSize}</Text>
                    </View>
                    <View style={styles.bodyPart}>
                        <Text style={styles.flexText}>Notes</Text>
                        <Text style={styles.flexText}>{this.state.countNotes}</Text>
                    </View>
                </View>

                <View style={styles.button}>
                    <Button
                        title="Create Board"
                        onPress={() => {
                            navigate('CreateBoard', {back: 'Home'});
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
    body: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 24,
    },
    bodyPart: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        height: 200,
    },
    button: {
        flex: 4
    }
});
