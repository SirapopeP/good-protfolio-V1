import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class LoadingComponent implements OnInit, OnDestroy {
  @Output() loadingComplete = new EventEmitter<void>();
  
  isLoading = true;
  progress = 0;
  loadingText = 'Initializing...';
  
  private loadingMessages = [
    'Initializing...',
    'Loading assets...',
    'Setting up components...',
    'Preparing interface...',
    'Almost ready...',
    'Welcome!'
  ];
  
  private progressInterval?: number;
  private textInterval?: number;

  ngOnInit() {
    this.startLoading();
  }

  ngOnDestroy() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
  }

  private startLoading() {
    let messageIndex = 0;
    
    // Update progress bar
    this.progressInterval = window.setInterval(() => {
      if (this.progress < 100) {
        // Simulate realistic loading progress
        const increment = Math.random() * 15 + 5; // Random increment between 5-20
        this.progress = Math.min(this.progress + increment, 100);
      } else {
        this.finishLoading();
      }
    }, 300);
    
    // Update loading text
    this.textInterval = window.setInterval(() => {
      if (messageIndex < this.loadingMessages.length - 1) {
        messageIndex++;
        this.loadingText = this.loadingMessages[messageIndex];
      }
    }, 600);
  }

  private finishLoading() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
    
    this.loadingText = 'Welcome!';
    this.progress = 100;
    
    // Add a small delay before hiding the loader
    setTimeout(() => {
      this.isLoading = false;
      
      // Emit completion after fade out animation
      setTimeout(() => {
        this.loadingComplete.emit();
      }, 500);
    }, 800);
  }
}
