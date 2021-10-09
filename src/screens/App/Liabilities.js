import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Image, Text, StatusBar, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import ApiRoutes from "../../core/apiRoutes";
import AppPageView from '../../components/AppPageView';
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import { theme } from '../../core/theme';
import Icon from "../../components/Icon";
import CalculateTotal, { loan, summary as assetSummary } from '../../helpers/calculateTotal';
import { Dimensions } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
// import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const API = new ApiRoutes();
const convertToINR = number => number.toLocaleString('en-IN', {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'INR'
});

export default function Liabilities({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [profile, setProfile] = useState({});
  const [money, setMoney] = useState({});
  const [summary, setSummary] = useState({});
  const [netInvestment, setNetInvestment] = useState();
  const [investmentPieChartData, setInvestmentPieChartData] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [recent, setRecentTxns] = useState([]);
  const layout = useWindowDimensions();
  const [showTip, setTip] = useState(false);

  useEffect(() => {
    fetchData();
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

  return (
    <AppPageView isLoading={isLoading}>
      <View style={styles.netWorthWrapper}>
        <View style={styles.netWorth}>
          <Text style={styles.heading} >Your Total Liabilities <TouchableOpacity onPress={() => setTip(true)}><Icon name="info" size={18} /></TouchableOpacity></Text>
          <View style={styles.netWorthAmount}>
            {money.netWorth && (
              <Text style={[styles.heading, { color: theme.colors.primary, fontSize: 36, fontFamily: 'bold' }]}>
                {money.netLiability.split(".")[0]}
                <Text style={{ fontSize: 16 }}>.{money.netLiability.split(".")[1]}</Text>
              </Text>
            )}
            <View style={[styles.netWorthChangeWrapper, {backgroundColor: theme.colors.red}]}>
              <Text style={[styles.netWorthChangeText]}>+ 3.79 %</Text>
            </View>
          </View>
          <Text style={styles.notes}>Last Updated: Today</Text>
        </View>
      </View>

      <Tooltip
        isVisible={showTip}
        content={
          <View style={{ padding: 10 }}>
            <Text>Total Liabilities takes into account all the money that you owe i.e, money that you have to pay. This includes outstanding loan amounts and dues on credit cards.</Text>
          </View>
        }
        onClose={() => setTip(false)}
        placement="center"
        // below is for the status bar of react navigation bar
        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
      />

      <Spacer />

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
        <View style={[styles.netWorthChangeWrapper, { marginLeft: 0, backgroundColor: theme.colors.primary, }]}>
          <Text style={[styles.netWorthChangeText]}>Credit Cards</Text>
        </View>
        <TouchableOpacity><Text style={{ marginHorizontal: 50, color: theme.colors.textLight }}>Loans</Text></TouchableOpacity>
        <TouchableOpacity><Text style={{ marginHorizontal: 10, color: theme.colors.textLight }}>Offers for you</Text></TouchableOpacity>
      </View>

      <Spacer height={30} />

      <View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Image
            source={require('../../assets/creditcard.png')}
            style={{ height: 200, width: 300 }}
            resizeMode="contain"
          />
          <View>
            <Image
              source={require('../../assets/creditcard.png')}
              style={{ height: 160, width: 240 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.headingSBold}>Axis Bank Platinum Credit Card (VISA)</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1 }}>Due Date:</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>25 Aug 2021</Text>
          </View>
          <View style={{flex: 1}}></View>
          <View style={{ flex: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1 }}>Total Due:</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>{convertToINR(27500)}</Text>
          </View>
        </View>
      </View>

      <Spacer height={30} />

      <View>
        <Text style={styles.headingS}>Recent <Text style={{ fontFamily: 'bold' }}>Transactions</Text></Text>
        <View style={{ marginTop: 12 }}>
          {credit_cards.transactions.map(txn => (
            <View style={investmentList.wrapper} key={txn.txnId}>
              <View style={[investmentList.investmentColor]}>
                <Icon name={txn.type === 'CREDIT' ? 'credit' : 'debit'} size={20} color={txn.type === 'CREDIT' ? theme.colors.green : theme.colors.red} />
              </View>
              <View style={investmentList.investmentDesc}>
                <Text style={[investmentList.investmentName, { color: theme.colors.primary, fontFamily: 'bold' }]}>
                  {txn.label}{' '}
                  {txn.merchant !== "" && (<Text style={{ fontSize: 12, color: theme.colors.textLight }}>
                    {txn.type === 'CREDIT' ? 'from' : 'to'} {txn.merchant}{' '}</Text>)}
                </Text>

                <Text style={investmentList.investmentPercent}>
                  {txn.account.bank} {txn.account.account_number}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={investmentList.investmentAmount}>{convertToINR(Number(txn.amount))}</Text>
                <Text style={{ fontSize: 12, color: theme.colors.textLight, textAlign: "right" }}>{txn.date}</Text>
              </View>
            </View>
          ))}
        </View>
        <Button mode="outlined" rounded>Pay Credit Card Bill</Button>
      </View>

      <Spacer height={30} />

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

      <Spacer height={30} />

      <View style={creditScoreStyles.blogContainer}>
        <Text style={[styles.headingSBold, { color: theme.colors.white, lineHeight: 27}]}>
          9 Tips on How to Build or Maintain a Healthy Credit Score
        </Text>
        <Spacer height={20} />
        <Button mode="outlined" rounded uppercase={false}>Read Article</Button>
      </View>

      <Spacer height={20} />

    </AppPageView>
  );
}

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
  },
  blogContainer: {
    padding: 20,
    borderRadius: 12,
    padding: 24,
    shadowColor: "#666666",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: theme.colors.deposits
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

const credit_cards = {
  transactions: [
    {
      "account": {
        "bank": "ICICI",
        "account_number": "XXXXX456"
      },
      "label": "Stripe PG",
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
      "label": "Loan Payment",
      "merchant": "Shiksha Ventures",
      "currentBalance": "474835.27",
      "txnId": "YC5KVC4ATJ",
      "reference": "Z1VHS5XDCMEG",
      "mode": "OTHERS",
      "type": "DEBIT",
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
      "label": "Refund",
      "merchant": "",
      "currentBalance": "479054.3",
      "txnId": "6TPZCCNJBO",
      "reference": "SAZOK5W0GH59",
      "mode": "UPI",
      "type": "CREDIT",
      "amount": "2100",
      "date": "9 Sept"
    }
  ],
}
