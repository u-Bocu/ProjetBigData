import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { QuestionService } from "../../services/question.service";
import { ActivatedRoute } from "@angular/router";
import { Question } from "../../models/question";
import { ReponseService } from "../../services/reponse.service";
import { Reponse } from "../../models/reponse";

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
  public resultats: Array<boolean> = [];
  public boutonSucces: number = 0;
  public boutonEchec: number = 0;
  public isComplete: boolean = false;
  public score: string = '';

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

  public confirmationQuestion(idQuestion: number, vocal: string): void {
    this.loading = true;
    this.reponseService.sendReponseVocale(idQuestion, vocal).subscribe(response => {
      this.choix = response.data.rows.choix
      this.loading = false;
    });
  }

  public validationQuestion(reponses: Array<Reponse>): void {
    const reponseValide = reponses.find(function (reponse) {
      return reponse.is_valid ? reponse : null;
    });
    const reponseChoisie = reponses[this.choix - 1];

    // Défini si la réponse est vraie ou fausse
    if (reponseValide == reponseChoisie) {
      this.resultatReponse = true;
      this.boutonSucces = this.choix;
    } else {
      this.resultatReponse = false;
      this.boutonSucces = reponses.findIndex((reponse) => reponse == reponseValide) + 1;
      this.boutonEchec = this.choix
    }

    // Enregistre le résultat
    this.resultats.push(this.resultatReponse);

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

  public validationQuiz(): void {
    this.afficheReponse = false;
    this.isComplete = true;
    this.score = String(this.resultats.filter(Boolean).length) + ' / 10';
  }
}
