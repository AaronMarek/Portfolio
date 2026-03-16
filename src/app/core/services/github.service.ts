import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private http = inject(HttpClient);
  // ⚠️ Reemplazá con tu usuario real de GitHub
  private username = 'AaronMarek';

  getRepositories(): Observable<Project[]> {
    return this.http.get<Project[]>(
      `https://api.github.com/users/${this.username}/repos?sort=updated&per_page=20`
    );
  }
}
