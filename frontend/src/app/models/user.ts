import {Theme} from "./theme";
import {Role} from "./role";

export interface User {
  id: number;
  login: string;
  password: string;
  mail: string;
  age: number;
  sexe: string;
  pref_topic: Theme;
  role: Role;
}
