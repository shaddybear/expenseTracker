import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { useAuth } from '@/contexts/authContext'
import { useRouter } from 'expo-router'
import { verticalScale } from '@/utils/styling'
import { Header } from 'react-native/Libraries/NewAppScreen'

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
      {<View style={styles.container}>
      <Header />
      </View>
    
      }
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: 'center',
    gap: spacingY._15,
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
    editIcon: {
      bottom: 5,
      right: 8,
      borderRadius: 50,
      backgroundColor: colors.neutral100,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 4,
      padding: 5,
    },
  
    nameContainer: {
      gap: verticalScale(4),
      alignItems: 'center',
    },
  
    listIcon: {
      height: verticalScale(44),
      width: verticalScale(44),
      backgroundColor: colors.neutral500,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius._15,
      borderCurve: 'continuous',
    },
  
    listItem: {
      marginBottom: verticalScale(17),
    },
  
    accountOptions: {
      marginTop: spacingY._35,
    },
  
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacingX._10,
    }
  
})