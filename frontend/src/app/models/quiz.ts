import { Theme } from "./theme";
import { User } from "./user";

export interface Quiz {
  id: number;
  label: string;
  status: string;
  creation_date: Date;
  topic: Theme;
  user: User;
  lien_image: string;
}
