import { StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@/constants/theme'

const _layout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.neutral900,
        borderTopColor: colors.neutral800,
        height: 60,
        paddingBottom: 8,
        paddingTop: 8
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.neutral400
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="swap-horizontal-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          href: 'wallet/',
          title: 'Wallet',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }}
      />

    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})