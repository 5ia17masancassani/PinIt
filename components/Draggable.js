import React, {Component} from "react";
import {
    StyleSheet,
    View,
    PanResponder,
    Animated,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback, Button
} from "react-native";

export default class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY()
        };
    }

    componentWillMount() {

        this._val = {x: 0, y: 0};

        this.state.pan.addListener((value) => this._val = value);

        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
                this.state.pan.setValue({x: 0, y: 0});
            },

            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y},
            ]),
            onPanResponderTerminate: (evt, gestureState) => {
                console.log( "Another component has become the responder, so this gesture should be cancelled")
            },
            onPanResponderRelease: (e, {dx, dy}) => {
                //TODO: set boundaries
                console.log("Dx: " + dx + "Dy: " + dy)
                Animated.spring( this.state.pan, {
                    toValue: 0,
                    bounciness: 50
                }).start();
                this.state.pan.flattenOffset();

            },
        });

    }

    navigateToNote = () => {
        this.props.navigate('Note');
    }

    render() {

        const panStyle = {
            transform: this.state.pan.getTranslateTransform(),
            backgroundColor: this.props.color
        }

        return (

                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[panStyle, styles.circle]}
                    >
                        <Text>{this.props.title}</Text>
                    </Animated.View>

        );
    }
}

let CIRCLE_RADIUS = 50;
let styles = StyleSheet.create({
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        alignItems: 'center',
        justifyContent: 'center'
    }
});