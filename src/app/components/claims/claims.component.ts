import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, Claim, LostItem, User } from '../../services/api.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims: Claim[] = [];
  items: LostItem[] = [];
  users: User[] = [];
  claimForm: FormGroup;
  loading = false;
  error: string | null = null;
  submitting = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.claimForm = this.fb.group({
      userId: ['', [Validators.required]],
      lostItemId: ['', [Validators.required]],
      claimedQuantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadClaims();
    this.loadItems();
    this.loadUsers();
  }

  loadClaims(): void {
    this.loading = true;
    this.error = null;
    
    this.apiService.getClaims().subscribe({
      next: (data) => {
        this.claims = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load claims: ' + err.message;
        this.loading = false;
        console.error('Error loading claims:', err);
      }
    });
  }

  loadItems(): void {
    this.apiService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => {
        console.error('Error loading items:', err);
      }
    });
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error loading users:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.claimForm.valid && !this.submitting) {
      this.submitting = true;
      this.error = null;

      const newClaim: Claim = {
        userId: +this.claimForm.value.userId,
        lostItemId: +this.claimForm.value.lostItemId,
        claimedQuantity: +this.claimForm.value.claimedQuantity
      };
      
      this.apiService.createClaim(newClaim).subscribe({
        next: (createdClaim) => {
          this.claims.unshift(createdClaim);
          this.claimForm.reset();
          this.submitting = false;
        },
        error: (err) => {
          this.error = 'Failed to create claim: ' + err.message;
          this.submitting = false;
          console.error('Error creating claim:', err);
        }
      });
    }
  }

  // Check if lostItemId is an object
  isLostItemObject(lostItemId: number | LostItem): boolean {
    return typeof lostItemId === 'object';
  }

  // Get the LostItem object (if it's an object) or null
  getLostItemObject(lostItemId: number | LostItem): LostItem | null {
    return typeof lostItemId === 'object' ? lostItemId : null;
  }

  getItemName(lostItemId: number | LostItem): string {
    if (this.isLostItemObject(lostItemId)) {
      return (lostItemId as LostItem).itemName;
    } else {
      const item = this.items.find(i => i.id === lostItemId);
      return item ? item.itemName : `Item ${lostItemId}`;
    }
  }

  getItemDetails(lostItemId: number | LostItem): string {
    if (this.isLostItemObject(lostItemId)) {
      const item = lostItemId as LostItem;
      return `${item.itemName} - ${item.place}`;
    } else {
      const item = this.items.find(i => i.id === lostItemId);
      return item ? `${item.itemName} - ${item.place}` : `Item ${lostItemId}`;
    }
  }

  getUserName(userId: number): string {
    if (!userId) return 'Unknown User';
    const user = this.users.find(u => u.id === userId);
    return user ? (user.name || user.email || `User ${userId}`) : `User ${userId}`;
  }
getItemId(lostItemId: number | LostItem): number {
  if (this.isLostItemObject(lostItemId)) {
    return (lostItemId as LostItem).id || 0;
  }
  return lostItemId as number; // Add explicit type assertion
}

  getItemStatus(lostItemId: number | LostItem): string {
    if (this.isLostItemObject(lostItemId)) {
      return (lostItemId as LostItem).status || 'Unknown';
    }
    return 'Unknown';
  }
}