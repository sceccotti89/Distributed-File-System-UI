import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { takeUntil, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { PathElement } from '../layout.model';
import { defaultDeepFile } from 'src/app/constants';
import { LeftNavbarToggle } from 'src/app/shared/ngrx/files/actions/left-navbar.actions';
import { GetFilesFromFolder } from 'src/app/shared/ngrx/files/actions/file.action';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss', './../layout-style.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TopNavbarComponent extends BaseComponent implements OnInit, AfterViewInit {
  public paths: PathElement[];
  public showFilePath: boolean;

  constructor(private store: Store<any>, private router: Router) {
    super();
    this.setPathView(this.router.url);
  }

  ngOnInit() {
    this.router.events
      .pipe(takeUntil(this.unsubscribe), filter((route) => route instanceof NavigationEnd))
      .subscribe((route: NavigationEnd) => {
        console.log('Route top-navbar:', route);
        const url = route.urlAfterRedirects;
        this.setPathView(url);
        this.scrollToEnd();
    });
  }

  private setPathView(url: string) {
    this.paths = url.split('/').filter((path) => !!path)
                    .map((path, index) => {
                      const fullPath = url.split('/', index + 2).join('/');
                      const filePath = (index === 0) ? path.charAt(0).toUpperCase() + path.substr(1) : path;
                      return { fileName: filePath, path: fullPath };
                    });
  }

  ngAfterViewInit() {
    this.scrollToEnd();
  }

  public logout(): void {
    this.router.navigateByUrl('/login');
  }

  public loadFilesFromSubdir(path: string): void {
    this.router.navigateByUrl(path);
    this.store.dispatch(new GetFilesFromFolder({ folder: path, deep: defaultDeepFile }));
  }

  public toggleLeftNavbar(): void {
    this.store.dispatch(new LeftNavbarToggle());
  }

  private scrollToEnd(): void {
    // TODO creare una classe che ascolti i cambiamenti della window (credo ce ne sia una in Q2C)
    // element($window).bind('orientationchange', function () { ... });
    setTimeout(() => {
      const element = document.getElementById('breadcrumb-container');
      if (element) {
        element.scrollLeft = element.scrollWidth;
      }
    }, 0);
  }
}
