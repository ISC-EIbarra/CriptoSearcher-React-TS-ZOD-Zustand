import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Cryptocurrency, CryptoPrice, Pair } from '../types';
import { fetchCurrentCryptoPrice, getCryptos } from '../services/CryptoService';

type cryptoStore = {
  cryptocurrencies: Cryptocurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCryptos: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<cryptoStore>()(
  devtools((set) => ({
    cryptocurrencies: [],
    result: {
      IMAGEURL: '',
      PRICE: '',
      HIGHDAY: '',
      LOWDAY: '',
      CHANGEPCT24HOUR: '',
      LASTUPDATE: '',
    },
    loading: false,
    fetchCryptos: async () => {
      const cryptocurrencies = await getCryptos();
      set(() => ({
        cryptocurrencies,
      }));
    },
    fetchData: async (pair) => {
      set(() => ({
        loading: true,
      }));
      const result = await fetchCurrentCryptoPrice(pair);
      set(() => ({
        result,
        loading: false,
      }));
    },
  }))
);
