import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Log } from '../model/Log';

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

  getLogs(): Observable<any> {
    const endpoint = apiUrl.concat('/list');
    return this.http.get<any>(endpoint)
      .pipe(
        tap(logs => console.log('Retornou os logs')),
        catchError(this.handleError('getLogs', []))
      );
  }

  getLogById(id: string): Observable<any> {
    const endpoint = apiUrl.concat(`/select-by/${id}`);
    return this.http.get<any>(endpoint)
      .pipe(
        tap(_ => console.log(`Retornou log do ID: ${id}`)),
        catchError(this.handleError<any>(`getLogById id=${id}`))
      );
  }

  getLogsFilterName(name: string): Observable<any> {
    const endpoint = apiUrl.concat(`/list?nameLog=${name}`);
    return this.http.get<any>(endpoint)
      .pipe(
        tap(logs => console.log(`Retornou logs com nome: ${name}`)),
        catchError(this.handleError(`getLogsFilterName name=${name}`, []))
      );
  }

  getLogsFilterIp(ip: string): Observable<any> {
    const endpoint = apiUrl.concat(`/list?ip=${ip}`);
    return this.http.get<any>(endpoint)
      .pipe(
        tap(logs => console.log(`Retornou logs com ip: ${ip}`)),
        catchError(this.handleError(`getLogsFilterIp ip=${ip}`, []))
      );
  }

  uploadLog(dataFile: object): Observable<any> {
    const endpoint = apiUrl.concat('/upload');
    return this.http.post<any>(endpoint, dataFile, httpOptions)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        tap((dataFile: Log) => console.log('Upload de log realizado com sucesso!')),
        catchError(this.handleError<any>('uploadLog'))
      );
  }

  addOrUpdateLog(log: object): Observable<any> {
    const endpoint = apiUrl.concat('/save-or-update');
    return this.http.patch<any>(endpoint, log, httpOptions)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        tap((log: Log) => console.log(`Log do ID ${log.id} atualizado com sucesso!`)),
        catchError(this.handleError<any>('addOrUpdateLog'))
      );
  }

  deleteLogById(id: string): Observable<any> {
    const endpoint = apiUrl.concat(`/delete-by/${id}`);
    return this.http.delete<any>(endpoint, httpOptions)
      .pipe(
        tap(_ => console.log(`Log do ID ${id}, removido com sucesso!`)),
        catchError(this.handleError<any>('deleteLogById'))
      );
  }
}
