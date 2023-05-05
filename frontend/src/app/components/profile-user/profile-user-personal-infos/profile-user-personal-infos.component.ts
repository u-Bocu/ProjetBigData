import { Component } from '@angular/core';
import {Theme} from "../../../models/theme";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-profile-user-personal-infos',
  templateUrl: './profile-user-personal-infos.component.html',
  styleUrls: ['./profile-user-personal-infos.component.css']
})
export class ProfileUserPersonalInfosComponent {
  //public themes: Array<Theme> = [];
  public loading: boolean = false;

  constructor(private themeService: ThemeService) {
    this.loading = true;
    //themeService.getThemes().subscribe(response => {
    //  this.themes = response.data.rows;
      this.loading = false;
    //});
  }
}
