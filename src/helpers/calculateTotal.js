import { theme } from '../core/theme';

export const loan = {
  outstanding_amount: 250000
};

class CalculateTotal {
  obj = {};
  constructor(fi_data) {
    this.fi_data = fi_data;
    this.fi_types = Object.keys(fi_data);
    this.summary = this.assetSummary();
  }

  assetTypesToExclude = ['INSURANCE_POLICIES', 'ULIP', 'CREDIT_CARD'];

  assetSummary = () => {
    const assetTypes = this.fi_types.filter(x => !this.assetTypesToExclude.includes(x));
    // console.log(this.assetTypesToExclude, assetTypes);
    assetTypes.forEach(type => {
      this.fi_data[type].forEach(account => {
        if (account.summary.currentBalance) {
          if (this.obj[type] && this.obj[type].length) {
            this.obj[type] = [...this.obj[type], account.summary.currentBalance];
          } else {
            this.obj[type] = [account.summary.currentBalance];
          }
        }
        if (account.summary.currentValue) {
          if (this.obj[type] && this.obj[type].length) {
            this.obj[type] = [...this.obj[type], account.summary.currentValue];
          } else {
            this.obj[type] = [account.summary.currentValue];
          }
        }
      });
    });
    // console.log('this.obj', this.obj);
    return this.obj;
  }

  getSummary = () => this.summary;

  netAssets = () => {
    let total_amount = [];
    Object.keys(this.summary).forEach(fi => {
      this.summary[fi].map(amount => {
        total_amount.push(amount);
      });
    });
    // console.log(total_amount);
    const sum = total_amount.reduce((a, b) => Number(a) + Number(b), 0);
    return sum;
  }

  netInvestments = () => {
    let total_amount = [];
    Object.keys(this.summary).forEach(fi => {
      if (fi !== 'DEPOSIT') {
        this.summary[fi].map(amount => {
          total_amount.push(amount);
        })
      }
    });
    // console.log(total_amount);
    const sum = total_amount.reduce((a, b) => Number(a) + Number(b), 0);
    return sum;
  }

  netLiabilities = () => {
    const creditCardDue = this.fi_data['CREDIT_CARD'].map(card => card.summary.totalDueAmount);
    let total_amount = creditCardDue.reduce((a, b) => Number(a) + Number(b), 0);
    total_amount += Number(loan.outstanding_amount);
    return total_amount;
  }

  availableCash = () => this.summary['DEPOSIT'].reduce((a, b) => Number(a) + Number(b), 0);

  netWorth = () => this.netAssets() - this.netLiabilities();

  investmentPieChartData = () => {
    const getValue = (fiArr) => {
      let sum = 0;
      fiArr.forEach(fi => {
        sum += this.summary[fi].reduce((a, b) => Number(a) + Number(b), 0);
      });
      return sum;
    }
    const data = [
      {
        label: 'Mutual Funds',
        value: getValue(['MUTUAL_FUNDS']),
        color: theme.colors.mutual_funds
      },
      {
        label: 'Stocks',
        value: getValue(['EQUITIES']),
        color: theme.colors.stocks
      },
      {
        label: 'Deposits',
        value: getValue(['TERM_DEPOSIT', 'RECURRING_DEPOSIT']),
        color: theme.colors.deposits
      },
      {
        label: 'Funds - PPF, EPF, NPS',
        value: getValue(['PPF', 'EPF', 'NPS']),
        color: theme.colors.funds
      },
      {
        label: 'Bonds, ETF & Securities',
        value: getValue(['BONDS', 'ETF', 'GOVT_SECURITIES']),
        color: theme.colors.bonds
      }
    ];

    return data;
  }
};

export default CalculateTotal;
