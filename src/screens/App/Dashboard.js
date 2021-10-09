import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ActivityIndicator, Image, View, Text, StatusBar, TouchableOpacity, StyleSheet } from "react-native";
import ApiRoutes from "../../core/apiRoutes";
import AppPageView from '../../components/AppPageView';
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import Icon from "../../components/Icon";
import { Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../../core/theme';
import Intl from 'intl';
import 'intl/locale-data/jsonp/en-IN';
import CalculateTotal, { loan, summary as assetSummary } from '../../helpers/calculateTotal';
import { Dimensions } from 'react-native';
import { BarChart as BarChart, PieChart as PieChart } from "react-native-gifted-charts";
import Tooltip from 'react-native-walkthrough-tooltip';

const API = new ApiRoutes();
const convertToINR = number => number.toLocaleString('en-IN', {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'INR'
});
// console.log(Intl.NumberFormat('en-IN').format(number));

export default function Dashboard({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});
  const [money, setMoney] = useState({});
  const [summary, setSummary] = useState({});
  const [netInvestment, setNetInvestment] = useState();
  const [investmentPieChartData, setInvestmentPieChartData] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [recent, setRecentTxns] = useState([]);
  const [showTip, setTip] = useState(false);

  useEffect(() => {
    fetchData();
    fetchDeposit();
  }, []);

  const calculate = (data) => {
    const Calculator = new CalculateTotal(data);
    const summary = Calculator.getSummary();
    setSummary(summary);
    const netAsset = convertToINR(Calculator.netAssets());
    const netInvestment = convertToINR(Calculator.netInvestments());
    setNetInvestment(Calculator.netInvestments());
    const availableCash = convertToINR(Calculator.availableCash());
    const netLiability = convertToINR(Calculator.netLiabilities());
    const netWorth = convertToINR(Calculator.netWorth());
    const investmentPieChartData = Calculator.investmentPieChartData();
    setInvestmentPieChartData(investmentPieChartData);
    setMoney({
      netAsset,
      netInvestment,
      availableCash,
      netLiability,
      netWorth
    });
  }

  const fetchData = () => {
    API.fetchUserFiSummary()
      .then(response => {
        // console.log('response', response);
        const { fi_data, ...profile } = response;
        setData(fi_data);
        calculate(fi_data);
        setProfile(profile);
      })
      .catch(err => console.log(err))
      .finally(() => setTimeout(() => {
        setLoading(false)
      }, 500));
  }

  const fetchDeposit = () => {
    API.fetchUserFiDataByType('DEPOSIT')
      .then(response => {
        // console.log(response);
        setDeposits(response.fi_data.DEPOSIT);
      })
      .catch(err => console.log(err))
  } 

  return (
    <AppPageView isLoading={isLoading}>

      <View style={styles.netWorthWrapper}>
        <View style={styles.netWorth}>
          <Text style={styles.heading}>Your Net Worth <TouchableOpacity onPress={() => setTip(true)}><Icon name="info" size={18} /></TouchableOpacity></Text>
          <View style={styles.netWorthAmount}>
            {money.netWorth && (
              <Text style={[styles.heading, { color: theme.colors.primary, fontSize: 36, fontFamily: 'bold' }]}>
                {money.netWorth.split(".")[0]}
                <Text style={{ fontSize: 16 }}>.{money.netWorth.split(".")[1]}</Text>
              </Text>
            )}
            <View style={styles.netWorthChangeWrapper}>
              <Text style={styles.netWorthChangeText}>+ 4.15 %</Text>
            </View>
          </View>
          <Text style={styles.notes}>Last Updated: Today</Text>
        </View>
        <View style={styles.netWorthBreak}>
          <View style={styles.netWorthBreakDown}>
            <Text style={styles.headingXS}>Total Assets</Text>
            <Text style={styles.headingXSBold}>{money.netAsset}</Text>
          </View>
          <View style={styles.netWorthBreakDown}>
            <Text style={styles.headingXS}>Total Liabilities</Text>
            <Text style={styles.headingXSBold}>{money.netLiability}</Text>
          </View>
        </View>
      </View>

      <Tooltip
        isVisible={showTip}
        content={
          <View style={{ padding: 10 }}>
            <Text>Your net worth is the money that will be left with you after you have paid all your outstanding dues.</Text>
          </View>
        }
        onClose={() => setTip(false)}
        placement="center"
        // below is for the status bar of react navigation bar
        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
      />

      <Spacer height={30} />

      <View>
        <Text style={styles.headingS}>Portfolio <Text style={{ fontFamily: 'bold' }}>Performance</Text></Text>
        <View style={graphStyles.container}>
          <View></View>
          <View style={{ flexDirection: 'row', marginTop: 10}}>
            <View style={{flex:1, justifyContent: 'space-between'}}>
              <Text style={{color: theme.colors.white}} >40</Text>
              <Text style={{color: theme.colors.white}} >30</Text>
              <Text style={{color: theme.colors.white}} >20</Text>
              <Text style={{color: theme.colors.white}} >10</Text>
            </View>
            <View style={{ flex: 5 }}>
              <Image
                source={require('../../assets/asset-graph.png')}
                style={{ height: 140, width: null, flex: 1 }}
                resizeMode="contain"
              />
            </View>            
          </View>
          <View style={{ flexDirection: 'row', marginTop: 2}}>
            <View style={{ flex: 1 }}></View>
            <View style={{ flex: 5, flexDirection: 'row', marginTop: 2 }}>
              <Text style={{ flex: 1, fontSize: 12, fontFamily: 'medium', color: theme.colors.white }}>Jan</Text>
              <Text style={{ flex: 1, fontSize: 12, fontFamily: 'medium', color: theme.colors.white }}>Feb</Text>
              <Text style={{ flex: 1, fontSize: 12, fontFamily: 'medium', color: theme.colors.white }}>Mar</Text>
              <Text style={{ flex: 1, fontSize: 12, fontFamily: 'medium', color: theme.colors.white }}>Apr</Text>
              <Text style={{ flex: 1, fontSize: 12, fontFamily: 'medium', color: theme.colors.white }}>May</Text>
              <Text style={{ flex: 1, fontSize: 12, fontFamily: 'medium', color: theme.colors.white }}>June</Text>
            </View>
          </View>
        </View>
      </View>

      <Spacer height={40} />
      
      <View style={styles.cardContainers}>
        <Text style={styles.headingS}>Your <Text style={{ fontFamily: 'bold' }}>Investment</Text></Text>
        <PieChart
          data={investmentPieChartData}
          donut
          radius={(Dimensions.get('window').width) / 2.8}
          innerRadius={(Dimensions.get('window').width) / 3.8}
          centerLabelComponent={() => (
            <View style={[styles.pieCenterLabel]}>
              <Text style={styles.headingS}>
                Total{' '}
                <Text style={{ fontFamily: 'bold' }}>Investment</Text>
              </Text>
              <Text style={styles.headingSBold}>
                {money.netInvestment.split(".")[0]}
                <Text style={{ fontSize: 12 }}>.{money.netInvestment.split(".")[1]}</Text>
              </Text>
            </View>
          )}
        />
        <View style={investmentList.main}>
          {investmentPieChartData.length && investmentPieChartData.map(fi => {
            // console.log('fi', fi);
            return (
              <View style={investmentList.wrapper} key={fi.label}>
                <View style={[investmentList.investmentColor, { backgroundColor: fi.color}]}></View>
                <View style={investmentList.investmentDesc}>
                  <Text style={investmentList.investmentName}>{fi.label}</Text>
                  <Text style={investmentList.investmentPercent}>
                    {(((fi.value)/netInvestment)*100).toFixed(2)}%
                  </Text>
                </View>
                <Text style={investmentList.investmentAmount}>{convertToINR(fi.value)}</Text>
              </View>
            )
          })}
        </View>
        <Button mode="outlined" rounded>Manage All Investment</Button>
      </View>

      <Spacer height={30} />

      <View style={styles.liquidMoneyContainer}>
        <View style={styles.liquidCash}>
          <Text style={[styles.headingS, { color: theme.colors.white}]}>Available <Text style={{ fontFamily: 'bold' }}>Cash</Text></Text>
          <Text style={styles.notes}>Liquid money or money that is available to spend immediately.</Text>
          {money.availableCash && (
            <Text style={[styles.headingXSBold, { fontSize: 18, color: theme.colors.white }]}>
              {money.availableCash.split(".")[0]}
              <Text style={{ fontSize: 12 }}>.{money.availableCash.split(".")[1]}</Text>
            </Text>
          )}
        </View>
        <View style={styles.detailsButton}>
          <Button mode="outlined" rounded uppercase={false}>Details</Button>
        </View>
      </View>

      <Spacer height={30} />

      <View>
        <Text style={styles.headingS}>Recent <Text style={{ fontFamily: 'bold' }}>Transactions</Text></Text>
        <Text style={{ fontSize: 12, color: theme.colors.textLight }}>from all your bank accounts</Text>
        <View style={{ marginTop: 12}}>
          {deposits_data.transactions.map(txn => (
            <View style={investmentList.wrapper} key={txn.txnId}>
              <View style={[investmentList.investmentColor]}>
                <Icon name={txn.type === 'CREDIT' ? 'credit' : 'debit'} size={20} color={txn.type === 'CREDIT' ? theme.colors.green : theme.colors.red} />
              </View>
              <View style={investmentList.investmentDesc}>
                <Text style={[investmentList.investmentName, { color: theme.colors.primary, fontFamily: 'bold'} ]}>
                  {txn.label}{' '}
                  {txn.merchant !== "" && (<Text style={{ fontSize: 12, color: theme.colors.textLight }}>
                    {txn.type === 'CREDIT' ? 'from' : 'to'} {txn.merchant}{' '}</Text>)}
                  <Text style={{ fontSize: 12, color: theme.colors.textLight }}>via {txn.mode}</Text>
                </Text>
                
                <Text style={investmentList.investmentPercent}>
                  {txn.account.bank} {txn.account.account_number}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end'}}>
                <Text style={investmentList.investmentAmount}>{convertToINR(Number(txn.amount))}</Text>
                <Text style={{ fontSize: 12, color: theme.colors.textLight, textAlign: "right"}}>{txn.date}</Text>
              </View>
            </View>
          ))}
        </View>
        <Button mode="outlined" rounded>Manage All Bank Accounts</Button>
      </View>

      <Spacer height={40} />

      <View>
        <Text style={styles.headingS}>Your <Text style={{ fontFamily: 'bold' }}>Liabilities</Text></Text>
        <View style={{ flexDirection: 'row', marginTop: 8}}>
          <View style={{ ...liabilityCard }}>
            <Text style={[styles.headingXSBold, {marginBottom: 4}]}>Credit Cards</Text>
            <Text>{convertToINR(49756)} due on 2 cards.</Text>
          </View>
          <View style={{ ...liabilityCard }}>
            <Text style={[styles.headingXSBold, {marginBottom: 4}]}>Loans</Text>
            <Text>{convertToINR(210000)} outstanding amount.</Text>
          </View>
        </View>        
      </View>

      <Spacer height={40} />

      <View>
        <Text style={styles.headingS}>Your <Text style={{ fontFamily: 'bold' }}>Credit Score</Text></Text>
        <View style={creditScoreStyles.container}>
          <View style={{ flex: 10 }}>
            <Image
              source={require('../../assets/creditScore.jpg')}
              style={{ height: 200, width: null, flex: 1 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 10 }}>
            <Text style={creditScoreStyles.status}>Excellent</Text>
            <Text style={creditScoreStyles.text}>review activity on your credit cards and loans</Text>
            <Text style={creditScoreStyles.notes}>Last updated on 15 sept 2021</Text>
            <Button mode="outlined" rounded uppercase={false}>View Report</Button>
          </View>
        </View>
      </View>

    </AppPageView>
  );
}

const graphStyles = StyleSheet.create({
  container: {
    marginTop: 12,
    borderRadius: 4,
    backgroundColor: theme.colors.deposits,
    padding: 16,
    shadowColor: "#666666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flex: 1,
  },
})

const creditScoreStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontSize: 18,
    fontFamily: 'bold',
    color: theme.colors.primary
  },
  text: {
    fontSize: 14,
    fontFamily: 'medium',
    marginVertical: 10,
  },
  notes: {
    fontSize: 12,
    fontFamily: 'regular', 
    color: theme.colors.textLight,
    marginBottom: 6
  }
});

const investmentList = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  investmentColor: {
    width: 24,
    height: 24,
    borderRadius: 4,
    flex: 1,
  },
  investmentDesc: {
    flex: 6,
    paddingHorizontal: 24,
  },
  investmentName: {
    fontSize: 14,
    fontFamily: 'medium'
  },
  investmentPercent: {
    color: theme.colors.textGrey,
    fontSize: 12,
    fontFamily: 'medium',
    marginTop: 1
  },
  investmentAmount: {
    flex: 3,
    textAlign: 'right',
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: 'medium',
    marginTop: 1
  }
});

const liabilityCard = {
  borderRadius: 4,
  backgroundColor: theme.colors.white,
  padding: 16,
  shadowColor: "#666666",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
  flex: 1,
  marginRight: 10,
}

const styles = StyleSheet.create({
  pieCenterLabel: {
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    padding: 24,
    shadowColor: "#666666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  heading: {
    color: theme.colors.text,
    fontSize: 22,
    fontFamily: 'semiBold', 
  },
  netWorth: {
    marginBottom: 12,
  },
  netWorthAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  netWorthChangeWrapper: {
    backgroundColor: theme.colors.green,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  netWorthChangeText: {
    color: theme.colors.white,
    fontFamily: 'bold',
  },
  netWorthBreak: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightWhite,
    flexDirection: 'row',
    paddingTop: 12
  },
  netWorthBreakDown: {
    flex: 1,
  },
  headingS: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: 'regular',
    marginBottom: 4,
  },
  headingSBold: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: 'bold',
  },
  headingXS: {
    color: theme.colors.textGrey,
    fontSize: 14,
    fontFamily: 'regular',
    marginBottom: 4,
  },
  headingXSBold: {
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: 'bold'
  },
  liquidMoneyContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    padding: 24,
    shadowColor: "#666666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: theme.colors.text
  },
  liquidCash: {
    flex: 4,
    marginRight: 20,
    paddingRight: 20,
    color: theme.colors.white
  },
  detailsButton: {
    flex: 2
  },
  notes: {
    fontSize: 12,
    fontFamily: 'regular',
    marginVertical: 6,
    color: theme.colors.textLight
  }
});

const deposits_data = {
  transactions: [
    {
      "account": {
        "bank": "ICICI",
        "account_number": "XXXXX456"
      },
      "label": "Fund Transfer",
      "merchant": "",
      "currentBalance": "332688.79",
      "txnId": "QYY0ZBBONS",
      "reference": "XKBWAD6FK5A3",
      "mode": "IMPS",
      "type": "DEBIT",
      "amount": "15000",
      "date": "12 Sept"
    },
    {
      "account": {
        "bank": "HDFC",
        "account_number": "XXXXX123"
      },
      "label": "Refund",
      "merchant": "Amazon",
      "currentBalance": "474835.27",
      "txnId": "YC5KVC4ATJ",
      "reference": "Z1VHS5XDCMEG",
      "mode": "OTHERS",
      "type": "CREDIT",
      "amount": "5000",
      "date": "12 Sept"
    },
    {
      "account": {
        "bank": "ICICI",
        "account_number": "XXXXX456"
      },
      "label": "Food",
      "merchant": "Swiggy",
      "currentBalance": "474305.3",
      "txnId": "1ML6ZKKFG8",
      "reference": "NA0GQ4QE9M1R",
      "mode": "UPI",
      "type": "DEBIT",
      "amount": "529.97",
      "date": "11 Sept"
    },
    {
      "account": {
        "bank": "ICICI",
        "account_number": "XXXXX456"
      },
      "label": "Bill Payment",
      "merchant": "SBCPL",
      "currentBalance": "472055.3",
      "txnId": "POZ14IMWNA",
      "reference": "1PBN9OWSAWDS",
      "mode": "UPI",
      "type": "DEBIT",
      "amount": "2250",
      "date": "11 Sept"
    },
    {
      "account": {
        "bank": "HDFC",
        "account_number": "XXXXX123"
      },
      "label": "Received",
      "merchant": "",
      "currentBalance": "479054.3",
      "txnId": "6TPZCCNJBO",
      "reference": "SAZOK5W0GH59",
      "mode": "UPI",
      "type": "CREDIT",
      "amount": "2000",
      "date": "9 Sept"
    }
  ],
}

const credit_cards_summary = {
  total_card: 3,
  total_due: 67550,
  cards: [
    {
      "dueDate": "20-06-2021",
      "cashLimit": "20000",
      "currentDue": "3000",
      "creditLimit": "60000",
      "minDueAmount": "1346",
      "loyaltyPoints": "2450",
      "financeCharges": "2368",
      "totalDueAmount": "9756",
      "availableCredit": "51345",
      "lastStatementDate": "20-05-2021",
      "previousDueAmount": "7654"
    },
    {
      "dueDate": "20-06-2021",
      "cashLimit": "20000",
      "currentDue": "3000",
      "creditLimit": "60000",
      "minDueAmount": "1346",
      "loyaltyPoints": "2450",
      "financeCharges": "2368",
      "totalDueAmount": "9756",
      "availableCredit": "51345",
      "lastStatementDate": "20-05-2021",
      "previousDueAmount": "7654"
    },
    {
      "dueDate": "20-06-2021",
      "cashLimit": "20000",
      "currentDue": "3000",
      "creditLimit": "60000",
      "minDueAmount": "1346",
      "loyaltyPoints": "2450",
      "financeCharges": "2368",
      "totalDueAmount": "9756",
      "availableCredit": "51345",
      "lastStatementDate": "20-05-2021",
      "previousDueAmount": "7654"
    }
  ]
}