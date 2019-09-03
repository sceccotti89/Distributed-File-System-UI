import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseComponent } from 'src/app/shared/components/base.component';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  public username: string;
  public password: string;
  public loading: boolean;

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  public submitLogin(): void {
    this.loading = true;
    this.authService.login(this.username, this.password)
      .pipe(takeUntil(this.unsubscribe), finalize(() => this.loading = false))
      .subscribe(() => {
        if (this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
          this.authService.redirectUrl = null;
        } else {
          this.router.navigateByUrl('/home');      
        }
      });
  }

  public navigateTo(page: string): void {
    this.router.navigateByUrl(page);
  }
}
