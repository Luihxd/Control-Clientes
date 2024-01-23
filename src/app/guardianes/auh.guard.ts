import { Injectable } from "@angular/core";
import { Route, UrlSegment, Router, CanActivate } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.fireauth.authState.pipe(
      take(1),
      map((auth) => {
        if (auth) {
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      })
    );
  }
}
