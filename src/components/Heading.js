import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../core/theme';

export default function Header(props) {
  return <Text style={[styles.header, { color: props.color ?? theme.colors.primary, }]} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontFamily: 'bold',
    paddingVertical: 12,
  },
})
