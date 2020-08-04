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
            rotateZ.setValue(valueXY[0] + (pageX - fromXY[0]) / 2);
            rotateX.setValue(valueXY[1] + (pageY - fromXY[1]) / 2);
        }
    };

    _onTap = () => {
        const delta = 500;
        const nowtime = new Date().getTime();

        if (!this.click1) {
            this.times = new Date().getTime();
            // console.log('click1');
            this.click1 = true;

            this.pgXlast = this.pgX;
            this.pgYlast = this.pgY;

            return;
        }

        console.log(nowtime - this.times);
        if (nowtime - this.times > 500) {
            console.log('reset');
            this.click1 = false;
            this.click2 = false;
            this.click3 = false;
            this.click4 = false;

        }

        if (this.click1) {
            if (!this.click2) {
                // console.log('click2');
                this.click2 = true;
                return;
            }
            if (!this.click3) {
                this.funTODO();
                console.log('click3');
                this.click3 = true;
                return;
            }
            if (!this.click4) {
                console.log('click4');
                this.funTODO();
                this.click1 = false;
                this.click2 = false;
                this.click3 = false;
                this.click4 = false;
                return;
            }
        }

    };
    funTODO = () => {

        if (Math.abs(Math.abs(this.pgX) - Math.abs(this.pgXlast)) < 15 && Math.abs(Math.abs(this.pgY) - Math.abs(this.pgYlast)) < 15) {

            console.log('X: ' + Math.abs(Math.abs(this.pgX) - Math.abs(this.pgXlast)));
            console.log('Y: ' + Math.abs(Math.abs(this.pgY) - Math.abs(this.pgYlast)));

            alert('double click');
        }
    };


    render() {
        let {rotateZ, rotateX, fromXY} = this.state;
        let {count, timeFirst} = this.state;


        return (
            <AnimatedModelView
                model={{
                    uri: 'ball.obj',
                }}
                texture={{
                    uri: 'testv.png',
                }}
                onStartShouldSetResponder={() => true}
                onResponderRelease={this.onMoveEnd}
                onResponderMove={this.onMove}
                animate={!!fromXY}
                onClick={this._onTap()}
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
