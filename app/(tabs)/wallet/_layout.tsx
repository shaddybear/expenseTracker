import { Stack } from 'expo-router'
import React from 'react'

const WalletLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="add-edit-wallet"
        options={{
          headerShown: false,
          presentation: 'modal'
        }}
      />
    </Stack>
  )
}

export default WalletLayout