export interface User {
  telegram: string;
  watchlist: {
    limit: number;
    symbol: string;
  }[];
}
