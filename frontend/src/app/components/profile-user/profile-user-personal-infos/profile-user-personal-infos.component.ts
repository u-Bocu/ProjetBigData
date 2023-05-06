import { Component } from '@angular/core';
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import { LocalStorageService} from "../../../services/local-storage.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {RoleService} from "../../../services/role.service";
import {Role} from "../../../models/role";
import {Theme} from "../../../models/theme";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-profile-user-personal-infos',
  templateUrl: './profile-user-personal-infos.component.html',
  styleUrls: ['./profile-user-personal-infos.component.css']
})
export class ProfileUserPersonalInfosComponent {
  public user?: User;
  public userId: number;
  public roles?: Array<Role>;
  public themes?: Array<Theme>;
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
    sexe : [{value: '', disabled: !this.isEdit}, this.isEdit ? Validators.required : ''],
    role : [{value: '', disabled: !this.isEdit}, this.isEdit ? Validators.required : ''],
    theme_pref : [{value: '', disabled: !this.isEdit}, this.isEdit ? Validators.required : '']
  });

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
    private fb : FormBuilder
  ) {
    this.loading = true;
    this.userId = parseInt(this.localStorageService.getData('user_id'));

    // Récupération des rôles
    roleService.getRoles().subscribe(response => {
      this.roles = response.data.rows;
    });

    // Récupération des thèmes
    themeService.getThemes().subscribe(response => {
      this.themes = response.data.rows;
    });

    // Récupération des utilisateurs
    userService.getUser(this.userId).subscribe(response => {
      this.user = response.data.rows;
      this.form.get('username')?.setValue(this.user?.login);
      this.form.get('mail')?.setValue(this.user?.mail);
      this.form.get('age')?.setValue(this.user?.age);
      this.form.get('sexe')?.setValue(this.user?.sexe);
      this.form.get('role')?.setValue(this.user?.role.id);
      this.form.get('theme_pref')?.setValue(this.user?.theme_pref.id);
      this.loading = false;
    });
  }
}
