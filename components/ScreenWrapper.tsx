import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import { colors } from '@/constants/theme';

const {height} = Dimensions.get('window');

const ScreenWrapper = ({style, children}: ScreenWrapperProps) => {
    // Previous one
    // let paddingTop = Platform.OS == 'ios' ? height * 0.06 : 50;
    let paddingTop = Platform.OS == 'ios' ? height * 0.06 : 20;
  return (
    <View style={[
    {
        paddingTop,
        flex: 1,
        backgroundColor: colors.neutral900,
    },
    style,
    ]}>
      <StatusBar barStyle="light-content" />
      {children}
    </View>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({})