import React, { useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import TextInput from "../components/TextInput";
import { ActivityIndicator, View } from "react-native";
import { numberValidator } from "../helpers/numberValidator";
import ApiRoutes from "../core/apiRoutes";

const API = new ApiRoutes();

export default function StartScreen({ navigation }) {
  const [number, setNumber] = useState({ value: "", error: "" });
  const [isLoading, setLoading] = useState(false);

  const getAnumatiURL = async () => {
    setLoading(true);
    const numberError = numberValidator(number.value);

    if (numberError) {
      setNumber({ ...number, error: numberError });
      setLoading(false);
      return;
    }
    
    API.getAnumatiURL(number.value)
      .then(response => {
        // console.log('response', response);
        // route to Setu AA WebView and send anumatiURL in router params
        navigation.navigate("SetuAAScreen", { anumatiURL: response });
      }).catch(err => {
        console.error(err);
        setNumber({ ...number, error: err.message || 'Some error occurred!' });
      })
      .finally(() => setLoading(false));
  };

  const openChatbotWebView = () => {
    navigation.navigate("IBMChatbot");
  }

  return (
    <Background>
      <Logo />
      <Heading marginVertical={12}>Infy.Money</Heading>
      {/* <Header>Personal Finance Management</Header> */}
      <Paragraph center>
        We need access to your financial data to provide you a complete picture of your financial health.
      </Paragraph>
      <Paragraph center>Please enter your mobile number to continue.</Paragraph>
      <TextInput
        label="Mobile number"
        returnKeyType="next"
        value={number.value}
        onChangeText={(text) => setNumber({ value: text, error: "" })}
        error={!!number.error}
        errorText={number.error}
        keyboardType="number-pad"
        maxLength={10}
      />
      <Button mode="contained" onPress={getAnumatiURL} disabled={number.value.length < 10}>
        Continue
      </Button>
      <View style={{flexDirection: 'column', marginTop: 30}}>
        <Button style={{ marginVertical: 5, width: 'auto'}} labelStyle={{ fontSize: 12, }} mode="outlined" onPress={() => {console.log('not yet!')}} disabled={true}>
          Sign up with Setu AA
        </Button>
        <Button style={{ marginVertical: 5, width: 'auto' }} labelStyle={{ fontSize: 12, }} mode="outlined" onPress={() => {console.log('not yet!')}} disabled={true}>
          Sign up with OneMoney AA
        </Button>
        <Button style={{ marginVertical: 5, width: 'auto' }} labelStyle={{ fontSize: 12, }} mode="text" onPress={openChatbotWebView} >
          What is an AA ?
        </Button>
      </View>
      {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </Background>
  );
}
