import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LocalStorageService } from "../../services/local-storage.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { EventService } from "../../services/event.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isLogged: boolean = false;
  username?: string;
  points?: number = 0;

  // Responsive si l'on passe en version mobile
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private eventService: EventService
    ) {
    this.isLogged = this.localStorageService.isLogged();
    this.username = this.localStorageService.getData('username');
    this.refresh();
  }

  public disconnect(): void {
    this.localStorageService.deleteData();
    this.toastr.success('Déconnexion réussie', 'Succès', {
      positionClass: 'test'
    });
    this.router.navigateByUrl('/dashboard').then(() => {
      this.eventService.emitRefreshNavigationEvent();
      this.eventService.emitRefreshDashboardEvent();
    });
  }

  public refresh(): void {
    this.eventService.getRefreshNavigationEvent().subscribe(() => {
      this.isLogged = this.localStorageService.isLogged();
      this.username = this.localStorageService.getData('username');
    });
  }
}
