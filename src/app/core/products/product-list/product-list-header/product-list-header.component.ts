import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CheckboxClick } from 'src/app/shared/ngrx/files/actions/checkbox.actions';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/shared/services/document.service';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
  selector: 'app-product-list-header',
  templateUrl: './product-list-header.component.html',
  styleUrls: ['./product-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProductListHeaderComponent extends BaseComponent {
  @Input() showSelectionButton: boolean;
  @Input() itemsSelected: string[];

  public boxChecked = false;
  public mouseHover: boolean;

  constructor(private store: Store<any>, private router: Router, private documentService: DocumentService) {
    super();
  }

  public toggleCheckbox(checked: boolean): void {
    this.boxChecked = checked;
    this.store.dispatch(new CheckboxClick({ checked, local: true, global: false }));
  }

  public checkboxClicked(checked: boolean): void {
    this.boxChecked = checked;
    this.store.dispatch(new CheckboxClick({ checked, local: false, global: true }));
  }

  public setMouseHover(hover: boolean) {
    this.mouseHover = this.boxChecked || hover;
  }

  public downloadSelectedFiles() {
    console.log('Selected files:', this.itemsSelected);
    this.documentService.downloadDocuments(this.itemsSelected.map((item) => `${this.router.url}/${item}`))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        const blob = new Blob([data]);
        const fileName = `${this.router.url.substr(this.router.url.lastIndexOf('/') + 1)}.zip`;

        // Fix for IE.
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.download = fileName;
            link.click();
            document.body.removeChild(link);
        }
    });
  }
}
