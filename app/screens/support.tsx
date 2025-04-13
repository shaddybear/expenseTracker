import { StyleSheet, View, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { Ionicons } from '@expo/vector-icons'

const Support = () => {
  const faqs = [
    {
      question: 'How do I add a new transaction?',
      answer: 'Go to the Home tab and tap the "+" button at the bottom. Fill in the transaction details and tap "Save".',
    },
    {
      question: 'How do I create a new wallet?',
      answer: 'Navigate to the Wallet tab and tap "Add New". Enter your wallet details and tap "Save".',
    },
    {
      question: 'How do I view my spending statistics?',
      answer: 'Go to the Statistics tab to view your monthly expenses and category-wise breakdown.',
    },
    {
      question: 'How do I edit my profile?',
      answer: 'Go to the Profile tab and tap "Personal Information" to update your details.',
    },
  ]

  const supportOptions = [
    {
      title: 'Email Support',
      description: 'Get help via email',
      icon: 'mail-outline' as const,
      action: () => Linking.openURL('mailto:support@expensetracker.com'),
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'chatbubbles-outline' as const,
      action: () => console.log('Open live chat'),
    },
    {
      title: 'Documentation',
      description: 'Read our user guide',
      icon: 'document-text-outline' as const,
      action: () => Linking.openURL('https://folks-of-devx.github.io/expenseTracker'),
    },
  ]

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Typo size={24} fontWeight="600">
            Help & Support
          </Typo>
        </View>

        <View style={styles.section}>
          <Typo size={18} fontWeight="600" style={styles.sectionTitle}>
            Contact Support
          </Typo>
          {supportOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.supportItem}
              onPress={option.action}
            >
              <View style={styles.supportItemLeft}>
                <Ionicons name={option.icon} size={24} color={colors.primary} />
                <View style={styles.supportItemInfo}>
                  <Typo size={16} fontWeight="500">
                    {option.title}
                  </Typo>
                  <Typo size={14} color={colors.textLight}>
                    {option.description}
                  </Typo>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.neutral400}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Typo size={18} fontWeight="600" style={styles.sectionTitle}>
            Frequently Asked Questions
          </Typo>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Typo size={16} fontWeight="500">
                {faq.question}
              </Typo>
              <Typo size={14} color={colors.textLight} style={styles.faqAnswer}>
                {faq.answer}
              </Typo>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Support

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
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral800,
    padding: spacingX._15,
    borderRadius: 12,
  },
  supportItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacingX._15,
  },
  supportItemInfo: {
    gap: spacingY._7,
  },
  faqItem: {
    backgroundColor: colors.neutral800,
    padding: spacingX._15,
    borderRadius: 12,
    gap: spacingY._5,
  },
  faqAnswer: {
    marginTop: spacingY._5,
  },
})