import { Component } from '@angular/core';
import { QuizService } from "../../../services/quiz.service";
import { ThemeService } from "../../../services/theme.service";
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from "../../../services/local-storage.service";

@Component({
  selector: 'app-profile-user-statistics',
  templateUrl: './profile-user-statistics.component.html',
  styleUrls: ['./profile-user-statistics.component.css']
})
export class ProfileUserStatisticsComponent {
  public loading: boolean = false;

  public kpi_best_quiz: Array<any> = [];
  public kpi_worse_quiz: Array<any> = [];

  public kpi_best_theme: Array<any> = [];
  public kpi_worse_theme: Array<any> = [];

  public kpi_avg_score: Array<any> = [];
  public kpi_quiz_created: Array<any> = [];

  constructor(
    private quizService: QuizService,
    private themeService: ThemeService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { 
    const idUser: number = parseInt(this.localStorageService.getData('user_id')) as unknown as number;
    this.loading = true;
    this.quizService.getBestQuiz(idUser).subscribe(response => {
      this.kpi_best_quiz = response.data.rows;
      this.loading = false;
    });

    this.loading = true;
    this.quizService.getWorseQuiz(idUser).subscribe(response => {
      this.kpi_worse_quiz = response.data.rows;
      this.loading = false;
    });

    this.loading = true;
    this.themeService.getBestTheme(idUser).subscribe(response => {
      this.kpi_best_theme = response.data.rows;
      this.loading = false;
    });

    this.loading = true;
    this.themeService.getWorseTheme(idUser).subscribe(response => {
      this.kpi_worse_theme = response.data.rows;
      this.loading = false;
    });

    this.loading = true;
    this.userService.getAvgScore(idUser).subscribe(response => {
      this.kpi_avg_score = response.data.rows;
      this.loading = false;
    });

    this.loading = true;
    this.userService.getQuizCreated(idUser).subscribe(response => {
      this.kpi_quiz_created = response.data.rows;
      this.loading = false;
    });
  }

}
