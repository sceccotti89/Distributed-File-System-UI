import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, filter } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { Router, NavigationEnd } from '@angular/router';
import { documentBaseUrl } from '../constants';
import { CoreService } from './core.service';
import { WebSocketService } from './webSocket/webSocket.service';

@Component({
    templateUrl: './core.component.html'
})
export class CoreComponent extends BaseComponent implements OnInit, OnDestroy {
    public showDocument: boolean;

    constructor(public coreService: CoreService,
      private router: Router,
      private webSocketSevice: WebSocketService) {
        super();
    }

    ngOnInit() {
        this.webSocketSevice.initializeWebSocketConnection();
        this.showDocument = this.router.url.indexOf(documentBaseUrl) >= 0;

        this.router.events
          .pipe(takeUntil(this.unsubscribe), filter((route) => route instanceof NavigationEnd))
          .subscribe((route: NavigationEnd) => {
            console.log('Route core:', route);
            this.showDocument = this.router.url.indexOf(documentBaseUrl) >= 0;
        });
    }

    ngOnDestroy() {
      this.webSocketSevice.disconnect();
    }
}
