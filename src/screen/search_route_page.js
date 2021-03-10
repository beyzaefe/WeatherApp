import React, { Component, Fragment } from 'react'
import { SafeAreaView, Text, View, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import MapViewDirections from 'react-native-maps-directions';
import MapView, {
    Region,
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE,
    LatLng,
    Callout
} from "react-native-maps";
import Icon from 'react-native-vector-icons/Ionicons'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import LottieView from 'lottie-react-native';

const coordinates = [
    { latitude: 40.182846, longitude: 29.067084 },
    { latitude: 39.925533, longitude: 32.866287 }
]
const LATITUDE_DELTA = 15.0;
const LONGITUDE_DELTA = 15.0;
const width = Dimensions.get('window').width; //full width

export default class search_route_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baslangicText: "",
            varisText: "",
            APIKEY: 'API_KEY',
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitude2: coordinates[1].latitude,
            longitude2: coordinates[1].longitude,
            hesapla: false,
            duration: "",
            distance: "",
            startAddress: "",
            endAddress: "",
            anlikKonumKullan: false,
            baslangicAnlikKonumText: false,
            lastLat:null,
            lastLng:null

        }
    }
    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });
    destination = () => ({
        latitude: this.state.latitude2,
        longitude: this.state.longitude2,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    })
    hesapla = async () => {
        this.setState({ hesapla: true })
        await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.baslangicText}&destination=${this.state.varisText}&key=${this.state.APIKEY}`)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.routes.length) {
                    console.log(responseJson.routes[0].legs[0].duration.text)
                    this.setState({ latitude: responseJson.routes[0].legs[0].start_location.lat, longitude: responseJson.routes[0].legs[0].start_location.lng, latitude2: responseJson.routes[0].legs[0].end_location.lat, longitude2: responseJson.routes[0].legs[0].end_location.lng, duration: responseJson.routes[0].legs[0].duration.text, distance: responseJson.routes[0].legs[0].distance.text, startAddress: responseJson.routes[0].legs[0].start_address, endAddress: responseJson.routes[0].legs[0].end_address })
                }
            }).catch(e => { console.log(e) });
        this.setState({ hesapla: true })
    }
    buttonOnPress = () => {
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                Geocoder.init("API_KEY");
                Geocoder.from({
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                })
                    .then(json => {
                        const addressComponent = json.results[0].address_components[0].long_name;
                        this.setState({ baslangicText: addressComponent, baslangicAnlikKonumText: true })
                    })
                    .catch(error => console.warn(error));

            },
            error => console.log(error),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
        );

    }
 
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

                <View style={{ flex: 1.15, marginHorizontal: 23 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Icon name="location-outline" size={30} color="#828282" />
                        <View>
                            <TextInput
                                style={{ width: width - 75, marginTop: 5, marginBottom: 5, borderRadius: 9, borderColor: '#F2F2F2', borderWidth: 2, paddingHorizontal: 15, paddingVertical: 8, }}
                                placeholder="Konumuzu Giriniz..."
                                onChangeText={text => this.setState({ baslangicText: text })}
                                defaultValue={this.state.baslangicAnlikKonumText ? "Konumunuz" : this.state.baslangicText}
                                onFocus={() => this.setState({ anlikKonumKullan: true })}
                                onBlur={() => this.setState({ anlikKonumKullan: false })}
                            />
                            {
                                this.state.anlikKonumKullan ?
                                    <TouchableWithoutFeedback onPress={() => this.buttonOnPress()}>
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 5 }}>
                                            <Text style={{ fontWeight: "600" }}>
                                                Mevcut konumunu kullanmak için tıklayınız.
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    :
                                    null
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Icon name="locate-outline" size={30} color="#828282" />
                        <TextInput
                            style={{ width: width - 75, marginBottom: 10, borderRadius: 9, borderColor: '#F2F2F2', borderWidth: 2, paddingHorizontal: 15, paddingVertical: 8 }}
                            placeholder="Varış Konumunuzu Giriniz..."
                            onChangeText={text => this.setState({ varisText: text })}
                            defaultValue={this.state.varisText}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={() => this.hesapla()}>
                        <View style={{ backgroundColor: '#9b9b9b', height: 30, borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ color: '#FFFFFF', fontWeight: "500", fontSize: 18 }}>Güzergah Ara</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <MapView zoomEnabled={true} region={this.getMapRegion()} style={{ flex: this.state.hesapla ? 4 : 5 }} provider={PROVIDER_GOOGLE} >
                    {this.state.hesapla ?
                        <Fragment>
                            <MapView.Marker coordinate={this.getMapRegion()} pinColor={'#828282'}>
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <LottieView
                                        source={require('../route_animation/start.json')}
                                        autoPlay
                                        loop
                                    />
                                </View>
                            </MapView.Marker>
                            <MapView.Marker coordinate={this.destination()} pinColor={'yellow'} >
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <LottieView
                                        source={require('../route_animation/finish.json')}
                                        autoPlay
                                        loop
                                    />
                                </View>
                            </MapView.Marker>
                            <MapViewDirections
                                origin={this.getMapRegion()}
                                destination={this.destination()}
                                apikey={'API_KEY'}
                                strokeWidth={3}
                                strokeColor="red"
                            />
                        </Fragment>
                        :
                        <></>
                    }
                </MapView>
                {this.state.hesapla ?
                    <View style={{ flex: 1, marginHorizontal: 23, }}>
                        <Fragment>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ fontSize: 18, fontWeight: "600", color: '#ffc107', paddingRight: 15 }}>{this.state.baslangicAnlikKonumText ? "KONUMUNUZ" : this.state.baslangicText.toUpperCase()}</Text>
                                <Icon name="send-outline" size={18} />
                                <Text style={{ fontSize: 18, fontWeight: "600", color: '#ffc107', paddingLeft: 15 }}>{this.state.varisText.toUpperCase()}</Text>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image style={{ width: 40, height: 40, resizeMode: 'center' }} source={require("../route_images/dis.png")} />
                                    <Text style={{ paddingLeft: 10, fontSize: 18, fontWeight: "500" }}>{this.state.distance}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="time-outline" size={28} color="lightslategrey" />
                                    <Text style={{ fontSize: 18, fontWeight: "500", paddingLeft: 5 }}>{this.state.duration.replace('hours', 'saat').replace('mins', 'dakika')}</Text>
                                </View>
                            </View>
                            <TouchableWithoutFeedback onPress={() => alert('Daha geliştirme aşamasında')}>
                                <View style={{ backgroundColor: 'seagreen', borderRadius: 9, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                                    <Text style={{ paddingHorizontal: 16, color: '#FFFFFF', fontSize: 22, fontWeight: "300" }}>Git</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Fragment>
                    </View>

                    :
                    null
                }

            </View>
        )
    }
}
const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        end: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 12,
    },
    button: {},
    text: {
        textAlign: 'center',
    },
    spacer: {
        marginVertical: 7,
    },
});