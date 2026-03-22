import { Component } from '@angular/core';

import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();


  contactInfo = {
    name: 'Juan Francisco Rodríguez Berenguel',
    location: 'Almería, España',
    email: 'JuanfraRB@outlook.es'
  };
}
