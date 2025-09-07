import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, LostItem } from '../../services/api.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: LostItem[] = [];
  itemForm: FormGroup;
  loading = false;
  error: string | null = null;
  submitting = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
      itemName: ['', [Validators.required]],
      place: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = null;
    
    this.apiService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load items: ' + err.message;
        this.loading = false;
        console.error('Error loading items:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid && !this.submitting) {
      this.submitting = true;
      this.error = null;

      const newItem: LostItem = this.itemForm.value;
      
      this.apiService.createItem(newItem).subscribe({
        next: (createdItem) => {
          this.items.unshift(createdItem);
          this.itemForm.reset();
          this.submitting = false;
        },
        error: (err) => {
          this.error = 'Failed to create item: ' + err.message;
          this.submitting = false;
          console.error('Error creating item:', err);
        }
      });
    }
  }
}
