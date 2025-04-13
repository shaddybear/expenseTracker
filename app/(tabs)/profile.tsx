import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useAuth } from '@/contexts/authContext'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale } from '@/utils/styling'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const Profile = () => {
  const { user, signOut } = useAuth()

  const menuItems: {
    icon: React.ComponentProps<typeof Ionicons>['name']
    label: string
    route: React.ComponentProps<typeof Link>['href']
  }[] = [
    { icon: 'person-outline', label: 'Personal Information', route: '/(tabs)/personal-info' },
    { icon: 'notifications-outline', label: 'Notifications', route: '/(tabs)/notifications' },
    { icon: 'settings-outline', label: 'Settings', route: '/(tabs)/settings' },
    { icon: 'shield-outline', label: 'Privacy & Security', route: '/(tabs)/privacy' },
    { icon: 'help-circle-outline', label: 'Help & Support', route: '/(tabs)/support' },
  ]
  
  
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('@/assets/images/defaultAvatar.png')} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.route} asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color={colors.neutral200} />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.neutral400} />
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Ionicons name="log-out-outline" size={24} color={colors.rose} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral900,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacingY._30,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral800,
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    marginBottom: spacingY._15,
  },
  name: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacingY._5,
  },
  email: {
    fontSize: scale(16),
    color: colors.neutral400,
  },
  menuContainer: {
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacingY._15,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral800,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: scale(16),
    color: colors.text,
    marginLeft: spacingX._15,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacingY._30,
    marginHorizontal: spacingX._20,
    paddingVertical: spacingY._15,
    backgroundColor: colors.neutral800,
    borderRadius: scale(10),
  },
  signOutText: {
    fontSize: scale(16),
    color: colors.rose,
    marginLeft: spacingX._10,
  },
})