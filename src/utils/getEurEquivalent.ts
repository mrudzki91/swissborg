import { EurRates } from '../types/swissborgApi';

const getEurEquivalent = (
    currency: keyof EurRates,
    amount: number,
    eurRates?: EurRates,
): number | null => {
    const currencyRate = eurRates?.[currency];

    return !currencyRate && currencyRate !== 0 ? null : currencyRate * amount;
};

export default getEurEquivalent;
