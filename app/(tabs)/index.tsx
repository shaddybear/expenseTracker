import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { firestore } from '@/config/firebase'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authContext'
import { TransactionType, WalletType } from '@/types'
import { expenseCategories } from '@/constants/data'
import { useRouter } from 'expo-router'

const Home = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [wallets, setWallets] = useState<WalletType[]>([])
  const [recentTransactions, setRecentTransactions] = useState<TransactionType[]>([])
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  useEffect(() => {
    if (!user?.uid) return

    // Fetch wallets
    const walletsRef = collection(firestore, 'wallets')
    const walletsQuery = query(walletsRef, where('userId', '==', user.uid))

    const unsubscribeWallets = onSnapshot(walletsQuery, (querySnapshot) => {
      let walletsList: WalletType[] = []
      let balance = 0
      querySnapshot.forEach((doc) => {
        const wallet = { id: doc.id, ...doc.data() } as WalletType
        walletsList.push(wallet)
        balance += wallet.balance || 0
      })
      setWallets(walletsList)
      setTotalBalance(balance)
    })

    // Fetch recent transactions
    const transactionsRef = collection(firestore, 'transactions')
    const transactionsQuery = query(
      transactionsRef,
      where('userId', '==', user.uid),
      orderBy('date', 'desc'),
      limit(5)
    )

    const unsubscribeTransactions = onSnapshot(transactionsQuery, (querySnapshot) => {
      let transactionsList: TransactionType[] = []
      let income = 0
      let expenses = 0
      querySnapshot.forEach((doc) => {
        const transaction = { id: doc.id, ...doc.data() } as TransactionType
        transactionsList.push(transaction)
        if (transaction.type === 'income') {
          income += transaction.amount
        } else {
          expenses += transaction.amount
        }
      })
      setRecentTransactions(transactionsList)
      setTotalIncome(income)
      setTotalExpenses(expenses)
    })

    return () => {
      unsubscribeWallets()
      unsubscribeTransactions()
    }
  }, [user?.uid])

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Typo size={24} fontWeight="600">
            Overview
          </Typo>
        </View>

        <View style={styles.balanceCard}>
          <Typo size={16} color={colors.textLight}>Total Balance</Typo>
          <Typo size={32} fontWeight="700" color={colors.primary}>
            ${totalBalance.toFixed(2)}
          </Typo>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Typo size={14} color={colors.textLight}>Income</Typo>
              <Typo size={18} fontWeight="600" color={colors.green}>
                +${totalIncome.toFixed(2)}
              </Typo>
            </View>
            <View style={styles.statItem}>
              <Typo size={14} color={colors.textLight}>Expenses</Typo>
              <Typo size={18} fontWeight="600" color={colors.rose}>
                -${totalExpenses.toFixed(2)}
              </Typo>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typo size={20} fontWeight="600">Recent Transactions</Typo>
            <TouchableOpacity onPress={() => router.push('./transactions')}>
              <Typo color={colors.primary}>See All</Typo>
            </TouchableOpacity>
          </View>
          {recentTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionItem}
              onPress={() => router.push(`./transactions/${transaction.id}`)}            >              {transaction.category && expenseCategories[transaction.category] && (
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

export default Home

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
  balanceCard: {
    backgroundColor: colors.neutral800,
    padding: spacingX._20,
    borderRadius: 16,
    gap: spacingY._10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacingY._10,
  },
  statItem: {
    gap: spacingY._5,
  },
  section: {
    gap: spacingY._15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

//heey