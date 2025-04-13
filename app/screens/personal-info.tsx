import { StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { useAuth } from '@/contexts/authContext'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '@/config/firebase'

const PersonalInfo = () => {
  const { user, updateUserData } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      })
    }
  }, [user])

  const handleUpdate = async () => {
    if (!user?.uid) return
    setLoading(true)

    try {
      const userRef = doc(firestore, 'users', user.uid)
      await updateDoc(userRef, {
        name: formData.name,
      })
      await updateUserData(user.uid)
      setLoading(false)
    } catch (error) {
      console.log('error updating profile: ', error)
      setLoading(false)
    }
  }

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Typo size={24} fontWeight="600">
            Personal Information
          </Typo>
        </View>

        <View style={styles.avatarContainer}>
          <Image
            source={require('@/assets/images/defaultAvatar.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Typo color={colors.primary}>Change Avatar</Typo>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Input
            aria-label="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter your name"
          />
          <Input
            aria-label="Email"
            value={formData.email}
            editable={false}
            placeholder="Enter your email"
          />
        </View>

        <Button onPress={handleUpdate}
          loading={loading}>Update Profile</Button>
          
      </ScrollView>
    </ScreenWrapper>
  )
}

export default PersonalInfo

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
  avatarContainer: {
    alignItems: 'center',
    gap: spacingY._10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    padding: spacingX._10,
  },
  form: {
    gap: spacingY._15,
  },
})