import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { DocumentComponent } from './document/document.component';
import { CreateFolderDialogComponent } from './products/createFolder/create-folder-dialog.component';
import { CoreService } from './core.service';
import { environment } from 'src/environments/environment';
import { WebSocketService } from './webSocket/webSocket.service';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
    declarations: [
        CoreComponent,
        DocumentComponent,
        CreateFolderDialogComponent
    ],
    imports: [
        CoreRoutingModule,
        SharedModule,
        AuthModule,
        ProductsModule,
        ModalModule.forRoot()
    ],
    exports: [
        ModalModule,
        AuthModule,
        ProductsModule
    ],
    providers: [
        { provide: 'environmentConfig', useValue: environment },
        CoreService,
        WebSocketService
    ]
})
export class CoreModule { }
