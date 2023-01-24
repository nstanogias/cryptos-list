import { FC } from 'react';
import { ICurrency } from '../types';

interface Props {
  currency: ICurrency;
  index: number;
}

const CurrencyCard: FC<Props> = ({ index, currency }) => {
  return (
    <div className='flex flex-col w-full bg-white cursor-pointer h-60 rounded-xl hover:shadow-xl'>
      <div className='flex px-6 pt-6 pb-3 border-b-2 border-gray-200'>
        <p>{index + 1}.</p>
        <p className='pl-4 font-semibold'>{currency.name}</p>
      </div>
      <div className='flex flex-col px-6 pt-4'>
        <p>Code: {currency.code}</p>
        <p className='pt-2'>Type: {currency.type}</p>
        <p className='pt-2'>
          Supported in US: {currency.isSupportedInUS !== undefined ? currency.isSupportedInUS.toString() : `N/A`}
        </p>
        <p className='pt-2'>
          Supports Test mode: {currency.supportsTestMode !== undefined ? currency.supportsTestMode.toString() : `N/A`}
        </p>
      </div>
    </div>
  );
};

export default CurrencyCard;
