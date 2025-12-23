import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
import { inject } from '@angular/core';
import { ItemForm } from '../item-form/item-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { delay } from 'rxjs/operators';   
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-item-list',
  imports: [CommonModule, FormsModule, ItemForm, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css'
})
export class ItemList implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  searchQuery: string = '';
  showForm: boolean = false;
  selectedItem?: Item;
  isLoading: boolean = false;


  private itemService = inject(ItemService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getItems().subscribe((data: Item[]) => {
      this.items = data;
      this.filteredItems = data;
      this.isLoading = false;

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
  if (item.id) {
    this.itemService.deleteItem(item.id).subscribe(() => {
      this.loadItems();
      this.snackBar.open('✓ Item deleted successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['warning-snackbar']
      });
    });
  }
}

  
  
  onItemCreated(newitem: Item): void {
  this.itemService.createItem(newitem).subscribe(() => {
    this.loadItems();
    this.showForm = false;
    this.selectedItem = undefined;
    this.snackBar.open('✓ Item created successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
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
    return this.items.filter((i: Item) => i.quantityAvailable === 0).length;}

  getData() {
  this.itemService.getItems()
    
 

}
  
  
  }
