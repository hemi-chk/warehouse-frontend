import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../../models/item';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
selector: 'app-item-form',
imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatChipsModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatIconModule, MatCardModule],
templateUrl: './item-form.html', //(This was the auto suggested line) 
styleUrl: './item-form.css'
})


export class ItemForm implements OnInit {
@Input() itemToEdit?: Item;
@Output() itemCreated = new EventEmitter<Item>();
@Output() itemUpdated = new EventEmitter<Item>();
@Output() cancelled = new EventEmitter<void>();

itemForm!: FormGroup;
isEditMode: boolean = false;
  
categories = ['Electronics', 'Furniture', 'Stationery', 'Hardware', 'Consumables', 'Raw Materials'];

constructor(private fb: FormBuilder) {}

ngOnInit(): void {
this.itemForm = this.fb.group({
itemCode: ['', Validators.required],
itemName: ['', Validators.required],
category: ['', Validators.required],
quantityAvailable: [0, [Validators.required, Validators.min(0)]],
 reorderLevel: [10, [Validators.required, Validators.min(0)]],
 itemStatus: ['Active', Validators.required],
insertDate: [new Date(), Validators.required],
lastUpdated: [new Date(), Validators.required],
dispatchedDate: [null],
receivedDate: [null]  });

if (this.itemToEdit) {
this.isEditMode = true;
this.itemForm.patchValue(this.itemToEdit);
}}

isLowStock(): boolean {
const quantity = this.itemForm.get('quantityAvailable')?.value || 0;
const reorderLevel = this.itemForm.get('reorderLevel')?.value || 0;
return quantity > 0 && quantity <= reorderLevel;}

on_Submit(): void {
 if (this.itemForm.invalid) {
 return;
}

const formValue = this.itemForm.value;
    
if (this.isEditMode) {
this.itemUpdated.emit({ ...this.itemToEdit, ...formValue });
} else {
this.itemCreated.emit(formValue);
}
}

on_Cancel(): void {
this.cancelled.emit();
}
}