import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from './components/base.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
    declarations: [
        BaseComponent,
        CheckboxComponent,
        DropdownComponent
    ],
    imports: [CommonModule],
    exports: [
        CommonModule,
        FormsModule,
        BaseComponent,
        CheckboxComponent,
        DropdownComponent
    ]
})
export class SharedModule { }
