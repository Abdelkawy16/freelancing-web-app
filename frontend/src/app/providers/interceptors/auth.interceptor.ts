import { GlobalService } from 'src/app/providers/services/global.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _global:GlobalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    const token = localStorage.getItem('Token')
    if(token){
      this._global.isAuthed = true
      request = request.clone({
        headers: request.headers.set("Authorization", `Bearer ${token}`)
      })
    }
    return next.handle(request)
  }
}
