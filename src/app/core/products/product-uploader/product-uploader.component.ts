import { Component, OnInit } from '@angular/core';
import { FileProgressLoader } from 'src/app/shared/models/fileLoader.model';
import { forkJoin, Observable, of } from 'rxjs';
import { DocumentService } from 'src/app/shared/services/document.service';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { takeUntil } from 'rxjs/operators';
import { ProductsEventsService } from '../products.events';

@Component({
    selector: 'app-product-uploader',
    templateUrl: './product-uploader.component.html'
})
export class ProductUploaderComponent extends BaseComponent implements OnInit {
    public files: Set<File>;
    public progress: FileProgressLoader;
    canBeClosed = true;
    public primaryButtonText = 'Upload';
    showCancelButton = true;
    private uploading = false;
    uploadSuccessful = false;

    constructor(private documentService: DocumentService, private productsEventsService: ProductsEventsService) {
        super();
    }

    ngOnInit() {
        this.productsEventsService.filesToUploadEvent$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((files) => {
                this.files = files;
                this.progress = null;
            });
    }

    public getFiles(): Set<File> {
        return this.files;
    }

    public primaryButtonPressed(): void {
        if (!this.uploading) {
            this.uploadFiles();
        }
    }

    public getProgress(fileName: string): Observable<number> {
        return this.progress && this.progress[fileName] ? this.progress[fileName].progress : of(0);
    }

    private uploadFiles() {
        // Set the component state to "uploading"
        this.uploading = true;

        // Start the upload and save the progress map
        this.progress = this.documentService.uploadDocuments(this.files);
        console.log('Progress:', this.progress);

        // Convert the progress map into an array
        const allProgressObservables: Observable<number>[] = [];
        Object.keys(this.progress).forEach((key) => {
            allProgressObservables.push(this.progress[key].progress);
        });

        // Adjust the state variables

        // The OK-button should have the text "Finish" now
        // this.primaryButtonText = 'Finish';

        // The dialog should not be closed while uploading
        this.canBeClosed = false;
        // this.dialogRef.disableClose = true;

        // Hide the cancel-button
        // this.showCancelButton = false;

        // When all progress-observables are completed...
        forkJoin(allProgressObservables).subscribe(_ => {
            // ... the dialog can be closed again...
            this.canBeClosed = true;
            // this.dialogRef.disableClose = false;

            // ... the upload was successful...
             this.uploadSuccessful = true;

            // ... and the component is no longer uploading
            this.uploading = false;
        });
    }
}
