import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
