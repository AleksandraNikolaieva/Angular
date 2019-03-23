import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { PhotoDetailComponent } from './photo-detail/photo-detail.component';
import { UserCardComponent } from './user-card/user-card.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'photos',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'photos/:id',
    component: PhotoDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: UserCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
