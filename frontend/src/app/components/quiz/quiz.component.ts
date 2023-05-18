import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../models/question";
import {ReponseService} from "../../services/reponse.service";
import {Reponse} from "../../models/reponse";
import {AudioRecordingService} from "../../services/audio-recording.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  public questions: Array<Question> = [];
  public loading: boolean = false;
  public idQuestion?: number;
  public choix: number = 0;
  public afficheReponse: boolean = false;
  public resultatReponse: boolean = false;
  public resultats: Array<boolean> = [];
  public boutonSucces: number = 0;
  public boutonEchec: number = 0;
  public isComplete: boolean = false;
  public score: string = '';

  public isRecording = false;
  public recordedTime: any;
  public blobUrl?: SafeUrl;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private questionService: QuestionService,
    private reponseService: ReponseService,
    private route: ActivatedRoute,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer
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

    // Audio
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));

      // Envoi le fichier audio à l'API
      this.loading = true;
      this.audioRecordingService.convertFileToBase64(new File([data.blob], 'audio.mp3'))
        .then((base64String: string) => {
          this.reponseService.sendReponseVocale(this.idQuestion!, base64String).subscribe(response => {
            this.choix = response.data.rows.choix
            this.isRecording = false;
            this.loading = false;
          });
        });
    });
  }

  public confirmationQuestion(idQuestion: number): void {
    this.idQuestion = idQuestion;
    this.startRecording();
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


  /* Fonctions Audio */
  public startRecording(): void {
    this.clearRecordedData();

    this.isRecording = true;
    this.audioRecordingService.startRecording();
    this.delay(3000).then(() => {
      this.stopRecording();
    });
  }

  public stopRecording(): void {
    this.audioRecordingService.stopRecording();
  }

  public clearRecordedData(): void {
    this.blobUrl = undefined;
  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Fin d'enregistrement."));
  }
}
