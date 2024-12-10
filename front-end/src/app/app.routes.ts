import { Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreateQuizPageComponent } from './quiz-page/create-quiz-page/create-quiz-page.component';
import { authGuard } from './_guards/auth.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TakeQuizPageComponent } from './quiz-page/take-quiz-page/take-quiz-page.component';
import { ViewQuizPageComponent } from './quiz-page/view-quiz-page/view-quiz-page.component';
import { HeroPageComponent } from './hero-page/hero-page.component';


export const routes: Routes = [
    {
        path: '',
        component: HeroPageComponent
    },
    {
        path: 'register',
        component: RegisterPageComponent
    },
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "dash",
        component: DashboardPageComponent,
        canActivate: [authGuard]
    },
    {
        path:"quiz",
        component: CreateQuizPageComponent,
        canActivate: [authGuard]
    },
    {
        path: "quiz/:title/:id",
        component: TakeQuizPageComponent
    },
    {
        path: "quiz/view/:id/outcome",
        component: ViewQuizPageComponent,
        canActivate: [authGuard]
    },
    {
        path:"profile",
        component: ProfilePageComponent,
        canActivate: [authGuard]
    }
];
