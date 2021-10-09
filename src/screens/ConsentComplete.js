import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Paragraph from "../components/Paragraph";
import Header from "../components/Heading";
import Button from "../components/Button";
import { ActivityIndicator, View, Text, ScrollView } from "react-native";
import ApiRoutes from "../core/apiRoutes";

const API = new ApiRoutes();

export default function ConsentComplete({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setTimeout(function () {
      fetchData();
    }, 1000);
  }, []);

  const fetchData = () => {
    API.fetchUserFiSummary()
      .then(response => {
        console.log('response', response.aa_handle);
        const { fi_data, ...profile } = response;
        setData(fi_data);
        setProfile(profile);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }

  return (
    <Background>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginVertical: 50 }}>
          <Header >Consent successfully approved!</Header>
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          <Paragraph>
            Please wait while we fetch your financial data.
            It will take a few minutes to request and fetch your financial data from banks and other institutions.
            We'll notify you once we have prepared the insights for you.
          </Paragraph>
        </View>
        <Button mode="contained" onPress={() => { navigation.navigate('AppScreens')}} disabled={isLoading}>
          Take me to Dashboard
        </Button>
      </ScrollView>
    </Background>
  );
}
