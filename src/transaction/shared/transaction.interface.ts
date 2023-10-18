export interface ITransaction {
  id: string;
  portfolio: string;
  asset: string;
  quantity: number;
  price?: number;
  date: string;
  createdAt: string;
}
