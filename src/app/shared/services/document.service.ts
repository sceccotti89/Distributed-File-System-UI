import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { FileObjectRequest, FileObjectView } from 'src/app/shared/models/element.model';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs/operators';
import { FileProgressLoader } from '../models/fileLoader.model';

@Injectable()
export class DocumentService {
    private readonly fileServiceUrl = `${environment.applicationBaseUrl}files/`;
    private readonly renameFileUrl = 'renameFile';
    private readonly uploadFileUrl = 'uploadFile';
    private readonly downloadFileUrl = 'downloadFiles';
    private readonly createFolderUrl = 'createFolder';

    constructor (private http: HttpClient) { console.log('CREATO!!'); }

    public getFiles(request: FileObjectRequest): Observable<FileObjectView[]> {
        console.log('Sending request..', request);
        // return this.http.get(url);
        return of([
            { fileName: 'A', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'richiestaIscrizioneAire.pdf', folder: false, lastModified: '29/01/2019', size: '30' },
            { fileName: 'C', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'D', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'E', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'CV Photo.jpg', folder: false, lastModified: '29/01/2019', size: '30' },
            { fileName: 'G', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'Hola.csv', folder: false, lastModified: '29/01/2019', size: '30' },
            { fileName: 'A', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'B', folder: false, lastModified: '29/01/2019', size: '30' },
            { fileName: 'C', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'D', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'E', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'F', folder: false, lastModified: '29/01/2019', size: '30' },
            { fileName: 'G', folder: true, lastModified: '29/01/2019', size: '30' },
            { fileName: 'H', folder: false, lastModified: '29/01/2019', size: '30' },
        ]).pipe(delay(1000));
    }

    public downloadDocuments(filePaths: string[]): Observable<ArrayBuffer> {
        console.log('Downloading ' + filePaths + '...');
        const options = {headers: null, params: null, responseType: 'arraybuffer' as 'arraybuffer'};
        const filePath = filePaths.map((fp) => `filePath=${fp}`).join('&');
        return this.http.get(`${this.fileServiceUrl}${this.downloadFileUrl}?${filePath}`, options);
    }

    public renameFile(filePath: string, newFileName: string): Observable<Object> {
        console.log('Renaming:', filePath, ', newFileName:', newFileName);
        return this.http.post(`${this.fileServiceUrl}${this.renameFileUrl}`, { filePath, newFileName });
    }

    public uploadDocuments(files: Set<File>): FileProgressLoader {
        const status: FileProgressLoader = {};

        files.forEach(file => {
            // Create a new multipart-form for each file.
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);

            // Create a http-post request and pass the form.
            // Tell it to report the upload progress.
            const req = new HttpRequest('POST', `${this.fileServiceUrl}${this.uploadFileUrl}`, formData, {
                reportProgress: true
            });

            // Create a new progress-subject for every file.
            const progress = new Subject<number>();

            // Send the http-request and subscribe for progress-updates.
            this.http.request(req).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // Calculate the progress percentage.
                    const percentDone = Math.round(100 * event.loaded / event.total);

                    // Pass the percentage into the progress-stream.
                    progress.next(percentDone);
                } else if (event instanceof HttpResponse) {
                    // Close the progress-stream if we get an answer form the API.
                    // The upload is complete.
                    progress.next(100);
                    progress.complete();
                }
            });

            // Save every progress-observable in a map of all observables.
            status[file.name] = {
                progress: progress.asObservable()
            };
        });

        return status;
    }

    public createFolder(folderPath: string): Observable<FileObjectView> {
        console.log('Creating folder:', folderPath);
        return this.http.put<FileObjectView>(`${this.fileServiceUrl}${this.createFolderUrl}`, { folderPath });
    }
}
