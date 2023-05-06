import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from "rxjs";
import { Card } from "../../models/card.model";
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/question";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  nbColonnes?: number = 5;
  cards?: Observable<Array<Card>>;
  isLinear = false;
  public questions: Array<Question> = [];
  public loading: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {
    const idQuiz: number = this.route.snapshot.paramMap.get('idQuiz') as unknown as number;
    this.loading = true;
    questionService.getQuestionsByQuiz(idQuiz).subscribe(response => {
      this.questions = response.data.rows;
      this.loading = false;
    });
  }

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
