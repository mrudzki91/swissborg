export type Transaction = {
    id: string;
    timestamp: string;
    type: 'withdrawal' | 'deposit';
    status: 'pending' | 'completed';
    currency: 'BTC' | 'USD' | 'CHF';
    amount: number;
};

export type EurRates = {
    BTC: number | null;
    CHF: number | null;
    USD: number | null;
};
