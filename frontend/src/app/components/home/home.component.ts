import { Component } from '@angular/core';
import { LocalStorageService } from "../../services/local-storage.service";
import { EventService } from "../../services/event.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLogged: boolean = false;
  interval = 2000;
  showIndicators = true;

  constructor(
    private localStorageService: LocalStorageService,
    private eventService: EventService
  ) {
    this.isLogged = this.localStorageService.isLogged();
    this.refresh();
  }

  public refresh(): void {
    this.eventService.getRefreshNavigationEvent().subscribe(() => {
      this.isLogged = this.localStorageService.isLogged();
    });
  }
}
