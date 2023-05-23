import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from "../../../services/local-storage.service";

@Component({
  selector: 'app-profile-user-quiz-created',
  templateUrl: './profile-user-quiz-created.component.html',
  styleUrls: ['./profile-user-quiz-created.component.css']
})
export class ProfileUserQuizCreatedComponent {
  public loading: boolean = false;

  public history_quiz_created: Array<any> = [];

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { 
    const idUser: number = parseInt(this.localStorageService.getData('user_id')) as unknown as number;
    
    this.loading = true;
    this.userService.getHistoryQuizCreated(idUser).subscribe(response => {
      this.history_quiz_created = response.data.rows;
      this.loading = false;
    });
  }

}