import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  isCollapsed = signal(false);

  toggle() {
    this.isCollapsed.update(v => !v);
  }
}
