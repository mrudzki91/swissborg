import { format } from 'date-fns';
import { EurRates, Transaction } from '../types/swissborgApi';
import getEurEquivalent from '../utils/getEurEquivalent';

type TransactionsTableProps = {
    transactions: Transaction[];
    eurRates?: EurRates;
};

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, eurRates }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>timestamp</th>
                        <th>currency</th>
                        <th>amount</th>
                        <th>eur equiv</th>
                        <th>type</th>
                        <th>status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{format(new Date(transaction.timestamp), 'LLL dd yyyy')}</td>
                            <td>{transaction.currency}</td>
                            <td>{transaction.amount}</td>
                            <td>
                                {getEurEquivalent(
                                    transaction.currency,
                                    transaction.amount,
                                    eurRates,
                                )?.toFixed(2) ?? (
                                    <span>{`${transaction.currency} rate not available`}</span>
                                )}
                            </td>
                            <td>{transaction.type}</td>
                            <td>{transaction.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionsTable;
