import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LostItem {
  id?: number;
  quantity: number;
  itemName: string;
  place: string;
  status?: string; // Add status field if needed
}

export interface Claim {
  id?: number;
  userId: number;
  lostItemId: number | LostItem; // Can be either ID number or full object
  claimedQuantity: number;
  claimDate?: string; // Add claimDate field
}

export interface User {
  id: number;
  name?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';
  private authToken = 'Test';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });
  }

  // Items endpoints
  getItems(): Observable<LostItem[]> {
    return this.http.get<LostItem[]>(`${this.baseUrl}/items`);
  }

  createItem(item: LostItem): Observable<LostItem> {
    return this.http.post<LostItem>(`${this.baseUrl}/items`, item);
  }

  // Claims endpoints
  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.baseUrl}/claim`, { headers: this.getHeaders() });
  }

  createClaim(claim: Claim): Observable<Claim> {
    return this.http.post<Claim>(`${this.baseUrl}/claim`, claim);
  }

  // Users endpoints
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`);
  }

  // PDF upload endpoint
  uploadPdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/pdf`, formData, { headers: this.getHeaders() });
  }
}