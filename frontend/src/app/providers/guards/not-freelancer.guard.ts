import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class NotFreelancerGuard implements CanActivate {
  constructor(private _global:GlobalService, private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(!this._global.isFreelancer) {
        this._router.navigateByUrl("/")
        return false
      }
    return true;
  }
  
}
