import { Provider } from 'react-redux';
import { useChainOptions, WalletProvider } from '@terra-money/wallet-provider';

// project imports
import { Layout } from 'components';
import { Dashboard, TxSample } from 'views';
import { store } from 'reducers/store';
import { ThemeConfig } from 'theme/theme';

export const App = () => {
  const chainOptions = useChainOptions();

  return (
    chainOptions && (
      <WalletProvider {...chainOptions}>
        <Provider store={store}>
          <ThemeConfig>
            <Layout>
              <Dashboard />
              <TxSample />
            </Layout>
          </ThemeConfig>
        </Provider>
      </WalletProvider>
    )
  );
};
