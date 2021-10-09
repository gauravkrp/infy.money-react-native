import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text, StyleSheet, StatusBar, TouchableOpacity, useWindowDimensions  } from "react-native";
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

export default function Assets({ navigation }) {
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
          <Text style={styles.heading} >Your Total Assets <TouchableOpacity onPress={() => setTip(true)}><Icon name="info" size={18} /></TouchableOpacity></Text>
          <View style={styles.netWorthAmount}>
            {money.netWorth && (
              <Text style={[styles.heading, { color: theme.colors.primary, fontSize: 36, fontFamily: 'bold' }]}>
                {money.netAsset.split(".")[0]}
                <Text style={{ fontSize: 16 }}>.{money.netAsset.split(".")[1]}</Text>
              </Text>
            )}
            <View style={styles.netWorthChangeWrapper}>
              <Text style={styles.netWorthChangeText}>+ 3.79 %</Text>
            </View>
          </View>
          <Text style={styles.notes}>Last Updated: Today</Text>
        </View>
      </View>

      <Tooltip
        isVisible={showTip}
        content={
          <View style={{padding: 10}}>
            <Text>Total Assets takes into account all your investments (stocks, mutual funds, bonds, ppf, epf etc.) plus any money that you have in your bank accounts.</Text>
          </View>
        }
        onClose={() => setTip(false)}
        placement="center"
        // below is for the status bar of react navigation bar
        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
      />

      <Spacer />

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={[styles.netWorthChangeWrapper, { marginLeft: 0, backgroundColor: theme.colors.primary,}]}>
          <Text style={[styles.netWorthChangeText]}>Bank Accounts</Text>
        </View>
        <TouchableOpacity><Text style={{ marginHorizontal:12, color: theme.colors.textLight}}>Deposits</Text></TouchableOpacity>
        <TouchableOpacity><Text style={{ marginHorizontal:12, color: theme.colors.textLight}}>Mutual Funds</Text></TouchableOpacity>
        <TouchableOpacity><Text style={{ marginHorizontal:12, color: theme.colors.textLight}}>Stocks</Text></TouchableOpacity>
        <TouchableOpacity><Text style={{ marginHorizontal:12, color: theme.colors.textLight}}>Bonds</Text></TouchableOpacity>
        <TouchableOpacity><Text style={{ marginHorizontal:12, color: theme.colors.textLight}}>Funds</Text></TouchableOpacity>
      </View>

      <Spacer height={30} />

      <View>
        <Text style={[styles.headingSBold, { marginBottom: 10}]}>Total Balance</Text>
        {money.availableCash && (
          <Text style={styles.headingSBold}>{convertToINR(money.availableCash)}{' '}<Text style={{fontSize: 12, fontFamily: 'regular', color: theme.colors.textLight}}> in 3 accounts</Text></Text>
        )}
        <View style={{ marginVertical: 20}}>
          <View style={{flexDirection:'row', borderBottomWidth: 1, borderBottomColor: theme.colors.lightWhite, paddingBottom: 15 }}>
            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'bold', color: theme.colors.textLight}}>ICICI</Text>
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 14, fontFamily: 'bold', color: theme.colors.text, marginBottom: 4 }}>
                {convertToINR(85000)}
              </Text>
              <TouchableOpacity><Text style={{ color: theme.colors.primary, fontFamily: 'bold'}}>View Transactions</Text></TouchableOpacity>
            </View>
            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'bold', color: theme.colors.textLight}}>SAVINGS</Text>
          </View>
          <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: theme.colors.lightWhite, paddingVertical: 15 }}>
            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'bold', color: theme.colors.textLight }}>HDFC</Text>
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 14, fontFamily: 'bold', color: theme.colors.text, marginBottom: 4 }}>
                {convertToINR(115000)}
              </Text>
              <TouchableOpacity><Text style={{ color: theme.colors.primary, fontFamily: 'bold' }}>View Transactions</Text></TouchableOpacity>
            </View>
            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'bold', color: theme.colors.textLight }}>SAVINGS</Text>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 15 }}>
            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'bold', color: theme.colors.textLight }}>Equitas</Text>
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 14, fontFamily: 'bold', color: theme.colors.text, marginBottom: 4 }}>
                {convertToINR(17683)}
              </Text>
              <TouchableOpacity><Text style={{ color: theme.colors.primary, fontFamily: 'bold' }}>View Transactions</Text></TouchableOpacity>
            </View>
            <Text style={{ flex: 1, fontSize: 14, fontFamily: 'bold', color: theme.colors.textLight }}>SAVINGS</Text>
          </View>
        </View>
      </View>

      <Spacer height={30} />

      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.headingS}>Money <Text style={{ fontFamily: 'bold' }}>Flow</Text></Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 14 ,borderRadius: 24, borderWidth: 1, borderColor: theme.colors.lightWhite }}>
            <Text>August</Text> 
            <Icon name="down" color={theme.colors.text} size={24} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <View style={{ ...liabilityCard }}>
            <Text style={[styles.headingXSBold, { marginBottom: 6 }]}><Icon name="credit" color={theme.colors.green} size={20} />{'  '}Income</Text>
            <Text style={[styles.headingSBold, { color: theme.colors.green }]}>{convertToINR(49756)}</Text>
          </View>
          <View style={{ ...liabilityCard }}>
            <Text style={[styles.headingXSBold, { marginBottom: 6 }]}><Icon name="debit" color={theme.colors.red} size={20} />{'  '}Expense</Text>
            <Text style={[styles.headingSBold, { color: theme.colors.red}]}>{convertToINR(21000)}</Text>
          </View>
        </View>
      </View>

      <Spacer height={40} />

    </AppPageView>
  );
}

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
