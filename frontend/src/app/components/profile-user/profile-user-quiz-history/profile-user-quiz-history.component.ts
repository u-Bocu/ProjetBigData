import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from "../../../services/local-storage.service";

@Component({
  selector: 'app-profile-user-quiz-history',
  templateUrl: './profile-user-quiz-history.component.html',
  styleUrls: ['./profile-user-quiz-history.component.css']
})
export class ProfileUserQuizHistoryComponent {
  public loading: boolean = false;

  public results: Array<any> = [];

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { 
    const idUser: number = parseInt(this.localStorageService.getData('user_id')) as unknown as number;
    
    this.loading = true;
    this.userService.getHistoryResult(idUser).subscribe(response => {
      this.results = response.data.rows;
      this.loading = false;
    });
  }

}