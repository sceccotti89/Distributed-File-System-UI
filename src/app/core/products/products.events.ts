import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ProductsEventsService {
    private downloadSelectedFilesSource = new Subject<void>();
    public downloadSelectedFiles$ = this.downloadSelectedFilesSource.asObservable();

    private filesToUploadEventSource = new Subject<Set<File>>();
    public filesToUploadEvent$ = this.filesToUploadEventSource.asObservable();

    private refreshPageEventSource = new Subject<string>();
    public refreshPageEvent$ = this.refreshPageEventSource.asObservable();

    constructor() {  }
    
    public broadcastDownloadSelectedFiles(): void {
        this.downloadSelectedFilesSource.next();
    }

    public uploadFiles(files: Set<File>) {
        this.filesToUploadEventSource.next(files);
    }

    public refreshPage(pageToRefresh: string): void {
        this.refreshPageEventSource.next(pageToRefresh);
    }
}
