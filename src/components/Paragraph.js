import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export default function Paragraph(props) {
  return <Text style={[styles.text, { textAlign: props.center ? 'center': 'left'}]} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    lineHeight: 22,
    // textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'medium',
    color: '#696969'
  },
})
