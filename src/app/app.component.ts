import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  imports: [IonicModule, RouterModule, RouterOutlet],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(async () => {
    });
  }
}
