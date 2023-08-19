import './App.css';
import LoadingScreen from './components/LoadingScreen';
import SummaryTable from './components/SummaryTable';
import TransactionsTable from './components/TransactionsTable';
import useEurRates from './hooks/useEurRates';
import useTransactions from './hooks/useTransactions';

function App() {
    const {
        isLoading: loadingTransactions,
        transactions,
        error: transactionsError,
    } = useTransactions();
    const { eurRates, isLoading: loadingEurRates, error: eurRatesError } = useEurRates();

    return (
        <div className="App">
            <h1>Transactions</h1>
            {loadingTransactions || loadingEurRates ? (
                <LoadingScreen />
            ) : eurRatesError || transactionsError ? (
                <>{eurRatesError ?? transactionsError ?? null}</>
            ) : (
                <>
                    <TransactionsTable transactions={transactions ?? []} eurRates={eurRates} />
                    <h2>Summary</h2>
                    <SummaryTable transactions={transactions ?? []} eurRates={eurRates} />
                </>
            )}
        </div>
    );
}

export default App;
