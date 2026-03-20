import { Injectable } from "@angular/core";
import { HttpClient , HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import type { Character, ApiResponse } from "../models/character.model";


export interface CharacterFilters {
  name?: string;
  gender?: string;
  race?: string;
  affiliation?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DragonballService {
 private readonly baseUrl = 'https://dragonball-api.com/api';
    
    constructor(private readonly http: HttpClient) {}
    
    getCharacters(page: number = 1, limit: number = 10): Observable<ApiResponse<Character>> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
      return this.http.get<ApiResponse<Character>>(`${this.baseUrl}/characters`, { params });
    }

    getCharacterById(id: number): Observable<Character> {
      return this.http.get<Character>(`${this.baseUrl}/characters/${id}`);
    }

    /*searchCharacters(name: string): Observable<any> {
      const params = new HttpParams().set('name', name);
      return this.http.get<any>(`${this.baseUrl}/characters`, { params });
    }*/

      filterCharacters(filters: CharacterFilters): Observable<any> {
        let params = new HttpParams();
        if (filters.name) params = params.set('name', filters.name);
  
        if (filters.gender) params = params.set('gender', filters.gender);
        
        if (filters.race) params = params.set('race', filters.race);
        
        if (filters.affiliation) params = params.set('affiliation', filters.affiliation);
        
        return this.http.get<any>(`${this.baseUrl}/characters`, { params });
      }
}
