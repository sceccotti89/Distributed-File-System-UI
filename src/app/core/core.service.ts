import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CoreService {
    private showCreateFolderModalSource = new Subject<void>();
    public showCreateFolderModal$ = this.showCreateFolderModalSource.asObservable();

    constructor() { }

    public broadcastShowCreateFolderModal() {
        this.showCreateFolderModalSource.next();
    }
}
