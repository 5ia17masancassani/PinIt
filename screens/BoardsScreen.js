import React, {Component} from "react";
import {StyleSheet, View, Button, ScrollView} from 'react-native';
import * as firebase from "firebase";


export default class BoardsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            boardsSize: 0,
            reload: false
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
            let stateBoards = [];

            db.collection("users").doc("id: " + user.uid).collection("boards").get().then((querySnapshot) => {
                if (this.state.boardsSize !== querySnapshot.size) {
                    querySnapshot.forEach((doc) => {
                        stateBoards.push(doc);
                    })
                    this.setState({
                        boards: stateBoards,
                        boardsSize: querySnapshot.size
                    });
                }
            });
        });
    }

    renderBoardButtons() {
        const {navigate} = this.props.navigation;

        return this.state.boards.map((doc) => {
            return (
                <Button
                    title={doc.data().title}
                    key={doc.id}
                    onPress={() => {
                        navigate('Board', {id: doc.id, board: doc.data()});
                    }}
                />
            )
        })
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>

                <View style={styles.body}>
                    <ScrollView style={{backgroundColor: '#ffb'}}>
                        {this.renderBoardButtons()}
                    </ScrollView>
                </View>

                <View style={styles.button}>

                    <Button
                        title="Add Board"
                        onPress={() => {
                            navigate('CreateBoard', {back: 'Boards'});
                        }}
                    />
                </View>

            </View>
        )
    }
    ;
}

const
    styles = StyleSheet.create({
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
            flex: 8,
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
            flex: 1
        }
    });
