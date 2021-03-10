import React, { Component } from 'react'
import { Text, View, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//screens
import search_route_page from './src/screen/search_route_page'
import weather_search_page from './src/screen/weather_search_page'
const Drawer = createDrawerNavigator();
export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer >
          <Drawer.Navigator initialRouteName="Route">
            <Drawer.Screen name="Route" component={search_route_page} />
            <Drawer.Screen name="Weather" component={weather_search_page} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }
}
