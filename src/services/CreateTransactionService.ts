import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

enum EType {
  i = 'income',
  o = 'outcome',
}

interface Balance {
  title: string
  value: number
  type: EType
}
// EType.i

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute({ title, value, type }: Balance): Transaction {
    const { i } = EType
    const { o } = EType

    if (type === i || type === o) {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      })

      return transaction
    }
    throw Error('The type is not income or outcome.')
  }
}

export default CreateTransactionService
