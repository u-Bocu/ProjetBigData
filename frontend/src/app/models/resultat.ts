import {Quiz} from "./quiz";
import {User} from "./user";
import {Satisfaction} from "./satisfaction";

export interface Resultat {
  id: number;
  quiz: Quiz;
  user: User;
  score: number;
  timestamp: Date;
  satisfaction: Satisfaction;
}
