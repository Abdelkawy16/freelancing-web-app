import { GlobalService } from 'src/app/providers/services/global.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotClientGuard implements CanActivate {
  constructor(private _global:GlobalService, private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(!this._global.isClient && (localStorage.getItem('userType') != 'client')) {
        this._router.navigateByUrl("/")
        return false
      }
    return true;
  }
  
}
