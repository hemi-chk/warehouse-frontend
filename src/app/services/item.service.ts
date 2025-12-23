import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  // Mock data - pretend this came from API
  private mockItems: Item[] = [
    {
      id: 1,
      itemCode: 'ITM001',
      itemName: 'Laptop Dell XPS 15',
      category: 'Electronics',
      quantityAvailable: 25,
      reorderLevel: 10,
      itemStatus: 'Active',
      insertDate: new Date('2024-01-15'),
      lastUpdated: new Date('2024-12-15'),
      dispatchedDate: new Date('2024-01-20'),
      receivedDate: new Date('2024-01-25')
    },
    {
      id: 2,
      itemCode: 'ITM002',
      itemName: 'Office Chair',
      category: 'Furniture',
      quantityAvailable: 50,
      reorderLevel: 15,
      itemStatus: 'Active',
      insertDate: new Date('2024-02-10'),
      lastUpdated: new Date('2024-12-10'),
      dispatchedDate: new Date('2024-02-15'),
      receivedDate: new Date('2024-02-20')
    },
    {
      id: 3,
      itemCode: 'ITM003',
      itemName: 'Printer HP LaserJet',
      category: 'Electronics',
      quantityAvailable: 8,
      reorderLevel: 10,
      itemStatus: 'Active',
      insertDate: new Date('2024-03-05'),
      lastUpdated: new Date('2024-12-18'),
      dispatchedDate: undefined,
      receivedDate: undefined
    },
    {
      id: 4,
      itemCode: 'ITM004',
      itemName: 'Desk Lamp',
      category: 'Furniture',
      quantityAvailable: 100,
      reorderLevel: 20,
      itemStatus: 'Active',
      insertDate: new Date('2024-04-12'),
      lastUpdated: new Date('2024-12-12'),
      dispatchedDate: new Date('2024-04-20'),
      receivedDate: new Date('2024-04-25')
    },
    {
      id: 5,
      itemCode: 'ITM005',
      itemName: 'Wireless Mouse',
      category: 'Electronics',
      quantityAvailable: 5,
      reorderLevel: 10,
      itemStatus: 'Active',
      insertDate: new Date('2024-05-08'),
      lastUpdated: new Date('2024-12-19'),
      dispatchedDate: undefined,
      receivedDate: undefined
    }
  ];

  constructor() { }

  getItems(): Observable<Item[]> {
    return of(this.mockItems);
  }

  getItemById(id: number): Observable<Item | undefined> {
    return of(this.mockItems.find(item => item.id === id));
  }

 createItem(item: Item): Observable<Item> {
    const newItem = { 
      ...item, 
      id: this.mockItems.length + 1,
      insertDate: new Date(),
      lastUpdated: new Date()
    };
    this.mockItems.push(newItem);
    return of(newItem);
  }

  updateItem(id: number, item: Item): Observable<Item> {
    const index = this.mockItems.findIndex(i => i.id === id);
    if (index !== -1) {
      this.mockItems[index] = { ...item, id, lastUpdated: new Date() };
    }
    return of(this.mockItems[index]);
  }

  deleteItem(id: number): Observable<boolean> {
    const index = this.mockItems.findIndex(i => i.id === id);
    if (index !== -1) {
      this.mockItems.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}