import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { QuizComponent } from "./components/quiz/quiz.component";
import { HomeComponent } from "./components/home/home.component";
import { ThemeListComponent } from "./components/theme-list/theme-list.component";
import { QuizListComponent } from "./components/quiz-list/quiz-list.component";
import { QuizFormComponent } from "./components/quiz-form/quiz-form.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'theme-list', component: ThemeListComponent },
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'quiz-list/:idTheme', component: QuizListComponent },
  { path: 'quiz/create', component: QuizFormComponent },
  { path: 'quiz/:idQuiz', component: QuizComponent },
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'forgot-password', component: ForgetPasswordComponent},
  { path: 'reset-password', component: ChangePasswordComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
