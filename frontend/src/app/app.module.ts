import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatStepperModule } from '@angular/material/stepper';
import { QuizComponent } from "./components/quiz/quiz.component";
import { QuizListComponent } from './components/quiz-list/quiz-list.component';
import { ThemeListComponent } from './components/theme-list/theme-list.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { GridColsDirective } from './directives/grid-cols.directive';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { GridColspanDirective } from './directives/grid-colspan.directive';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ProfileComponent } from './components/profile/profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ProfileUserPersonalInfosComponent } from './components/profile-user/profile-user-personal-infos/profile-user-personal-infos.component';
import { ProfileUserQuizHistoryComponent } from './components/profile-user/profile-user-quiz-history/profile-user-quiz-history.component';
import { ProfileUserQuizCreatedComponent } from './components/profile-user/profile-user-quiz-created/profile-user-quiz-created.component';
import { ProfileUserStatisticsComponent } from './components/profile-user/profile-user-statistics/profile-user-statistics.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    NavigationComponent,
    SignupComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    QuizListComponent,
    ThemeListComponent,
    HomeComponent,
    GridColsDirective,
    QuizFormComponent,
    GridColspanDirective,
    ProfileComponent,
    ProfileUserPersonalInfosComponent,
    ProfileUserQuizHistoryComponent,
    ProfileUserQuizCreatedComponent,
    ProfileUserStatisticsComponent,
    StarRatingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CarouselModule.forRoot(),
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatRadioModule,
        ToastrModule.forRoot({}),
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
