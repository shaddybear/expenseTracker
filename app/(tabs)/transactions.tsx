import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/config/firebase'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { TransactionType } from '@/types'
import { expenseCategories } from '@/constants/data'
import { useRouter } from 'expo-router'

const Transactions = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  useEffect(() => {
    if (!user?.uid) return

    const transactionsRef = collection(firestore, 'transactions')
    const transactionsQuery = query(
      transactionsRef,
      where('userId', '==', user.uid),
      orderBy('date', 'desc')
    )

    const unsubscribe = onSnapshot(transactionsQuery, (querySnapshot) => {
      let transactionsList: TransactionType[] = []
      querySnapshot.forEach((doc) => {
        const transaction = { id: doc.id, ...doc.data() } as TransactionType
        transactionsList.push(transaction)
      })
      setTransactions(transactionsList)
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
            All Transactions
          </Typo>
        </View>

        <View style={styles.transactionsContainer}>
          {transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionItem}
              onPress={() => router.push(`./transactions/${transaction.id}`)}
            >
              {transaction.category && expenseCategories[transaction.category] && (
                <View style={[styles.categoryIcon, { backgroundColor: expenseCategories[transaction.category]?.bgColor || colors.neutral700 }]}>
                  {(() => {
                    const IconComponent = expenseCategories[transaction.category].icon;
                    return <IconComponent size={24} color={colors.white} />;
                  })()}
                </View>
              )}
              <View style={styles.transactionInfo}>
                <Typo size={16} fontWeight="500">
                  {transaction.category ? expenseCategories[transaction.category]?.label : 'Other'}
                </Typo>
                <Typo size={14} color={colors.textLight}>{transaction.description}</Typo>
              </View>
              <Typo
                size={16}
                fontWeight="600"
                color={transaction.type === 'income' ? colors.green : colors.rose}
              >
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </Typo>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Transactions

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
  transactionsContainer: {
    gap: spacingY._15,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral800,
    padding: spacingX._15,
    borderRadius: 12,
    gap: spacingX._15,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
    gap: spacingY._5,
  },
})