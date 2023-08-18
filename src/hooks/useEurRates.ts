import { useEffect, useReducer } from 'react';
import { get } from '../api/swissborg';
import { EurRates } from '../types/swissborgApi';

type StateType = {
    isLoading: boolean;
    error?: string;
    eurRates?: EurRates;
};

type ActionType = {
    type: string;
    value?: string | EurRates;
};

const transasctionsReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'EUR_RATES_FETCHING_STARTED':
            return { ...state, error: undefined, isLoading: true };
        case 'EUR_RATES_FETCHING_COMPLETED':
            return { ...state, isLoading: false, eurRates: action.value as EurRates };
        case 'EUR_RATES_FETCHING_FAILED':
            return {
                ...state,
                isLoading: false,
                eurRates: undefined,
                error: action.value as string,
            };
    }
    return state;
};

const useEurRates = () => {
    const [state, dispatch] = useReducer(transasctionsReducer, { isLoading: true });

    useEffect(() => {
        const getEurRates = async () => {
            dispatch({ type: 'EUR_RATES_FETCHING_STARTED' });
            try {
                const result = await get<EurRates>('/eur-rates');
                if (result.status === 200) {
                    dispatch({ type: 'EUR_RATES_FETCHING_COMPLETED', value: result.data });
                } else {
                    dispatch({
                        type: 'EUR_RATES_FETCHING_FAILED',
                        value: 'Wrong response status. Try again later.',
                    });
                }
            } catch (error) {
                dispatch({
                    type: 'EUR_RATES_FETCHING_FAILED',
                    value: 'Request error. Try again later.',
                });
            }
        };
        getEurRates();
    }, []);

    return {
        ...state,
    };
};

export default useEurRates;
