import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { DatabaseService } from '../services/database.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (private DBService: DatabaseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `${this.DBService.getConnectionString()}`,
      },
    });
    
    return next.handle(req);
  }
}
