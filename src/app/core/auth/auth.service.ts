import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserSession } from 'src/app/shared/models/user.model';
import { StorageService } from 'src/app/shared/services/storage.service';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/internal/operators/delay';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class AuthService {
    private readonly jwtHelper = new JwtHelperService();
    private readonly loginURL = 'auth/login';
    private readonly registerURL = 'auth/register';

    public redirectUrl: string;

    constructor(private http: HttpClient, private storageService: StorageService) {}

    /**
     * Checks if there's an unexpired JWT.
    */
    public authenticated(): boolean {
        // return !this.jwtHelper.isTokenExpired(this.storageService.getItem(environment.authConfig.accessTokenName));
        return true;
    }

    public login(username: string, password: string) {
        return of(null).pipe(delay(3000));
        return this.http.post<UserSession>(environment.applicationBaseUrl + this.loginURL, null, { headers: this.createAuthorizationHeader(username, password) })
                      .pipe(tap((session: UserSession) => {
                          this.storageService.store(environment.authConfig.accessTokenName, session);
                      }));
    }

    private createAuthorizationHeader(username: string, password: string, headerValueName = 'Authorization'): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            [headerValueName]: 'Basic ' + btoa(username + ':' + password)
        });
        return headers;
    }

    public register(username: string, password: string): Observable<boolean> {
        return this.http.post<boolean>(environment.applicationBaseUrl + this.registerURL, null, { headers: this.createAuthorizationHeader(username, password) });
    }

    public logout() {
        this.storageService.clear(environment.authConfig.accessTokenName);
    }
}
