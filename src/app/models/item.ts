export interface Item 
{
  id?: number;
  itemCode: string;
  itemName: string;
  category: string;
  quantityAvailable: number;
  reorderLevel: number;
  itemStatus: 'Active' | 'Inactive';
  insertDate: Date;
  lastUpdated: Date;
  dispatchedDate?: Date;
  receivedDate?: Date;
}