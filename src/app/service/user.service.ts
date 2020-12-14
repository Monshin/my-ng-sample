import { Injectable } from '@angular/core';
import { ApiService } from './generic/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUser(id: string) {
    return this.apiService.get('/user/profile', { id });
  }
}
