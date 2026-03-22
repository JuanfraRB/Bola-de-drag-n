import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isOpen = signal(false);
  isDark = signal(false);

 constructor() {
  const savedTheme = localStorage.getItem('theme') ?? 'dark';
  this.isDark.set(savedTheme === 'dark');
  document.documentElement.setAttribute('data-theme', savedTheme);
}

toggleTheme() {
  this.isDark.update(v => !v);
  const theme = this.isDark() ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

  toggle() {
    this.isOpen.update((open) => !open);
  }

  close() {
    this.isOpen.set(false);
  }

}
