import { Component } from '@angular/core';
import { Quiz } from "../../models/quiz";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent {
  public quizzes: Array<Quiz> = [];

  constructor(private quizService: QuizService) {
    quizService.getQuizzes().subscribe(response => {
      this.quizzes = response.data.rows;
    });
  }
}
