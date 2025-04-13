import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { useAuth } from '@/contexts/authContext'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { firestore } from '@/config/firebase'
import { WalletType } from '@/types'
import { useRouter } from 'expo-router'

const Wallet = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [wallets, setWallets] = useState<WalletType[]>([])

  useEffect(() => {
    if (!user?.uid) return

    const walletsRef = collection(firestore, 'wallets')
    const q = query(walletsRef, where('userId', '==', user.uid))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let walletsList: WalletType[] = []
      querySnapshot.forEach((doc) => {
        walletsList.push({ id: doc.id, ...doc.data() } as WalletType)
      })
      setWallets(walletsList)
    })

    return () => unsubscribe()
  }, [user?.uid])

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Typo size={24} fontWeight="600">
            My Wallets
          </Typo>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('./add-edit-wallet')}
          >
            <Typo color={colors.primary}>Add New</Typo>
          </TouchableOpacity>
        </View>

        <View style={styles.walletsContainer}>
          {wallets.map((wallet) => (
            <TouchableOpacity
              key={wallet.id}
              style={styles.walletCard}
              onPress={() => router.push(`./add-edit-wallet?id=${wallet.id}`)}
            >
              <Image
                source={require('@/assets/images/card.png')}
                style={styles.cardImage}
              />
              <View style={styles.walletInfo}>
                <Typo size={18} fontWeight="600">
                  {wallet.name}
                </Typo>
                <Typo size={24} fontWeight="700" color={colors.primary}>
                  ${wallet.balance.toFixed(2)}
                </Typo>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Wallet

const styles = StyleSheet.create({
  container: {
    padding: spacingX._20,
    gap: spacingY._20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addButton: {
    padding: spacingX._10,
    borderRadius: 8,
    backgroundColor: colors.neutral800
  },
  walletsContainer: {
    gap: spacingY._15
  },
  walletCard: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative'
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  walletInfo: {
    position: 'absolute',
    bottom: spacingY._20,
    left: spacingX._20,
    gap: spacingY._5
  }
})