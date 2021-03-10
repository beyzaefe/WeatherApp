import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'

const WeatherCurrent = (props) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: props.image }}
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.text1}>{props.location}</Text>
            <Text style={styles.text2}>{props.description}</Text>
            <Text style={styles.text3}>{props.temperature}</Text>
        </View>

    )
}

export default WeatherCurrent;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    image: {
        width: 70,
        height: 70,
        marginVertical: 3,
    },
    text1: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black'
    },
    text2: {
        fontSize: 20,
        color: '#707070',
        marginTop: 4,
    },
    text3: {
        fontSize: 80,
        color: 'black'
    },
});
