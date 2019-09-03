import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: '**', canActivate: [AuthGuard], component: CoreComponent },
    { path: '', canActivate: [AuthGuard], redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
