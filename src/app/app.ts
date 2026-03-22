import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './pages/footer/footer';
import { Sidebar } from './pages/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Footer,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  showSplash = signal(true);

  ngOnInit() {
    setTimeout(() => {
      this.showSplash.set(false);
    }, 3000);
  }
}
