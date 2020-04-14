import Transaction from '../models/Transaction'
// import Balance from '../models/Balance'

enum EType {
  i = 'income',
  o = 'outcome',
}

interface TransactionDTO {
  title: string
  value: number
  type: EType
}

interface Balance {
  income: number
  outcome: number
  total: number
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const income = this.transactions
      .map(i => (i.type === 'income' ? i.value : 0))
      .reduce((red, inc) => red + inc, 0)

    const outcome = this.transactions
      .map(i => (i.type === 'outcome' ? i.value : 0))
      .reduce((red, inc) => red + inc, 0)

    const total = income - outcome

    return { income, outcome, total }
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const balance = this.getBalance()

    if (type === 'outcome') {
      if (balance.total < value) {
        throw Error('Transaction invalid, no have money suficiently')
      }
    }

    const transaction = new Transaction({ title, type, value })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
