import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Characters } from './pages/characters/characters';
import { Planets } from './pages/planets/planets';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'characters', component: Characters },
  { path: 'planets', component: Planets },
  { path: '**', component: NotFound }
];
