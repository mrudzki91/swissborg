import { EurRates, Transaction } from '../types/swissborgApi';
import getEurEquivalent from '../utils/getEurEquivalent';
import summarizeTransactions from '../utils/summarizeTransactions';

type SummaryTableProps = {
    transactions: Transaction[];
    eurRates?: EurRates;
};

const getInitialSummary = () => ({
    completedWithdrawals: 0,
    completedDeposits: 0,
    pendingWithdrawals: 0,
    pendingDeposits: 0,
});

const SummaryTable: React.FC<SummaryTableProps> = ({ transactions, eurRates }) => {
    const summary = transactions.reduce(summarizeTransactions, {
        BTC: getInitialSummary(),
        CHF: getInitialSummary(),
        USD: getInitialSummary(),
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>currency</th>
                        <th>total completed withdrawals</th>
                        <th>total completed deposits</th>
                        <th>total pending withdrawals</th>
                        <th>total pending deposits</th>
                        <th>total balance (completed deposits - completed withdrawals)</th>
                        <th>total balance eur equiv</th>
                    </tr>
                </thead>
                <tbody>
                    {(Object.keys(summary) as (keyof EurRates)[]).map((currency) => (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>{summary[currency].completedWithdrawals}</td>
                            <td>{summary[currency].completedDeposits}</td>
                            <td>{summary[currency].pendingWithdrawals}</td>
                            <td>{summary[currency].pendingDeposits}</td>
                            <td>
                                {parseFloat(
                                    (
                                        summary[currency].completedDeposits -
                                        summary[currency].completedWithdrawals
                                    ).toFixed(4),
                                )}
                            </td>
                            <td>
                                {getEurEquivalent(
                                    currency,
                                    summary[currency].completedDeposits -
                                        summary[currency].completedWithdrawals,
                                    eurRates,
                                )?.toFixed(2) ?? `${currency} rate not available`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SummaryTable;
