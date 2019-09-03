import { Component, OnInit } from '@angular/core';
import { ProductsEventsService } from './products.events';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { takeUntil, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  public showUpdatePageComponent: boolean;

  constructor(private productsEventsService: ProductsEventsService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.productsEventsService.refreshPageEvent$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((pageToRefresh) => this.showUpdatePageComponent = this.router.url === pageToRefresh);
  
      this.router.events
        .pipe(takeUntil(this.unsubscribe), filter((route) => route instanceof NavigationEnd))
        .subscribe(() => this.showUpdatePageComponent = false);
  }
}
