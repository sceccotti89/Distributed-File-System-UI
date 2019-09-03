import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-refresher',
    templateUrl: './pageRefresher.component.html',
    styleUrls: ['./pageRefresher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageRefresherComponent {
    constructor(private router: Router) {}

    public getPageUrl(): string {
        return this.router.url;
    }
}