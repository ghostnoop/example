import React, {Component, useState} from 'react';
import {StyleSheet, Animated, TouchableHighlight, TouchableOpacity, Text, View} from 'react-native';
import ModelView from 'react-native-gl-model-view';

const AnimatedModelView = Animated.createAnimatedComponent(ModelView, TouchableOpacity);


export default class GestureControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotateX: new Animated.Value(-90),
            rotateZ: new Animated.Value(0),

            fromXY: undefined,
            valueXY: undefined,
        };


        this.Click1 = false;
        this.Click2 = false;
        this.Click3 = false;
        this.Click4 = false;
        this.times = 0;
        this.pgX = 0;
        this.pgY = 0;

        this.pgXlast = 0;
        this.pgYlast = 0;

        this.pressing = false;
        this.firstXY = false;
        this.firstXYpress = [0, 0];
        this.eventList = [];

    }


    onMoveEnd = () => {
        this.setState({
            fromXY: undefined,
        });

    };

    onMove = e => {
        let {pageX, pageY} = e.nativeEvent,
            {rotateX, rotateZ, fromXY, valueXY} = this.state;
        this.pgX = pageX;
        this.pgY = pageY;



        if (!this.state.fromXY) {
            this.setState({
                fromXY: [pageX, pageY],
                valueXY: [rotateZ.__getValue(), rotateX.__getValue()],
            });
        } else {

            rotateZ.setValue((valueXY[0] + (pageX - fromXY[0]) / 2));
            // rotateX.setValue((valueXY[1] + (pageY - fromXY[1]) / 2));
        }
        if (!this.pressing && !this.firstXY) {
            this.firstXYpress = [rotateX.__getValue(), rotateZ.__getValue()];
            this.firstXY = true;
        }

    };

    _onTap = () => {
        // const delta = 500;
        // const nowtime = new Date().getTime();
        //
        // if (!this.click1) {
        //     this.times = new Date().getTime();
        //     // console.log('click1');
        //     this.click1 = true;
        //
        //     this.pgXlast = this.pgX;
        //     this.pgYlast = this.pgY;
        //
        //     return;
        // }
        //
        // console.log(nowtime - this.times);
        // if (nowtime - this.times > 500) {
        //     console.log('reset');
        //     this.click1 = false;
        //     this.click2 = false;
        //     this.click3 = false;
        //     this.click4 = false;
        //
        // }
        //
        // if (this.click1) {
        //     if (!this.click2) {
        //         // console.log('click2');
        //         this.click2 = true;
        //         return;
        //     }
        //     if (!this.click3) {
        //         this.funTODO();
        //         console.log('click3');
        //         this.click3 = true;
        //         return;
        //     }
        //     if (!this.click4) {
        //         console.log('click4');
        //         this.funTODO();
        //         this.click1 = false;
        //         this.click2 = false;
        //         this.click3 = false;
        //         this.click4 = false;
        //         return;
        //     }
        // }

        // let {rotateX, rotateZ, fromXY, valueXY} = this.state;
        // Animated.timing(rotateZ, {
        //     toValue: 2 * 180,
        //     useNativeDriver: true,
        //     duration: 500,
        // }).start();
    };
    funTODO = () => {

        if (Math.abs(Math.abs(this.pgX) - Math.abs(this.pgXlast)) < 15 && Math.abs(Math.abs(this.pgY) - Math.abs(this.pgYlast)) < 15) {

            console.log('X: ' + Math.abs(Math.abs(this.pgX) - Math.abs(this.pgXlast)));
            console.log('Y: ' + Math.abs(Math.abs(this.pgY) - Math.abs(this.pgYlast)));

            alert('double click');
        }
    };

    _ONPRESS = () => {
        console.log(this.pressing);
        if (this.pressing) {
            this.pressing = false;
            this.firstXY = false;
        } else {
            this.pressing = true;

            const x = Math.abs(Math.abs(this.state.rotateX.__getValue()) - Math.abs(this.firstXYpress[0]));
            const y = Math.abs(Math.abs(this.state.rotateZ.__getValue()) - Math.abs(this.firstXYpress[1]));

            console.log('X: ' + x + ' Y: ' + y);

            if (x <= 0.5 && y <= 0.5) {
                alert('clicked\n' +
                    `x coord = ${this.eventList.locationX}\n` +
                    `y coord = ${this.eventList.locationY}\n`);
                // console.log(`x coord = ${evt.nativeEvent.locationX}`);
            }

        }

    };


    render() {
        let {rotateZ, rotateX, fromXY} = this.state;
        let {count, timeFirst} = this.state;

        function handlePress(evt) {
            // console.log(`x coord = ${evt.nativeEvent.locationX}`);
            console.log(evt.nativeEvent.position);

        }

        return (
            <AnimatedModelView
                model={{
                    uri: 'ball.obj',
                }}
                texture={{
                    uri: 'Earth_diff_reverse_v2.jpg',
                }}
                onStartShouldSetResponder={() => true}
                onResponderRelease={this.onMoveEnd}
                onResponderMove={this.onMove}
                animate={!!fromXY}
                onPress={this._ONPRESS()}
                // onTouchStart={(e) => {console.log('touchMove',e.nativeEvent)}}
                onTouchStart={(e) => {
                    this.eventList = e.nativeEvent;
                }}
                // onClick={this._onTap()}
                tint={{r: 1.0, g: 1.0, b: 1.0, a: 1.0}}
                scale={0.06}
                rotateX={rotateX}
                rotateZ={rotateZ}
                translateZ={-5}
                style={styles.container}

            />

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});
