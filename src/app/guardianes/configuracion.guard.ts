import { Injectable } from "@angular/core";
import { Route, UrlSegment, Router, CanActivate } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ConfiguracionServicio } from "../servicios/configuracion.service";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGuard {

  constructor( private configuracionService: ConfiguracionServicio,private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.configuracionService.getConfiguracion().pipe(
      map(config => {
        if (config) {
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      })
    )
  }
}
