import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  apiUrl = 'https://localhost:7252/api';
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getDataByEmail(email:any, endpoint:string): Observable<any>{
    return this.http.get<any>(this.apiUrl + endpoint+ '/email/' + email)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getDataByEnavn(enavn:any, endpoint:string): Observable<any>{
    return this.http.get<any>(this.apiUrl + endpoint+ '/enavn/' + enavn)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getDataByLevel(level:number, endpoint:string): Observable<any>{
    return this.http.get<any>(this.apiUrl + endpoint+ '/level/' + level)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getEventParticipantsByUsername(brugernavn:string, endpoint:string): Observable<any>{
    return this.http.get<any>(this.apiUrl + endpoint+ '/brugernavn/' + brugernavn)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUserByEventsTitle(titel:string, endpoint:string): Observable<any>{
    return this.http.get<any>(this.apiUrl + endpoint+ '/titel/' + titel)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getRapportByType(titel:string, endpoint:string): Observable<any>{
    return this.http.get<any>(this.apiUrl + endpoint+ '/titel/' + titel)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getParticipantByEventsTitle(titel : string , endpoint:string) : Observable<any>{
    return this.http.get<any>(this.apiUrl + endpoint + '/eventTitel/' + titel)
   .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
