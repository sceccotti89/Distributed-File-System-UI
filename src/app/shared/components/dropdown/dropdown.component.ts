import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DropDownElement } from '../../models/dropdown.model';

@Component({
    selector: 'app-dropdown-view',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
    @Input() className: string;
    @Input() position: string;
    @Input() dropdownElements: DropDownElement[];
    @Output() click = new EventEmitter<string>();

    constructor() { }

    public elementClicked(element: DropDownElement) {
        this.click.emit(element.value);
    }
}
