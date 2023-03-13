import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from "rxjs";
import { Card } from "../../models/card.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nbColonnes?: number = 5;
  cards?: Observable<Array<Card>>;
  isLinear = false;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    /* Si l'écran est petit, passes les 'cards' de la taille standard vers une colonne */
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          // Taille sur colonne
          this.nbColonnes = 1;
          return [
            { title: 'Question 1', cols: 1, rows: 2 },
            { title: 'Question 2', cols: 1, rows: 2 },
            { title: 'Question 3', cols: 1, rows: 2 },
            { title: 'Question 4', cols: 1, rows: 2 },
            { title: 'Question 5', cols: 1, rows: 2 },
            { title: 'Question 6', cols: 1, rows: 2 },
            { title: 'Question 7', cols: 1, rows: 2 },
            { title: 'Question 8', cols: 1, rows: 2 },
            { title: 'Question 9', cols: 1, rows: 2 },
            { title: 'Question 10', cols: 1, rows: 2 }
          ];
        }

        // Taille standard
        this.nbColonnes = 5;
        return [
          { title: 'Question 1', cols: 5, rows: 2 },
          { title: 'Question 2', cols: 5, rows: 2 },
          { title: 'Question 3', cols: 5, rows: 2 },
          { title: 'Question 4', cols: 5, rows: 2 },
          { title: 'Question 5', cols: 5, rows: 2 },
          { title: 'Question 6', cols: 5, rows: 2 },
          { title: 'Question 7', cols: 5, rows: 2 },
          { title: 'Question 8', cols: 5, rows: 2 },
          { title: 'Question 9', cols: 5, rows: 2 },
          { title: 'Question 10', cols: 5, rows: 2 }
        ];
      })
    );
  }
}
