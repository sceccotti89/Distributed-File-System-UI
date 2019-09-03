import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CoreService } from '../../core.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { DocumentService } from 'src/app/shared/services/document.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-folder-dialog',
    templateUrl: './create-folder-dialog.component.html',
    styleUrls: ['./create-folder-dialog.component.scss']
})
export class CreateFolderDialogComponent extends BaseComponent implements OnInit {
    @ViewChild('dialog') public dialogModal: ModalDirective;

    public folderName: string;

    constructor(private coreService: CoreService,
      private documentService: DocumentService,
      private router: Router) {
        super();
    }

    ngOnInit() {
        this.coreService.showCreateFolderModal$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => this.show());
    }

    public show(): void {
        this.dialogModal.show();
    }

    public hide(): void {
        this.folderName = null;
        this.dialogModal.hide();
    }

    public createFolder(): void {
        const folderPath = this.router.url + '/' + this.folderName;
        this.documentService.createFolder(folderPath)
            .subscribe((res) => {
                console.log('Res:', res);
            }, (err) => console.error(err));
    }
}
