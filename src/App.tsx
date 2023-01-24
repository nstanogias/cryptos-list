import axios from 'axios';
import { useEffect, useState } from 'react';
import CurrencyCard from './components/CurrencyCard';
import Loader from './components/Loader';
import Toggle from './components/Toggle';
import { ICurrency } from './types';

const API_URL = 'https://api.moonpay.com/v3/currencies';

const App = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<ICurrency[]>([]);
  const [showNotSupportedInUS, setShowNotSupportedInUS] = useState(true);
  const [showNotSupportTestMode, setShowNotSupportTestMode] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<ICurrency[]>(`${API_URL}`);
        setCurrencies(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        }
        setCurrencies([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!currencies.length) {
      return;
    } else {
      if (!filteredCurrencies.length) {
        setFilteredCurrencies(currencies);
      }
    }

    let newState = [...currencies];

    if (!showNotSupportedInUS) {
      newState = newState.filter((currency) => currency.isSupportedInUS);
    }
    if (!showNotSupportTestMode) {
      newState = newState.filter((currency) => currency.supportsTestMode);
    }
    setFilteredCurrencies(newState);
  }, [currencies, showNotSupportedInUS, showNotSupportTestMode]);

  const sortByCurrencyName = (direction: number) => {
    const newState = [...filteredCurrencies.sort((a, b) => (a.name > b.name ? direction : direction * -1))];
    setFilteredCurrencies(newState);
  };

  const sortByCode = (direction: number) => {
    const newState = [...filteredCurrencies.sort((a, b) => (a.code > b.code ? direction : direction * -1))];
    setFilteredCurrencies(newState);
  };

  const randomShuffle = () => {
    const newState = [...filteredCurrencies.sort(() => Math.random() - 0.5)];
    setFilteredCurrencies(newState);
  };

  return (
    <>
      {error ? (
        <div className='container'>Something went wrong</div>
      ) : (
        <div className='container w-full px-4 pt-24 mx-auto md:px-0'>
          <label className='flex justify-center text-2xl'>Currencies list</label>
          <div className='flex justify-center pt-12'>
            <button className='p-4 border border-gray-400 rounded-full' onClick={randomShuffle}>
              Shuffle currencies
            </button>
          </div>
          <div className='flex justify-between pt-12'>
            <div className='flex gap-4'>
              <button className='p-4 border border-gray-400 rounded-full' onClick={() => sortByCurrencyName(1)}>
                Sort by name Asc
              </button>
              <button className='p-4 border border-gray-400 rounded-full' onClick={() => sortByCurrencyName(-1)}>
                Sort by name Desc
              </button>
            </div>
            <div className='flex gap-4'>
              <Toggle
                label='Show not supported in US'
                enabled={showNotSupportedInUS}
                setEnabled={() => setShowNotSupportedInUS((prev) => !prev)}
              />
              <Toggle
                label='Show not supported in Test mode'
                enabled={showNotSupportTestMode}
                setEnabled={() => setShowNotSupportTestMode((prev) => !prev)}
              />
            </div>
            <div className='flex gap-4'>
              <button className='p-4 border border-gray-400 rounded-full' onClick={() => sortByCode(1)}>
                Sort by code Asc
              </button>
              <button className='p-4 border border-gray-400 rounded-full' onClick={() => sortByCode(-1)}>
                Sort by code Desc
              </button>
            </div>
          </div>
          {filteredCurrencies.length > 0 && (
            <div className='grid grid-cols-1 pt-24 gap-y-12 gap-x-12 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredCurrencies.map((curr, index) => (
                <CurrencyCard key={index} index={index} currency={curr} />
              ))}
            </div>
          )}
        </div>
      )}
      {loading && <Loader />}
    </>
  );
};

export default App;
