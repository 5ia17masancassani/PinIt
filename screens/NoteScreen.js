import React, {Component} from "react";
import {Button, StyleSheet, View} from 'react-native';


export default class NoteScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>

                <Button
                    title="Edit Note"
                    onPress={() => {
                        navigate('EditNote');
                    }}
                />

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
