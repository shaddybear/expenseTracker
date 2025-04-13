import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import { useAuth } from '@/contexts/authContext'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '@/config/firebase'
import { useRouter } from 'expo-router'

type Props = {
  wallet?: {
    id: string
    name: string
    balance: number
  }
}

const AddEditWallet = ({ wallet }: Props) => {
  const router = useRouter()
  const { user } = useAuth()
  const [name, setName] = useState(wallet?.name || '')
  const [balance, setBalance] = useState(wallet?.balance?.toString() || '0')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!user?.uid || !name || !balance) return
    setLoading(true)

    try {
      if (wallet?.id) {
        // Update existing wallet
        await updateDoc(doc(firestore, 'wallets', wallet.id), {
          name,
          balance: parseFloat(balance),
          updatedAt: new Date().toISOString()
        })
      } else {
        // Create new wallet
        await addDoc(collection(firestore, 'wallets'), {
          name,
          balance: parseFloat(balance),
          userId: user.uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }
      router.back()
    } catch (error) {
      console.error('Error saving wallet:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Typo size={24} fontWeight="600">
          {wallet ? 'Edit Wallet' : 'Add New Wallet'}
        </Typo>

        <View style={styles.form}>
          <Input
            aria-label="Wallet Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter wallet name"
          />
          <Input
            aria-label="Initial Balance"
            value={balance}
            onChangeText={setBalance}
            placeholder="Enter initial balance"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          <Typo color={colors.black} fontWeight="600">
            {loading ? 'Saving...' : 'Save Wallet'}
          </Typo>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}

export default AddEditWallet

const styles = StyleSheet.create({
  container: {
    padding: spacingX._20,
    gap: spacingY._20
  },
  form: {
    gap: spacingY._15
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacingY._15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacingY._10
  },
  buttonDisabled: {
    opacity: 0.7
  }
})