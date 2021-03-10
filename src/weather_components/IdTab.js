import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native'


const IdTab = (props) => {
    return (
        <View style={styles.rowContainer}>
            <FlatList
                contentContainerStyle={styles.flatlistContainer}
                keyExtractor={(item, index) => `${index}`}
                data={props.titles}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.onChange(index)} style={styles.buttonContainer}>
                            <Text style={[
                                styles.indicatorText,
                                { fontWeight: props.index == index ? 'bold' : 'normal' }
                            ]}>{item}</Text>
                            {
                                props.index == index ?
                                    <View style={styles.underlineContainer} />
                                    : null
                            }
                        </TouchableOpacity>
                    )
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatlistContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rowContainer: {
        width: '100%',
    },
    buttonContainer: {
        margin: 8,
        justifyContent: 'center',
    },
    indicatorText: {
        padding: 4,
        fontSize: 16,
    },
    underlineContainer: {
        width: 8,
        height: 8,
        borderRadius: 4,
        alignSelf: 'center',
        backgroundColor:'#EC6E4C',
    },
})

export default IdTab