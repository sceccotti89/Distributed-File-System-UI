import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-product-uploader-file',
    templateUrl: './product-uploader-file.component.html',
    styleUrls: ['./product-uploader-file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductUploaderFileComponent {
    @Input() file: File;
    @Input() progress: number;

    constructor() { }
}
