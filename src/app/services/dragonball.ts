import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DragonballService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dragon-ball-api.fly.dev/api';
  
  getCharacters() {
    return this.http.get(`${this.apiUrl}/characters`);
  }
}
