import { EurRates, Transaction, TransactionStatus, TransactionType } from '../types/swissborgApi';

type Summary = {
    completedWithdrawals: number;
    completedDeposits: number;
    pendingWithdrawals: number;
    pendingDeposits: number;
};

type SummarizedTranslations = {
    [key in keyof EurRates]: Summary;
};

const getSummaryFieldForTransaction = (transaction: Transaction): keyof Summary | undefined => {
    if (
        transaction.type === TransactionType.Withdrawal &&
        transaction.status === TransactionStatus.Completed
    ) {
        return 'completedWithdrawals';
    }
    if (
        transaction.type === TransactionType.Withdrawal &&
        transaction.status === TransactionStatus.Pending
    ) {
        return 'pendingWithdrawals';
    }
    if (
        transaction.type === TransactionType.Deposit &&
        transaction.status === TransactionStatus.Completed
    ) {
        return 'completedDeposits';
    }
    if (
        transaction.type === TransactionType.Deposit &&
        transaction.status === TransactionStatus.Pending
    ) {
        return 'pendingDeposits';
    }
};

export default (
    summary: SummarizedTranslations,
    transaction: Transaction,
): SummarizedTranslations => {
    const summaryField = getSummaryFieldForTransaction(transaction);
    if (!summaryField) return summary;

    return {
        ...summary,
        [transaction.currency]: {
            ...summary[transaction.currency],
            [summaryField]: summary[transaction.currency][summaryField] + transaction.amount,
        },
    };
};
