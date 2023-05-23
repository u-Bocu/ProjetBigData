import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuizService } from "../../../services/quiz.service";
import { ThemeService } from "../../../services/theme.service";
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from "../../../services/local-storage.service";
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile-user-kpi',
  templateUrl: './profile-user-kpi.component.html',
  styleUrls: ['./profile-user-kpi.component.css']
})
export class ProfileUserKPIComponent implements OnInit {
  public loading: boolean = false;

  public kpi_best_quiz: Array<any> = [];
  public kpi_worse_quiz: Array<any> = [];

  public kpi_best_theme: Array<any> = [];
  public kpi_worse_theme: Array<any> = [];

  public kpi_avg_score: Array<any> = [];
  public kpi_quiz_created: Array<any> = [];

  @ViewChild('avgScoreElement', { static: true }) avgScoreElementRef!: ElementRef;
  @ViewChild('bestThemeScoreElement', { static: true }) bestThemeScoreElementRef!: ElementRef;
  @ViewChild('worseThemeScoreElement', { static: true }) worseThemeScoreElementRef!: ElementRef;
  @ViewChild('bestQuizScoreElement', { static: true }) bestQuizScoreElementRef!: ElementRef;
  @ViewChild('worseQuizScoreElement', { static: true }) worseQuizScoreElementRef!: ElementRef;
  @ViewChild('quizCreatedElement', { static: true }) quizCreatedElementRef!: ElementRef;

  constructor(
    private quizService: QuizService,
    private themeService: ThemeService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    const idUser: number = parseInt(this.localStorageService.getData('user_id')) as unknown as number;
    this.loading = true;

    this.quizService.getBestQuiz(idUser).subscribe(response => {
      this.kpi_best_quiz = response.data.rows;
      this.loading = false;
      this.startNumberAnimation(this.bestQuizScoreElementRef.nativeElement, this.kpi_best_quiz[0]?.score);
    });

    this.loading = true;
    this.quizService.getWorseQuiz(idUser).subscribe(response => {
      this.kpi_worse_quiz = response.data.rows;
      this.loading = false;
      this.startNumberAnimation(this.worseQuizScoreElementRef.nativeElement, this.kpi_worse_quiz[0]?.score);
    });

    this.loading = true;
    this.themeService.getBestTheme(idUser).subscribe(response => {
      this.kpi_best_theme = response.data.rows;
      this.loading = false;
      this.startNumberAnimation(this.bestThemeScoreElementRef.nativeElement, this.kpi_best_theme[0]?.score_moyen);
    });

    this.loading = true;
    this.themeService.getWorseTheme(idUser).subscribe(response => {
      this.kpi_worse_theme = response.data.rows;
      this.loading = false;
      this.startNumberAnimation(this.worseThemeScoreElementRef.nativeElement, this.kpi_worse_theme[0]?.score_moyen);
    });

    this.loading = true;
    this.userService.getAvgScore(idUser).subscribe(response => {
      this.kpi_avg_score = response.data.rows;
      this.loading = false;
      this.startNumberAnimation(this.avgScoreElementRef.nativeElement, this.kpi_avg_score[0]?.score_moyen);
    });

    this.loading = true;
    this.userService.getQuizCreated(idUser).subscribe(response => {
      this.kpi_quiz_created = response.data.rows;
      this.loading = false;
      this.startNumberAnimation(this.quizCreatedElementRef.nativeElement, this.kpi_quiz_created[0]?.nb_quiz_cree);
    });
  }

  startNumberAnimation(element: HTMLElement, targetValue: number) {
    const duration = 2000;
    const steps = 500; //à modifier pour modifier le temps que mettent les valeurs à s'incrémenter
    const increment = targetValue / steps;

    if (!isNaN(targetValue)) {
      interval(duration / steps)
        .pipe(take(steps + 1))
        .subscribe(step => {
          const currentValue = (step * increment).toFixed(2);
          element.innerHTML = currentValue.toString();
        });
    }
  }
}