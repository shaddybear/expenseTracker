import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { useAuth } from '@/contexts/authContext'
import { useRouter } from 'expo-router'

const menuItems = [
  {
    title: 'Personal Info',
    route: '/screens/personal-info',
  },
  {
    title: 'Notifications',
    route: '/screens/notifications',
  },
  {
    title: 'Settings',
    route: '/screens/settings',
  },
  {
    title: 'Privacy',
    route: '/screens/privacy',
  },
  {
    title: 'Support',
    route: '/screens/support',
  },
]

const Profile = () => {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Typo size={24} fontWeight="600">
            Profile
          </Typo>
        </View>

        <View style={styles.userInfo}>
          <Typo size={18} fontWeight="600">
            {user?.name || 'User'}
          </Typo>
          <Typo color={colors.neutral400}>{user?.email}</Typo>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => router.push(item.route as any)}
            >
              <Typo>{item.title}</Typo>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    padding: spacingX._20,
    gap: spacingY._20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
    gap: spacingY._5,
    marginVertical: spacingY._10,
  },
  menuContainer: {
    gap: spacingY._10,
  },
  menuItem: {
    padding: spacingX._15,
    backgroundColor: colors.neutral800,
    borderRadius: 8,
  },
})