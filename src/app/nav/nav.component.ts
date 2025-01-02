import {Component, inject} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  //Do this later IF have time, follow the stackoverflow example i found, and see if I can do it using that. I just want to get the title of the
  // currentActive page, and display it in mid of page, would make it look cooler.
  activeTitle: string="";
  title: string="Celer";
  activatedRoute=inject(ActivatedRoute);
  route=inject(Router);

  constructor() {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
    });
    this.updateTitle();
  }
  updateTitle(): void {
    let currentRoute = this.activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    this.activeTitle = currentRoute.snapshot.data['title'] || '';
  }
}
