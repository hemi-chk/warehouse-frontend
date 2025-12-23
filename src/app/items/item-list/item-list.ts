import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { inject } from '@angular/core';
import { ItemForm } from '../item-form/item-form';

@Component({
  selector: 'app-item-list',
  imports: [CommonModule, FormsModule, ItemForm],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';
  showForm: boolean = false;
  selectedItem?: Item;

  private itemService = inject(ItemService);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
      this.filteredItems = data;
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredItems = this.items;
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredItems = this.items.filter((item: Item) =>
      item.itemCode.toLowerCase().includes(query) ||
      item.itemName.toLowerCase().includes(query)
    );
  }

  onAddItem(): void {
    this.selectedItem = undefined;
    this.showForm = true;
  }

  onEditClick(item: Item): void {
    this.selectedItem = item;
    this.showForm = true;
  }

  onDelete(item: Item): void {
    if (confirm(`Are you sure you want to delete ${item.itemName}?`)) {
      if (item.id) {
        this.itemService.deleteItem(item.id).subscribe(() => {
          this.loadItems();
          alert('Item deleted successfully!');
        });
      }
    }
  }

  onItemCreated(newItem: Item): void {
    this.itemService.createItem(newItem).subscribe(() => {
      this.loadItems();
      this.showForm = false;
      alert('Item created successfully!');
    });
  }

  onItemUpdated(updatedItem: Item): void {
    if (updatedItem.id) {
      this.itemService.updateItem(updatedItem.id, updatedItem).subscribe(() => {
        this.loadItems();
        this.showForm = false;
        alert('Item updated successfully!');
      });
    }
  }

  onFormCancel(): void {
    this.showForm = false;
    this.selectedItem = undefined;
  }

  getActive_Count(): number {
    return this.items.filter((i: Item) => i.itemStatus === 'Active').length;
  }

  getLowStock_Count(): number {
    return this.items.filter((i: Item) => i.quantityAvailable<=i.reorderLevel &&i.quantityAvailable > 0  ).length;
  }

  getCritical_Count(): number {
    return this.items.filter((i: Item) => i.quantityAvailable === 0).length;}}
