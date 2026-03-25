import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  themeService = inject(ThemeService);
  layoutService = inject(LayoutService);

  initials   = 'AM';
  fullName   = 'Aaron Marek';
  githubUrl  = 'https://github.com/AaronMarek';
  linkedinUrl = 'https://es.linkedin.com/in/aaron-marek-rojas';
  cvUrl      = '/CV.pdf';

}
