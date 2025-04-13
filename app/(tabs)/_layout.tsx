import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false
    }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="statistics" />
      <Tabs.Screen name="wallet" options={{ href: 'wallet/' }} />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="settings" />
      <Tabs.Screen name="privacy" />
      <Tabs.Screen name="support" />
      <Tabs.Screen name="personal-info" />
      <Tabs.Screen name="notifications" />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})