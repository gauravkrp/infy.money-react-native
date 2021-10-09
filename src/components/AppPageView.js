import React from 'react';
import { Platform, StyleSheet, StatusBar, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Appbar, ActivityIndicator, Button } from 'react-native-paper'; 
import SafeAreaView from 'react-native-safe-area-view';
import Icon from './Icon';
import { theme } from '../core/theme';
import Spacer from "./Spacer";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const userFirstName = 'Gaurav';

const appBarTitle = {
  'Home': `Welcome`,
  'Profile': 'Profile',
  'Assets': 'Assets',
  'Liabilities': 'Liabilities',
}

export const CustomHeaderBar = ({ navigation, back, route }) => {
  // console.log(navigation, route);
  // console.log('Height on: ', getStatusBarHeight(), Platform.OS, StatusBar.currentHeight);
  return (
    <Appbar.Header style={styles.headerContainer}>
      {back ? 
        <Button compact={true} onPress={navigation.goBack}><Icon name="arrow-left" size={28} /></Button> :
        <Button compact={true}><Icon name="hamburger" size={28} /></Button>
      }
      <Text 
        numberOfLines={1}
        accessible
        accessibilityTraits="header"
        accessibilityRole={Platform.OS === 'web' ? 'heading' : 'header'}
        style={styles.appBarTitle}
      >
        {appBarTitle[route.name]}
        {route.name === 'Home' && <Text style={{ fontFamily: 'semiBold' }}>{` ${userFirstName}`}</Text>}
      </Text>
      <Button compact={true}><Icon name="bell" size={28} /></Button>
    </Appbar.Header>
  );
}

const AppPageView = ({ children, isLoading }) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <View style={[styles.container, { marginBottom: tabBarHeight, paddingBottom: 10 }]}>
        {isLoading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : children}
        <Spacer height={10} />
      </View>
    </ScrollView>
  );
}

export default AppPageView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    // marginTop: getStatusBarHeight(), // Platform.OS === 'ios' ? 44 : StatusBar.currentHeight
    backgroundColor: '#ffffff',
    elevation: 0,
    paddingHorizontal: 8
  },
  appBarTitle: {
    fontSize: Platform.OS === 'ios' ? 17 : 20,
    flex: 1,
    paddingHorizontal: 12,
    fontFamily: 'medium'
  },
});

