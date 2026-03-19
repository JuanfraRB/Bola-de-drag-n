import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { DragonballService } from '../../services/dragonball';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import type { ApiResponse, Character } from '../../models/character.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters implements OnInit, OnDestroy {

  private dragonballService = inject(DragonballService);
  private searchSubjet = new Subject<string>();
  private destroy$ = new Subject<void>();

  characters = signal<Character[]>([]);
  loading = signal(true);
  currentPage = signal(1);
  totalPages = signal(0);
  searchTermValue = '';

  ngOnInit() {
    this.loadCharacters();
    this.searchSubjet.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(term => {
      if(term.trim() === '') {
        this.currentPage.set(1);
        this.loadCharacters();
      } else {
        this.searchApi(term);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCharacters(){
    this.loading.set(true);
    this.dragonballService.getCharacters(this.currentPage()).subscribe({
      next: (res) => {
        const response = res as ApiResponse<Character>;
        this.characters.set(response.items);
        this.totalPages.set(response.meta.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error cargando: ', err);
        this.loading.set(false);
      }
    });
  }

  onSearch(term: string) {
    this.searchSubjet.next(term);
  }

  private searchApi(term: string) {
    this.loading.set(true);
    this.dragonballService.searchCharacters(term).subscribe({
      next: (res: ApiResponse<Character>) => {
        this.characters.set(res?.items ?? []);
        this.totalPages.set(res?.meta?.totalPages ?? 1);
        this.loading.set(false);
      },
      error: (err) => {
        this.characters.set([]);
        this.totalPages.set(1);
        this.loading.set(false);
      }
    });

  }

  nextPage() {
    if(this.currentPage() < this.totalPages()) {
      this.currentPage.update(n => n + 1);
      this.loadCharacters();
    }
  }

  prevPage() {
    if(this.currentPage() > 1) {
      this.currentPage.update(n => n - 1);
      this.loadCharacters();
    }
  }
}
