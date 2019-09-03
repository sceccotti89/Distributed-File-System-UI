import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-checkbox-view',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnChanges {
    private isChecked = false;

    @Input() checked = false;
    @Output() checkboxClicked = new EventEmitter<boolean>();

    @ViewChild('input') inputElement: ElementRef;

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.isChanged(changes, 'checked') && this.isChecked !== changes.checked.currentValue) {
            this.isChecked = changes.checked.currentValue;
        }
    }

    private isChanged(changes: SimpleChanges, state: string): boolean {
        return JSON.stringify(changes[state].currentValue) !== JSON.stringify(changes[state].previousValue);
    }

    public onContainerClick(event: MouseEvent): void {
        event.stopPropagation();
    }

    public onInputClick(event: MouseEvent): void {
        this.isChecked = !this.isChecked;
        this.checkboxClicked.emit(this.isChecked);
        event.stopPropagation();
    }
}
