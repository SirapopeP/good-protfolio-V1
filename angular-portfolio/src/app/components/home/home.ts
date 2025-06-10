import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  skills = [
    { name: 'Frontend Development', level: 95, icon: '💻' },
    { name: 'UI/UX Design', level: 88, icon: '🎨' },
    { name: 'Mobile Development', level: 82, icon: '📱' },
    { name: 'Backend Development', level: 75, icon: '⚙️' },
    { name: 'Cloud Services', level: 70, icon: '☁️' },
    { name: 'DevOps', level: 68, icon: '🚀' }
  ];

  experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Company Inc.',
      period: '2022 - Present',
      description: 'Lead frontend development for modern web applications using Angular, React, and Vue.js.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Developed end-to-end solutions using modern frameworks and cloud technologies.'
    },
    {
      title: 'Junior Developer',
      company: 'Startup Inc.',
      period: '2019 - 2020',
      description: 'Started career building responsive websites and learning modern development practices.'
    }
  ];

  ngOnInit() {
    // Add staggered animations to elements
    this.animateElements();
  }

  private animateElements() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-load');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('fade-in-up');
        }, index * 200);
      });
    }, 100);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
