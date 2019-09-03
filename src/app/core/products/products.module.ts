import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FileReducer } from 'src/app/shared/ngrx/files/reducers/request-files.reducers';
import { FileEffects } from 'src/app/shared/ngrx/files/effects/file.effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-list/product-list-elem/product-list-elem.component';
import { ProductListHeaderComponent } from './product-list/product-list-header/product-list-header.component';
import { ProductsComponent } from './products.component';
import { LayoutModule } from './layout/layout.module';
import { DocumentReducer } from 'src/app/shared/ngrx/files/reducers/document.reducers';
import { NgxLoadingModule } from 'ngx-loading';
import { ProductUploaderComponent } from './product-uploader/product-uploader.component';
import { ProductUploaderFileComponent } from './product-uploader/product-uploader-file/product-uploader-file.component';
import { ProductService } from './product.service';
import { ProductsEventsService } from './products.events';
import { PageRefresherComponent } from './pageRefresher/pageRefresher.component';

const routes: Routes = [
  { path: '**', component: ProductsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductViewComponent,
    ProductListHeaderComponent,
    ProductListComponent,
    ProductUploaderComponent,
    ProductUploaderFileComponent,
    PageRefresherComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    NgxLoadingModule,
    StoreModule.forFeature('files', {
        'task': FileReducer,
        'showDoc': DocumentReducer
    }),
    EffectsModule.forFeature([FileEffects]),
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductsComponent,
    ProductViewComponent,
    ProductListHeaderComponent,
    ProductListComponent,
    ProductUploaderComponent,
    ProductUploaderFileComponent,
    PageRefresherComponent,
    RouterModule
  ],
  providers: [
    ProductService,
    ProductsEventsService
  ]
})
export class ProductsModule { }
