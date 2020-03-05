import React, {Component} from "react";
import {StyleSheet, Text, View, Button} from 'react-native';
import Draggable from "../components/Draggable";
import * as firebase from "firebase";


export default class BoardScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            notesSize: 0,
            view: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            favourite: ""
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', (playload) => {
            this.getNotes()
        })
    }

    getNotes() {
        firebase.auth().onAuthStateChanged(user => {
            let db = firebase.firestore();
            let stateNotes = [];

            db.collection("users").doc("id: " + user.uid).collection("boards").doc(this.props.navigation.getParam("id")).collection("notes").get().then((querySnapshot) => {
                if (this.state.notesSize !== querySnapshot.size) {
                    querySnapshot.forEach((doc) => {
                        stateNotes.push(doc);
                    })
                    this.setState({
                        notes: stateNotes,
                        boardsSize: querySnapshot.size
                    });
                }
            });
        });
    }

    renderNoteButtons() {
        const {navigate} = this.props.navigation;

        return this.state.notes.map((doc) => {
            return (
                <Draggable view={this.state.view} id={this.props.navigation.getParam("id")} title={doc.data().title}
                           key={doc.id} back={"Board"} note={"Note"}
                           color={doc.data().color} text={doc.data().text}
                           navigate={(path, object) => navigate(path, object)}/>
            )
        })
    }

    setViewXY(x, y, width, height) {
        this.setState({
            view: {
                x: x,
                y: y,
                width: width,
                height: height
            }
        })
    }


    render() {
        const {navigate} = this.props.navigation;


        return (
            <View style={styles.container}>
                <View style={styles.header}>

                    <View style={styles.headerPartLeft}>
                        <Text style={{fontSize: 24}}>{this.props.navigation.getParam("board").title}</Text>
                    </View>


                </View>

                <View onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
                    this.setViewXY(x, y, width, height)
                }} style={styles.body}>
                    <Text
                        style={{fontSize: 24, backgroundColor: '#ffa', height: 50, paddingLeft: 80, paddingRight: 80}}>Drop
                        here to open</Text>
                    {this.renderNoteButtons()}

                </View>

                <View style={styles.button}>
                    <View style={{flex: 1}}>
                        <Button
                            title="Add Note"
                            onPress={() => {
                                console.log("damn: "+ this.props.navigation.getParam("id"))
                                navigate('CreateNote', {
                                    id: this.props.navigation.getParam("id"),
                                    back: 'Board'
                                });
                            }}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Button
                            title="Edit"
                            onPress={() => {
                                navigate('EditBoard', {
                                    id: this.props.navigation.getParam("id"),
                                    board: this.props.navigation.getParam("board"),
                                    back: 'Board'
                                });
                            }}
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
        alignItems: 'center',


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
        justifyContent: 'center',
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
