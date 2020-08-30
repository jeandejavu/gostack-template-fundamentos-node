import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.send({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', ({ body: { title, value, type } }, response) => {
  try {
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    return response.send(
      createTransactionService.execute({ title, value, type }),
    );
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
