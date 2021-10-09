import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import AppPageView from '../../components/AppPageView';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import ApiRoutes from "../../core/apiRoutes";
import { theme } from '../../core/theme';
import * as Progress from 'react-native-progress';
import { ProgressBar, Colors } from 'react-native-paper';

const API = new ApiRoutes();

export default function StartScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [profileProgress, setProfileProgress] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setProfileProgress(0.3)
    }, 100);
  }, [])

  return (
    <AppPageView>
      <View>
        <View>
          <Text style={styles.heading}>Complete your Profile</Text>
          <View style={styles.completeProfileCard}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: theme.colors.lightWhite}}>
              <View style={styles.profileProgress}>
                <Text style={styles.progressAmount}>30%</Text>
                <Text style={styles.textXXS}>3 of 10 completed</Text>
              </View>
              <View style={styles.progressBar}>
                <Progress.Bar 
                  progress={profileProgress}
                  width={null} 
                  height={8} 
                  borderRadius={6} 
                  color={theme.colors.primary} 
                  borderWidth={0} 
                  unfilledColor={theme.colors.textLight}
                  useNativeDriver={true}
                />
              </View>
            </View>            
            
            <View style={{ flexDirection: 'row', marginTop: 30, }}>
              <View style={{ width: 24, height: 24, backgroundColor: theme.colors.lightWhite, borderRadius: 20, marginRight: 20 }}></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontFamily: 'semiBold', color: theme.colors.text }}>Personal Information</Text>
                <Text style={{ fontSize: 12, fontFamily: 'regular', color: theme.colors.textGrey, marginVertical: 4 }}>Your information is safe and secure with us. We use your information to provide you better financial services.</Text>
                <TouchableOpacity style={{ marginVertical: 5, width: 88, marginHorizontal:0, padding: 0 }} compact  mode="text" onPress={() => { console.log('do') }} >
                  <Text style={{ fontSize: 18, color: theme.colors.primary, fontFamily: 'bold'}}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, }}>
              <View style={{ width: 24, marginRight: 20 }}></View>
              <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: theme.colors.lightWhite }}></View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, }}>
              <View style={{ width: 24, height: 24, backgroundColor: theme.colors.lightWhite, borderRadius: 20, marginRight: 20 }}></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontFamily: 'semiBold', color: theme.colors.text }}>Verification</Text>
                <Text style={{ fontSize: 12, fontFamily: 'regular', color: theme.colors.textGrey, marginVertical: 4 }}>
                  A verified profile helps us prepare per-approved personalise offers for you. Please verify your aadhaar via eKYC.
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, }}>
              <View style={{ width: 24, marginRight: 20 }}></View>
              <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: theme.colors.lightWhite }}></View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20, }}>
              <View style={{ width: 24, height: 24, backgroundColor: theme.colors.lightWhite, borderRadius: 20, marginRight: 20 }}></View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontFamily: 'semiBold', color: theme.colors.text }}>Confirm Email</Text>
              </View>
            </View>

            <Spacer height={10} />

          </View>
        </View>

        <Spacer height={40} />

        <View>
          <Text style={styles.heading}>Invite and Earn</Text>
          <View style={styles.earnCard}>
            <Image
              source={require('../../assets/share.jpg')}
              style={{
                height: 160, flex: 1,
                width: null }}
              resizeMode="contain"
            />

            <View style={{ flexDirection: 'row', marginTop: 10, padding: 24}}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontFamily: 'semiBold', color: theme.colors.text }}>Share & Invite your friends!</Text>
                <Text style={{ fontSize: 14, lineHeight: 22, fontFamily: 'regular', color: theme.colors.textGrey, marginVertical: 4 }}>
                  Invite friends register on our app. For every user you invite. you will earn up to 100 INR
                </Text>
                <TouchableOpacity style={{ marginVertical: 5, width: 88, marginHorizontal: 0, padding: 0 }} compact mode="text" onPress={() => { console.log('do') }} >
                  <Text style={{ fontSize: 18, color: theme.colors.primary, fontFamily: 'bold' }}>Invite Now</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Spacer height={10} />

          </View>
        </View>
        
        <Spacer height={10} />
      </View>
      {isLoading ? <ActivityIndicator size="medium" color="#0000ff" /> : null}
    </AppPageView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontFamily: 'bold'
  },
  completeProfileCard: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    padding: 24, 
    shadowColor: "#666666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  textXXS: {
    color: theme.colors.textGrey,
    fontSize: 12,
    fontFamily: 'regular'
  },
  progressAmount: {
    color: theme.colors.text,
    fontSize: 24,
    fontFamily: 'bold'
  },
  profileProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    marginTop: 20,
    marginBottom: 30,
  },
  earnCard: {
    marginTop: 20,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    shadowColor: "#666666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  }
});
