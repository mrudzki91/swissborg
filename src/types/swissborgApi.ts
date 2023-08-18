export enum TransactionType {
    Withdrawal = 'withdrawal',
    Deposit = 'deposit',
}

export enum TransactionStatus {
    Pending = 'pending',
    Completed = 'completed',
}

export type EurRates = {
    BTC: number | null;
    CHF: number | null;
    USD: number | null;
};

export type Transaction = {
    id: string;
    timestamp: string;
    type: TransactionType;
    status: TransactionStatus;
    currency: keyof EurRates;
    amount: number;
};
