import { StyleSheet, View, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Button from '@/components/Button'

const Privacy = () => {
  const [privacySettings, setPrivacySettings] = useState({
    twoFactorAuth: false,
    biometricLogin: true,
    locationTracking: false,
    dataSharing: true,
    anonymousAnalytics: true,
  })

  const toggleSetting = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleSave = () => {
    // TODO: Implement save privacy settings to backend
    console.log('Saving privacy settings:', privacySettings)
  }

  const PrivacyItem = ({
    title,
    description,
    setting,
  }: {
    title: string
    description: string
    setting: keyof typeof privacySettings
  }) => (
    <View style={styles.privacyItem}>
      <View style={styles.privacyInfo}>
        <Typo size={16} fontWeight="500">{title}</Typo>
        <Typo size={14} color={colors.textLight}>{description}</Typo>
      </View>
      <Switch
        value={privacySettings[setting]}
        onValueChange={() => toggleSetting(setting)}
        trackColor={{ false: colors.neutral700, true: colors.primary }}
        thumbColor={colors.white}
      />
    </View>
  )

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Typo size={24} fontWeight="600">
            Privacy & Security
          </Typo>
        </View>

        <View style={styles.section}>
          <Typo size={18} fontWeight="600" style={styles.sectionTitle}>
            Account Security
          </Typo>
          <PrivacyItem
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            setting="twoFactorAuth"
          />
          <PrivacyItem
            title="Biometric Login"
            description="Use fingerprint or face recognition to log in"
            setting="biometricLogin"
          />
        </View>

        <View style={styles.section}>
          <Typo size={18} fontWeight="600" style={styles.sectionTitle}>
            Data Privacy
          </Typo>
          <PrivacyItem
            title="Location Tracking"
            description="Allow app to track your location for better recommendations"
            setting="locationTracking"
          />
          <PrivacyItem
            title="Data Sharing"
            description="Share your data to improve app experience"
            setting="dataSharing"
          />
          <PrivacyItem
            title="Anonymous Analytics"
            description="Help us improve by sending anonymous usage data"
            setting="anonymousAnalytics"
          />
        </View>

        <Button onPress={handleSave}
          style={styles.saveButton}>Save Settings</Button>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Privacy

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
  section: {
    gap: spacingY._15,
  },
  sectionTitle: {
    marginBottom: spacingY._5,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral800,
    padding: spacingX._15,
    borderRadius: 12,
  },
  privacyInfo: {
    flex: 1,
    marginRight: spacingX._15,
  },
  saveButton: {
    marginTop: spacingY._10,
  },
})