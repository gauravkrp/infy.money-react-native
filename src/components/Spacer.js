import React from 'react';
import { View } from 'react-native';

const Spacer = ({ height }) => <View style={{ height: height ?? 10, backgroundColor: 'transparent' }}></View>

export default Spacer;
