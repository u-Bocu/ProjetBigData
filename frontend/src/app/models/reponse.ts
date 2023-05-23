import { Question } from "./question";

export interface Reponse {
  id: number;
  label: string;
  is_valid: boolean;
  question: Question;
}

export class Reponse {
  constructor(
    public label: string,
    public is_valid: boolean
  ) {}
}
