import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './auth.service';
import { NgxLoadingModule } from 'ngx-loading';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent
    ],
    imports: [
        NgxLoadingModule,
        SharedModule
    ],
    exports: [],
    providers: [AuthService]
})
export class AuthModule { }
