import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Location } from '@angular/common';
import { documentBaseUrl } from 'src/app/constants';
import { DocumentService } from 'src/app/shared/services/document.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss']
})
export class DocumentComponent extends BaseComponent implements OnInit {
    @ViewChild('docViewer') docViewer: ElementRef;

    constructor(private documentService: DocumentService, private router: Router, private location: Location) {
        super();
    }

    ngOnInit() {
        this.getDocument();
    }

    public closeDocument(): void {
        this.location.back();
    }

    public deleteDocument(): void {
        console.log('Delete!!');
    }

    public get fileName(): string {
        return decodeURI(this.router.url.substring(this.router.url.indexOf(documentBaseUrl) + documentBaseUrl.length));
    }

    private getDocument() {
        const url = this.router.url;
        const fileName = url.substring(0, this.router.url.indexOf(documentBaseUrl)) + '/' +
                         url.substring(this.router.url.indexOf(documentBaseUrl) + documentBaseUrl.length);
        this.documentService.downloadDocuments([fileName])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((data) => {
                const blob = new Blob([data], { type: this.getBlobType(fileName) });
                const file = window.URL.createObjectURL(blob);
                this.docViewer.nativeElement.src = file;
            });
    }

    private getBlobType(fileName: string) {
        const extension = fileName.substr(fileName.lastIndexOf('.'));
        if (extension === '.jpg') {
            return 'image/jpeg';
        } else if (extension === '.png') {
            return 'image/png';
        } else if (extension === '.gif') {
            return 'image/gif';
        } else if (extension === '.pdf') {
            return 'application/pdf';
        }
    }
}
