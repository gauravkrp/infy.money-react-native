import React, { useState } from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import { StartScreen, ConsentComplete, SetuAAScreen, IBMChatbot, AppScreens } from "./src/screens";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import Icon from './src/components/Icon';
import { CustomHeaderBar } from './src/components/AppPageView';
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from 'expo-blur'; 
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const tabBarIcons = {
  Home: 'home',
  Profile: 'profile',
  Assets: 'assets',
  Liabilities: 'liability',
};

const AppMainNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {        
          // console.log('tabBarIconProps', route, focused, color, size);
          const className = focused ? 'active' : '';
          const color = focused ? '#ffffff' : '#E0E0E0';

          // You can return any component that you like here!
          return (
            <View style={focused ? styles.activeTab : styles.inactiveTab}>
              <Icon name={tabBarIcons[route.name]} className={className} size={size} color={color} />
              {focused && <Text style={styles.activeTabText}>{route.name}</Text>}
            </View>
          );
        },
        header: (props) => <CustomHeaderBar {...props} route={route} name={route.name} />,
        tabBarStyle: { position: 'absolute', height: 64, paddingVertical: 10, marginVertical: 0, boxShadow: 'none' },
        // tabBarBackground: () => (
        //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        // ),
        // tabBarItemStyle: { backgroundColor: 'transparent', height: 60, paddingVertical: 0, },
        // tabBarIconStyle: { backgroundColor: 'pink', height: 60, paddingVertical: 0, },
        // labelStyle: {fontSize:18},
        // tabBarActiveTintColor: '#ffffff',
        // tabBarInactiveTintColor: 'secondary',
        // tabBarActiveBackgroundColor: 'red',
        // tabBarLabelPosition: 'beside-icon'
        tabBarShowLabel: false,
        title: route.name,
      })}
    >
      <Tab.Screen name="Home" component={AppScreens.Dashboard} />
      <Tab.Screen name="Assets" component={AppScreens.Assets} />
      <Tab.Screen name="Liabilities" component={AppScreens.Liabilities} />
      <Tab.Screen name="Profile" component={AppScreens.Profile} />
    </Tab.Navigator>
  )
};

const cacheImages = images => images.map(imgSrc => {
  if (typeof imgSrc === 'string') {
    return Image.prefetch(imgSrc);
  } else {
    return Asset.fromModule(imgSrc).downloadAsync();
  }
});

const cacheFonts = (fonts) => fonts.map(font => Font.loadAsync(font));

const loadAllAssets = async () => {
  const images = cacheImages([
    require('./assets/icon.png'),
    require('./assets/favicon.png'),
    require('./assets/splash.png')
  ]);

  const fonts = cacheFonts([
    { IcoMoon: require('./assets/icomoon/icomoon.ttf') },
    { thin: Inter_100Thin },
    { extraLight: Inter_200ExtraLight },
    { light: Inter_300Light },
    { regular: Inter_400Regular },
    { medium: Inter_500Medium },
    { semiBold: Inter_600SemiBold },
    { bold: Inter_700Bold },
    { extraBold: Inter_800ExtraBold },
    { black: Inter_900Black}
  ]);

  return Promise.all(...images, ...fonts);
}

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // Load the icon font before using it
  // const [fontsLoaded] = useFonts({ IcoMoon: require('./assets/icomoon/icomoon.ttf') });

  if (!isLoadingComplete) return (
    <AppLoading
      startAsync={loadAllAssets}
      onFinish={() => setLoadingComplete(true)}
      onError={console.warn}
    />
  );

  return (
    <SafeAreaProvider>
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="SetuAAScreen" component={SetuAAScreen} />
            <Stack.Screen name="ConsentComplete" component={ConsentComplete} />
            <Stack.Screen name="IBMChatbot" component={IBMChatbot} />
            <Stack.Screen
              name="AppScreens"
              component={AppMainNavigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const tabItemStyle = {
  borderRadius: 16,
  paddingVertical: 12,
  paddingHorizontal: 16,
  height: 42,
  marginBottom: 10,
  fontFamily: 'medium'
}

const styles = StyleSheet.create({
  activeTab: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#9D70FF", 
    ...tabItemStyle
  },
  inactiveTab: {
    ...tabItemStyle,
    flex: 1,
    color: '#696969',
  },
  activeTabText : {
    color: "#ffffff"
  },
  inactiveTabText: {
    color: "#ffffff"
  }
});
