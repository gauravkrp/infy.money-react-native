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
  const anumatiURL = route.params.anumatiURL;
  const redirect_url = `${API_URL_PROD}/redirect`;

  const onNavigation = (navState) => {
    console.log(redirect_url, 'navState', navState);
    console.log(navState.url === redirect_url);
    if (navState.url === redirect_url) {
      navigation.navigate("ConsentComplete");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{
            uri: anumatiURL,
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
