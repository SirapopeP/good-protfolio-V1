import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class GalleryComponent implements OnInit {
  projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce platform with Angular, featuring product catalog, shopping cart, and payment integration.',
      category: 'Web Development',
      image: 'placeholder',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Node.js', 'MongoDB'],
      demoUrl: '#',
      codeUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Responsive portfolio website built with modern design principles and smooth animations.',
      category: 'Web Design',
      image: 'placeholder',
      technologies: ['Angular', 'SCSS', 'TypeScript', 'CSS Animations'],
      demoUrl: '#',
      codeUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team collaboration features.',
      category: 'Mobile App',
      image: 'placeholder',
      technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
      demoUrl: '#',
      codeUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'Interactive weather dashboard with location-based forecasts and beautiful data visualizations.',
      category: 'Web Development',
      image: 'placeholder',
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS Grid'],
      demoUrl: '#',
      codeUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Brand Identity Design',
      description: 'Complete brand identity design including logo, color palette, and marketing materials.',
      category: 'Design',
      image: 'placeholder',
      technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
      demoUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Real Estate Platform',
      description: 'Property listing platform with advanced search, filters, and virtual tour integration.',
      category: 'Web Development',
      image: 'placeholder',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'AWS'],
      demoUrl: '#',
      codeUrl: '#',
      featured: true
    }
  ];

  categories = ['All', 'Web Development', 'Web Design', 'Mobile App', 'Design'];
  selectedCategory = 'All';
  filteredProjects: Project[] = [];

  ngOnInit() {
    this.filteredProjects = this.projects;
    this.animateElements();
  }

  filterProjects(category: string) {
    this.selectedCategory = category;
    
    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project => project.category === category);
    }
    
    // Re-animate filtered elements
    setTimeout(() => {
      this.animateElements();
    }, 100);
  }

  private animateElements() {
    const elements = document.querySelectorAll('.project-card');
    elements.forEach((el, index) => {
      el.classList.remove('fade-in-up');
      setTimeout(() => {
        el.classList.add('fade-in-up');
      }, index * 100);
    });
  }

  getFeaturedProjects() {
    return this.projects.filter(project => project.featured);
  }
}
