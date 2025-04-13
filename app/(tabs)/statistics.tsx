import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale } from '@/utils/styling'
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore'
import { firestore } from '@/config/firebase'
import { useAuth } from '@/contexts/authContext'
import { LineChart, PieChart } from 'react-native-chart-kit'
import { TransactionType } from '@/types'

interface ChartDataset {
  data: number[];
}

interface MonthlyChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface CategoryChartData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const Statistics = () => {
  const { user } = useAuth()
  const [monthlyData, setMonthlyData] = useState<MonthlyChartData>({
    labels: [],
    datasets: [{ data: [] }]
  })
  const [categoryData, setCategoryData] = useState<CategoryChartData[]>([])

  useEffect(() => {
    fetchTransactionData()
  }, [])

  const fetchTransactionData = async () => {
    if (!user?.uid) return

    const transactionsRef = collection(firestore, 'transactions')
    const q = query(transactionsRef, where('uid', '==', user.uid))
    const querySnapshot = await getDocs(q)
    
    const transactions: TransactionType[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date instanceof Date ? doc.data().date : doc.data().date.toDate()
    } as TransactionType))

    processMonthlyData(transactions)
    processCategoryData(transactions)
  }

  const processMonthlyData = (transactions: TransactionType[]) => {
    const monthlyTotals: { [key: string]: number } = {}
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    transactions.forEach(transaction => {
      const transactionDate = transaction.date instanceof Date 
        ? transaction.date 
        : transaction.date instanceof Timestamp 
        ? transaction.date.toDate() 
        : new Date(transaction.date)
      const month = months[transactionDate.getMonth()]
      monthlyTotals[month] = (monthlyTotals[month] || 0) + transaction.amount
    })

    const labels = Object.keys(monthlyTotals)
    const data = Object.values(monthlyTotals)

    setMonthlyData({
      labels,
      datasets: [{ data }]
    })
  }

  const processCategoryData = (transactions: TransactionType[]) => {
    const categoryTotals: { [key: string]: number } = {}
    
    transactions.forEach(transaction => {
      const category = transaction.category || 'Other'
      categoryTotals[category] = (categoryTotals[category] || 0) + transaction.amount
    })

    const data: CategoryChartData[] = Object.entries(categoryTotals).map(([name, amount]) => ({
      name,
      amount,
      color: getRandomColor(),
      legendFontColor: colors.text,
      legendFontSize: 12
    }))

    setCategoryData(data)
  }

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const chartConfig = {
    backgroundColor: colors.neutral900,
    backgroundGradientFrom: colors.neutral900,
    backgroundGradientTo: colors.neutral900,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(163, 230, 53, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Expenses</Text>
        {monthlyData.labels.length > 0 && (
          <LineChart
            data={monthlyData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expenses by Category</Text>
        {categoryData.length > 0 && (
          <PieChart
            data={categoryData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        )}
      </View>
    </ScrollView>
  )
}

export default Statistics

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral900,
    padding: spacingX._20,
  },
  section: {
    marginBottom: spacingY._30,
  },
  sectionTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacingY._15,
  },
  chart: {
    marginVertical: spacingY._10,
    borderRadius: scale(16),
  }
})