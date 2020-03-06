import React, {Component} from "react";
import {StyleSheet, Text, View, Button, TextInput, Switch} from 'react-native';
import * as firebase from "firebase";


export default class EditBoardScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            size: "",
            favourite: false
        }
    }

    componentDidMount() {
        this.setState({
            title: this.props.navigation.getParam("board").title,
            size: this.props.navigation.getParam("board").size,
        })

    }

    buttonPressed = () => {

        firebase.auth().onAuthStateChanged(user => {
            let db = firebase.firestore();

            db.collection("users").doc("id: " + user.uid).collection("boards").doc(this.props.navigation.getParam("id")).set({
                title: this.state.title,
                size: this.state.size,

            })
                .then(function () {
                    console.log("Ok");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

            if (this.state.favourite) {
                db.collection("users").doc("id: " + user.uid).collection("settings").doc("favourite").set({
                    id: this.props.navigation.getParam("id"),
                })
                    .then(function () {
                        console.log("Ok");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            } else {
                db.collection("users").doc("id: " + user.uid).collection("settings").doc("favourite").set({
                    id: ""
                })
                    .then(function () {
                        console.log("Ok");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            }
        });
    };

    deleteBoard() {
        let db = firebase.firestore();
        const {navigate} = this.props.navigation;

        firebase.auth().onAuthStateChanged(user => {
            db.collection("users").doc("id: " + user.uid).collection("boards").doc(this.props.navigation.getParam("id")).delete().then(function () {
                console.log("Board successfully deleted!");
                db.collection("users").doc("id: " + user.uid).collection("settings").doc("favourite").set({
                    id: ""
                })
                    .then(function () {
                        navigate('Boards')
                        console.log("Ok");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });

            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        })
    }


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
                            maxLength={1}
                            keyboardType={'numeric'}
                            onChangeText={size => this.setState({size})}
                            value={this.state.size}
                        />
                    </View>

                </View>

                <View style={styles.body}>

                    <View style={styles.bodyPartLeft}>
                        <Text style={styles.flexText}>Favourite:</Text>
                    </View>

                    <View style={styles.bodyPartRight}>
                        <Switch value={this.state.favourite} onValueChange={() => {
                            if (this.state.favourite) {
                                this.setState({favourite: false})
                            } else {
                                this.setState({favourite: true})
                            }

                        }}/>
                    </View>


                </View>

                <View style={styles.button}>

                    {this.state.title !== "" && this.state.size !== "" && this.state.size !== "0" &&
                    <Button
                        title="Save"
                        onPress={() => {
                            this.buttonPressed();
                            navigate(this.props.navigation.getParam("back"), {
                                board: {
                                    title: this.state.title,
                                    size: this.state.size
                                }
                            });
                        }}
                    />
                    }
                    <Button
                        title="Delete"
                        onPress={() => {
                            this.deleteBoard()
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
