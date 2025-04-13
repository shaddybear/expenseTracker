import { StyleSheet, View, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Button from '@/components/Button'

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    transactionAlerts: true,
    budgetAlerts: true,
    weeklyReport: false,
    monthlyReport: true,
  })

  const toggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const handleSave = () => {
    // TODO: Implement save notification settings to backend
    console.log('Saving notification settings:', notificationSettings)
  }

  const NotificationItem = ({ 
    title, 
    description, 
    setting 
  }: { 
    title: string
    description: string
    setting: keyof typeof notificationSettings 
  }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationInfo}>
        <Typo size={16} fontWeight="500">{title}</Typo>
        <Typo size={14} color={colors.textLight}>{description}</Typo>
      </View>
      <Switch
        value={notificationSettings[setting]}
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
            Notifications
          </Typo>
        </View>

        <View style={styles.section}>
          <Typo size={18} fontWeight="600" style={styles.sectionTitle}>
            General Notifications
          </Typo>
          <NotificationItem
            title="Push Notifications"
            description="Receive push notifications on your device"
            setting="pushNotifications"
          />
          <NotificationItem
            title="Email Notifications"
            description="Receive notifications via email"
            setting="emailNotifications"
          />
        </View>

        <View style={styles.section}>
          <Typo size={18} fontWeight="600" style={styles.sectionTitle}>
            Transaction Alerts
          </Typo>
          <NotificationItem
            title="Transaction Alerts"
            description="Get notified about new transactions"
            setting="transactionAlerts"
          />
          <NotificationItem
            title="Budget Alerts"
            description="Get notified when you're close to your budget limit"
            setting="budgetAlerts"
          />
        </View>

        <View style={styles.section}>
          <Typo size={18} fontWeight="600" style={styles.sectionTitle}>
            Reports
          </Typo>
          <NotificationItem
            title="Weekly Report"
            description="Receive weekly spending summary"
            setting="weeklyReport"
          />
          <NotificationItem
            title="Monthly Report"
            description="Receive monthly spending summary"
            setting="monthlyReport"
          />
        </View>

        <Button onPress={handleSave}
          style={styles.saveButton}>Save Settings</Button>
          
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Notifications

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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral800,
    padding: spacingX._15,
    borderRadius: 12,
  },
  notificationInfo: {
    flex: 1,
    marginRight: spacingX._15,
  },
  saveButton: {
    marginTop: spacingY._10,
  },
})