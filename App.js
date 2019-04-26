import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Alert, Button, Dimensions} from 'react-native';

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            gameState: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            player: 1,
        }
    }

    componentDidMount() {
        this.initialGame();
        console.log(this.state.gameState, this.state.player);
    }

    renderIcon = (row, col) => {
        let iconColor = {tintColor: '#eee'};
        let value = this.state.gameState[row] [col];
        switch (value) {
            case 1 :
                return <Image source={require("./src/assets/cancel.png")} style={[iconColor]}/>;
            case -1:
                return <Image source={require("./src/assets/circle.png")} style={[iconColor]}/>;
            default :
                return <View/>
        }
    };


    getWinner = () => {
        let numBox = 3;
        let gameArr = this.state.gameState;
        let sum;

        // check for row =>

        for (var i = 0; i < numBox; i++) {
            sum = gameArr[i][0] + gameArr[i][1] + gameArr[i][2];
            if (sum === 3) {
                return 1;
            }
            else if (sum === -3) {
                return -1;
            }
        }

        // check column =>

        for (var i = 0; i < numBox; i++) {
            sum = gameArr[0][i] + gameArr[1][i] + gameArr[2][i];
            if (sum === 3) {
                return 1;
            }
            else if (sum === -3) {
                return -1;
            }
        }

        //check diagonals =>

        for (var i = 0; i < numBox; i++) {
            sum = gameArr[0][0] + gameArr[1][1] + gameArr[2][2];
            if (sum === 3) {
                return 1;
            }
            else if (sum === -3) {
                return -1;
            }
        }

        for (var i = 0; i < numBox; i++) {
            sum = gameArr[2][0] + gameArr[1][1] + gameArr[0][2];
            if (sum === 3) {
                return 1;
            }
            else if (sum === -3) {
                return -1;
            }
        }

        return 0;
    };
    initialGame = () => {
        this.setState({
            gameState:
                [
                    [0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]
                ],
            player: 1,
        });
    };

    onBoxPress = (row, col) => {
        //Dont allow double select box ...
        console.log(this.state.gameState);
        let value = this.state.gameState[row] [col];
        if (value !== 0) {
            return;
        }

        let player = this.state.player;

        //set icons ...
        let arr = this.state.gameState.slice();
        arr[row][col] = player;
        this.setState({gameState: arr});

        //switch other player ...
        let nexPlayer = (player === 1) ? -1 : 1;
        this.setState({player: nexPlayer});

        let winner = this.getWinner();
        if (winner === 1) {
            // Alert.alert(<Image source={require("./src/assets/cancel.png")}/>);
            Alert.alert("player 1 win");
            this.initialGame();
        }

        else if (winner === -1) {
            // Alert.alert(<Image source={require("./src/assets/circle.png")}/>);
            Alert.alert("player 2 win");
            this.initialGame();
        }
    };

    resetGame = () => {
        this.initialGame();
    };

    render() {
        return (
            <View style={styles.containerAll}>

                <View style={styles.containerBoxRow}>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(0, 0)}>
                        {this.renderIcon(0, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(0, 1)}>
                        {this.renderIcon(0, 1)}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(0, 2)}>
                        {this.renderIcon(0, 2)}
                    </TouchableOpacity>
                </View>

                <View style={styles.containerBoxRow}>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(1, 0)}>
                        {this.renderIcon(1, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(1, 1)}>
                        {this.renderIcon(1, 1)}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(1, 2)}>
                        {this.renderIcon(1, 2)}
                    </TouchableOpacity>
                </View>

                <View style={styles.containerBoxRow}>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(2, 0)}>
                        {this.renderIcon(2, 0)}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(2, 1)}>
                        {this.renderIcon(2, 1)}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => this.onBoxPress(2, 2)}>
                        {this.renderIcon(2, 2)}
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                    <Button title={'restart'} onPress={this.resetGame}/>
                </View>
            </View>
        );
    }
}
const widthBoxes = Dimensions.get('screen').width * 0.3;
const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#393939",
    },
    containerBoxRow: {
        flexDirection: 'row',

    },
    box: {
        width:'30%',
        height:widthBoxes,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eee'
    },
    borderBox: {
        borderWidth: 1,
        borderColor: '#eee'
    },
    icons: {
        tintColor: '#eee',
        width: 100,
    },
    buttonView: {}
});
