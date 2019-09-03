import { Component, ViewChild, ElementRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLeftNavbarState } from 'src/app/shared/ngrx/files/selectors/left-navbar.selectors';
import { LeftNavbarToggle } from 'src/app/shared/ngrx/files/actions/left-navbar.actions';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { takeUntil } from 'rxjs/operators';
import { CoreService } from 'src/app/core/core.service';
import { ProductsEventsService } from '../../products.events';

declare var jQuery: any;

@Component({
  selector: 'app-left-navbar',
  templateUrl: './left-navbar.component.html',
  styleUrls: ['./left-navbar.component.scss', './../layout-style.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LeftNavbarComponent extends BaseComponent implements OnInit {
    @ViewChild('fileLoader') fileLoader: ElementRef;
    @ViewChild('folderLoader') folderLoader: ElementRef;
    public open = false;

    constructor(private store: Store<any>,
        private coreService: CoreService,
        private productsEventsService: ProductsEventsService) {
        super();
    }

    ngOnInit() {
        this.store.select(selectLeftNavbarState)
                  .pipe(takeUntil(this.unsubscribe))
                  .subscribe((state) => this.open = state);
    }

    public closeLeftNavbar(): void {
        this.store.dispatch(new LeftNavbarToggle());
    }

    public openFileLoaderDialog(): void {
        this.fileLoader.nativeElement.click();
    }

    public openFolderLoaderDialog(): void {
        this.folderLoader.nativeElement.click();
    }

    public createFolderClicked(): void {
        this.coreService.broadcastShowCreateFolderModal();
    }

    public onFilesAdded(): void {
        this.open = false;
        const files: { [key: string]: File } = this.fileLoader.nativeElement.files;
        const filesToUpload = new Set<File>();
        for (const key in files) {
            if (!isNaN(parseInt(key))) {
                filesToUpload.add(files[key]);
            }
        }
        this.productsEventsService.uploadFiles(filesToUpload);
        // TODO rimuovere in favore di una chiamata bootstrap
        jQuery('#product-uploader').modal('show');

        this.fileLoader.nativeElement.value = null;
        // Workaround for IE <11
        if (this.fileLoader.nativeElement.parentNode) {
            this.fileLoader.nativeElement.parentNode.replaceChild(
                this.fileLoader.nativeElement.cloneNode(true),
                this.fileLoader.nativeElement
            );
        }
    }
}
