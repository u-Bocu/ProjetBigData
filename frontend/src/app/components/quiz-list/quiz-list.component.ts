import { Component } from '@angular/core';
import { Quiz } from "../../models/quiz";
import { QuizService } from "../../services/quiz.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent {
  public quizzes: Array<Quiz> = [];

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {
    const idTheme: number = this.route.snapshot.paramMap.get('idTheme') as unknown as number;
    quizService.getQuizzes(idTheme).subscribe(response => {
      this.quizzes = response.data.rows;
    });
  }
}
