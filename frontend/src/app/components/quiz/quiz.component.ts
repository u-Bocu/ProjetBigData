import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/question";
import {ReponseService} from "../../services/reponse.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  public questions: Array<Question> = [];
  public loading: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private questionService: QuestionService,
    private reponseService: ReponseService,
    private route: ActivatedRoute
  ) {
    const idQuiz: number = this.route.snapshot.paramMap.get('idQuiz') as unknown as number;
    this.loading = true;
    questionService.getQuestionsByQuiz(idQuiz).subscribe(response => {
      this.questions = response.data.rows;

      this.questions.forEach(question => {
        reponseService.getReponses(question.id).subscribe(response => {
          question.reponses = response.data.rows;
        });
      })

      console.log(this.questions);
      this.loading = false;
    });
  }
}
