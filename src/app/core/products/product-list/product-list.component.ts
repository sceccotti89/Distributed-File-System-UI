import { Component, OnInit, ViewChild, } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { PayloadAction } from 'src/app/shared/models/payload-action.model';
import { FileObjectView } from 'src/app/shared/models/element.model';
import { Router, NavigationEnd } from '@angular/router';
import { defaultDeepFile, documentBaseUrl } from 'src/app/constants';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { takeUntil, filter } from 'rxjs/operators';
import { ProductListHeaderComponent } from './product-list-header/product-list-header.component';
import { ActionTypes, GetFilesFromFolder } from 'src/app/shared/ngrx/files/actions/file.action';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends BaseComponent implements OnInit {
    public loading = false;
    public files: FileObjectView[];
    private fileChecked: Map<number, boolean>;
    private filesSelected: Map<number, string>;

    @ViewChild('listHeader') listHeader: ProductListHeaderComponent;

    constructor(private store: Store<any>,
                private events: ActionsSubject,
                private router: Router,
                private productService: ProductService) {
        super();
    }

    ngOnInit() {
        this.router.events
            .pipe(takeUntil(this.unsubscribe), filter((route) => route instanceof NavigationEnd))
            .subscribe((route: NavigationEnd) => {
                console.log('Route product-list:', route);
                const url = route.urlAfterRedirects;
                this.loadFiles(url);
                this.productService.currentRoute = url;
            });

        this.events.pipe(takeUntil(this.unsubscribe)).subscribe((value: PayloadAction) => {
            if (value.type === ActionTypes.getFilesSuccess) {
                this.loading = false;
                this.files = value.payload.sort((a, b) => (a.fileName < b.fileName) ? -1 : ((a.fileName < b.fileName) ? 1 : 0));
                this.filesSelected = new Map();
                this.fileChecked = new Map(this.files.map((_, i): [number, boolean] => [i, false]));
            }
        });

        if (!this.productService.currentRoute ||
            this.productService.currentRoute.indexOf(documentBaseUrl) === -1) {
            this.loadFiles(this.router.url);
        }
    }

    public onFileSelected(file: FileObjectView): void {
        const url = this.router.url + ((file.folder) ? '/' : documentBaseUrl) + file.fileName;
        console.log('Url:', url);
        if (file.folder) {
            this.loadFiles(url);
        }
        this.router.navigateByUrl(url);
    }

    public onFileChecked(index: number, event: {checked: boolean, forward: boolean, fileName: string}): void {
        this.fileChecked.set(index, event.checked);
        this.filesSelected.set(index, event.fileName);
        if (event.forward) {
            const boxToCheck = Array.from(this.fileChecked.values()).every((value) => !!value);
            if (boxToCheck !== this.listHeader.boxChecked) {
                this.listHeader.toggleCheckbox(boxToCheck);
            }
        }
    }

    public showMultipleSelectionButton(): boolean {
        return this.fileChecked && Array.from(this.fileChecked.values()).filter((item) => !!item).length > 1;
    }

    public getItemsSelected(): string[] {
        return this.filesSelected && Array.from(this.filesSelected.values());
    }

    private loadFiles(filePath: string): void {
        console.log('Sending:', filePath);
        this.loading = true;
        this.store.dispatch(new GetFilesFromFolder({ folder: filePath, deep: defaultDeepFile }));
    }
}
