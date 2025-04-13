import { Stack } from 'expo-router'
import { colors } from '@/constants/theme'

const _layout = () => {
  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: {
        backgroundColor: colors.neutral900
      }
    }} />
  )
}

export default _layout