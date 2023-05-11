import {Component} from '@angular/core';
import {Md5} from 'ts-md5';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  public isValid: boolean = false;
  public patternUsername: string = "^[A-Za-z0-9_-]{4,15}$"
  public patternMail: string = "^[a-zA-Z0-9-._]{1,64}@[a-zA-Z0-9-._]{1,64}.[a-zA-Z0-9]{1,3}";
  public patternPassword: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$";
  public sexes: Array<string> = ['Homme', 'Femme', 'Autre'];

  public md5HashedPassword: string = "";

  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;

  public form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    mail: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    age: ['', Validators.required],
    sexe: ['', Validators.required]
  });


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }


  signup(): void {
    if (this.form.value.username != "" && this.form.value.password != "" && this.form.value.confirmPassword != "") {
      this.md5HashedPassword = Md5.hashStr(this.form.value.password!);
      this.authService.signup(this.form.value.username!, this.md5HashedPassword, this.form.value.mail!, parseInt(this.form.value.age!), this.form.value.sexe!)
        .subscribe(response => {
          this.isValid = response.success

          if (this.form.value.password != this.form.value.confirmPassword) {
            this.toastr.error("Les mots de passe ne correspondent pas", 'Erreur', {
              positionClass: 'test'
            });
          } else {
            if (!this.isValid) {
              this.toastr.error(response.message, 'Erreur', {
                positionClass: 'test'
              });
              this.form.value.password = ""
            } else {
              this.toastr.success(response.message, 'Succès', {
                positionClass: 'test'
              });
              this.router.navigate(['/login']).then(r => r);
            }
          }
        })
    }
  }
}
