import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, ToolbarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'inventory-app';
  isNoHeaderRoute: boolean = false;
  router = inject(Router);

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // in the future, add public routes here.
        const isNoHeaderRoute = ['orders/tag-references'];
        this.isNoHeaderRoute = isNoHeaderRoute.some((route) =>
          this.router.url.includes(route)
        );
      });
  }
}
