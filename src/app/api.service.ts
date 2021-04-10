import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Log } from '../model/Log';
import { Response } from "../model/Response";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const profile = 'test';

const baseUrl = profile === 'test' ? 'http://localhost:8080/' : 'https://logs-rpl-prvsr.heroku.com/';

const apiUrl = baseUrl.concat('logs');

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getLogs(): Observable<Response> {
    const endpoint = apiUrl.concat('/list');
    return this.http.get<Response>(endpoint)
      .pipe(
        tap((response: Response) => console.log(response.message)),
        catchError(err => this.handleError('getLogs', err))
      );
  }

  getLogById(id: String): Observable<Response> {
    const endpoint = apiUrl.concat(`/select-by/${id}`);
    return this.http.get<Response>(endpoint)
      .pipe(
        tap((response: Response) => console.log(response.message)),
        catchError(err => this.handleError<Response>(`getLogById id=${id}`, err))
      );
  }

  getLogsFilterName(name: String): Observable<Response> {
    const endpoint = apiUrl.concat(`/list?nameLog=${name}`);
    return this.http.get<Response>(endpoint)
      .pipe(
        tap((response: Response) => console.log(response.message)),
        catchError(err => this.handleError(`getLogsFilterName name=${name}`, err))
      );
  }

  getLogsFilterIp(ip: String): Observable<Response> {
    const endpoint = apiUrl.concat(`/list?ip=${ip}`);
    return this.http.get<Response>(endpoint)
      .pipe(
        tap((response: Response) => console.log(response.message)),
        catchError(err => this.handleError(`getLogsFilterIp ip=${ip}`, err))
      );
  }

  uploadLog(dataFile: object): Observable<Response> {
    const endpoint = apiUrl.concat('/upload');
    return this.http.post<Response>(endpoint, dataFile, httpOptions)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        tap((response: Response) => console.log(response.message)),
        catchError(err => this.handleError<Response>('uploadLog', err))
      );
  }

  addOrUpdateLog(log: any): Observable<Response> {
    console.log('log', log);
    const endpoint = apiUrl.concat('/save-or-update');
    return this.http.patch<Response>(endpoint, log, httpOptions)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        tap((response: Response) => console.log(response.message)),
        catchError(err => this.handleError<Response>('addOrUpdateLog', err))
      );
  }

  deleteLogById(id: String): Observable<Response> {
    const endpoint = apiUrl.concat(`/delete-by/${id}`);
    return this.http.delete<Response>(endpoint, httpOptions)
      .pipe(
        tap((response: Response) => console.log(response.message)),
        catchError(err => this.handleError<Response>('deleteLogById', err))
      );
  }
}
