import React, {Component} from "react";
import {StyleSheet, Text, View, Button} from 'react-native';
import Draggable from "../components/Draggable";
import * as firebase from "firebase";


export default class FavouriteBoardScreen extends Component {

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
                <Draggable infos={this.state.infos} title={doc.data().title} color={doc.data().color}
                           navigate={(path) => navigate(path)}/>
            )
        })
    }

    setViewXY(x, y, width, height) {
        console.log("X: " + x + "/Y: " + y + "/Width: " + width + "/Height: " + height)
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
                    <View style={styles.headerPart}>
                    </View>

                    <View style={styles.headerPart}>
                        <Text>Favourite</Text>
                    </View>

                    <View style={styles.headerPart}>
                        <Button
                            title="Edit"
                            onPress={() => {
                                navigate('EditBoard', {
                                    id: this.props.navigation.getParam("id"),
                                    board: this.props.navigation.getParam("board")
                                });
                            }}
                        />
                    </View>

                </View>

                <View onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
                    this.setViewXY(x, y, width, height)
                }} style={styles.body}>
                    <Button
                        title="Open"
                        onPress={() => {
                            navigate('Note');
                        }}
                    />

                    {this.renderNoteButtons()}

                </View>

                <View style={styles.button}>
                    <Button
                        title="Add Note"
                        onPress={() => {
                            navigate('CreateNote', {
                                id: this.props.navigation.getParam("id")
                            });
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
        backgroundColor: '#afa',
    },
    flexText: {
        fontSize: 24
    },
    body: {
        flex: 10,
        fontSize: 24,
        backgroundColor: '#eea',

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
        backgroundColor: '#aaa',
    },
    headerBodyRight: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#bbb',
    },

    headerPart: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',

    },
    button: {
        flex: 1,
        backgroundColor: '#faa',
    },
    buttonHeight: {
        height: 50,
    }
});
