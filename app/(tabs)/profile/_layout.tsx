import { Stack } from 'expo-router'
import { colors } from '@/constants/theme'

const ProfileLayout = () => {
  return (
    <Stack name="profile-stack" screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: colors.neutral900
      }
    }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="screens/personal-info"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="screens/notifications"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="screens/settings"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="screens/privacy"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="screens/support"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default ProfileLayout