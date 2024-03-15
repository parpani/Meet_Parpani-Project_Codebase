/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import React,{useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import { SafeAreaView, ScrollView, StatusBar,StyleSheet, Text, useColorScheme, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
//import SystemNavigationBar from 'react-native-system-navigation-bar';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(()=>{

    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('#ffffff');
    StatusBar.setBarStyle('dark-content');
    
    //SystemNavigationBar.setNavigationColor('#FF0000');
    forNavigationColor();
  });

  const forNavigationColor=async()=>{
    try{
      const response = await changeNavigationBarColor('#ffffff',true);
      console.log(response);// {success: true}
      }catch(e){
      console.log(e);// {success: false}
      }
  }

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='FirstPage'>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Upstox Holding',
            headerShown: true,
            headerTitleAlign:'left',
            headerStyle:{
              backgroundColor: '#44225a',
            },
            headerTitleStyle:{
              color: '#ffffff'
            },
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
