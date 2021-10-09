import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import WebView from "react-native-webview";
import { API_URL_PROD } from '@env';

export default function SetuAAScreen({ navigation, route }) {
  // console.log('Dashboard', navigation, route);
  const webviewRef = useRef(null);
  const chatbotURL = `https://sara-zen.vercel.app/`;
  const redirect_url = 'https://infy-money-nodejs.herokuapp.com/api/redirect';

  const onNavigation = (navState) => {
    console.log(redirect_url, 'navState', navState);
    console.log(navState.url === redirect_url);
    if (navState.url === redirect_url) {
      navigation.navigate("StartScreen");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            uri: chatbotURL,
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainer}
            />
          )}
          ref={webviewRef}
          onNavigationStateChange={onNavigation}
          style={styles.margin}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  margin: {
    marginTop: 50,
  },
});
