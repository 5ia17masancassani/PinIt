import React, {Component} from "react";
import {Animated, PanResponder, StyleSheet, Text} from "react-native";

export default class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            view: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
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
                //this.state.pan.setValue({x: 0, y: 0});
            },

            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y},
            ]),
            onPanResponderRelease: (e, g) => {
                if (g.moveY < (this.props.view.y + 100) || g.moveX < 50 || g.moveX > this.props.view.width - 30 || g.moveY > (this.props.view.y + this.props.view.height + 80)) {
                    Animated.spring(this.state.pan, {
                        toValue: 0,
                        bounciness: 10
                    }).start();

                } else if (g.moveY > (this.props.view.y + 100) && g.moveY < (this.props.view.y + 160)) {
                    this.navigateToNote();
                }

                this.state.pan.flattenOffset();

            },
        });

    }

    navigateToNote = () => {
        this.props.navigate(this.props.note, {
            id: this.props.id,
            title: this.props.title,
            color: this.props.color,
            text: this.props.text,
            back: this.props.back,
            key: this.props.noteId
        });
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

        const panStyle = {
            transform: this.state.pan.getTranslateTransform(),
            backgroundColor: this.props.color
        }

        return (
            <Animated.View
                {...this.panResponder.panHandlers}
                style={[panStyle, styles.circle]}
                onLayout={({nativeEvent: {layout: {x, y, width, height}}}) => {
                    this.setViewXY(x, y, width, height)
                }}
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