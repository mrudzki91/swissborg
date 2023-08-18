import { EurRates } from '../types/swissborgApi';

export default (currency: keyof EurRates, amount: number, eurRates?: EurRates): number | null => {
    const currencyRate = eurRates?.[currency];

    return !currencyRate && currencyRate !== 0 ? null : currencyRate * amount;
};
