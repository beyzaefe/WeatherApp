import React from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const CardIcon = (props) => {
    //console.log(props)
    return (
        <View style={[
            styles.container,
            props.containerStyle
        ]}>
            <Icon
                name={props.iconName}
                color='#EC6E4C'
                size={24}
            />
            <Text style={styles.text1}>{props.title}</Text>
            <Text style={styles.text2}>{props.value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    text1: {
        fontSize: 13,
        fontWeight: "500",
        marginVertical: 6,
        color: 'black'
    },
    text2: {
        fontSize: 14,
        color: '#707070'
    }
})

export default CardIcon;