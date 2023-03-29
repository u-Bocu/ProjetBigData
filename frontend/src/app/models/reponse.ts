import {Question} from "./question";

export interface Reponse {
  id: number;
  label: string;
  is_valid: boolean;
  question: Question;
}
