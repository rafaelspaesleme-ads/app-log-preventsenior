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

const apiUrl = baseUrl.concat('logs/');

const endpoint = {
  upload: apiUrl.concat('upload'),
  saveOrUpdate: apiUrl.concat('save-or-update'),
  list: (page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number) => apiUrl
    .concat(`list?page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  listByName: (name: String, page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number) => apiUrl
    .concat(`list?nameLog=${name}&page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  listByIp: (ip: String, page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number) => apiUrl
    .concat(`list?ip=${ip}&page=${page}&linesPerPage=${linesPerPage}&limited=${limited}${orderBy !== null ? `&orderBy=${orderBy}` : ''}${direction !== null ? `&direction=${direction}` : ''}`),
  selectById: (id: String) => apiUrl.concat(`select-by/${id}`),
  deleteById: (id: String) => apiUrl.concat(`delete-by/${id}`)
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLogs(page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number): Observable<any> {
    return this.http.get(endpoint.list(page, linesPerPage, orderBy, direction, limited));
  }

  getLogById(id: String): Observable<any> {
    return this.http.get(endpoint.selectById(id));
  }

  getLogByName(name: String, page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number): Observable<any> {
    return this.http.get(endpoint.listByName(name, page, linesPerPage, orderBy, direction, limited));
  }

  getLogByIp(ip: String, page: Number, linesPerPage: Number, orderBy: String, direction: String, limited: Number): Observable<any> {
    return this.http.get(endpoint.listByIp(ip, page, linesPerPage, orderBy, direction, limited));
  }

  uploadLog(dataFile: any): Observable<any> {
    return this.http.post(endpoint.upload, dataFile);
  }

  addOrUpdateLog(data: any): Observable<any> {
    return this.http.patch(endpoint.saveOrUpdate, data);
  }

  deleteLogById(id: String): Observable<any> {
    return this.http.delete(endpoint.deleteById(id));
  }

}
