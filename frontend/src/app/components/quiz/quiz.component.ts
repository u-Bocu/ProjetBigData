import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/question";
import {ReponseService} from "../../services/reponse.service";
import {Reponse} from "../../models/reponse";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  public questions: Array<Question> = [];
  public loading: boolean = false;
  public choix: number = 0;
  public afficheReponse: boolean = false;
  public resultatReponse: boolean = false;
  public boutonSucces: number = 0;
  public boutonEchec: number = 0;

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
          this.loading = false;
        });
      })
    });
  }

  public confirmation(idQuestion: number, vocal: string): void {
    this.loading = true;
    this.reponseService.sendReponseVocale(idQuestion, vocal).subscribe(response => {
      this.choix = response.data.rows.choix
      this.loading = false;
    });
  }

  public validation(reponses: Array<Reponse>): void {
    const reponseValide = reponses.find(function (reponse) {
      return reponse.is_valid ? reponse : null;
    });
    const reponseChoisie = reponses[this.choix - 1];

    console.log(reponseValide, reponseChoisie);

    // Défini si la réponse est vraie ou fausse
    if (reponseValide == reponseChoisie) {
      this.resultatReponse = true;
      this.boutonSucces = this.choix;
    } else {
      this.resultatReponse = false;
      this.boutonSucces = reponses.findIndex((reponse) => reponse == reponseValide) + 1;
      console.log(reponses, reponses.findIndex((reponse) => reponse == reponseValide));
      this.boutonEchec = this.choix
    }

    // Affiche la bonne réponse

    // Réinitialise les variables d'affichage
    this.afficheReponse = true;
    this.choix = 0;
  }

  public suivant(): void {
    // Réinitialise les variables d'affichage
    this.afficheReponse = false;
    this.resultatReponse = false;
    this.boutonSucces = 0
    this.boutonEchec = 0;
  }
}
