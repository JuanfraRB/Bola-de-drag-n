import { Component,OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../../models/character.model';
import { DragonballService } from '../../services/dragonball';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.css',
})
export class CharacterDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dragonballService = inject(DragonballService);
  character = signal<Character | null>(null);
  loading = signal(true);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dragonballService.getCharacterById(id).subscribe({
      next: (res) => {
        this.character.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
