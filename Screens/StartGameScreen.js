import React, {useState} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert 
} from 'react-native';

import Card from '../Components/Card';
import Colors from '../Constants/Colors';
import Input from '../Components/Input';
import NumberContainer from '../Components/NumberContainer';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('');

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue);
        if(isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            );
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(enteredValue);
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if(confirmed) {
        confirmedOutput = (
          <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer>
             {selectedNumber}
            </NumberContainer>
            <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)} />
          </Card>
        );
    }

    return (
       <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}} >
           <View style={styles.screen}>

                <Text style={styles.title}>Start a New Game</Text>

                <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>

                <Input 
                    style={styles.input} 
                    blurOnSubmit
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='number-pad'
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />

                <View style={styles.buttonContainer}>

                    <View style={styles.btn}>
                        <Button 
                            title='Reset' 
                            onPress={resetInputHandler} 
                            color={Colors.accent}
                        />
                    </View>

                    <View style={styles.btn}>
                        <Button 
                            title='Confirm' 
                            onPress={confirmInputHandler} 
                            color={Colors.primary}
                        />
                    </View>

                </View>

                </Card>
              {confirmedOutput}
            </View>
       </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
       flex: 1,
       padding: 10, 
       alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginVertical: 10,
    }, 
    inputContainer: {
      width: 300,
      maxWidth: '80%',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15
    },
    btn: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;