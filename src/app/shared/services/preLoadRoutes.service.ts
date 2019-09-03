import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable ,  of } from 'rxjs';

@Injectable()
export class PreLoadRoutesService implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        return route.data && route.data.preload === true ? load() : of(null);
    }

    constructor() { }
}
