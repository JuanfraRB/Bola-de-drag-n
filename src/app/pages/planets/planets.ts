import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { DragonballService } from '../../services/dragonball';
import { ApiResponse, Planet } from '../../models/character.model';
import { FormsModule } from '@angular/forms';
import { debounce, debounceTime, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './planets.html',
  styleUrl: './planets.css',
})
export class Planets implements OnInit, OnDestroy {

  private dragonballService = inject(DragonballService);
  private searchSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  planets = signal<Planet[]>([]);
  loading =signal(true);
  currentPage = signal(1);
  totalPages = signal(0);
  selectedPlanet = signal<Planet | null>(null);
  hasFilters = signal(false);

  filters ={
    name: '',
    isDestroyed: ''
  };

  ngOnInit() {
    this.loadPlanets();
    this.searchSubject.pipe(
      debounceTime(400),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const active = this.hasActiveFilters();
      this.hasFilters.set(active);
      if (active) {
        this.applyFilters();
      } else {
        this.currentPage.set(1);
        this.loadPlanets();
      }
    });
  }

  loadPlanets() {
    this.loading.set(true);
    this.dragonballService.getPlanets(this.currentPage()).subscribe({
      next: (res: ApiResponse<Planet>) => {
        this.planets.set(res.items);
        this.totalPages.set(res.meta.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading.set(false);
      }
    });
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  private hasActiveFilters(): boolean {
    return !!this.filters.name || this.filters.isDestroyed !== '';
  }

  private applyFilters() {
    this.loading.set(true);
    this.dragonballService.filterPlanets(this.filters).subscribe({
      next: (res: any) => {
        const items = Array.isArray(res) ? res : res.items ?? [];
        this.planets.set(items);
        this.totalPages.set(res.meta?.totalPages ?? 1);
        this.loading.set(false);
      },
      error: () => {
        this.planets.set([]);
        this.totalPages.set(1);
        this.loading.set(false);
      }
    });
  }

  clearFilters() {
    this.filters ={
      name: '',
      isDestroyed: ''
    };
    this.hasFilters.set(false);
    this.currentPage.set(1);
    this.loadPlanets();
  }

  onFilterChange() {
    this.searchSubject.next();
  }

  openModal(planet: Planet) {
    this.selectedPlanet.set(planet);
  }

  closeModal() {
    this.selectedPlanet.set(null);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.loadPlanets();
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.loadPlanets();
    }
  }
}
