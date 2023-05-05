import { Component } from '@angular/core';
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { LocalStorageService} from "../../../services/local-storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile-user-personal-infos',
  templateUrl: './profile-user-personal-infos.component.html',
  styleUrls: ['./profile-user-personal-infos.component.css']
})
export class ProfileUserPersonalInfosComponent {
  public user?: User;
  public userId: number;
  public loading: boolean = false;

  public isEdit: boolean = false;
  public isValid: boolean = false;
  public patternUsername: string = "^[A-Za-z0-9_-]{4,15}$"
  public patternMail: string = "^[a-zA-Z0-9-._]{1,64}@[a-zA-Z0-9-._]{1,64}.[a-zA-Z0-9]{1,3}";
  public patternPassword: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$";
  public sexes: Array<string> = ['Homme', 'Femme', 'Autre'];

  public form: FormGroup = this.fb.group({
    username : [{value: '', disabled: !this.isEdit}, this.isEdit ? Validators.required : ''],
    mail : [{value: '', disabled: !this.isEdit}, this.isEdit ? Validators.required : ''],
    age : [{value: '', disabled: !this.isEdit}, this.isEdit ? Validators.required : ''],
    sexe : [{value: '', disabled: !this.isEdit}, this.isEdit ? Validators.required : '']
  });

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private fb : FormBuilder
  ) {
    this.loading = true;
    this.userId = parseInt(this.localStorageService.getData('user_id'));
    userService.getUser(this.userId).subscribe(response => {
      this.user = response.data.rows;
      this.form.get('username')?.setValue(this.user?.login);
      this.form.get('mail')?.setValue(this.user?.mail);
      this.form.get('age')?.setValue(this.user?.age);
      this.form.get('sexe')?.setValue(this.user?.sexe);
      this.loading = false;
    });
  }
}
