import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { LoadingComponent } from './components/loading/loading';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'angular-portfolio';
  showLoading = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      // Skip loading if already visited in this session
      this.showLoading = false;
      this.navigateToHome();
    }
  }

  onLoadingComplete() {
    this.showLoading = false;
    sessionStorage.setItem('hasVisited', 'true');
    this.navigateToHome();
  }

  private navigateToHome() {
    // Navigate to home page if not already there
    if (this.router.url === '/') {
      this.router.navigate(['/home']);
    }
  }
}
