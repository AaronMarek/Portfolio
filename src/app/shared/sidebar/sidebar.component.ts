import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  themeService = inject(ThemeService);
  isCollapsed = false;

  // ⚠️ Personalizá estas variables con tus datos
  initials   = 'AM';
  fullName   = 'Aaron Marek Demczyszak Rojas';
  githubUrl  = 'https://github.com/AaronMarek';
  linkedinUrl = 'https://www.linkedin.com/in/aaron-marek-rojas/';
  cvUrl      = '/assets/CV.pdf';

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
