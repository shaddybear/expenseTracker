import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Button from '@/components/Button'

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    currency: 'INR',
    language: 'English',
  })

  const handleSave = () => {
    // TODO: Implement save settings to backend
    console.log('Saving settings:', settings)
  }

  const SettingItem = ({
    title,
    value,
    options,
    onSelect,
  }: {
    title: string
    value: string
    options: string[]
    onSelect: (value: string) => void
  }) => (
    <View style={styles.settingItem}>
      <Typo size={16} fontWeight="500">
        {title}
      </Typo>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <Button
                key={option}
                title={option}
                onPress={() => onSelect(option)}
                style={[
                    styles.optionButton,
                    value === option ? styles.selectedOption : {},
                ]}
                textStyle={[
                    styles.optionText,
                    value === option ? styles.selectedOptionText : {},
                ]} children={undefined}          />
        ))}
      </View>
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
            Settings
          </Typo>
        </View>

        <View style={styles.settingsContainer}>
          <SettingItem
            title="Theme"
            value={settings.theme}
            options={['light', 'dark', 'system']}
            onSelect={(value) => setSettings({ ...settings, theme: value })}
          />
          <SettingItem
            title="Currency"
            value={settings.currency}
            options={['USD', 'EUR', 'GBP', 'JPY']}
            onSelect={(value) => setSettings({ ...settings, currency: value })}
          />
          <SettingItem
            title="Language"
            value={settings.language}
            options={['English', 'Spanish', 'French', 'German']}
            onSelect={(value) => setSettings({ ...settings, language: value })}
          />
        </View>

        <Button onPress={handleSave}
          style={styles.saveButton}>Save Settings</Button>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Settings

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
  settingsContainer: {
    gap: spacingY._20,
  },
  settingItem: {
    gap: spacingY._10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacingX._10,
  },
  optionButton: {
    backgroundColor: colors.neutral800,
    paddingVertical: spacingY._5,
    paddingHorizontal: spacingX._15,
    borderRadius: 8,
    minWidth: 80,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    color: colors.text,
    fontSize: 14,
  },
  selectedOptionText: {
    color: colors.white,
  },
  saveButton: {
    marginTop: spacingY._10,
  },
})