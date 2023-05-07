import {Quiz} from "./quiz";
import {Reponse} from "./reponse";

export interface Question {
  id: number;
  quiz: Quiz;
  question: string;
  lien_image: string;
  creation_date: Date;
  reponses: Array<Reponse>;
}
