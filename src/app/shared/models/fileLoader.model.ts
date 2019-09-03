import { Observable } from 'rxjs';

export interface FileProgressLoader {
    [key: string]: { progress: Observable<number> };
}
