import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiUrl = 'https://localhost:7252/api';
  constructor(private http: HttpClient, ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'withCredentials': true
  }

  //Dynamisk api forbindelse. metoden bliver kaldt indefra den valgte ts.
  //Inde i constructoren bliver endpointet kaldt via den valgte url navn.
  //Det samme gælder id (som udvælger denne specifikke data via dens id) og data til at sige hvilken tabel, der er snakke om.
  getDatas(endpoint: string): Observable<any> {
    return this.http.get(this.apiUrl + endpoint)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getData(id: any, endpoint: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + endpoint +'/'+ id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createData(data: any, endpoint: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + endpoint, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //https://localhost:7252/api/Brugers/2(brugerId)
  updateData(id: any, endpoint: string, data: any): Observable<any>{
    return this.http.put<any>(this.apiUrl + endpoint +'/'+ id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //https://localhost:7252/api/Brugers/Offentlighed/2?setting=false
  ChangeStatus(id:any, endpoint:string,offentlige:boolean):Observable<any>{
    return this.http.put<any>(this.apiUrl+endpoint+'/Offentlighed/'+ id+ '?setting='+offentlige, JSON.stringify(offentlige), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError))
  }

  deleteData(id: any, endpoint: string){
    return this.http.delete<any>(this.apiUrl + endpoint +'/'+ id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // deleteAllData(data: any[], endpoint: string){
  //   return this.http.delete<any>(this.apiUrl + endpoint, JSON.stringify(data), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

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
    return throwError(()=> new Error(errorMessage));
 }
}
