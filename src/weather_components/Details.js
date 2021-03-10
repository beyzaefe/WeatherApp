
import React from 'react'
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native'
import Moment from 'moment'
import CardIcon from './CardIcon'
import {moment12Hour} from '../weather_utils/Weather_Function'


const windowWidth = Dimensions.get('window').width
const WeatherDetails = (props) => {
    const cardWidth = ((windowWidth - 32 )- 24) / 4
    //console.log(cardWidth)
    return (
        <View style={styles.container}>
            <CardIcon
                containerStyle={{ width: cardWidth }}
                iconName='sunrise'
                title='Sunrise'
                value={moment12Hour(props.sunrise)}
            />
            <CardIcon
                containerStyle={{ width: cardWidth }}
                iconName='sunset'
                title='Sunset'
                value={moment12Hour(props.sunset)}
            />
            <CardIcon
                containerStyle={{ width: cardWidth }}
                iconName='wind'
                title='Wind'
                value={`${props.wind} m/s`}
            />
            <CardIcon
                containerStyle={{ width: cardWidth }}
                iconName='droplet'
                title='Humidity'
                value={`${props.humidity}%`}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default WeatherDetails;