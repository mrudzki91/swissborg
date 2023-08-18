import { useEffect, useReducer } from 'react';
import { get } from '../api/swissborg';
import { Transaction } from '../types/swissborgApi';

type StateType = {
    isLoading: boolean;
    error?: string;
    transactions?: Transaction[];
};

type ActionType = {
    type: string;
    value?: string | Transaction[];
};

const transasctionsReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'TRANSACTIONS_FETCHING_STARTED':
            return { ...state, error: undefined, isLoading: true };
        case 'TRANSACTIONS_FETCHING_COMPLETED':
            return { ...state, isLoading: false, transactions: action.value as Transaction[] };
        case 'TRANSACTIONS_FETCHING_FAILED':
            return {
                ...state,
                isLoading: false,
                transactions: undefined,
                error: action.value as string,
            };
    }
    return state;
};

const useTransactions = () => {
    const [state, dispatch] = useReducer(transasctionsReducer, { isLoading: true });

    useEffect(() => {
        const getTransactions = async () => {
            dispatch({ type: 'TRANSACTIONS_FETCHING_STARTED' });
            try {
                const result = await get<{ transactions: Transaction[] }>('/transactions');
                if (result.status === 200) {
                    dispatch({
                        type: 'TRANSACTIONS_FETCHING_COMPLETED',
                        value: result.data?.transactions ?? [],
                    });
                } else {
                    dispatch({
                        type: 'TRANSACTIONS_FETCHING_FAILED',
                        value: 'Wrong response status. Try again later.',
                    });
                }
            } catch (error) {
                dispatch({
                    type: 'TRANSACTIONS_FETCHING_FAILED',
                    value: 'Request error. Try again later.',
                });
            }
        };
        getTransactions();
    }, []);

    return {
        ...state,
    };
};

export default useTransactions;
