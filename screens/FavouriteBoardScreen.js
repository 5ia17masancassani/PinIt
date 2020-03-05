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
            favourite: "",
            load: false,
            id: "",
            board: {}
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

            db.collection("users").doc("id: " + user.uid).collection("settings").doc("favourite").get().then((querySnapshot) => {
                this.setState({id: querySnapshot.data().id})
                if (querySnapshot.data().id !== undefined) {
                    this.setState({load: true})
                    db.collection("users").doc("id: " + user.uid).collection("boards").doc(querySnapshot.data().id).get().then((querySnapshot) => {
                        this.setState({board: querySnapshot.data()})
                    });
                    db.collection("users").doc("id: " + user.uid).collection("boards").doc(querySnapshot.data().id).collection("notes").get().then((querySnapshot) => {
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
                } else {
                    this.setState({load: false})
                }
            });
        });
    }

    renderNoteButtons() {
        const {navigate} = this.props.navigation;

        return this.state.notes.map((doc) => {
            return (
                <Draggable view={this.state.view} title={doc.data().title} color={doc.data().color}
                           text={doc.data().text}
                           key={doc.id} back={"Favourite"} note={"FavouriteNote"}
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
                {this.state.load && this.state.id !== "" && this.state.id !== undefined &&

                <View style={styles.container}>
                    <View style={styles.header}>

                        <View style={styles.headerPartLeft}>
                            <Text style={{fontSize: 24}}>{this.state.board.title}</Text>
                        </View>


                    </View>

                    <View onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
                        this.setViewXY(x, y, width, height)
                    }} style={styles.body}>
                        <Text
                            style={{
                                fontSize: 24,
                                backgroundColor: '#ffa',
                                height: 50,
                                paddingLeft: 80,
                                paddingRight: 80
                            }}>Drop
                            here to open</Text>

                        {this.renderNoteButtons()}

                    </View>

                    <View style={styles.button}>

                    </View>
                </View>
                }

                {!this.state.load || this.state.id === "" &&
                <View>
                    <View style={styles.headerPart}>
                    </View>

                    <View style={styles.headerPart}>
                        <Text>No Favourite: Set Favourite in Edit Board</Text>
                    </View>
                    <View style={styles.headerPart}>
                    </View>

                </View>
                }

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

    headerPartLeft: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#eea',

    },
    headerPartRight: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#eea',

    },
    button: {
        flex: 1,
        backgroundColor: '#eea',
    },
    buttonHeight: {
        height: 50,
    }
});
