import { NgModule } from '@angular/core';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { LeftNavbarComponent } from './left-navbar/left-navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        TopNavbarComponent,
        LeftNavbarComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TopNavbarComponent,
        LeftNavbarComponent
    ],
    providers: []
})
export class LayoutModule { }
