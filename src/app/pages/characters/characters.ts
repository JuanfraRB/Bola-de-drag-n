import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { DragonballService,CharacterFilters } from '../../services/dragonball';
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
  hasFilters = signal(false);
  selectedCharacter = signal<Character | null>(null);

  //filtros
  genders = ['Male', 'Female', 'Unknown'];
  races = ['Saiyan', 'Human', 'Namekian', 'Majin', 'Frieza Race', 'Android', 'Jiren Race', 'God', 'Angel', 'Evil', 'Nucleico', 'Nucleico benigno', 'Unknown'];
  affiliations = ['Z Fighter', 'Red Ribbon Army', 'Namekian Warrior', 'Freelancer', 'Army of Frieza', 'Pride Troopers', 'Assistant of Vermoud', 'God', 'Assistant of Beerus', 'Villain', 'Other'];

  //valores de filtros
  filters: CharacterFilters = {
    name: '',
    gender: '',
    race: '',
    affiliation: ''
  };

  ngOnInit() {
    this.loadCharacters();
    this.searchSubjet.pipe(
      debounceTime(400),
     // distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const active = this.hasActiveFilters();
      this.hasFilters.set(active);
      if(active) {
        this.applyFilters();
        } else {
          this.currentPage.set(1);
          this.loadCharacters();
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
      error: () => {
        console.error('Error cargando personajes.');
        this.loading.set(false);
      }
    });
  }

 /* onSearch(term: string) {
    this.searchSubjet.next(term);
  }

  private searchApi(term: string) {
    this.loading.set(true);
    this.dragonballService.searchCharacters(term).subscribe({
      next: (res:any) => {
        const items = Array.isArray(res) ? res : res?.items ?? [];
        this.characters.set(items);
        this.totalPages.set(1);
        this.loading.set(false);
      },
      error: (err) => {
        this.characters.set([]);
        this.totalPages.set(1);
        this.loading.set(false);
      }
    });

  }*/

    onFilterChange() {
      this.searchSubjet.next('');
    }

  private hasActiveFilters(): boolean {
    return !!(this.filters.name || this.filters.gender || this.filters.race || this.filters.affiliation);
  }

  private applyFilters() {
    this.loading.set(true);
    this.dragonballService.filterCharacters(this.filters).subscribe({
      next: (res:any) => {
        const items = Array.isArray(res) ? res : res?.items ?? [];
        this.characters.set(items);
        this.totalPages.set(1);
        this.loading.set(false);
      },
      error: () => {
        this.characters.set([]);
        this.totalPages.set(1);
        this.loading.set(false);
      }
    });
  }

  clearFilters() {
    this.filters = {
      name: '',
      gender: '',
      race: '',
      affiliation: ''
    };
    this.hasFilters.set(false);
    this.currentPage.set(1);
    this.loadCharacters();
  }

    openModal(character: Character) {
    this.selectedCharacter.set(character);
  }

  closeModal() {
    this.selectedCharacter.set(null);
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
