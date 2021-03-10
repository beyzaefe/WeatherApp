import React, { Component } from 'react'
import { Text, View, ScrollView, RefreshControl, ImageBackground, StyleSheet } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import WeatherCurrent from '../weather_components/Weather'
import WeatherDetails from '../weather_components/Details'
import IdTab from '../weather_components/IdTab'
import WeatherHourly from '../weather_components/WeatherHourly'
import WeatherDaily from '../weather_components/WeatherDaily';
import { roundCelsius, getWeatherIcon } from '../weather_utils/Weather_Function'

export default class weather_search_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            temperature: 0,
            weatherCondition: null,
            error: null,
            api_key: 'weather_api_key',
            latitude: null,
            longitude: null,
            country: "",
            cityName: "",
            units: 'metric',
            icon: " ",
            sunrise: 0,
            sunset: 0,
            wind: 0,
            humidity: 0,
            refreshing: false,
            indicatorIndex:0,
            dataHourly:[],
            dataDaily:[]
        }
    }
    componentDidMount() {
        Geolocation.getCurrentPosition(
            position => {
                this.fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            error => {
                this.setState({
                    error: 'Error Getting Weather Conditions'
                });
            }
        );
    }

    fetchWeather(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${this.state.api_key}&units=${this.state.units}`)
            .then(res => res.json())
            .then(json => {
                console.log(json.hourly.slice(0, 24))
                this.setState({
                    temperature: json.current.temp,
                    weatherCondition: json.current.weather[0].main,
                    country: json.timezone,
                    icon: json.current.weather[0].icon,
                    sunrise: json.current.sunrise,
                    sunset: json.current.sunset,
                    wind: json.current.wind_speed,
                    humidity: json.current.humidity,
                    dataHourly: json.hourly.slice(0, 24),
                    dataDaily: json.daily.slice(1, 8),
                    isLoading: false,
                    refreshing: false
                });
            });
    }
    onRefresh = () => {
        this.setState({ refreshing: true })
        Geolocation.getCurrentPosition(
            position => {
                this.fetchWeather(position.coords.latitude, position.coords.longitude);

            },
            error => {
                console.log('error', error)
            }
        );

    }
    render() {
        const { isLoading, refreshing,indicatorIndex,dataHourly, dataDaily } = this.state;
        return (
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                style={{ backgroundColor: '#FFFFFF' }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => this.onRefresh()}
                    />
                }
            >
                {
                    isLoading ? (
                        <Text>Fetching The Weather</Text>
                    )
                        :
                        (
                            <View style={styles.container}>
                                <WeatherCurrent
                                    image={getWeatherIcon(this.state.icon)}
                                    description={this.state.weatherCondition}
                                    temperature={roundCelsius(this.state.temperature)}
                                    location={this.state.country}
                                />
                                <View>
                                    <WeatherDetails
                                        sunrise={this.state.sunrise}
                                        sunset={this.state.sunset}
                                        wind={this.state.wind}
                                        humidity={this.state.humidity}
                                    />
                                    <IdTab
                                        titles={['Today', 'Next 7 Days']}
                                        onChange={(index) => this.setState({indicatorIndex:index})}
                                        index={indicatorIndex}
                                    />
                                    {
                                        indicatorIndex == 0 ?
                                            <WeatherHourly
                                                data={dataHourly}
                                            />
                                            :
                                            
                                            <WeatherDaily
                                                data={dataDaily}
                                            />
                                    }
                                </View>
                                <View style={{ height: 12 }} />
                            </View>

                        )
                }
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});
