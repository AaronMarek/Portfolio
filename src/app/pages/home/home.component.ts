import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../core/services/github.service';
import { Project } from '../../models/project.model';

// Tipo para los tabs disponibles
type Tab = 'About' | 'Proyectos' | 'Habilidades' | 'Contacto';

interface Skill {
  name: string;
  level: 'Avanzado' | 'Intermedio' | 'Básico';
  icon: string;
  category: 'Frontend' | 'Backend' | 'Herramientas';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private githubService = inject(GithubService);

  name            = 'Aaron Marek Demczyszak Rojas';
  role            = 'Desarrollador Full Stack';
  location        = 'España';
  bio             = 'Soy un desarrollador junior apasionado por construir aplicaciones y proyectos modernos y escalables. Me encuentro en búsqueda activa de mi primera experiencia profesional para seguir creciendo y aportar valor a un equipo dinámico.';
  yearsOfStudy    = 2;
  completedProjects = 5;
  githubUrl       = 'https://github.com/AaronMarek';
  linkedinUrl     = 'https://www.linkedin.com/in/aaron-marek-rojas/';
  email           = 'aaronmarekrojas@gmail.com';
  cvUrl           = '/assets/CV.pdf';
  avatarUrl       = 'https://media.licdn.com/dms/image/v2/D4D03AQFWUD6g3MMuIg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1700043454998?e=2147483647&v=beta&t=-iyxiTpsoKLB8sWV3QZBRtKqLUuePbm0Jkn_nbNWT58';
  // ────────────────────────────────────────────────────

  activeTab = signal<Tab>('About');

  projects: Project[] = [];
  loadingProjects = false;
  errorProjects   = false;

  skills: Skill[] = [
    // Frontend
    { name: 'HTML',        level: 'Avanzado',   icon: '🌐', category: 'Frontend' },
    { name: 'CSS',         level: 'Avanzado',   icon: '🎨', category: 'Frontend' },
    { name: 'JavaScript',  level: 'Intermedio', icon: '⚡', category: 'Frontend' },
    { name: 'TypeScript',  level: 'Intermedio', icon: '📘', category: 'Frontend' },
    { name: 'Angular',     level: 'Intermedio', icon: '🔺', category: 'Frontend' },
    { name: 'Tailwind',    level: 'Intermedio', icon: '💨', category: 'Frontend' },
    { name: 'Bootstrap',   level: 'Intermedio', icon: '🅱️', category: 'Frontend' },

    // Backend
    { name: 'Java',        level: 'Avanzado',   icon: '☕', category: 'Backend' },
    { name: 'Spring Boot', level: 'Intermedio', icon: '🌱', category: 'Backend' },
    { name: 'Node.js',     level: 'Básico',     icon: '🟢', category: 'Backend' },
    { name: 'Python',      level: 'Intermedio', icon: '🐍', category: 'Backend' },
    { name: 'Kotlin',      level: 'Intermedio', icon: '📱', category: 'Backend' },
    { name: 'Swift',       level: 'Intermedio', icon: '🍎', category: 'Backend' },

    // Bases de datos
    { name: 'MySQL',       level: 'Intermedio', icon: '🗄️', category: 'Backend' },
    { name: 'MongoDB',     level: 'Intermedio', icon: '🍃', category: 'Backend' },
    { name: 'SQL',         level: 'Intermedio', icon: '📊', category: 'Backend' },

    // Dev Tools
    { name: 'Git',         level: 'Intermedio', icon: '🔧', category: 'Herramientas' },
    { name: 'GitHub',      level: 'Intermedio', icon: '🐙', category: 'Herramientas' },
    { name: 'Docker',      level: 'Básico',     icon: '🐳', category: 'Herramientas' },
    { name: 'Maven',       level: 'Intermedio', icon: '📦', category: 'Herramientas' },

    // IDEs
    { name: 'Visual Studio',   level: 'Intermedio', icon: '💻', category: 'Herramientas' },
    { name: 'Android Studio',  level: 'Intermedio', icon: '🤖', category: 'Herramientas' },
    { name: 'Eclipse',         level: 'Intermedio', icon: '🌑', category: 'Herramientas' },
    { name: 'Xcode',           level: 'Intermedio', icon: '🛠️', category: 'Herramientas' },
  ];

  get initials() {
    return this.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }
  get frontendSkills() { return this.skills.filter(s => s.category === 'Frontend'); }
  get backendSkills()  { return this.skills.filter(s => s.category === 'Backend'); }
  get toolSkills()     { return this.skills.filter(s => s.category === 'Herramientas'); }

  ngOnInit() { this.loadProjects(); }

  setTab(tab: Tab) { this.activeTab.set(tab); }

  loadProjects() {
    if (this.projects.length > 0) return;
    this.loadingProjects = true;
    this.githubService.getRepositories().subscribe({
      next: (data) => {
        this.projects = data.filter(p => !p.fork).slice(0, 12);
        this.loadingProjects = false;
      },
      error: () => {
        this.errorProjects   = true;
        this.loadingProjects = false;
      }
    });
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' });
  }

  levelClass(level: string): string {
    return ({ 'Avanzado': 'lvl-advanced', 'Intermedio': 'lvl-intermediate', 'Basico': 'lvl-basic' } as Record<string,string>)[level] ?? '';
  }
}
