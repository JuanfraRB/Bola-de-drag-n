import { Component,OnInit, inject,  signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DragonballService } from '../../services/dragonball';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private dragonballService = inject(DragonballService);

  totalCharacters = signal(0);
  totalPlanets = signal(0);
  totalTransformations = signal(0);
  loading = signal(true);

  ngOnInit() {
    this.dragonballService.getCharacters(1, 1).subscribe({
      next: (res: any) => {
        this.totalCharacters.set(res.meta.totalItems);
      }
    });

    this.dragonballService.getPlanets(1, 1).subscribe({
      next: (res: any) => {
        this.totalPlanets.set(res.meta.totalItems);
        this.loading.set(false);
      }
    });
  }
}
