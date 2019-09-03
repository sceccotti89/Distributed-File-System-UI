import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { CoreModule } from './core/core.module';
import { PreLoadRoutesService } from './shared/services/preLoadRoutes.service';
import { RegistrationComponent } from './core/auth/registration/registration.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => CoreModule, data: { preload: true } },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreLoadRoutesService })],
  exports: [RouterModule],
  providers: [PreLoadRoutesService]
})
export class AppRoutingModule { }
