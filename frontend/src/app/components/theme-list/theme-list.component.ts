import { Component } from '@angular/core';
import { ThemeService } from "../../services/theme.service";
import { Theme } from "../../models/theme";

@Component({
  selector: 'app-topic-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent {
  public themes: Array<Theme> = [];
  public loading: boolean = false;

  constructor(private themeService: ThemeService) {
    this.loading = true;
    themeService.getThemes().subscribe(response => {
      this.themes = response.data.rows;
      this.loading = false;
    });
  }
}
