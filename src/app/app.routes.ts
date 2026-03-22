import { Routes } from '@angular/router';
import { Characters } from './pages/characters/characters';
import { Planets } from './pages/planets/planets';

export const routes: Routes = [
  { path: '', component: Characters },
  { path: 'planets', component: Planets }
];
