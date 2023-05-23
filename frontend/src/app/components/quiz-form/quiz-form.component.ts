import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Quiz} from "../../models/quiz";
import {Question} from "../../models/question";
import { Reponse } from 'src/app/models/reponse';
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent {
  public form!: FormGroup;
  public cards: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public reponses: Array<number> = [1, 2, 3, 4];

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService) {
    this.form = this.fb.group({});

    // Quiz
    this.form.addControl(`nom_quiz`, this.fb.control('Quiz prédéfini', Validators.required));
    this.form.addControl(`lien_image_quiz`, this.fb.control('https://images3.alphacoders.com/165/thumb-1920-165265.jpg', Validators.required));

    for (let i = 1; i <= 10; i++) {
      // Questions
      this.form.addControl(`question${i}`, this.fb.control(`Quelle belle question ${i} ?`, Validators.required));
      // Images
      this.form.addControl(`lien_image_question${i}`, this.fb.control('https://www.wallpapers13.com/wp-content/uploads/2016/01/Cool-and-Beautiful-Nature-desktop-wallpaper-image-2560X1600-840x525.jpg', Validators.required));
      // Bonne réponse
      this.form.addControl(`radio${i}`, this.fb.control('1', Validators.required));

      // Réponses
      for (let j = 1; j <= 4; j++) {
        this.form.addControl(`reponse${i}_${j}`, this.fb.control(`Réponse prédéfinie ${j}`, Validators.required));
      }
    }
  }

  public submit(): void {
    const formValues = this.form.value;
    const quiz = new Quiz(formValues.nom_quiz, formValues.lien_image_quiz);
    const questions: Question[] = [];

    for (let i = 1; i <= 10; i++) {
      const reponses: Reponse[] = [];
      for (let j = 1; j <= 4; j++) {
        const reponseKey = `reponse${i}_${j}`;
        const validKey = `radio${i}`;
        reponses[`${j-1}`] = new Reponse(`${formValues[reponseKey]}`, parseInt(`${formValues[validKey]}`) == j);
      }
      const questionKey = `question${i}`;
      const lienImageQuestionKey = `lien_image_question${i}`;
      questions[`${i-1}`] = new Question(`${formValues[questionKey]}`, `${formValues[lienImageQuestionKey]}`, reponses);
    }

    this.quizService.postQuiz(quiz, questions).subscribe();
  }
}
