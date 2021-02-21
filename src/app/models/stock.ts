export interface Stock {
  ask: number;
  baseCurrency: any;
  bid: number;
  change1h: number;
  change24h: number;
  changeBod: number;
  enabled: boolean;
  highLeverageFeeExempt: boolean;
  last: number;
  minProvideSize: number;
  name: string;
  postOnly: boolean;
  price: number;
  priceIncrement: number;
  quoteCurrency: any;
  quoteVolume24h: number;
  restricted: boolean;
  sizeIncrement: number;
  type: string;
  underlying: string;
  volumeUsd24h: number;
}
