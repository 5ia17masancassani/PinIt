import React, {Component} from "react";
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {ColorPicker} from 'react-native-color-picker'


export default class EditNoteScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            size: "",
            color: ""
        }
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
                                     onColorSelected={color => this.setState({color})}
                        />
                    </View>


                </View>

                <View style={styles.button}>
                    <Button
                        title="Save"
                        onPress={() => {
                            this.buttonPressed();
                            navigate('Home');
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
