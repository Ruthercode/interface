import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private http : HttpClient)  {}

  public user: string = "";
  public host: string = "";
  public password: string = "";
  public database: string = "";
  public port: number = 0;
  
  private endpoint = 'http://127.0.0.1:5000';

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError(
        'Something bad happened; please try again later.');
    } else {
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    
  }

  public getConnectionString() : string {
    return `postgresql://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;
  }

  getTableNames(): Observable<any> {
    return this.http.get(this.endpoint + '/get_list')
    .pipe(tap(_ => console.log('fetched table names')),
    catchError(this.handleError)
    );
  }

  getTable(tableName): Observable<any> {
    return this.http.get(this.endpoint + '/get_table?table=' + tableName)
    .pipe(tap(_ => console.log('fetched table')),
    catchError(this.handleError)
    );
  }

  updateTable(tableName, data, savedData): Observable<any> {
    return this.http.post(this.endpoint + '/update_table', {tablename: tableName, table: data, oldtable:savedData})
    .pipe(tap(_ => console.log('post changes')),
    catchError(this.handleError)
    );
  }
}
