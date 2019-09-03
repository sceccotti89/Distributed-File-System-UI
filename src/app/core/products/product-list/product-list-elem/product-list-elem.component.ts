import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FileObjectView } from 'src/app/shared/models/element.model';
import { selectCheckboxState } from 'src/app/shared/ngrx/files/selectors/checkbox.selectors';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { takeUntil } from 'rxjs/operators';
import { DocumentService } from 'src/app/shared/services/document.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product-list-elem',
    templateUrl: './product-list-elem.component.html',
    styleUrls: ['./product-list-elem.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductViewComponent extends BaseComponent implements OnInit {
    public isSelected: boolean;
    public isGlobalSelected: boolean;
    public mouseHover: boolean;
    public originalFileName: string;
    public renamingFile = false;

    @Input() showSelectionButton: boolean;
    @Input() file: FileObjectView;
    @Output() clicked = new EventEmitter<FileObjectView>();
    @Output() selected = new EventEmitter<any>();

    @ViewChild('inputText') inputText: ElementRef;

    constructor(private store: Store<any>,
      private router: Router,
      private documentService: DocumentService) {
        super();
    }

    ngOnInit() {
        this.store
            .pipe(select(selectCheckboxState), takeUntil(this.unsubscribe))
            .subscribe((state) => {
                if (state.global) {
                    this.isGlobalSelected = state.checked;
                    this.isSelected = state.checked;
                    this.selected.emit({ checked: state.checked, forward: false, fileName: this.file.fileName });
                }
            });
    }

    public setMouseHover(hover: boolean) {
        this.mouseHover = hover;
    }

    public elementSelected(isSelected: boolean): void {
        this.isSelected = isSelected;
        this.selected.emit({ checked: isSelected, forward: true, fileName: this.file.fileName });
    }

    public elementClicked(): void {
        this.clicked.emit(this.file);
    }

    public downloadFile() {
        const filePath = `${this.router.url}/${this.file.fileName}`;
        this.documentService.downloadDocuments([filePath])
          .pipe(takeUntil(this.unsubscribe))
          .subscribe((data) => {
            const blob = new Blob([data]);
            const fileName = (this.file.folder) ? this.file.fileName.substr(this.file.fileName.lastIndexOf('.') + 1) : this.file.fileName;

            // Fix for IE.
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.download = fileName;
                link.click();
                document.body.removeChild(link);
            }
        });
    }

    public deleteFile() {
        // TODO open the dialog
    }

    public resetRenaming() {
        this.file.fileName = this.originalFileName;
    }

    public sendFileName() {
        if (this.renamingFile) {
            this.renamingFile = false;
            if (this.file.fileName !== this.originalFileName) {
                const originalPath = `${this.router.url}/${this.originalFileName}`;
                this.documentService.renameFile(originalPath, this.file.fileName)
                    .subscribe(() => console.log('Rename successfull!!'),
                               (error) => console.log('Error while renaming!!'));
            }
        }
    }

    public renameFile() {
        this.originalFileName = this.file.fileName;
        this.renamingFile = true;
        if (!this.inputText) {
            // Wait for element to be rendered.
            setTimeout(() => this.inputText.nativeElement.focus(), 0);
        } else {
            this.inputText.nativeElement.focus();
        }
    }
}
