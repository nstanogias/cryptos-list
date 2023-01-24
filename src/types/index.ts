export interface ICurrency {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  name: string;
  code: string;
  precision: number;
  maxAmount: number;
  minAmount: number;
  minBuyAmount: number;
  maxBuyAmount: number;
  addressRegex: string;
  testnetAddressRegex: string;
  supportsAddressTag: boolean;
  addressTagRegex: string;
  supportsTestMode: boolean;
  supportsLiveMode: boolean;
  isSuspended: boolean;
  isSupportedInUS: boolean;
  notAllowedUSStates: string[];
  notAllowedCountries: string[];
  isSellSupported: boolean;
  confirmationsRequired: number;
  minSellAmount: number;
  maxSellAmount: number;
}
