import { Component } from '@angular/core';
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-profile-user-personal-infos',
  templateUrl: './profile-user-personal-infos.component.html',
  styleUrls: ['./profile-user-personal-infos.component.css']
})
export class ProfileUserPersonalInfosComponent {
  public user?: User;
  public userId: number;
  public loading: boolean = false;

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.loading = true;
    this.userId = parseInt(this.localStorageService.getData('user_id'));
    userService.getUser(this.userId).subscribe(response => {
      this.user = response.data.rows;
      this.loading = false;
    });
  }
}
