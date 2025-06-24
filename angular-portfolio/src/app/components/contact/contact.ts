import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  showSuccess = false;
  showError = false;

  contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'sirapope@outlook.co.th',
      link: 'mailto:sirapope@outlook.co.th'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+66 83 996 6635',
      link: 'tel:+66 83 996 6635'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Bangkok, Thailand',
      link: '#'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile'
    }
  ];

  socialLinks = [
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/SirapopeP',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/yourprofile',
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/yourusername',
      color: '#1da1f2'
    },
    {
      name: 'Instagram',
      icon: '📸',
      url: 'https://www.instagram.com/sena202505/',
      color: '#e4405f'
    }
  ];

  onSubmit() {
    if (this.isFormValid()) {
      this.isSubmitting = true;
      this.showError = false;
      this.showSuccess = false;

      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccess = true;
        this.resetForm();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccess = false;
        }, 5000);
      }, 2000);
    } else {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim() &&
      this.isValidEmail(this.contactForm.email)
    );
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }

  openLink(url: string) {
    if (url !== '#') {
      window.open(url, '_blank');
    }
  }
}
