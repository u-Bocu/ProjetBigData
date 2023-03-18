import {Quiz} from "./quiz";

export interface Question {
  id: number;
  quiz: Quiz;
  question: string;
  image_url: string;
  creation_date: Date;
}
